import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useToast } from '@/hooks/use-toast';

interface DataRecord {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

const mockRecords: DataRecord[] = [
  { id: '1', name: 'Order #12345', description: 'Premium subscription renewal', status: 'active', createdAt: '2024-01-15', updatedAt: '2024-01-20' },
  { id: '2', name: 'Order #12346', description: 'Enterprise plan upgrade', status: 'pending', createdAt: '2024-01-16', updatedAt: '2024-01-16' },
  { id: '3', name: 'Order #12347', description: 'API access request', status: 'completed', createdAt: '2024-01-17', updatedAt: '2024-01-19' },
  { id: '4', name: 'Order #12348', description: 'Data export request', status: 'cancelled', createdAt: '2024-01-18', updatedAt: '2024-01-18' },
  { id: '5', name: 'Order #12349', description: 'Custom integration setup', status: 'active', createdAt: '2024-01-19', updatedAt: '2024-01-21' },
  { id: '6', name: 'Order #12350', description: 'Support ticket escalation', status: 'pending', createdAt: '2024-01-20', updatedAt: '2024-01-20' },
  { id: '7', name: 'Order #12351', description: 'Billing address update', status: 'completed', createdAt: '2024-01-21', updatedAt: '2024-01-22' },
  { id: '8', name: 'Order #12352', description: 'New team member access', status: 'active', createdAt: '2024-01-22', updatedAt: '2024-01-23' },
];

const statusColors: Record<string, 'default' | 'secondary' | 'success' | 'warning' | 'destructive'> = {
  active: 'success',
  pending: 'warning',
  completed: 'default',
  cancelled: 'destructive',
};

export default function Records() {
  const [records, setRecords] = useState(mockRecords);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DataRecord | null>(null);
  const [deletingRecord, setDeletingRecord] = useState<DataRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const itemsPerPage = 5;
  const filteredRecords = records.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreate = async (formData: FormData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    
    const newRecord: DataRecord = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      status: formData.get('status') as DataRecord['status'],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    
    setRecords([newRecord, ...records]);
    setIsCreateOpen(false);
    setIsLoading(false);
    toast({ title: 'Record created', description: 'New record has been added successfully.' });
  };

  const handleUpdate = async (formData: FormData) => {
    if (!editingRecord) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    
    setRecords(records.map((r) =>
      r.id === editingRecord.id
        ? {
            ...r,
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            status: formData.get('status') as DataRecord['status'],
            updatedAt: new Date().toISOString().split('T')[0],
          }
        : r
    ));
    
    setEditingRecord(null);
    setIsLoading(false);
    toast({ title: 'Record updated', description: 'Record has been updated successfully.' });
  };

  const handleDelete = async () => {
    if (!deletingRecord) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    
    setRecords(records.filter((r) => r.id !== deletingRecord.id));
    setDeletingRecord(null);
    setIsLoading(false);
    toast({ title: 'Record deleted', description: 'Record has been deleted successfully.', variant: 'destructive' });
  };

  const RecordForm = ({ record, onSubmit }: { record?: DataRecord; onSubmit: (formData: FormData) => void }) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(new FormData(e.currentTarget));
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={record?.name} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input id="description" name="description" defaultValue={record?.description} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select name="status" defaultValue={record?.status || 'pending'}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DialogFooter>
        <Button type="submit" variant="hero" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save'
          )}
        </Button>
      </DialogFooter>
    </form>
  );

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Records</h1>
            <p className="text-muted-foreground mt-1">
              Manage your data records with CRUD operations
            </p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button variant="hero">
                <Plus className="mr-2 h-4 w-4" />
                Create Record
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Record</DialogTitle>
                <DialogDescription>Add a new record to your database</DialogDescription>
              </DialogHeader>
              <RecordForm onSubmit={handleCreate} />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>All Records</CardTitle>
                <CardDescription>{filteredRecords.length} total records</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {paginatedRecords.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No records found</p>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.name}</TableCell>
                        <TableCell className="text-muted-foreground">{record.description}</TableCell>
                        <TableCell>
                          <Badge variant={statusColors[record.status]}>
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{record.createdAt}</TableCell>
                        <TableCell className="text-muted-foreground">{record.updatedAt}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setEditingRecord(record)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => setDeletingRecord(record)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                    {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of{' '}
                    {filteredRecords.length} records
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={!!editingRecord} onOpenChange={() => setEditingRecord(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Record</DialogTitle>
              <DialogDescription>Update the record details</DialogDescription>
            </DialogHeader>
            {editingRecord && <RecordForm record={editingRecord} onSubmit={handleUpdate} />}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deletingRecord} onOpenChange={() => setDeletingRecord(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Record</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{deletingRecord?.name}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </motion.div>
    </DashboardLayout>
  );
}
