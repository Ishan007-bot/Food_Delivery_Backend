import { motion } from 'framer-motion';
import { 
  Globe, 
  CreditCard, 
  Cloud, 
  Map, 
  Check, 
  ExternalLink,
  DollarSign,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

const integrations = [
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing and billing',
    icon: CreditCard,
    status: 'connected',
    lastSync: '2 min ago',
  },
  {
    id: 'maps',
    name: 'Google Maps',
    description: 'Location and geocoding services',
    icon: Map,
    status: 'connected',
    lastSync: '5 min ago',
  },
  {
    id: 'aws',
    name: 'AWS S3',
    description: 'Cloud storage for files',
    icon: Cloud,
    status: 'connected',
    lastSync: '10 min ago',
  },
  {
    id: 'weather',
    name: 'Weather API',
    description: 'Real-time weather data',
    icon: Globe,
    status: 'disconnected',
    lastSync: 'Never',
  },
];

// Mock payment data
const paymentStatus = {
  lastPayment: {
    amount: '$299.00',
    date: 'Jan 25, 2024',
    status: 'succeeded',
  },
  subscription: {
    plan: 'Enterprise',
    billingCycle: 'Monthly',
    nextBilling: 'Feb 25, 2024',
  },
};

// Mock weather data
const weatherData = {
  location: 'San Francisco, CA',
  temperature: '68°F',
  condition: 'Partly Cloudy',
  humidity: '65%',
};

export default function Integrations() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold">External Integrations</h1>
          <p className="text-muted-foreground mt-1">
            Manage your external API connections and services
          </p>
        </div>

        {/* Integration Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {integrations.map((integration, index) => {
            const Icon = integration.icon;
            const isConnected = integration.status === 'connected';
            
            return (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant={isConnected ? 'stat' : 'default'}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                          isConnected ? 'bg-primary/20' : 'bg-muted'
                        }`}>
                          <Icon className={`h-6 w-6 ${isConnected ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold">{integration.name}</h3>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                      </div>
                      <Badge variant={isConnected ? 'success' : 'secondary'}>
                        {isConnected ? (
                          <>
                            <Check className="mr-1 h-3 w-3" />
                            Connected
                          </>
                        ) : (
                          'Disconnected'
                        )}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        Last sync: {integration.lastSync}
                      </span>
                      <Button variant={isConnected ? 'outline' : 'default'} size="sm">
                        {isConnected ? (
                          <>
                            <RefreshCw className="mr-2 h-3 w-3" />
                            Sync
                          </>
                        ) : (
                          'Connect'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Demo Widgets */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Payment Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Payment Status
              </CardTitle>
              <CardDescription>
                Your Stripe payment integration status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Last Payment</span>
                  <Badge variant="success">Succeeded</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{paymentStatus.lastPayment.amount}</span>
                  <span className="text-sm text-muted-foreground">{paymentStatus.lastPayment.date}</span>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
                  <p className="font-semibold">{paymentStatus.subscription.plan}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Next Billing</p>
                  <p className="font-semibold">{paymentStatus.subscription.nextBilling}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" />
                View in Stripe Dashboard
              </Button>
            </CardContent>
          </Card>

          {/* Weather Widget */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Weather API Demo
              </CardTitle>
              <CardDescription>
                Real-time weather data integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-center">
                <p className="text-sm text-muted-foreground mb-2">{weatherData.location}</p>
                <p className="text-5xl font-bold mb-2">{weatherData.temperature}</p>
                <p className="text-lg">{weatherData.condition}</p>
                <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border/50">
                  <div>
                    <p className="text-xs text-muted-foreground">Humidity</p>
                    <p className="font-semibold">{weatherData.humidity}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
                <p className="text-xs text-muted-foreground mb-1">API Response</p>
                <code className="text-xs font-mono text-foreground">
                  {`{ "temp": 68, "condition": "Partly Cloudy" }`}
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
