import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Loader2 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useToast } from '@/hooks/use-toast';

interface EmailLog {
  id: string;
  to: string;
  subject: string;
  status: 'sent' | 'pending' | 'failed';
  timestamp: string;
}

const mockEmailLogs: EmailLog[] = [
  { id: '1', to: 'user@example.com', subject: 'Order Confirmation - FoodDelivery', status: 'sent', timestamp: '2 min ago' },
  { id: '2', to: 'admin@company.com', subject: 'Weekly Report', status: 'sent', timestamp: '1 hour ago' },
  { id: '3', to: 'support@example.com', subject: 'Password Reset', status: 'pending', timestamp: '3 hours ago' },
  { id: '4', to: 'invalid@', subject: 'Test Email', status: 'failed', timestamp: '5 hours ago' },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'sent':
      return (
        <Badge variant="success" className="gap-1">
          <CheckCircle className="h-3 w-3" />
          Sent
        </Badge>
      );
    case 'pending':
      return (
        <Badge variant="warning" className="gap-1">
          <Clock className="h-3 w-3" />
          Pending
        </Badge>
      );
    case 'failed':
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertCircle className="h-3 w-3" />
          Failed
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function Email() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailLogs, setEmailLogs] = useState(mockEmailLogs);
  const { toast } = useToast();

  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const to = formData.get('to') as string;
    const subject = formData.get('subject') as string;

    // Simulate API call
    await new Promise((r) => setTimeout(r, 2000));

    const newLog: EmailLog = {
      id: Date.now().toString(),
      to,
      subject,
      status: 'sent',
      timestamp: 'Just now',
    };

    setEmailLogs([newLog, ...emailLogs]);
    setIsLoading(false);
    
    toast({
      title: 'Email sent successfully!',
      description: `Email delivered to ${to}`,
    });

    (e.target as HTMLFormElement).reset();
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold">Email Integration</h1>
          <p className="text-muted-foreground mt-1">
            Send emails and track delivery status
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Send Email Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Compose Email
              </CardTitle>
              <CardDescription>
                Send a test email via the backend API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSendEmail} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="to">Recipient Email</Label>
                  <Input
                    id="to"
                    name="to"
                    type="email"
                    placeholder="user@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Email subject..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body">Message</Label>
                  <Textarea
                    id="body"
                    name="body"
                    placeholder="Write your message here..."
                    rows={6}
                    required
                  />
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Email
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Email Logs */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Emails</CardTitle>
              <CardDescription>
                Track your sent emails and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emailLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium truncate">{log.subject}</p>
                        {getStatusBadge(log.status)}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        To: {log.to}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {log.timestamp}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card variant="stat">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-success/20 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1,234</p>
                  <p className="text-sm text-muted-foreground">Emails Sent</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="warning">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-warning/20 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="destructive">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Failed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
