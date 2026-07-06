import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Mail } from 'lucide-react';

const LOGO_URL = 'https://raw.githubusercontent.com/zavrinfo-arch/zavr-privacy-policy/main/zavr_logo.png';

const sections = [
  {
    id: 'about',
    title: 'About Zavr',
    content: `Zavr is a goal-based savings tracking application designed to help users build consistent financial habits. Users can create goals, monitor progress, and collaborate through group savings.\n\nZavr is strictly a financial tracking tool and does not provide banking, lending, or investment services.`,
  },
  {
    id: 'collect',
    title: 'Information We Collect',
    content: `When you use Zavr, we may collect the following types of information:\n\n• Account information such as your name and email address when you register.\n• Usage data including the goals you create, savings amounts you log, and activity within the app.\n• Device information such as your operating system and app version for diagnostic purposes.\n\nWe do not collect sensitive financial information such as bank details or payment credentials.`,
  },
  {
    id: 'use',
    title: 'How We Use Your Information',
    content: `We use the information we collect to:\n\n• Provide, operate, and improve the Zavr application.\n• Enable group savings features and shared goal tracking.\n• Send you streak reminders, milestone notifications, and app updates.\n• Respond to your support inquiries.\n• Monitor and analyze usage patterns to improve the user experience.\n\nWe do not sell your personal information to third parties.`,
  },
  {
    id: 'storage',
    title: 'Data Storage & Retention',
    content: `Your data is securely stored using trusted cloud infrastructure and retained only while your account is active.\n\nIf you delete your account, your personal data will be removed from our active systems within 30 days. Anonymized, aggregated data may be retained for analytics purposes.`,
  },
  {
    id: 'security',
    title: 'Security',
    content: `We use encrypted connections (HTTPS) and secure authentication systems to protect your data.\n\nAccess to user data is restricted to authorized personnel only, and we follow industry best practices for data security. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    id: 'third-party',
    title: 'Third-Party Services',
    content: `We use trusted services to operate Zavr:\n\n• Supabase — for authentication, database storage, and row-level security.\n\nThese services have their own privacy policies and data handling practices. We encourage you to review them as well.`,
  },
  {
    id: 'rights',
    title: 'Your Rights',
    content: `You have the right to:\n\n• Access the personal data we hold about you.\n• Request correction of inaccurate data.\n• Request deletion of your account and associated data.\n• Withdraw consent for data processing at any time.\n\nTo exercise any of these rights, please contact us at zavrinfo@gmail.com.`,
  },
  {
    id: 'children',
    title: "Children's Privacy",
    content: `Zavr is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with their information, please contact us so we can remove it.`,
  },
  {
    id: 'changes',
    title: 'Changes to Policy',
    content: `We may update this privacy policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. Changes will be reflected with an updated date on this page.\n\nWe encourage you to review this policy periodically to stay informed about how we protect your information.`,
  },
];

interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-[#050a14] text-white">
      {/* Sticky header */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-40 bg-[#050a14]/90 backdrop-blur-xl border-b border-white/5"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Zavr
          </button>
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg p-[2px]"
              style={{ background: 'linear-gradient(135deg,#FF6B6B,#4ECDC4)' }}
            >
              <div className="w-full h-full rounded-md bg-[#080e1d] flex items-center justify-center p-0.5">
                <img src={LOGO_URL} alt="Zavr" className="w-full h-full object-contain" />
              </div>
            </div>
            <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Zavr
            </span>
          </div>
        </div>
      </motion.header>

      {/* Hero banner */}
      <div className="relative overflow-hidden bg-[#060c18] border-b border-white/5">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-10" style={{ background: '#4ECDC4' }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-[80px] opacity-8" style={{ background: '#FF6B6B' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-14 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-10 h-10 rounded-xl bg-[#4ECDC4]/15 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#4ECDC4]" />
            </div>
            <span className="text-xs font-semibold text-[#4ECDC4] tracking-widest uppercase">Legal</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-4xl md:text-6xl font-light leading-tight mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Privacy{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg,#4ECDC4,#7EDDD6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Policy
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/45 text-sm"
          >
            Last updated: June 2025
          </motion.p>
        </div>
      </div>

      {/* Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-14 md:py-20">

        {/* Table of contents */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-14 p-6 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Contents</p>
          <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-white/50 hover:text-[#4ECDC4] transition-colors flex items-center gap-2 group"
                >
                  <span className="text-xs text-white/20 font-mono w-5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </motion.nav>

        {/* Policy sections */}
        <div className="space-y-12">
          {sections.map((s, i) => (
            <motion.section
              key={s.id}
              id={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.03 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-mono font-bold px-2 py-0.5 rounded-md flex-shrink-0"
                  style={{
                    background: 'rgba(78,205,196,0.12)',
                    color: '#4ECDC4',
                    border: '1px solid rgba(78,205,196,0.2)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2
                  className="text-xl md:text-2xl font-light text-white"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  {s.title}
                </h2>
              </div>
              <div className="md:pl-10 text-white/58 text-sm leading-[1.9] whitespace-pre-line">
                {s.content}
              </div>
              {i < sections.length - 1 && (
                <div className="mt-12 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />
              )}
            </motion.section>
          ))}
        </div>

        {/* Contact card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-6 rounded-2xl flex items-center gap-5"
          style={{ background: 'rgba(255,107,107,0.06)', border: '1px solid rgba(255,107,107,0.15)' }}
        >
          <div className="w-12 h-12 rounded-xl bg-[#FF6B6B]/15 flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-[#FF6B6B]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-0.5">Questions about this policy?</p>
            <a href="mailto:zavrinfo@gmail.com" className="text-sm text-[#FF6B6B] hover:underline">
              zavrinfo@gmail.com
            </a>
          </div>
        </motion.div>

        {/* Bottom nav */}
        <div className="mt-14 pt-8 border-t border-white/5 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Zavr
          </button>
          <p className="text-xs text-white/20">© 2025 Zavr. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
}
