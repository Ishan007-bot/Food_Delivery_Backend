import { motion } from 'framer-motion';
import {
  Users,
  ShoppingBag,
  UtensilsCrossed,
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
  ChevronRight,
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
  { title: 'Tickets out tonight', value: '1,234', change: '+15.3%', trend: 'up' as const, icon: ShoppingBag },
  { title: 'Active kitchens', value: '156', change: '+8.2%', trend: 'up' as const, icon: UtensilsCrossed },
  { title: 'Revenue, MTD', value: '₹2.4M', change: '+23.1%', trend: 'up' as const, icon: IndianRupee },
  { title: 'Seated guests', value: '2,847', change: '+12.5%', trend: 'up' as const, icon: Users },
];

export default function Dashboard() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* === Welcome / Pass header === */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hairline-thick pt-4"
        >
          <div className="grid sm:grid-cols-12 gap-4 items-end">
            <div className="sm:col-span-8">
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-foreground/55 mb-2">
                § Tonight at the pass
              </div>
              <h1 className="font-display text-4xl sm:text-5xl leading-tight">
                Welcome back, <span className="display-italic text-primary">{user?.firstName || 'Chef'}.</span>
              </h1>
              <p className="text-foreground/65 mt-2">
                Service is open. Here is what is moving through the kitchen tonight.
              </p>
            </div>
            <div className="sm:col-span-4 flex sm:justify-end items-center gap-3">
              <Badge variant={isAdmin ? 'gradient' : 'outline'}>
                {isAdmin ? 'House · Admin' : 'Guest'}
              </Badge>
              <Button variant="hero" asChild>
                <a href="http://localhost:8080/swagger-ui.html" target="_blank" rel="noopener noreferrer">
                  API · Swagger
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* === Stats === */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatsCard key={stat.title} stat={stat} index={index} />
          ))}
        </div>

        {/* === Charts + Activity === */}
        <div className="grid gap-6 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="eyebrow text-foreground/55 mb-1">§ Service report</div>
                  <CardTitle>Order trends</CardTitle>
                  <CardDescription>Daily tickets · last 30 nights of service</CardDescription>
                </div>
                <Badge variant="outline">Live</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <AnalyticsChart />
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="eyebrow text-foreground/55 mb-1">§ The pass</div>
              <CardTitle>Latest tickets</CardTitle>
              <CardDescription>What is going out the door right now</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </div>

        {/* === Quick actions for admin === */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="gradient" className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="eyebrow text-primary mb-1">§ House controls</div>
                    <CardTitle className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      The house desk
                    </CardTitle>
                    <CardDescription>Run the floor without leaving the pass.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: 'Guests', href: '/dashboard/users', icon: Users },
                    { label: 'Service', href: '/dashboard/analytics', icon: TrendingUp },
                    { label: 'Ticket book', href: '/dashboard/records', icon: ShoppingBag },
                    { label: 'Kitchens', href: '/dashboard/integrations', icon: UtensilsCrossed },
                  ].map(({ label, href, icon: Icon }) => (
                    <Button key={href} variant="outline" className="justify-between h-12 rounded-md" asChild>
                      <a href={href}>
                        <span className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-primary" />
                          {label}
                        </span>
                        <ChevronRight className="h-4 w-4" />
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
