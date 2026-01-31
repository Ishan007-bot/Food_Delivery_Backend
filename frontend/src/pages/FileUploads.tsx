import { useCallback, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import {
  Upload,
  File,
  Image,
  FileText,
  X,
  Check,
  Loader2,
  Download,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { fileApi } from '@/lib/api';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  preview?: string;
  errorMessage?: string;
  fileUrl?: string;
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return Image;
  if (type.includes('pdf') || type.includes('document')) return FileText;
  return File;
};

export default function FileUploads() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const { toast } = useToast();
  const abortControllersRef = useRef<Map<string, AbortController>>(new Map());

  // Cleanup Object URLs on unmount
  useEffect(() => {
    return () => {
      // Abort any ongoing uploads
      abortControllersRef.current.forEach((controller) => controller.abort());
      abortControllersRef.current.clear();
      // Revoke all Object URLs
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  const uploadFile = useCallback(async (file: File, uploadedFile: UploadedFile) => {
    try {
      const response = await fileApi.upload(file, 'general', (progress) => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadedFile.id ? { ...f, progress } : f
          )
        );
      });

      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadedFile.id
            ? { ...f, progress: 100, status: 'completed', fileUrl: response.fileUrl }
            : f
        )
      );

      toast({
        title: 'File uploaded',
        description: `${uploadedFile.name} has been uploaded successfully.`,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Upload failed';
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadedFile.id
            ? { ...f, status: 'error', errorMessage }
            : f
        )
      );

      toast({
        title: 'Upload failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  }, [toast]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const uploadedFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'uploading',
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      };

      setFiles((prev) => [uploadedFile, ...prev]);
      uploadFile(file, uploadedFile);
    });
  }, [uploadFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = useCallback((id: string) => {
    // Abort any running upload
    const controller = abortControllersRef.current.get(id);
    if (controller) {
      controller.abort();
      abortControllersRef.current.delete(id);
    }

    // Revoke Object URL to prevent memory leak
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold">File Uploads</h1>
          <p className="text-muted-foreground mt-1">
            Upload and manage your files with drag & drop
          </p>
        </div>

        {/* Upload Zone */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
            <CardDescription>
              Drag & drop image files here or click to browse. Max file size: 10MB
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={cn(
                'border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200',
                isDragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-4">
                <div className={cn(
                  'h-16 w-16 rounded-2xl flex items-center justify-center transition-colors',
                  isDragActive ? 'bg-primary/20' : 'bg-muted'
                )}>
                  <Upload className={cn(
                    'h-8 w-8 transition-colors',
                    isDragActive ? 'text-primary' : 'text-muted-foreground'
                  )} />
                </div>
                <div>
                  <p className="text-lg font-medium">
                    {isDragActive ? 'Drop files here...' : 'Drag & drop files here'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    or click to browse from your computer
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="ghost">PNG</Badge>
                  <Badge variant="ghost">JPG</Badge>
                  <Badge variant="ghost">GIF</Badge>
                  <Badge variant="ghost">WEBP</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Uploaded Files */}
        {files.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Files</CardTitle>
              <CardDescription>{files.length} files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {files.map((file) => {
                  const FileIcon = getFileIcon(file.type);
                  return (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border"
                    >
                      {file.preview ? (
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                          <FileIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                        {file.status === 'uploading' && (
                          <Progress value={file.progress} className="h-1 mt-2" />
                        )}
                        {file.status === 'error' && file.errorMessage && (
                          <p className="text-sm text-destructive mt-1">{file.errorMessage}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {file.status === 'uploading' && (
                          <Badge variant="warning" className="gap-1">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            {file.progress}%
                          </Badge>
                        )}
                        {file.status === 'completed' && (
                          <Badge variant="success" className="gap-1">
                            <Check className="h-3 w-3" />
                            Uploaded
                          </Badge>
                        )}
                        {file.status === 'error' && (
                          <Badge variant="destructive" className="gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Failed
                          </Badge>
                        )}
                        {file.status === 'completed' && file.fileUrl && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => window.open(file.fileUrl, '_blank')}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </DashboardLayout>
  );
}
