import { FileText, Upload, User, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const activities = [
  {
    id: 1,
    type: 'record',
    action: 'New record created',
    description: 'Order #12345 was created',
    time: '2 min ago',
    icon: FileText,
  },
  {
    id: 2,
    type: 'upload',
    action: 'File uploaded',
    description: 'invoice_march.pdf uploaded',
    time: '15 min ago',
    icon: Upload,
  },
  {
    id: 3,
    type: 'user',
    action: 'New user registered',
    description: 'john.doe@example.com',
    time: '1 hour ago',
    icon: User,
  },
  {
    id: 4,
    type: 'security',
    action: 'Rate limit triggered',
    description: 'IP 192.168.1.100 exceeded limit',
    time: '2 hours ago',
    icon: Shield,
  },
  {
    id: 5,
    type: 'record',
    action: 'Record updated',
    description: 'Order #12340 status changed',
    time: '3 hours ago',
    icon: FileText,
  },
];

const getBadgeVariant = (type: string) => {
  switch (type) {
    case 'record':
      return 'default';
    case 'upload':
      return 'secondary';
    case 'user':
      return 'success';
    case 'security':
      return 'warning';
    default:
      return 'ghost';
  }
};

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const Icon = activity.icon;
        return (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium truncate">{activity.action}</p>
                <Badge variant={getBadgeVariant(activity.type)} className="text-[10px] shrink-0">
                  {activity.type}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
          </div>
        );
      })}
    </div>
  );
}
