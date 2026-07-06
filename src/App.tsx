import './App.css';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Instagram, Linkedin, Mail, Sparkles, Twitter } from 'lucide-react';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const launchDate = new Date('2026-12-01T00:00:00');

const getTimeLeft = (): TimeLeft => {
  const diff = launchDate.getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com', icon: Instagram },
  { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
];

export default function App() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const countdownItems = useMemo(
    () => [
      { label: 'Days', value: timeLeft.days },
      { label: 'Hours', value: timeLeft.hours },
      { label: 'Minutes', value: timeLeft.minutes },
      { label: 'Seconds', value: timeLeft.seconds },
    ],
    [timeLeft],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setStatus('Please enter your email address to join the waitlist.');
      return;
    }

    setStatus(`Thanks, ${email.trim()} — you're on the waitlist.`);
    setEmail('');
  };

  return (
    <div className="coming-soon-shell">
      <div className="aurora aurora-one" aria-hidden="true" />
      <div className="aurora aurora-two" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />

      <main className="coming-soon-page" role="main">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="coming-soon-card"
        >
          <div className="glass-orb glass-orb-left" aria-hidden="true" />
          <div className="glass-orb glass-orb-right" aria-hidden="true" />

          <header className="hero-header">
            <div className="brand-mark" aria-label="ZAVR logo">
              <span>Z</span>
            </div>
            <div className="status-pill">
              <Sparkles size={14} />
              <span>Coming Soon</span>
            </div>
          </header>

          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="hero-copy"
            >
              <p className="eyebrow">Premium Launch Experience</p>
              <h1>The Future of Smart Goal-Based Saving</h1>
              <p className="subheading">
                We&apos;re building a modern financial platform that helps people save smarter, achieve goals faster, and manage money with confidence.
              </p>

              <div className="action-row">
                <a href="#waitlist" className="btn btn-primary">
                  Notify Me
                  <ArrowRight size={16} />
                </a>
                <a href="#waitlist" className="btn btn-secondary">
                  View Mobile App
                </a>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="countdown-panel"
            >
              <div className="panel-glow" aria-hidden="true" />
              <p className="panel-title">Launches In</p>
              <div className="countdown-grid" role="timer" aria-label="Countdown to launch">
                {countdownItems.map((item) => (
                  <div key={item.label} className="countdown-tile">
                    <strong>{String(item.value).padStart(2, '0')}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.aside>
          </div>

          <motion.form
            id="waitlist"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="waitlist-form"
            onSubmit={handleSubmit}
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <div className="input-shell">
              <Mail size={16} />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-inline">
              Join Waitlist
            </button>
          </motion.form>

          {status ? <p className="status-message">{status}</p> : null}

          <footer className="footer-bar">
            <nav className="social-links" aria-label="Social links">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon size={16} />
                </a>
              ))}
            </nav>
            <p>© 2026 ZAVR. All Rights Reserved.</p>
          </footer>
        </motion.section>
      </main>
    </div>
  );
}
