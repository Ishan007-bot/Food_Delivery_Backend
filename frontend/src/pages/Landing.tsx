import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  ArrowUpRight,
  Moon,
  Sun,
  Clock,
  MapPin,
  Sparkles,
  Flame,
  Leaf,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { AnimatedCounter } from '@/components/AnimatedCounter';

// — Editorial content blocks —
const cuisines = [
  'Neapolitan Pizza', 'Sichuan Hotpot', 'Wood-Fired Naan', 'Hand-Pulled Ramen',
  'Smash Burgers', 'Bibimbap', 'Tandoori Skewers', 'Banh Mi', 'Sourdough Pies',
  'Sushi Omakase', 'Brisket Tacos', 'Saffron Biryani', 'Pho Bo', 'Falafel Plates',
];

const dishes = [
  {
    num: '01',
    name: 'Saffron-Braised Lamb',
    house: 'Marigold & Co.',
    minutes: 28,
    price: '₹540',
    note: 'slow-cooked · cardamom · rose',
    glyph: '🍖',
    tone: 'from-[hsl(var(--primary)/0.25)] to-[hsl(var(--gold)/0.15)]',
  },
  {
    num: '02',
    name: 'Truffle Tagliatelle',
    house: 'Forno Verde',
    minutes: 22,
    price: '₹620',
    note: 'fresh egg pasta · 36-mo parmigiano',
    glyph: '🍝',
    tone: 'from-[hsl(var(--gold)/0.25)] to-[hsl(var(--accent)/0.15)]',
  },
  {
    num: '03',
    name: 'Charcoal Bao Trio',
    house: 'Lantern Street',
    minutes: 18,
    price: '₹380',
    note: 'pork belly · scallion · sesame',
    glyph: '🥟',
    tone: 'from-[hsl(var(--accent)/0.25)] to-[hsl(var(--primary)/0.15)]',
  },
  {
    num: '04',
    name: 'Wild Mushroom Risotto',
    house: 'Bosco',
    minutes: 26,
    price: '₹480',
    note: 'porcini · thyme · brown butter',
    glyph: '🍚',
    tone: 'from-[hsl(var(--primary)/0.18)] to-[hsl(var(--gold)/0.22)]',
  },
  {
    num: '05',
    name: 'Tandoori Sea Bass',
    house: 'Spice Wharf',
    minutes: 24,
    price: '₹720',
    note: 'kasundi · curry leaf · lime',
    glyph: '🐟',
    tone: 'from-[hsl(var(--gold)/0.22)] to-[hsl(var(--primary)/0.18)]',
  },
  {
    num: '06',
    name: 'Burnt Basque Cheesecake',
    house: 'Honey & Smoke',
    minutes: 14,
    price: '₹260',
    note: 'caramelised · vanilla · sea salt',
    glyph: '🍰',
    tone: 'from-[hsl(var(--accent)/0.2)] to-[hsl(var(--gold)/0.2)]',
  },
];

const chapters = [
  {
    n: '01',
    title: 'You crave it',
    body: 'Open the app and we read the room — weather, time, last order, and what the city is eating tonight.',
  },
  {
    n: '02',
    title: 'The kitchen plates it',
    body: 'Our partner restaurants get a clean ticket, a quiet timer, and a courier already two streets away.',
  },
  {
    n: '03',
    title: 'You taste it warm',
    body: 'Sealed at the pass, tracked block-by-block, handed over at the door in under thirty.',
  },
];

const press = [
  'EATER · 2026',
  'CONDÉ NAST TRAVELLER',
  'TIME OUT',
  'THE INFATUATION',
  'MICHELIN GUIDE — DIGITAL',
  'BON APPÉTIT',
];

const cities = ['Bombay', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Goa'];

export default function Landing() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const haloY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const haloScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div className="min-h-screen bg-background text-foreground paper relative overflow-x-hidden">
      {/* ===== TOP RIBBON ===== */}
      <div className="border-b border-foreground/15 bg-foreground text-background">
        <div className="container flex items-center justify-between py-2 text-[0.65rem] font-mono uppercase tracking-[0.22em]">
          <div className="flex items-center gap-3">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>Kitchens open · accepting orders</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span>Vol. I · Issue No. 01</span>
            <span>Free delivery over ₹399</span>
            <span>{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* ===== NAV ===== */}
      <nav className="sticky top-0 z-50 glass-dark">
        <div className="container flex items-center justify-between py-5">
          <Link to="/" className="flex items-baseline gap-2 group">
            <span className="text-primary font-display text-2xl leading-none">●</span>
            <span className="font-display text-2xl font-medium tracking-tight">Food<span className="italic font-light">Mood</span></span>
            <span className="hidden md:inline-block font-mono text-[0.6rem] tracking-[0.2em] uppercase text-foreground/55 ml-1">— est. 2026</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#menu" className="hover:text-primary transition-colors">The Menu</a>
            <a href="#story" className="hover:text-primary transition-colors">Story</a>
            <a href="#chapters" className="hover:text-primary transition-colors">How it works</a>
            <a href="#kitchens" className="hover:text-primary transition-colors">Kitchens</a>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {isAuthenticated ? (
              <Button asChild variant="hero">
                <Link to="/dashboard">Dashboard <ArrowUpRight className="h-4 w-4" /></Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" className="hidden sm:inline-flex">
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button asChild variant="hero">
                  <Link to="/register">Order now <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative grain min-h-[88vh] overflow-hidden">
        <motion.div
          style={{ y: haloY, scale: haloScale }}
          className="halo absolute -top-40 left-1/2 -translate-x-1/2 w-[110vw] h-[80vh] pointer-events-none"
        />

        <div className="container relative pt-20 pb-32">
          {/* Issue header rail */}
          <div className="flex items-end justify-between hairline pt-6 pb-2 mb-12">
            <div className="eyebrow text-foreground/65">Issue No. 01 — Dinner Edition</div>
            <div className="eyebrow text-foreground/65 hidden sm:block">A magazine for hungry cities</div>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="eyebrow text-primary mb-6"
              >
                ◆ The art of dinner, delivered ◆
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
                transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
                className="display text-[15vw] sm:text-[9rem] lg:text-[11rem] leading-[0.85]"
              >
                Crafted
                <br />
                <span className="display-italic text-primary">to crave,</span>
                <br />
                served warm.
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-10 grid sm:grid-cols-12 gap-6 items-start max-w-3xl"
              >
                <p className="sm:col-span-7 text-lg text-foreground/75 leading-relaxed">
                  FoodMood is a curated dining service. We work with neighbourhood
                  kitchens and pass-marked chefs to bring their best dish to your
                  door — plated, sealed, on time, every time.
                </p>
                <div className="sm:col-span-5 sm:border-l sm:border-foreground/20 sm:pl-6 space-y-1">
                  <div className="eyebrow text-foreground/55">Tonight, in your city</div>
                  <p className="font-display text-2xl">
                    <span className="text-primary"><AnimatedCounter value={412} /></span> kitchens
                  </p>
                  <p className="font-display text-2xl">
                    <span className="text-primary"><AnimatedCounter value={28} /></span> min average
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mt-12 flex flex-wrap items-center gap-4"
              >
                <Button asChild variant="hero" size="xl">
                  <Link to="/register">
                    Open the menu
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="hero-outline" size="xl">
                  <Link to="/login">I'm a returning guest</Link>
                </Button>
                <span className="font-mono text-xs text-foreground/55 ml-2 hidden md:inline">
                  ↳ no card needed to browse
                </span>
              </motion.div>
            </div>

            {/* Hero "plate" — gradient mesh disk */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
              className="lg:col-span-4 relative flex justify-center lg:justify-end"
            >
              <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px]">
                {/* Steam */}
                <div className="absolute left-1/2 -top-8 -translate-x-1/2 flex gap-2">
                  <span className="block w-1 h-12 bg-foreground/15 rounded-full steam" style={{ animationDelay: '0s' }} />
                  <span className="block w-1 h-12 bg-foreground/15 rounded-full steam" style={{ animationDelay: '0.8s' }} />
                  <span className="block w-1 h-12 bg-foreground/15 rounded-full steam" style={{ animationDelay: '1.4s' }} />
                </div>

                <div className="absolute inset-0 rounded-full drift" style={{
                  background: 'conic-gradient(from 30deg, hsl(var(--primary)) 0%, hsl(var(--gold)) 30%, hsl(var(--accent)) 60%, hsl(var(--primary)) 100%)',
                  filter: 'blur(30px)',
                  opacity: 0.55,
                }} />
                <div className="absolute inset-6 rounded-full bg-card border border-foreground/20 shadow-[inset_0_2px_30px_hsl(var(--foreground)/0.1)] flex items-center justify-center">
                  <div className="text-[8rem] drop-shadow-md">🍝</div>
                </div>
                <div className="absolute inset-6 rounded-full border-2 border-dashed border-foreground/15 animate-spin-slow" />

                {/* Floating chips */}
                <div className="absolute -left-2 top-12 chip bg-background shadow-md">
                  <Flame className="h-3.5 w-3.5 text-primary" />
                  <span>Hot · 28 min</span>
                </div>
                <div className="absolute -right-2 bottom-16 chip bg-background shadow-md">
                  <Leaf className="h-3.5 w-3.5 text-accent" />
                  <span>Fresh tonight</span>
                </div>
                <div className="absolute left-4 -bottom-2 chip bg-background shadow-md">
                  <Sparkles className="h-3.5 w-3.5 text-gold" />
                  <span>Chef's pick</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== MARQUEE STRIP ===== */}
      <section className="border-y border-foreground/20 bg-foreground text-background overflow-hidden py-5 select-none">
        <div className="flex marquee-track whitespace-nowrap">
          {[...cuisines, ...cuisines].map((c, i) => (
            <span key={i} className="font-display text-3xl sm:text-4xl px-8 inline-flex items-center gap-8">
              {c}
              <span className="text-primary text-xl">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ===== THE MENU ===== */}
      <section id="menu" className="relative py-28 grain">
        <div className="container">
          {/* Section header */}
          <div className="hairline-thick pt-4 mb-12 grid sm:grid-cols-12 gap-6 items-end">
            <div className="sm:col-span-3">
              <div className="eyebrow text-foreground/55 mb-2">§ Chapter Two</div>
              <h2 className="display text-5xl sm:text-6xl">The Menu</h2>
            </div>
            <div className="sm:col-span-6 sm:col-start-6 text-foreground/70 max-w-xl">
              <p className="text-lg leading-relaxed">
                A rotating selection of dishes from kitchens we trust. Every plate
                photographed, plated, and priced by the chef — never by an
                <span className="underline-mark font-display italic"> algorithm</span>.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {dishes.map((d, i) => (
              <motion.article
                key={d.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className="group cursor-pointer"
              >
                <div className={`relative aspect-[4/5] rounded-md overflow-hidden bg-gradient-to-br ${d.tone} mb-5 lift`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--background)/0.8),transparent_60%)]" />
                  <div className="absolute inset-0 flex items-center justify-center text-[8rem] transition-transform duration-700 group-hover:scale-110">
                    {d.glyph}
                  </div>
                  <div className="absolute top-4 left-4 num text-5xl leading-none">{d.num}</div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end font-mono text-[0.65rem] uppercase tracking-[0.18em]">
                    <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {d.minutes} min</span>
                    <span className="bg-background/85 text-foreground px-2 py-0.5 rounded-full">{d.price}</span>
                  </div>
                </div>

                <div>
                  <div className="eyebrow text-foreground/55 mb-2">{d.house}</div>
                  <h3 className="font-display text-2xl mb-1 leading-tight group-hover:text-primary transition-colors">
                    {d.name}
                  </h3>
                  <p className="text-sm text-foreground/65 italic">{d.note}</p>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button asChild variant="hero-outline" size="lg">
              <Link to="/register">
                Browse the full menu <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== PRESS BAR ===== */}
      <section className="border-y border-foreground/15 py-10">
        <div className="container">
          <div className="eyebrow text-foreground/55 text-center mb-6">As reviewed in</div>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 font-display text-base sm:text-lg italic text-foreground/65">
            {press.map((p, i) => (
              <span key={p} className="flex items-center gap-10">
                {p}
                {i < press.length - 1 && <span className="text-primary not-italic">·</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS (CHAPTERS) ===== */}
      <section id="chapters" className="relative py-28 paper grain">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
              <div className="eyebrow text-foreground/55 mb-2">§ Chapter Three</div>
              <h2 className="display text-5xl sm:text-6xl mb-6">
                A short play in <span className="display-italic text-primary">three acts.</span>
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                We removed the friction without removing the warmth.
                Here is what happens between a craving and a clean plate.
              </p>
              <div className="dotted-rule mt-8" />
            </div>

            <div className="lg:col-span-8 space-y-2">
              {chapters.map((c, i) => (
                <motion.div
                  key={c.n}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="grid sm:grid-cols-12 gap-6 py-10 border-t border-foreground/20 first:border-t-0"
                >
                  <div className="sm:col-span-2">
                    <div className="num text-7xl leading-none">{c.n}</div>
                  </div>
                  <div className="sm:col-span-10">
                    <h3 className="font-display text-3xl sm:text-4xl mb-3">{c.title}</h3>
                    <p className="text-foreground/70 text-lg leading-relaxed max-w-2xl">{c.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== STORY / MANIFESTO ===== */}
      <section id="story" className="relative py-28 bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 grain opacity-50" />
        <div className="container relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="eyebrow text-background/55 mb-6">§ Editor's Letter</div>
              <p className="display text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
                <span className="display-italic text-primary">We started this</span>{' '}
                because the best meal of your week shouldn't arrive cold,
                in a soggy bag, from a kitchen that never wanted to ship.
              </p>
              <p className="display-italic text-2xl mt-10 text-background/70">
                — The FoodMood Kitchen
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-background/20 p-8 rounded-md">
                <div className="eyebrow text-background/55 mb-6">By the numbers</div>
                <div className="space-y-6">
                  {[
                    { value: 412, suffix: '', label: 'Curated kitchens' },
                    { value: 28, suffix: 'm', label: 'Median time, door to door' },
                    { value: 96, suffix: '%', label: 'Arrived warmer than expected' },
                    { value: 4.9, suffix: '/5', label: 'Guest rating, last 90 days' },
                  ].map((s) => (
                    <div key={s.label} className="flex items-baseline justify-between border-b border-background/15 pb-4 last:border-0">
                      <div className="font-display text-5xl text-primary">
                        <AnimatedCounter value={s.value} />{s.suffix}
                      </div>
                      <div className="text-background/65 text-sm text-right max-w-[60%]">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== KITCHENS / CITIES ===== */}
      <section id="kitchens" className="py-28 grain">
        <div className="container">
          <div className="hairline-thick pt-4 mb-12 grid sm:grid-cols-12 gap-6 items-end">
            <div className="sm:col-span-4">
              <div className="eyebrow text-foreground/55 mb-2">§ Chapter Four</div>
              <h2 className="display text-5xl sm:text-6xl">Where we cook</h2>
            </div>
            <div className="sm:col-span-7 sm:col-start-6 text-foreground/70">
              <p className="text-lg leading-relaxed">
                Six cities, one obsession. Every kitchen pass-marked by our food
                team before the first order rings through.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/15 border border-foreground/15 rounded-md overflow-hidden">
            {cities.map((city, i) => (
              <motion.div
                key={city}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-card p-8 group hover:bg-background transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-6">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="num text-3xl">0{i + 1}</span>
                </div>
                <h3 className="font-display text-3xl mb-2">{city}</h3>
                <p className="text-sm text-foreground/60">
                  <AnimatedCounter value={[78, 64, 92, 41, 53, 38][i]} /> kitchens · live now
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowUpRight className="h-4 w-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA / RESERVATION ===== */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/10" />
        <div className="container relative">
          <div className="border border-foreground/20 rounded-lg p-10 sm:p-16 bg-card relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-[400px] h-[400px] rounded-full halo opacity-40 drift-rev" />
            <div className="relative">
              <div className="eyebrow text-primary mb-4">↳ A table is ready</div>
              <h2 className="display text-5xl sm:text-7xl leading-[0.95] max-w-3xl">
                Tonight, eat
                <br />
                <span className="display-italic text-primary">something
                  <span className="ornament"> ✦ </span>
                  remarkable.</span>
              </h2>
              <p className="text-foreground/70 text-lg mt-8 max-w-xl leading-relaxed">
                Make an account in under a minute. Save your kitchen list,
                track every plate, and unlock your first delivery on us.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild variant="hero" size="xl">
                  <Link to="/register">
                    Create your account
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="hero-outline" size="xl">
                  <Link to="/login">Sign in</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-foreground/15 pt-16 pb-8">
        <div className="container">
          <div className="grid md:grid-cols-12 gap-10 mb-12">
            <div className="md:col-span-5">
              <Link to="/" className="flex items-baseline gap-2 mb-4">
                <span className="text-primary font-display text-2xl leading-none">●</span>
                <span className="font-display text-2xl font-medium">Food<span className="italic font-light">Mood</span></span>
              </Link>
              <p className="display-italic text-2xl text-foreground/70 max-w-md leading-snug">
                A magazine, a kitchen,
                <br />
                and a courier on a bicycle.
              </p>
              <div className="dotted-rule mt-8 max-w-xs" />
            </div>

            <div className="md:col-span-2">
              <div className="eyebrow text-foreground/55 mb-4">The Menu</div>
              <ul className="space-y-2 text-foreground/75">
                <li><a href="#menu" className="hover:text-primary">Tonight</a></li>
                <li><a href="#kitchens" className="hover:text-primary">Kitchens</a></li>
                <li><a href="#story" className="hover:text-primary">Editor's letter</a></li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <div className="eyebrow text-foreground/55 mb-4">Guests</div>
              <ul className="space-y-2 text-foreground/75">
                <li><Link to="/register" className="hover:text-primary">Create account</Link></li>
                <li><Link to="/login" className="hover:text-primary">Sign in</Link></li>
                <li><Link to="/dashboard" className="hover:text-primary">Your kitchen</Link></li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <div className="eyebrow text-foreground/55 mb-4">Service</div>
              <ul className="space-y-2 text-foreground/75">
                <li>+91 22 0000 0000</li>
                <li>hello@foodmood.in</li>
                <li className="text-xs text-foreground/55 pt-2">Daily · 11:00 — 23:30 local</li>
              </ul>
            </div>
          </div>

          <div className="hairline pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono uppercase tracking-[0.18em] text-foreground/55">
            <div>© {new Date().getFullYear()} FoodMood Kitchens Pvt. Ltd.</div>
            <div className="flex items-center gap-6">
              <span>Vol. I</span>
              <span>·</span>
              <span>Printed in browser</span>
              <span>·</span>
              <span>{theme === 'dark' ? 'Night service' : 'Day service'}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
