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
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Card variant={stat.trend === 'up' ? 'stat' : 'warning'} className="overflow-hidden hover:-translate-y-0.5 transition-transform duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-foreground/55">{stat.title}</p>
              <h3 className="font-display text-4xl mt-2 leading-none">{stat.value}</h3>
              <div className={cn(
                "flex items-center gap-1.5 text-xs font-medium mt-3 font-mono tracking-wider uppercase",
                stat.trend === 'up' ? 'text-success' : 'text-warning'
              )}>
                <TrendIcon className="h-3.5 w-3.5" />
                {stat.change}
                <span className="text-foreground/40 ml-1 normal-case font-sans">vs last week</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
