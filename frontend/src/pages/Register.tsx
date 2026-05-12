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

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name must not exceed 50 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50, 'Last name must not exceed 50 characters'),
  email: z.string().email('Please enter a valid email').max(100, 'Email must not exceed 100 characters'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must not exceed 100 characters')
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
      'Use one digit, one lower, one upper, and one of @#$%^&+='),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const perks = [
  { n: '01', label: 'A first delivery on the house' },
  { n: '02', label: 'Your saved kitchens, your way' },
  { n: '03', label: 'Tasting menus released to you first' },
];

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.firstName, data.lastName, data.email, data.password, data.phone);
      toast({ title: 'A seat is yours.', description: 'Welcome to FoodMood.' });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Could not reserve your seat',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:grid lg:grid-cols-12">
      {/* ===== LEFT — editorial panel ===== */}
      <aside className="relative lg:col-span-5 bg-foreground text-background overflow-hidden flex flex-col">
        <div className="absolute inset-0 grain opacity-60" />
        <div className="absolute -right-32 -top-32 w-[600px] h-[600px] rounded-full" style={{
          background: 'radial-gradient(circle, hsl(var(--primary)/0.7), transparent 60%)',
          filter: 'blur(40px)',
        }} />
        <div className="absolute left-10 bottom-1/4 w-[300px] h-[300px] rounded-full drift" style={{
          background: 'radial-gradient(circle, hsl(var(--accent)/0.55), transparent 60%)',
          filter: 'blur(40px)',
        }} />

        <div className="relative p-10 lg:p-14 flex flex-col h-full min-h-[40vh] lg:min-h-screen">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-baseline gap-2">
              <span className="text-primary font-display text-2xl leading-none">●</span>
              <span className="font-display text-2xl font-medium">Food<span className="italic font-light">Mood</span></span>
            </Link>
            <Link to="/" className="eyebrow text-background/65 hover:text-background flex items-center gap-2">
              <ArrowLeft className="h-3 w-3" /> Back
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="my-auto py-12"
          >
            <div className="eyebrow text-primary mb-6">— Reserve a seat</div>
            <h1 className="display text-5xl lg:text-6xl leading-[0.95]">
              Pull up a
              <br />
              <span className="display-italic text-primary">chair.</span>
            </h1>
            <p className="mt-8 max-w-md text-background/75 text-lg leading-relaxed">
              A short form. A warm plate. A standing invitation to the best
              kitchens in your city.
            </p>

            <div className="dotted-rule mt-10 mb-6 max-w-[200px] opacity-50" />

            <ul className="space-y-5">
              {perks.map((p) => (
                <li key={p.n} className="flex items-baseline gap-5">
                  <span className="num text-3xl text-primary">{p.n}</span>
                  <span className="font-display text-xl text-background/90 leading-snug">{p.label}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-background/45">
            Vol. I · Issue 01 · No card required to browse
          </div>
        </div>
      </aside>

      {/* ===== RIGHT — form ===== */}
      <main className="lg:col-span-7 flex items-center justify-center p-8 lg:p-14 paper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full max-w-xl"
        >
          <div className="eyebrow text-foreground/55 mb-4">§ Sign up · No. 02</div>
          <h2 className="display text-4xl sm:text-5xl mb-3 leading-tight">
            A few <span className="display-italic text-primary">ingredients,</span>
            <br /> then we cook.
          </h2>
          <p className="text-foreground/65 mb-10">
            Your details are kept like a chef keeps a recipe — close and confidential.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Asha"
                  {...register('firstName')}
                  className={errors.firstName ? 'border-destructive' : ''}
                />
                {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Mehra"
                  {...register('lastName')}
                  className={errors.lastName ? 'border-destructive' : ''}
                />
                {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="asha@yourkitchen.com"
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone — <span className="normal-case text-foreground/45 tracking-normal">your courier will ring this</span></Label>
              <Input
                id="phone"
                type="tel"
                placeholder="9876543210"
                maxLength={10}
                {...register('phone')}
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
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
                {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register('confirmPassword')}
                  className={errors.confirmPassword ? 'border-destructive' : ''}
                />
                {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Setting your table...
                </>
              ) : (
                <>
                  Take my seat <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

            <p className="text-xs text-foreground/50 leading-relaxed text-center">
              By creating an account you agree to our terms of dining and our
              privacy policy. We never sell your data. We barely keep it.
            </p>
          </form>

          <div className="dotted-rule my-10" />

          <div className="text-center text-sm text-foreground/65">
            Already a regular?{' '}
            <Link to="/login" className="text-primary font-medium underline-offset-4 hover:underline">
              Sign in
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
