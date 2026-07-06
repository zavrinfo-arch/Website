import './App.css';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Github, Instagram, Linkedin, Sparkles, Twitter } from 'lucide-react';
import { useEffect, useState, type PointerEvent } from 'react';

const LOGO_URL = 'https://raw.githubusercontent.com/zavrinfo-arch/zavr-privacy-policy/main/zavr_logo.png';
const INTRO_TEXT = 'Welcome to ZAVR';
const SUBTITLE = 'Building the next generation financial platform that helps people save smarter, achieve goals faster, and build better financial habits.';

const particles = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  left: `${(index * 7 + 5) % 100}%`,
  top: `${(index * 13 + 6) % 100}%`,
  size: 2 + (index % 4),
  delay: index * 0.08,
  duration: 5 + (index % 5),
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
    }, 1000);

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
          animate={{ opacity: [0, 0.9, 0.3, 0], scale: [0.4, 1, 0.8, 0.4] }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}

      <motion.div
        className="intro-logo-wrap"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: [0.7, 1.02, 1] }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="logo-glow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.2, 0.45, 0.3], scale: [0.8, 1.12, 1] }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          aria-hidden="true"
        />
        <motion.img
          src={LOGO_URL}
          alt="ZAVR logo"
          className="intro-logo"
          loading="lazy"
          animate={{ y: [0, -6, 0], rotate: [0, 0.4, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        className="intro-copy"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
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

function LandingPage() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const socials = [
    { label: 'GitHub', href: 'https://github.com', icon: Github },
    { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: Linkedin },
    { label: 'Instagram', href: 'https://www.instagram.com', icon: Instagram },
    { label: 'X', href: 'https://twitter.com', icon: Twitter },
  ];

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: x * 8, y: y * 8 });
  };

  return (
    <div className="page-shell">
      <div className="background-orb orb-one" aria-hidden="true" />
      <div className="background-orb orb-two" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />
      <div className="moving-light" aria-hidden="true" />

      <main className="landing-main" role="main">
        <motion.section
          className="hero-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, x: parallax.x }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setParallax({ x: 0, y: 0 })}
        >
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-glow hero-glow-right" aria-hidden="true" />

          <header className="hero-topbar">
            <motion.div
              className="brand-mark"
              aria-label="ZAVR logo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img src={LOGO_URL} alt="ZAVR" loading="lazy" />
            </motion.div>
            <div className="status-badge">
              <Sparkles size={14} />
              <span>🚀 Coming Soon</span>
            </div>
          </header>

          <div className="hero-content">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16, ease: 'easeOut' }}
            >
              <p className="eyebrow">Luxury launch experience</p>
              <h1>The Future of Smart Saving</h1>
              <p className="subheading">{SUBTITLE}</p>

              <div className="cta-row">
                <motion.a
                  href="mailto:contact@zavr.info?subject=ZAVR%20Waitlist"
                  className="btn btn-primary"
                  whileHover={{ y: -4, scale: 1.01, boxShadow: '0 16px 36px rgba(0, 245, 212, 0.25)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Join Waitlist</span>
                  <ArrowRight size={17} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Explore the Mobile App</span>
                </motion.a>
              </div>
            </motion.div>
          </div>

          <footer className="hero-footer">
            <nav className="social-links" aria-label="Social links">
              {socials.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon size={16} />
                </a>
              ))}
            </nav>
            <p>© 2026 ZAVR. All rights reserved.</p>
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
