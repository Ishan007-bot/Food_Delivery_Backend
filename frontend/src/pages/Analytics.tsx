import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingBag,
  DollarSign,
  Calendar,
  Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  Line, 
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  Legend
} from 'recharts';

const dailyData = [
  { date: 'Mon', orders: 400, customers: 240, revenue: 24000 },
  { date: 'Tue', orders: 300, customers: 180, revenue: 18000 },
  { date: 'Wed', orders: 500, customers: 320, revenue: 32000 },
  { date: 'Thu', orders: 450, customers: 280, revenue: 28000 },
  { date: 'Fri', orders: 600, customers: 400, revenue: 40000 },
  { date: 'Sat', orders: 350, customers: 200, revenue: 20000 },
  { date: 'Sun', orders: 280, customers: 160, revenue: 16000 },
];

const monthlyData = [
  { month: 'Jan', revenue: 450000, orders: 1200 },
  { month: 'Feb', revenue: 520000, orders: 1400 },
  { month: 'Mar', revenue: 480000, orders: 1300 },
  { month: 'Apr', revenue: 610000, orders: 1600 },
  { month: 'May', revenue: 550000, orders: 1500 },
  { month: 'Jun', revenue: 670000, orders: 1800 },
];

const pieData = [
  { name: 'North Indian', value: 35, color: 'hsl(var(--primary))' },
  { name: 'Chinese', value: 25, color: 'hsl(var(--accent))' },
  { name: 'Italian', value: 20, color: 'hsl(var(--warning))' },
  { name: 'Fast Food', value: 20, color: 'hsl(var(--destructive))' },
];

const stats = [
  { title: 'Total Orders', value: '12.4K', change: '+23%', icon: ShoppingBag },
  { title: 'Active Customers', value: '8,432', change: '+12%', icon: Users },
  { title: 'Total Revenue', value: '₹2.4M', change: '+15%', icon: DollarSign },
  { title: 'Avg Order Value', value: '₹195', change: '+5%', icon: BarChart3 },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Monitor orders, revenue, and customer insights
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="success">{stat.change}</Badge>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Daily Orders</CardTitle>
              <CardDescription>Order volume over the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyData}>
                    <defs>
                      <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Area type="monotone" dataKey="orders" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#colorReq)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer & Revenue</CardTitle>
              <CardDescription>Daily customers and revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyData}>
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="customers" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="revenue" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue & Orders</CardTitle>
              <CardDescription>Monthly performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(v) => `₹${v/1000}k`} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
                    <Line yAxisId="right" type="monotone" dataKey="orders" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: 'hsl(var(--accent))' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cuisine Distribution</CardTitle>
              <CardDescription>Orders by cuisine type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
