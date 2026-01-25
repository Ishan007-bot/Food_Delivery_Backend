import { motion } from 'framer-motion';
import { 
  Users, 
  ShoppingBag, 
  UtensilsCrossed, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { useAuth } from '@/contexts/AuthContext';

const stats = [
  {
    title: 'Total Orders',
    value: '1,234',
    change: '+15.3%',
    trend: 'up' as const,
    icon: ShoppingBag,
  },
  {
    title: 'Active Restaurants',
    value: '156',
    change: '+8.2%',
    trend: 'up' as const,
    icon: UtensilsCrossed,
  },
  {
    title: 'Total Revenue',
    value: '₹2.4M',
    change: '+23.1%',
    trend: 'up' as const,
    icon: DollarSign,
  },
  {
    title: 'Total Users',
    value: '2,847',
    change: '+12.5%',
    trend: 'up' as const,
    icon: Users,
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {user?.firstName || 'User'}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with FoodDelivery today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={isAdmin ? 'gradient' : 'secondary'} className="text-sm">
              {isAdmin ? 'Admin' : 'Customer'} Account
            </Badge>
            <Button variant="hero" asChild>
              <a href="http://localhost:8080/swagger-ui.html" target="_blank" rel="noopener noreferrer">
                View API Docs
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatsCard key={stat.title} stat={stat} index={index} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-7">
          {/* Main Chart */}
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Order Trends</CardTitle>
              <CardDescription>Daily orders over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <AnalyticsChart />
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest orders and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="gradient">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Admin Quick Actions
                </CardTitle>
                <CardDescription>
                  Manage your food delivery platform efficiently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <Button variant="outline" className="justify-start" asChild>
                    <a href="/dashboard/users">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Users
                    </a>
                  </Button>
                  <Button variant="outline" className="justify-start" asChild>
                    <a href="/dashboard/analytics">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Analytics
                    </a>
                  </Button>
                  <Button variant="outline" className="justify-start" asChild>
                    <a href="/dashboard/records">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      View Orders
                    </a>
                  </Button>
                  <Button variant="outline" className="justify-start" asChild>
                    <a href="/dashboard/integrations">
                      <UtensilsCrossed className="mr-2 h-4 w-4" />
                      Restaurants
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
