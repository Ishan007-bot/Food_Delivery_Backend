import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Stat {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
}

interface StatsCardProps {
  stat: Stat;
  index: number;
}

export function StatsCard({ stat, index }: StatsCardProps) {
  const Icon = stat.icon;
  const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card variant={stat.trend === 'up' ? 'stat' : 'warning'} className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              stat.trend === 'up' ? 'text-success' : 'text-warning'
            )}>
              <TrendIcon className="h-4 w-4" />
              {stat.change}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold">{stat.value}</h3>
            <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
