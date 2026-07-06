import './App.css';
import { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, Users, TrendingUp, Award, Bell, Smartphone,
  ChevronDown, Zap, Heart, Star, ArrowRight, Sparkles,
  Menu, X, Trophy, BarChart3, Shield, Palette, Instagram, Linkedin, Mail
} from 'lucide-react';

const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

const LOGO_URL = '/image.png';

// GPU-friendly animation variants
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};
const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

// ─── Classic Splash Screen ─────────────────────────────────────────────────────
const SplashScreen = ({ onDone }: { onDone: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1100),
      setTimeout(() => setPhase(4), 1600),
      setTimeout(onDone, 2400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050a14] overflow-hidden"
    >
      {/* Ambient gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: phase >= 1 ? 0.15 : 0, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,107,107,0.3) 0%, rgba(78,205,196,0.15) 40%, transparent 70%)',
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0 }}
            animate={{
              opacity: phase >= 1 ? [0, 0.4, 0.2, 0] : 0,
              y: [-20, -60 - i * 8],
              scale: [0, 1, 0.8, 0],
            }}
            transition={{
              duration: 2.5,
              delay: 0.1 + i * 0.08,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            className="absolute rounded-full"
            style={{
              left: `${10 + i * 7}%`,
              bottom: '-10px',
              width: 3 + (i % 4),
              height: 3 + (i % 4),
              background: i % 3 === 0 ? '#FF6B6B' : i % 3 === 1 ? '#4ECDC4' : '#FFD93D',
            }}
          />
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{
            opacity: phase >= 1 ? 1 : 0,
            scale: phase >= 1 ? 1 : 0.6,
            y: phase >= 1 ? 0 : 20,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Outer glow ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: phase >= 2 ? 0.6 : 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="absolute inset-[-6px] rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,107,107,0.4), rgba(78,205,196,0.4), rgba(255,217,61,0.3))',
              filter: 'blur(12px)',
            }}
          />
          {/* Border gradient */}
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-[2px] relative"
            style={{ background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #FFD93D)' }}
          >
            <div className="w-full h-full rounded-2xl bg-[#080e1d] flex items-center justify-center p-2.5 sm:p-3">
              <img src={LOGO_URL} alt="Zavr" className="w-full h-full object-contain" loading="eager" />
            </div>
          </div>
        </motion.div>

        {/* Brand name with letter-by-letter reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 1 : 0 }}
          transition={{ duration: 0.1 }}
          className="mt-6 overflow-hidden"
        >
          <div className="flex items-center justify-center">
            {'Zavr'.split('').map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, rotateX: -90 }}
                animate={{
                  opacity: phase >= 2 ? 1 : 0,
                  y: phase >= 2 ? 0 : 30,
                  rotateX: phase >= 2 ? 0 : -90,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.6 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-3xl sm:text-4xl font-light text-white tracking-[0.12em] inline-block"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Tagline with fade-up */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 15 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mt-3 text-white/35 text-[10px] sm:text-xs tracking-[0.35em] uppercase font-light"
        >
          Your Smart Companion for Saving and Financial Freedom.
        </motion.p>

        {/* Animated line separator */}
        <motion.div
          className="mt-8 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 3 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase >= 3 ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-12 h-px origin-right"
            style={{ background: 'linear-gradient(to left, #FF6B6B, transparent)' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: phase >= 3 ? 1 : 0, scale: phase >= 3 ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #FFD93D)' }}
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase >= 3 ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-12 h-px origin-left"
            style={{ background: 'linear-gradient(to right, #4ECDC4, transparent)' }}
          />
        </motion.div>
      </div>

      {/* Bottom loading indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 4 ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: phase >= 4 ? 80 : 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-[2px] rounded-full"
          style={{ background: 'linear-gradient(90deg, #FF6B6B, #4ECDC4, #FFD93D)' }}
        />
      </motion.div>
    </motion.div>
  );
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;
    const fn = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = ['Features', 'About', 'Ideas'];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 will-change-[background-color] ${
        scrolled ? 'bg-[#050a14]/95 border-b border-white/5 shadow-lg shadow-black/20' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 md:h-16">
        <a href="#" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-lg p-[2px]"
            style={{ background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)' }}
          >
            <div className="w-full h-full rounded-lg bg-[#080e1d] flex items-center justify-center p-1">
              <img src={LOGO_URL} alt="Zavr" className="w-full h-full object-contain" />
            </div>
          </div>
          <span className="hidden sm:block text-base font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Zavr
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-150 relative group"
            >
              {link}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#features"
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-transform duration-150 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg,#FF6B6B,#4ECDC4)', boxShadow: '0 4px 16px rgba(255,107,107,0.2)' }}
          >
            Get Started
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white/70 hover:text-white p-2 rounded-lg active:bg-white/5"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#080e1d]/95 border-t border-white/5 overflow-hidden"
            style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {links.map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg text-white/70 hover:text-white active:bg-white/5 text-sm font-medium"
                >
                  {link}
                </a>
              ))}
              <a
                href="#features"
                onClick={() => setOpen(false)}
                className="mt-1 px-4 py-2.5 rounded-lg text-center text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg,#FF6B6B,#4ECDC4)' }}
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050a14] pt-14">
    {/* Static decorative blobs — no blur, using opacity + gradients instead */}
    <div className="absolute top-1/4 -left-16 w-64 h-64 rounded-full opacity-[0.07] bg-[#FF6B6B] pointer-events-none" aria-hidden="true" />
    <div className="absolute bottom-1/4 -right-16 w-64 h-64 rounded-full opacity-[0.07] bg-[#4ECDC4] pointer-events-none" aria-hidden="true" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-[0.04] bg-[#FFD93D] pointer-events-none" aria-hidden="true" />

    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <div className="text-center">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFD93D]" />
          Introducing Zavr 2.1 — New Group Goals
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="text-4xl sm:text-5xl md:text-7xl font-light leading-[1.08] tracking-tight text-white mb-6"
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

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-base md:text-lg text-white/50 max-w-lg mx-auto leading-relaxed mb-10"
        >
          Zavr combines solo goals, group savings, streaks, and weekly challenges into a beautifully crafted experience.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="#features"
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-2xl text-white font-semibold text-sm transition-transform duration-150 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg,#FF6B6B,#4ECDC4)',
              boxShadow: '0 6px 24px rgba(255,107,107,0.25)',
            }}
          >
            Explore the App
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl text-white/60 hover:text-white font-medium text-sm border border-white/10 hover:border-white/20 hover:bg-white/5 transition-colors duration-150"
          >
            Explore Features
          </a>
        </motion.div>

        {/* App preview card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 md:mt-20 relative"
        >
          <div className="relative max-w-3xl mx-auto">
            <div className="rounded-2xl p-px" style={{ background: 'linear-gradient(135deg,rgba(255,107,107,0.3),rgba(78,205,196,0.3),rgba(255,217,61,0.15))' }}>
              <div className="rounded-2xl bg-[#0a1220] p-5 md:p-6">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { icon: Target, label: 'Goals Active', value: '12', color: '#FF6B6B' },
                    { icon: TrendingUp, label: 'Total Saved', value: '$8,240', color: '#4ECDC4' },
                    { icon: Award, label: 'Day Streak', value: '34', color: '#FFD93D' },
                  ].map((s) => (
                    <div key={s.label} className="glass-dark rounded-xl p-3 text-left">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: s.color + '18' }}>
                        <s.icon className="w-4 h-4" style={{ color: s.color }} />
                      </div>
                      <p className="text-lg font-bold text-white mb-0.5" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{s.value}</p>
                      <p className="text-[10px] text-white/40">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Progress bars — CSS transitions instead of framer-motion */}
                <div className="space-y-2.5">
                  {[
                    { name: 'Vacation Fund', progress: 72, color: '#FF6B6B' },
                    { name: 'Emergency Fund', progress: 45, color: '#4ECDC4' },
                    { name: 'New Laptop', progress: 88, color: '#FFD93D' },
                  ].map((g) => (
                    <div key={g.name} className="flex items-center gap-3">
                      <p className="text-[11px] text-white/50 w-24 shrink-0">{g.name}</p>
                      <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full animate-progress"
                          style={{ background: g.color, '--target-width': `${g.progress}%` } as React.CSSProperties}
                        />
                      </div>
                      <p className="text-[11px] text-white/40 w-7 text-right">{g.progress}%</p>
                    </div>
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
      {...fadeIn}
      transition={{ delay: 0.5, duration: 0.3 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30"
    >
      <span className="text-[10px] tracking-widest uppercase">Scroll</span>
      <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
    </motion.div>
  </section>
);

// ─── Features ─────────────────────────────────────────────────────────────────
const featuresList = [
  { icon: Target, title: 'Solo Goals', desc: 'Set personal savings targets with deadlines, categories, and live progress tracking. Your goals, your pace.', color: '#FF6B6B' },
  { icon: Users, title: 'Group Goals', desc: 'Save with friends or family. Auto-generated group IDs, equal share distribution, and shared milestones.', color: '#4ECDC4' },
  { icon: Trophy, title: 'Saving Streaks', desc: 'Build daily habits with streak tracking. Unlock badges at 3, 7, 14, 30, 60, and 100-day milestones.', color: '#FFD93D' },
  { icon: BarChart3, title: 'Visual Analytics', desc: 'Recharts-powered visualizations. Filter transactions and see exactly where your money is going.', color: '#FF6B6B' },
  { icon: Bell, title: 'Smart Notifications', desc: 'Real-time alerts for streaks, goal completions, and group activity. Never miss a milestone.', color: '#4ECDC4' },
  { icon: Palette, title: 'Claymorphism UI', desc: 'A tactile, soft-shadowed aesthetic with multi-layered depth. Dark mode by default with glassmorphism effects.', color: '#FFD93D' },
];

const FeatureCard = ({ f }: { f: typeof featuresList[number] }) => (
  <motion.div
    {...fadeUp}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.35 }}
    className="glass-dark rounded-2xl p-6 transition-colors duration-200 cursor-default group"
  >
    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-200" style={{ background: f.color + '18' }}>
      <f.icon className="w-5 h-5" style={{ color: f.color }} />
    </div>
    <h3 className="text-base font-semibold text-white mb-1.5">{f.title}</h3>
    <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
  </motion.div>
);

const Features = () => (
  <section id="features" className="py-16 md:py-24 bg-[#060c18] relative overflow-hidden content-visibility-auto">
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        {...fadeUp}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF6B6B]/10 border border-[#FF6B6B]/20 text-[#FF6B6B] text-xs font-semibold tracking-wide uppercase mb-4">
          <Zap className="w-3.5 h-3.5" /> Features
        </span>
        <h2 className="text-3xl md:text-5xl font-light text-white mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Everything You Need to{' '}
          <span className="text-gradient-coral italic">Save Successfully</span>
        </h2>
        <p className="text-white/45 text-base max-w-lg mx-auto">
          Powerful tools wrapped in a beautiful, motivating design.
        </p>
      </motion.div>

      <motion.div {...stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuresList.map((f) => (
          <FeatureCard key={f.title} f={f} />
        ))}
      </motion.div>
    </div>
  </section>
);

// ─── About ────────────────────────────────────────────────────────────────────
const About = () => {
  const stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '$2M+', label: 'Saved Monthly' },
    { value: '98%', label: 'Goal Success' },
    { value: '4.9\u2605', label: 'Store Rating' },
  ];

  const stack = ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'Framer Motion', 'Recharts', 'Supabase'];

  return (
    <section id="about" className="py-16 md:py-24 bg-[#050a14] relative overflow-hidden content-visibility-auto">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            {...fadeUp}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4ECDC4]/10 border border-[#4ECDC4]/20 text-[#4ECDC4] text-xs font-semibold tracking-wide uppercase mb-4">
              <Heart className="w-3.5 h-3.5" /> About Zavr
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-5 leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Built with Passion for{' '}
              <span className="text-gradient-teal italic">Smarter Saving</span>
            </h2>
            <div className="space-y-3 text-white/50 leading-relaxed text-sm">
              <p>
                Zavr is a fully-featured savings and goal-tracking app crafted with React 18, TypeScript, and a distinctive <strong className="text-white/75">claymorphism</strong> design philosophy.
              </p>
              <p>
                The color palette of Coral, Teal, and Gold set against a deep dark base creates a premium feel that motivates daily use. Every interaction is animated for a fluid, delightful experience.
              </p>
              <p>
                Whether you're tracking solo savings, collaborating on group goals, or competing in weekly challenges, Zavr makes financial discipline feel rewarding.
              </p>
            </div>

            <div className="mt-6">
              <p className="text-[10px] text-white/25 uppercase tracking-widest mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {stack.map(s => (
                  <span key={s} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/8 text-white/55 text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Connect With Us */}
            <div className="mt-6 pt-5 border-t border-white/8">
              <p className="text-[10px] text-white/25 uppercase tracking-widest mb-3">Connect With Us</p>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.instagram.com/zavr.info?igsh=cWk4M2JqNTFicW9q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#E4405F] hover:border-[#E4405F]/30 hover:bg-[#E4405F]/10 transition-all duration-200"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/company/zavr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 hover:bg-[#0A66C2]/10 transition-all duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="mailto:contact@zavr.info"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#4ECDC4] hover:border-[#4ECDC4]/30 hover:bg-[#4ECDC4]/10 transition-all duration-200"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="space-y-3"
          >
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="glass-dark rounded-xl p-4 text-center">
                  <p
                    className="text-2xl font-bold text-transparent bg-clip-text mb-0.5"
                    style={{ backgroundImage: 'linear-gradient(135deg,#FF6B6B,#4ECDC4,#FFD93D)' }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[10px] text-white/35">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="glass-dark rounded-xl p-5">
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#FFD93D] text-[#FFD93D]" />
                ))}
              </div>
              <p className="text-sm text-white/65 leading-relaxed italic mb-3">
                "Zavr changed how I think about saving. The streak system keeps me motivated every single day, and saving with my partner on group goals made it actually fun!"
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full" style={{ background: 'linear-gradient(135deg,#FF6B6B,#4ECDC4)' }} />
                <div>
                  <p className="text-xs font-semibold text-white">Sarah M.</p>
                  <p className="text-[10px] text-white/25">Verified User</p>
                </div>
              </div>
            </div>

            <div className="glass-dark rounded-xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#4ECDC4]/12 flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-[#4ECDC4]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Secure by Design</p>
                <p className="text-[10px] text-white/35">Supabase RLS &bull; Row-level security &bull; No plain-text passwords</p>
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

const IdeaCard = ({ idea }: { idea: typeof ideasList[number] }) => (
  <motion.div
    {...fadeUp}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.35 }}
    className="glass-dark rounded-2xl p-5 cursor-pointer group hover:scale-[1.01] transition-transform duration-200"
  >
    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${idea.gradient} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200`}>
      <idea.icon className="w-4.5 h-4.5 text-white" />
    </div>
    <h3 className="text-sm font-semibold text-white mb-1.5">{idea.title}</h3>
    <p className="text-[11px] text-white/45 leading-relaxed">{idea.desc}</p>
  </motion.div>
);

const Ideas = () => (
  <section id="ideas" className="py-16 md:py-24 bg-[#060c18] relative overflow-hidden content-visibility-auto">
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        {...fadeUp}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFD93D]/10 border border-[#FFD93D]/20 text-[#FFD93D] text-xs font-semibold tracking-wide uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" /> Goal Ideas
        </span>
        <h2 className="text-3xl md:text-5xl font-light text-white mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          What Can You{' '}
          <span className="text-gradient-gold italic">Save For?</span>
        </h2>
        <p className="text-white/45 text-base max-w-lg mx-auto">
          Get inspired by popular savings goals from our community.
        </p>
      </motion.div>

      <motion.div {...stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ideasList.map((idea) => (
          <IdeaCard key={idea.title} idea={idea} />
        ))}
      </motion.div>

      <motion.div
        {...fadeUp}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
        className="mt-10 text-center"
      >
        <p className="text-white/35 text-sm mb-4">Have your own idea? Create unlimited custom goals with Zavr.</p>
        <a
          href="#about"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#FFD93D]/25 text-[#FFD93D] text-sm font-medium hover:bg-[#FFD93D]/8 transition-colors duration-150"
        >
          Learn More <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-[#030709] border-t border-white/5 py-12 content-visibility-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg p-[2px]" style={{ background: 'linear-gradient(135deg,#FF6B6B,#4ECDC4)' }}>
              <div className="w-full h-full rounded-lg bg-[#080e1d] flex items-center justify-center p-1">
                <img src={LOGO_URL} alt="Zavr" className="w-full h-full object-contain" />
              </div>
            </div>
            <span className="text-base font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Zavr</span>
          </div>
          <p className="text-white/35 text-sm leading-relaxed max-w-xs mb-4">
            Your Smart Companion for Saving and Financial Freedom.
          </p>
          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/zavr.info?igsh=cWk4M2JqNTFicW9q"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#E4405F] hover:border-[#E4405F]/30 hover:bg-[#E4405F]/10 transition-all duration-200"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/company/zavr/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 hover:bg-[#0A66C2]/10 transition-all duration-200"
              aria-label="Connect on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:contact@zavr.info"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#4ECDC4] hover:border-[#4ECDC4]/30 hover:bg-[#4ECDC4]/10 transition-all duration-200"
              aria-label="Email us"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-3">Product</h4>
          <ul className="space-y-2">
            {['Features', 'Changelog', 'Roadmap', 'Open Source'].map(l => (
              <li key={l}><a href="#" className="text-sm text-white/45 hover:text-white transition-colors duration-150">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-3">Company</h4>
          <ul className="space-y-2">
            {['About', 'Blog', 'Careers', 'Contact'].map(l => (
              <li key={l}><a href="#" className="text-sm text-white/45 hover:text-white transition-colors duration-150">{l}</a></li>
            ))}
            <li>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'privacy' }))}
                className="text-sm text-white/45 hover:text-white transition-colors duration-150 text-left"
              >
                Privacy Policy
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[10px] text-white/20">&copy; 2026 ZAVR. All Rights Reserved.</p>
        <p className="text-[10px] text-white/20 flex items-center gap-1">
          Made with <Heart className="w-2.5 h-2.5 fill-[#FF6B6B] text-[#FF6B6B]" /> for savers everywhere
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
    if (typeof window === 'undefined') return;

    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === 'privacy') {
        setPage('privacy');
      } else {
        setPage('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('navigate', handler);
    return () => window.removeEventListener('navigate', handler);
  }, []);

  const dismissSplash = useCallback(() => setShowSplash(false), []);

  if (page === 'privacy') {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#050a14] flex items-center justify-center">
          <div className="w-7 h-7 rounded-full border-2 border-[#4ECDC4]/30 border-t-[#4ECDC4] animate-spin" />
        </div>
      }>
        <PrivacyPolicy onBack={() => { setPage('home'); window.scrollTo({ top: 0 }); }} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[#050a14] text-white">
      <AnimatePresence>{showSplash && <SplashScreen onDone={dismissSplash} />}</AnimatePresence>

      {!showSplash && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
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
