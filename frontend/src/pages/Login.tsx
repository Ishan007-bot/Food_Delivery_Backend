import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const tonightCuisines = [
  'Saffron Lamb', 'Truffle Pasta', 'Charcoal Bao', 'Wild Risotto',
  'Tandoori Bass', 'Burnt Cheesecake', 'Hand-Pulled Ramen', 'Wood-Fired Pizza',
];

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      toast({ title: 'Welcome back to the table.', description: 'Pull up a chair.' });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Could not seat you',
        description: error instanceof Error ? error.message : 'Invalid credentials',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:grid lg:grid-cols-12">
      {/* ===== LEFT — editorial panel ===== */}
      <aside className="relative lg:col-span-7 bg-foreground text-background overflow-hidden flex flex-col">
        <div className="absolute inset-0 grain opacity-60" />
        <div className="absolute -left-32 -bottom-32 w-[600px] h-[600px] rounded-full" style={{
          background: 'radial-gradient(circle, hsl(var(--primary)/0.7), transparent 60%)',
          filter: 'blur(40px)',
        }} />
        <div className="absolute right-10 top-1/3 w-[300px] h-[300px] rounded-full drift-rev" style={{
          background: 'radial-gradient(circle, hsl(var(--gold)/0.5), transparent 60%)',
          filter: 'blur(40px)',
        }} />

        <div className="relative p-10 lg:p-14 flex flex-col h-full min-h-[40vh] lg:min-h-screen">
          {/* Top */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-baseline gap-2 group">
              <span className="text-primary font-display text-2xl leading-none">●</span>
              <span className="font-display text-2xl font-medium">Food<span className="italic font-light">Mood</span></span>
            </Link>
            <Link to="/" className="eyebrow text-background/65 hover:text-background flex items-center gap-2">
              <ArrowLeft className="h-3 w-3" /> Back to the magazine
            </Link>
          </div>

          {/* Middle — editorial copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="my-auto py-12"
          >
            <div className="eyebrow text-primary mb-6">— Returning guest</div>
            <h1 className="display text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
              The table
              <br />
              <span className="display-italic text-primary">remembers</span>
              <br />
              your order.
            </h1>
            <p className="mt-8 max-w-md text-background/75 text-lg leading-relaxed">
              Your saved kitchens, your last twelve dishes, your courier preferences
              — all waiting on the other side of this door.
            </p>
          </motion.div>

          {/* Bottom — tonight ticker */}
          <div className="relative -mx-10 lg:-mx-14 border-t border-background/15 pt-6 pb-2 overflow-hidden">
            <div className="eyebrow text-background/55 mb-3 px-10 lg:px-14">
              ◆ On the menu tonight
            </div>
            <div className="flex marquee-track whitespace-nowrap">
              {[...tonightCuisines, ...tonightCuisines].map((c, i) => (
                <span key={i} className="font-display text-2xl px-8 inline-flex items-center gap-8 text-background/85">
                  {c}
                  <span className="text-primary text-base">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* ===== RIGHT — form ===== */}
      <main className="lg:col-span-5 flex items-center justify-center p-8 lg:p-12 paper relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full max-w-md"
        >
          <div className="eyebrow text-foreground/55 mb-4">§ Sign in · No. 01</div>
          <h2 className="display text-4xl sm:text-5xl mb-3 leading-tight">
            Welcome <span className="display-italic text-primary">back.</span>
          </h2>
          <p className="text-foreground/65 mb-10">
            Two lines and you're in. We didn't make you wait for the food, we
            won't make you wait for the door.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            <div className="space-y-2">
              <Label htmlFor="email">Email — <span className="normal-case text-foreground/45 tracking-normal">where we send the receipt</span></Label>
              <Input
                id="email"
                type="email"
                placeholder="hello@yourkitchen.com"
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password — <span className="normal-case text-foreground/45 tracking-normal">the one you whispered to no one</span></Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-foreground/55 hover:text-foreground"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Setting the table...
                </>
              ) : (
                <>
                  Step inside <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="dotted-rule my-10" />

          <div className="text-center text-sm text-foreground/65">
            First time at FoodMood?{' '}
            <Link to="/register" className="text-primary font-medium underline-offset-4 hover:underline">
              Reserve a seat
            </Link>
          </div>

          <div className="mt-12 text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground/40">
            Vol. I · Issue 01 · Folio {Math.floor(Math.random() * 90 + 10)}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
