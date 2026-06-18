import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Eye, Bell, RefreshCw, Zap, Fingerprint, Lock, Activity } from 'lucide-react';

// ─── Pillars strip ────────────────────────────────────────────────────────────
const pillars = [
  { icon: Shield, label: 'Detect', desc: 'Signals & Fingerprints' },
  { icon: Eye, label: 'Prevent', desc: 'Real-time Blocking' },
  { icon: Bell, label: 'Respond', desc: 'Instant Alerts' },
  { icon: RefreshCw, label: 'Recover', desc: 'Account Protection' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function Landing({ onNavigate }) {
  return (
    <div className="relative min-h-full bg-transparent flex flex-col overflow-hidden">
      {/* Hero */}
      <div className="relative z-10 flex-1 grid grid-cols-2 gap-12 items-center px-16 py-12 max-w-[1400px] mx-auto w-full">
        {/* Left copy */}
        <div className="flex flex-col gap-6">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-6xl font-black leading-tight text-corporate"
          >
            Trust Every Recovery.<br />
            <span className="text-gradient-primary">Block Every Imposter.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-text-secondary text-xl leading-relaxed max-w-lg"
          >
            AI-powered identity trust platform protecting account recovery journeys through detection, prevention, response and recovery intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center gap-6 mt-4"
          >
            <button
              onClick={() => onNavigate('select')}
              className="btn-primary text-lg px-8 py-4 shadow-md"
            >
              Start Demo
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => onNavigate('architecture')}
              className="btn-outline text-lg px-8 py-4"
            >
              View Architecture
            </button>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-10 pt-8 mt-4 border-t border-border"
          >
            <div className="flex flex-col gap-1">
              <div className="text-3xl font-black text-corporate">₹2,400 <span className="text-xl">Cr</span></div>
              <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Annual Fraud Losses</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="flex flex-col gap-1">
              <div className="text-3xl font-black text-primary">3×</div>
              <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider">YoY Growth</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="flex flex-col gap-1">
              <div className="text-3xl font-black text-corporate-light">17 <span className="text-xl">days</span></div>
              <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Avg Detection Time</div>
            </div>
          </motion.div>
        </div>

        {/* Right: Premium SVG Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center justify-center relative h-full w-full"
        >
          {/* Abstract SVG Background */}
          <svg viewBox="0 0 500 500" className="absolute w-full h-full opacity-5 pointer-events-none">
            <circle cx="250" cy="250" r="200" fill="none" stroke="#0F2044" strokeWidth="1" strokeDasharray="4 12" />
            <circle cx="250" cy="250" r="140" fill="none" stroke="#0F2044" strokeWidth="1" strokeDasharray="4 12" />
            <circle cx="250" cy="250" r="80" fill="none" stroke="#0F2044" strokeWidth="1" strokeDasharray="4 12" />
          </svg>

          {/* Main Illustration Assembly */}
          <div className="relative z-10 w-80 h-80 bg-surface rounded-full shadow-2xl flex items-center justify-center border-8 border-background">
            <div className="absolute inset-0 rounded-full border border-border"></div>
            <Shield size={120} className="text-primary" strokeWidth={1} />
            <div className="absolute flex items-center justify-center">
              <Fingerprint size={60} className="text-primary opacity-80" strokeWidth={1.5} />
            </div>

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 card p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <Lock size={20} />
              </div>
              <div>
                <div className="text-xs text-text-secondary">Identity Status</div>
                <div className="font-bold text-corporate">Verified Secure</div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [10, -10, 10] }} 
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 card p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-corporate-light">
                <Activity size={20} />
              </div>
              <div>
                <div className="text-xs text-text-secondary">Trust Score</div>
                <div className="font-bold text-corporate text-xl leading-none">94<span className="text-sm text-text-secondary font-normal">/100</span></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Four pillars */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 grid grid-cols-4 gap-8 px-16 pb-16 max-w-[1400px] mx-auto w-full"
      >
        {pillars.map(({ icon: Icon, label, desc }) => (
          <motion.div
            key={label}
            variants={item}
            className="card p-6 flex flex-col items-start gap-4 cursor-default"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon size={24} className="text-primary" strokeWidth={2} />
            </div>
            <div>
              <div className="text-corporate font-bold text-lg mb-1">{label}</div>
              <div className="text-text-secondary text-sm">{desc}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
