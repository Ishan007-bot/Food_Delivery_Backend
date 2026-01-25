import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  BarChart3, 
  UtensilsCrossed, 
  Globe, 
  Lock, 
  Server,
  ArrowRight,
  Check,
  Moon,
  Sun,
  ShoppingCart,
  MapPin,
  Clock
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { FeatureCard } from '@/components/FeatureCard';

const features = [
  {
    icon: ShoppingCart,
    title: 'Easy Ordering',
    description: 'Browse restaurants, view menus, and place orders with just a few clicks.',
  },
  {
    icon: MapPin,
    title: 'Location-Based Search',
    description: 'Find restaurants near you with real-time location tracking and delivery estimates.',
  },
  {
    icon: Clock,
    title: 'Fast Delivery',
    description: 'Track your orders in real-time and get your food delivered quickly.',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Multiple payment options with Razorpay integration for safe transactions.',
  },
  {
    icon: BarChart3,
    title: 'Order Analytics',
    description: 'View your order history, track spending, and get personalized recommendations.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Wide Selection',
    description: 'Choose from hundreds of restaurants offering various cuisines and dietary options.',
  },
];

const stats = [
  { value: 500, suffix: '+', label: 'Restaurants' },
  { value: 30, suffix: 'min', label: 'Avg Delivery' },
  { value: 10, suffix: 'K+', label: 'Happy Customers' },
  { value: 4.8, suffix: '★', label: 'Avg Rating' },
];

export default function Landing() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">FoodDelivery</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-foreground"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              {isAuthenticated ? (
                <Button asChild variant="hero" size="default">
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button asChild variant="ghost">
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild variant="hero">
                    <Link to="/register">Get Started</Link>
                  </Button>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-3xl opacity-20"
          style={{ background: 'var(--gradient-primary)' }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Badge variant="gradient" className="mb-6">
                Order Food Online
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Delicious Food{' '}
              <span className="gradient-text">Delivered Fast</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Order from your favorite restaurants. Fast delivery, secure payments, 
              and real-time order tracking.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild variant="hero" size="xl">
                <Link to="/register">
                  Order Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="xl">
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center justify-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success" />
                Fast delivery
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success" />
                Secure payments
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success" />
                Real-time tracking
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-border bg-card/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  <AnimatedCounter value={stat.value} />{stat.suffix}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">Why Choose Us</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why FoodDelivery?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the best food delivery service with fast delivery, 
              secure payments, and a wide selection of restaurants.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ background: 'var(--gradient-primary)' }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Order?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers enjoying delicious food delivered to their doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl">
                <Link to="/register">
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <UtensilsCrossed className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">FoodDelivery</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 FoodDelivery. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
