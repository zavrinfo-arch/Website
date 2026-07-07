import './App.css';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Instagram, Linkedin, Sparkles, Twitter, type LucideIcon } from 'lucide-react';
import { useEffect, useState, type PointerEvent as ReactPointerEvent } from 'react';

const LOGO_URL = 'https://raw.githubusercontent.com/zavrinfo-arch/zavr-privacy-policy/main/zavr_logo.png';
const INTRO_TEXT = 'Welcome to ZAVR';
const SUBTITLE = 'The next generation intelligent savings platform designed to help you achieve your goals with beautiful automation, smart insights, and effortless financial discipline.';

const particles = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  left: `${(index * 11 + 7) % 100}%`,
  top: `${(index * 13 + 5) % 100}%`,
  size: 2 + (index % 4),
  delay: index * 0.08,
  duration: 6 + (index % 5),
}));

function IntroScreen() {
  const [displayText, setDisplayText] = useState('');
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    let index = 0;
    const textTimer = window.setInterval(() => {
      index += 1;
      setDisplayText(INTRO_TEXT.slice(0, index));
      if (index >= INTRO_TEXT.length) {
        window.clearInterval(textTimer);
      }
    }, 55);

    const subtitleTimer = window.setTimeout(() => {
      setShowSubtitle(true);
    }, 900);

    return () => {
      window.clearInterval(textTimer);
      window.clearTimeout(subtitleTimer);
    };
  }, []);

  return (
    <motion.div
      className="intro-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      aria-label="Intro animation"
    >
      <div className="intro-backdrop" aria-hidden="true" />
      <div className="intro-radial" aria-hidden="true" />
      <div className="intro-rays" aria-hidden="true" />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="intro-particle"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: [0, 0.9, 0.25, 0], scale: [0.4, 1, 0.8, 0.4] }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}

      <motion.div
        className="intro-logo-wrap"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: [0.8, 1.03, 1] }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="logo-glow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.18, 0.36, 0.26], scale: [0.78, 1.1, 1] }}
          transition={{ duration: 1.3, ease: 'easeOut' }}
          aria-hidden="true"
        />
        <motion.img
          src={LOGO_URL}
          alt="ZAVR logo"
          className="intro-logo"
          loading="lazy"
          animate={{ y: [0, -6, 0], rotate: [0, 0.4, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        className="intro-copy"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
      >
        <h1 className="intro-title" aria-live="polite">
          {displayText}
          <span className="intro-cursor">|</span>
        </h1>
        <motion.p
          className="intro-subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showSubtitle ? 1 : 0, y: showSubtitle ? 0 : 10 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {SUBTITLE}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

function SocialButton({ label, href, icon: Icon }: SocialLink) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
    setOffset({ x, y });
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="social-button"
      onPointerMove={handleMove}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      whileHover={{ y: -6, scale: 1.06, boxShadow: '0 16px 40px rgba(0, 245, 212, 0.18)' }}
      whileTap={{ scale: 0.96 }}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <Icon size={16} />
    </motion.a>
  );
}

function LandingPage() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const words = ['Future', 'of', 'Smart', 'Saving'];
  const socials: SocialLink[] = [
    { label: 'GitHub', href: 'https://github.com', icon: Github },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/zavr/', icon: Linkedin },
    { label: 'Instagram', href: 'https://www.instagram.com/zavr.info?igsh=cWk4M2JqNTFicW9q', icon: Instagram },
    { label: 'X', href: 'https://twitter.com', icon: Twitter },
  ];

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y });
    setParallax({ x: (x - 50) / 12, y: (y - 50) / 12 });
  };

  return (
    <div className="page-shell">
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-beam" aria-hidden="true" />
      <div className="bg-aurora bg-aurora-one" aria-hidden="true" />
      <div className="bg-aurora bg-aurora-two" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-300"
        style={{
          background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(0, 245, 212, 0.16), transparent 24%)`,
        }}
        aria-hidden="true"
      />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="floating-particle"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
          initial={{ opacity: 0, y: 0, scale: 0.6 }}
          animate={{ opacity: [0.15, 0.5, 0.2], y: [0, -18, 0], scale: [0.6, 1, 0.6] }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-5 sm:px-6 lg:px-8" role="main">
        <motion.section
          className="hero-card relative w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/55 px-6 py-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-3xl sm:px-8 lg:px-10 lg:py-8"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, x: parallax.x, y: parallax.y, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => {
            setParallax({ x: 0, y: 0 });
            setSpotlight({ x: 50, y: 50 });
          }}
        >
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-glow hero-glow-right" aria-hidden="true" />

          <header className="flex items-center justify-between gap-4">
            <motion.a
              href="/"
              className="brand-mark"
              aria-label="ZAVR logo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img src={LOGO_URL} alt="ZAVR" loading="lazy" />
            </motion.a>
            <motion.div
              className="status-badge"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
            >
              <Sparkles size={14} />
              <span>Coming soon</span>
            </motion.div>
          </header>

          <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:mt-14">
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            >
              <motion.div
                className="luxury-badge"
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              >
                COMING SOON
              </motion.div>

              <motion.h1
                className="mt-6 text-[clamp(2.8rem,5.4vw,5.8rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white"
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              >
                {words.map((word, index) => (
                  <motion.span
                    key={word}
                    className="mr-3 inline-block"
                    initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.7, delay: 0.35 + index * 0.1, ease: 'easeOut' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                className="mt-5 text-[clamp(1.45rem,3vw,2.2rem)] font-medium leading-tight tracking-[-0.02em] text-slate-100"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              >
                The Future Starts Here.
              </motion.p>

              <motion.p
                className="mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
              >
                {SUBTITLE}
              </motion.p>

              <motion.div
                className="mt-8 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-100 shadow-[0_0_45px_rgba(0,245,212,0.14)] backdrop-blur-3xl"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }}
                whileHover={{ y: -4, scale: 1.01, boxShadow: '0 16px 45px rgba(0, 245, 212, 0.14)' }}
              >
                Launching Soon
              </motion.div>

              <motion.div
                className="mt-8 flex flex-wrap items-center gap-3"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.85, ease: 'easeOut' }}
              >
                {socials.map((social) => (
                  <SocialButton key={social.label} {...social} />
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative mx-auto flex w-full max-w-[420px] flex-col gap-3 rounded-[28px] border border-white/10 bg-white/8 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.45, ease: 'easeOut' }}
            >
              <div className="rounded-[24px] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/20 via-slate-900/60 to-emerald-400/15 p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Launch visibility</span>
                  <span className="font-semibold text-[#00F5D4]">98.4%</span>
                </div>
                <div className="mt-6 h-2 rounded-full bg-white/10">
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-[#00F5D4] via-[#38BDF8] to-[#00FFD5]"
                    initial={{ width: 0 }}
                    animate={{ width: '84%' }}
                    transition={{ duration: 1.1, delay: 0.8, ease: 'easeOut' }}
                  />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    ['Security', 'Bank-grade'],
                    ['Automation', 'Built-in'],
                    ['Insights', 'Instant'],
                    ['Design', 'Luxury'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/40 p-3 text-sm text-slate-300">
                      <div className="text-[11px] uppercase tracking-[0.3em] text-slate-500">{label}</div>
                      <div className="mt-1 font-semibold text-white">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Signal strength</span>
                  <span className="font-semibold text-white">Excellent</span>
                </div>
                <div className="mt-3 flex items-end gap-2">
                  {[30, 56, 72, 90, 84].map((height, index) => (
                    <motion.div
                      key={height}
                      className="flex-1 rounded-full bg-gradient-to-t from-[#00F5D4] to-[#38BDF8]"
                      initial={{ height: 8 }}
                      animate={{ height: `${height}px` }}
                      transition={{ duration: 0.7, delay: 0.6 + index * 0.08, ease: 'easeOut' }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <footer className="mt-10 flex justify-center lg:mt-12">
            <motion.div
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400 shadow-[0_12px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95, ease: 'easeOut' }}
            >
              © 2026 ZAVR. All rights reserved.
            </motion.div>
          </footer>
        </motion.section>
      </main>
    </div>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowIntro(false);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro ? <IntroScreen key="intro" /> : <LandingPage key="landing" />}
      </AnimatePresence>
    </>
  );
}
