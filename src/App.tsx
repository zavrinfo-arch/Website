import './App.css';
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, Users, TrendingUp, Award, Bell, Smartphone,
  ChevronDown, Zap, Heart, Star, ArrowRight, Sparkles,
  Menu, X, Trophy, BarChart3, Shield, Palette
} from 'lucide-react';

const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

// Remote logo from GitHub
const LOGO_URL = 'https://raw.githubusercontent.com/zavrinfo-arch/zavr-privacy-policy/main/zavr_logo.png';

// ─── Splash Screen ────────────────────────────────────────────────────────────
const SplashScreen = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 1400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050a14] overflow-hidden"
    >
      {/* Reduced particle count for faster render */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${10 + i * 8}%`,
              top: `${15 + (i * 9) % 70}%`,
              width: 4 + (i % 3) * 2,
              height: 4 + (i % 3) * 2,
              background: i % 3 === 0 ? '#FF6B6B' : i % 3 === 1 ? '#4ECDC4' : '#FFD93D',
              opacity: 0.2,
            }}
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 1.5 + (i % 3) * 0.5, repeat: Infinity, delay: i * 0.08 }}
          />
        ))}
      </div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative z-10"
      >
        <div
          className="w-28 h-28 rounded-3xl p-[3px] shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #FFD93D)' }}
        >
          <div className="w-full h-full rounded-3xl bg-[#080e1d] flex items-center justify-center p-3">
            <img src={LOGO_URL} alt="Zavr" className="w-full h-full object-contain" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        className="relative z-10 mt-6 text-center"
      >
        <p
          className="text-2xl font-light text-white tracking-wide"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Zavr
        </p>
        <p className="text-white/40 text-xs tracking-[0.2em] uppercase mt-1.5">Save Smarter, Together</p>
      </motion.div>

      {/* Loading bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        className="absolute bottom-10 h-0.5 w-28 rounded-full origin-left"
        style={{ background: 'linear-gradient(90deg, #FF6B6B, #4ECDC4, #FFD93D)' }}
      />
    </motion.div>
  );
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = ['Features', 'About', 'Ideas'];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-[#050a14]/90 backdrop-blur-xl border-b border-white/5 shadow-xl shadow-black/30' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded-xl p-[2px] shadow-lg"
            style={{ background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)' }}
          >
            <div className="w-full h-full rounded-xl bg-[#080e1d] flex items-center justify-center p-1.5">
              <img src={LOGO_URL} alt="Zavr" className="w-full h-full object-contain" />
            </div>
          </div>
          <span className="hidden sm:block text-lg font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Zavr
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors relative group"
            >
              {link}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#features"
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg,#FF6B6B,#4ECDC4)', boxShadow: '0 4px 24px rgba(255,107,107,0.25)' }}
          >
            Get Started
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/5">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#080e1d]/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {links.map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
                >
                  {link}
                </a>
              ))}
              <a
                href="#features"
                onClick={() => setOpen(false)}
                className="mt-2 px-4 py-2.5 rounded-xl text-center text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg,#FF6B6B,#4ECDC4)' }}
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050a14] pt-16">
      <div className="absolute inset-0 bg-dots" />

      {/* Gradient blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[100px] opacity-20" style={{ background: '#FF6B6B' }} />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-[100px] opacity-20" style={{ background: '#4ECDC4' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[80px] opacity-10" style={{ background: '#FFD93D' }} />

      <div ref={containerRef} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFD93D]" />
            Introducing Zavr 2.1 — New Group Goals
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-8xl font-light leading-[1.05] tracking-tight text-white mb-8"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Achieve Your
            <br />
            <span
              className="font-normal animate-gradient"
              style={{
                backgroundImage: 'linear-gradient(135deg,#FF6B6B,#4ECDC4,#FFD93D,#FF6B6B)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Savings Goals
            </span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/55 max-w-xl mx-auto leading-relaxed mb-12"
          >
            Zavr combines solo goals, group savings, streaks, and weekly challenges into a beautifully crafted experience.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#features"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-white font-semibold text-base transition-all hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background: 'linear-gradient(135deg,#FF6B6B,#4ECDC4)',
                boxShadow: '0 8px 32px rgba(255,107,107,0.3)',
              }}
            >
              Explore the App
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-white/70 hover:text-white font-medium text-base border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
            >
              Explore Features
            </a>
          </motion.div>

          {/* App preview card */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 relative"
          >
            {/* Glow behind card */}
            <div
              className="absolute inset-x-1/4 top-0 h-1/2 blur-3xl opacity-30"
              style={{ background: 'linear-gradient(135deg,#FF6B6B,#4ECDC4)' }}
            />
            <div className="relative max-w-4xl mx-auto">
              <div className="rounded-3xl p-px" style={{ background: 'linear-gradient(135deg,rgba(255,107,107,0.4),rgba(78,205,196,0.4),rgba(255,217,61,0.2))' }}>
                <div className="rounded-3xl bg-[#0a1220] p-8">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { icon: Target, label: 'Goals Active', value: '12', color: '#FF6B6B' },
                      { icon: TrendingUp, label: 'Total Saved', value: '$8,240', color: '#4ECDC4' },
                      { icon: Award, label: 'Day Streak', value: '34', color: '#FFD93D' },
                    ].map((s, i) => (
                      <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                        className="glass-dark rounded-2xl p-4 text-left"
                      >
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: s.color + '20' }}>
                          <s.icon className="w-4 h-4" style={{ color: s.color }} />
                        </div>
                        <p className="text-xl font-bold text-white mb-0.5" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{s.value}</p>
                        <p className="text-xs text-white/40">{s.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-3">
                    {[
                      { name: 'Vacation Fund', progress: 72, color: '#FF6B6B' },
                      { name: 'Emergency Fund', progress: 45, color: '#4ECDC4' },
                      { name: 'New Laptop', progress: 88, color: '#FFD93D' },
                    ].map((g, i) => (
                      <motion.div
                        key={g.name}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <p className="text-xs text-white/50 w-28 shrink-0">{g.name}</p>
                        <div className="flex-1 h-1.5 rounded-full bg-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${g.progress}%` }}
                            transition={{ duration: 1.2, delay: 1 + i * 0.15, ease: 'easeOut' }}
                            className="h-full rounded-full"
                            style={{ background: g.color }}
                          />
                        </div>
                        <p className="text-xs text-white/40 w-8 text-right">{g.progress}%</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
};

// ─── Features ─────────────────────────────────────────────────────────────────
const featuresList = [
  { icon: Target, title: 'Solo Goals', desc: 'Set personal savings targets with deadlines, categories, and live progress tracking. Your goals, your pace.', color: '#FF6B6B' },
  { icon: Users, title: 'Group Goals', desc: 'Save with friends or family. Auto-generated group IDs, equal share distribution, and shared milestones.', color: '#4ECDC4' },
  { icon: Trophy, title: 'Saving Streaks', desc: 'Build daily habits with streak tracking. Unlock badges at 3, 7, 14, 30, 60, and 100-day milestones.', color: '#FFD93D' },
  { icon: BarChart3, title: 'Visual Analytics', desc: 'Recharts-powered visualizations. Filter transactions and see exactly where your money is going.', color: '#FF6B6B' },
  { icon: Bell, title: 'Smart Notifications', desc: 'Real-time alerts for streaks, goal completions, and group activity. Never miss a milestone.', color: '#4ECDC4' },
  { icon: Palette, title: 'Claymorphism UI', desc: 'A tactile, soft-shadowed aesthetic with multi-layered depth. Dark mode by default with glassmorphism effects.', color: '#FFD93D' },
];

const Features = () => (
  <section id="features" className="py-24 md:py-32 bg-[#060c18] relative overflow-hidden">
    <div className="absolute inset-0 bg-dots opacity-50" />
    <div className="absolute top-0 right-0 w-1/3 h-1/2 blur-[120px] opacity-10 rounded-full" style={{ background: '#FF6B6B' }} />
    <div className="absolute bottom-0 left-0 w-1/3 h-1/2 blur-[120px] opacity-10 rounded-full" style={{ background: '#4ECDC4' }} />

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6B6B]/10 border border-[#FF6B6B]/20 text-[#FF6B6B] text-xs font-semibold tracking-wide uppercase mb-5">
          <Zap className="w-3.5 h-3.5" /> Features
        </span>
        <h2 className="text-4xl md:text-6xl font-light text-white mb-5" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Everything You Need to{' '}
          <span className="text-gradient-coral italic">Save Successfully</span>
        </h2>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Powerful tools wrapped in a beautiful, motivating design.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {featuresList.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass-dark rounded-2xl p-7 transition-all duration-300 cursor-default group"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300" style={{ background: f.color + '18' }}>
              <f.icon className="w-6 h-6" style={{ color: f.color }} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── About ────────────────────────────────────────────────────────────────────
const About = () => {
  const stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '$2M+', label: 'Saved Monthly' },
    { value: '98%', label: 'Goal Success' },
    { value: '4.9★', label: 'Store Rating' },
  ];

  const stack = ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'Framer Motion', 'Recharts', 'Supabase'];

  return (
    <section id="about" className="py-24 md:py-32 bg-[#050a14] relative overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#FF6B6B]/3 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4ECDC4]/10 border border-[#4ECDC4]/20 text-[#4ECDC4] text-xs font-semibold tracking-wide uppercase mb-5">
              <Heart className="w-3.5 h-3.5" /> About Zavr
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Built with Passion for{' '}
              <span className="text-gradient-teal italic">Smarter Saving</span>
            </h2>
            <div className="space-y-4 text-white/55 leading-relaxed text-sm">
              <p>
                Zavr is a fully-featured savings and goal-tracking app crafted with React 18, TypeScript, and a distinctive <strong className="text-white/80">claymorphism</strong> design philosophy — tactile, soft-shadowed aesthetics with multi-layered depth.
              </p>
              <p>
                The color palette of Coral, Teal, and Gold set against a deep dark base creates a premium feel that motivates daily use. Every interaction is animated with Framer Motion for a fluid, delightful experience.
              </p>
              <p>
                Whether you're tracking solo savings, collaborating on group goals, or competing in weekly challenges, Zavr makes financial discipline feel rewarding.
              </p>
            </div>

            {/* Tech stack */}
            <div className="mt-8">
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {stack.map(s => (
                  <span key={s} className="px-3 py-1 rounded-lg bg-white/5 border border-white/8 text-white/60 text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-dark rounded-2xl p-6 text-center"
                >
                  <p
                    className="text-3xl font-bold text-transparent bg-clip-text mb-1"
                    style={{ backgroundImage: 'linear-gradient(135deg,#FF6B6B,#4ECDC4,#FFD93D)' }}
                  >
                    {s.value}
                  </p>
                  <p className="text-xs text-white/40">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="glass-dark rounded-2xl p-6">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#FFD93D] text-[#FFD93D]" />
                ))}
              </div>
              <p className="text-sm text-white/70 leading-relaxed italic mb-4">
                "Zavr changed how I think about saving. The streak system keeps me motivated every single day, and saving with my partner on group goals made it actually fun!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full" style={{ background: 'linear-gradient(135deg,#FF6B6B,#4ECDC4)' }} />
                <div>
                  <p className="text-xs font-semibold text-white">Sarah M.</p>
                  <p className="text-xs text-white/30">Verified User</p>
                </div>
              </div>
            </div>

            {/* Security badge */}
            <div className="glass-dark rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#4ECDC4]/15 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-[#4ECDC4]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Secure by Design</p>
                <p className="text-xs text-white/40">Supabase RLS • Row-level security • No plain-text passwords</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── Ideas ────────────────────────────────────────────────────────────────────
const ideasList = [
  { title: 'Emergency Fund', desc: 'Build a 6-month safety net with automatic weekly contribution reminders.', gradient: 'from-[#FF6B6B] to-[#FF9A8E]', icon: Shield },
  { title: 'Dream Vacation', desc: 'Plan your perfect getaway with travel-themed progress milestones.', gradient: 'from-[#4ECDC4] to-[#7EDDD6]', icon: Sparkles },
  { title: 'Family Fund', desc: 'Save together for holidays, home improvements, or education with shared goals.', gradient: 'from-[#FFD93D] to-[#FFE870]', icon: Users },
  { title: 'Tech Upgrade', desc: 'Save for that new phone or laptop while watching progress in real time.', gradient: 'from-[#FF6B6B] to-[#4ECDC4]', icon: Smartphone },
  { title: 'Debt Freedom', desc: 'Structure your payoff journey with savings goals and streak motivation.', gradient: 'from-[#4ECDC4] to-[#FFD93D]', icon: TrendingUp },
  { title: 'Wedding Fund', desc: 'Plan the big day with family contributions and detailed tracking.', gradient: 'from-[#FFD93D] to-[#FF6B6B]', icon: Heart },
];

const Ideas = () => (
  <section id="ideas" className="py-24 md:py-32 bg-[#060c18] relative overflow-hidden">
    <div className="absolute inset-0 bg-dots opacity-40" />

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD93D]/10 border border-[#FFD93D]/20 text-[#FFD93D] text-xs font-semibold tracking-wide uppercase mb-5">
          <Sparkles className="w-3.5 h-3.5" /> Goal Ideas
        </span>
        <h2 className="text-4xl md:text-6xl font-light text-white mb-5" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          What Can You{' '}
          <span className="text-gradient-gold italic">Save For?</span>
        </h2>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Get inspired by popular savings goals from our community.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ideasList.map((idea, i) => (
          <motion.div
            key={idea.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass-dark rounded-2xl p-6 cursor-pointer group hover:scale-[1.02] transition-all duration-300"
          >
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${idea.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
              <idea.icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">{idea.title}</h3>
            <p className="text-xs text-white/50 leading-relaxed">{idea.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <p className="text-white/40 text-sm mb-5">Have your own idea? Create unlimited custom goals with Zavr.</p>
        <a
          href="#about"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#FFD93D]/30 text-[#FFD93D] text-sm font-medium hover:bg-[#FFD93D]/10 transition-all"
        >
          Learn More <ArrowRight className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-[#030709] border-t border-white/5 py-14">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl p-[2px]" style={{ background: 'linear-gradient(135deg,#FF6B6B,#4ECDC4)' }}>
              <div className="w-full h-full rounded-xl bg-[#080e1d] flex items-center justify-center p-1.5">
                <img src={LOGO_URL} alt="Zavr" className="w-full h-full object-contain" />
              </div>
            </div>
            <span className="text-lg font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Zavr</span>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            Save smarter, together. Beautiful design meets powerful savings tools.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Product</h4>
          <ul className="space-y-2.5">
            {['Features', 'Changelog', 'Roadmap', 'Open Source'].map(l => (
              <li key={l}><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Company</h4>
          <ul className="space-y-2.5">
            {['About', 'Blog', 'Careers', 'Contact'].map(l => (
              <li key={l}><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">{l}</a></li>
            ))}
            <li>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'privacy' }))}
                className="text-sm text-white/50 hover:text-white transition-colors text-left"
              >
                Privacy Policy
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/25">© 2024 Zavr. All rights reserved.</p>
        <p className="text-xs text-white/25 flex items-center gap-1.5">
          Made with <Heart className="w-3 h-3 fill-[#FF6B6B] text-[#FF6B6B]" /> for savers everywhere
        </p>
      </div>
    </div>
  </footer>
);

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [page, setPage] = useState<'home' | 'privacy'>('home');

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setPage(detail);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('navigate', handler);
    return () => window.removeEventListener('navigate', handler);
  }, []);

  if (page === 'privacy') {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#050a14] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#4ECDC4]/30 border-t-[#4ECDC4] animate-spin" />
        </div>
      }>
        <PrivacyPolicy onBack={() => { setPage('home'); window.scrollTo({ top: 0 }); }} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[#050a14] text-white">
      <AnimatePresence>{showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}</AnimatePresence>

      {!showSplash && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <Navbar />
          <Hero />
          <Features />
          <About />
          <Ideas />
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
