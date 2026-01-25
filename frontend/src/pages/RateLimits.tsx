import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Check, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

const rateLimits = [
  {
    name: 'API Requests',
    current: 8432,
    limit: 10000,
    resetIn: '2 hours',
    status: 'ok' as const,
  },
  {
    name: 'File Uploads',
    current: 45,
    limit: 50,
    resetIn: '30 minutes',
    status: 'warning' as const,
  },
  {
    name: 'Email Sends',
    current: 180,
    limit: 500,
    resetIn: '24 hours',
    status: 'ok' as const,
  },
  {
    name: 'Webhook Calls',
    current: 950,
    limit: 1000,
    resetIn: '1 hour',
    status: 'critical' as const,
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'ok':
      return <Check className="h-4 w-4 text-success" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-warning" />;
    case 'critical':
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    default:
      return <Info className="h-4 w-4 text-muted-foreground" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'ok':
      return <Badge variant="success">Healthy</Badge>;
    case 'warning':
      return <Badge variant="warning">Warning</Badge>;
    case 'critical':
      return <Badge variant="destructive">Critical</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const getProgressColor = (percentage: number) => {
  if (percentage >= 90) return 'bg-destructive';
  if (percentage >= 75) return 'bg-warning';
  return 'bg-primary';
};

export default function RateLimits() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold">Rate Limits</h1>
          <p className="text-muted-foreground mt-1">
            Monitor your API rate limits and usage quotas
          </p>
        </div>

        {/* Overview Card */}
        <Card variant="gradient">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Rate Limit Status</CardTitle>
                <CardDescription>
                  Overall system rate limiting health
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {rateLimits.map((limit) => {
                const percentage = (limit.current / limit.limit) * 100;
                return (
                  <div key={limit.name} className="p-4 rounded-lg bg-background/50 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      {getStatusIcon(limit.status)}
                      {getStatusBadge(limit.status)}
                    </div>
                    <h3 className="font-semibold mt-2">{limit.name}</h3>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">
                          {limit.current.toLocaleString()} / {limit.limit.toLocaleString()}
                        </span>
                        <span className="font-medium">{Math.round(percentage)}%</span>
                      </div>
                      <Progress 
                        value={percentage} 
                        className={`h-2 ${getProgressColor(percentage)}`}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Resets in {limit.resetIn}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Limits */}
        <div className="grid gap-6 lg:grid-cols-2">
          {rateLimits.map((limit, index) => {
            const percentage = (limit.current / limit.limit) * 100;
            return (
              <motion.div
                key={limit.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{limit.name}</CardTitle>
                      {getStatusBadge(limit.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Usage</span>
                          <span className="font-medium">
                            {limit.current.toLocaleString()} of {limit.limit.toLocaleString()}
                          </span>
                        </div>
                        <Progress 
                          value={percentage} 
                          className="h-3"
                        />
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Remaining: </span>
                          <span className="font-medium">
                            {(limit.limit - limit.current).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Resets: </span>
                          <span className="font-medium">{limit.resetIn}</span>
                        </div>
                      </div>
                      {percentage >= 90 && (
                        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                          <div className="flex items-center gap-2 text-sm text-destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <span>You're approaching your rate limit. Consider upgrading your plan.</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
