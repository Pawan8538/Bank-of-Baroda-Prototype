import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowRight, TrendingUp, AlertOctagon, Clock } from 'lucide-react';

const problems = [
  { icon: TrendingUp, stat: '₹2,400 Cr', label: 'Annual digital banking fraud in India', colour: '#D4500A' },
  { icon: AlertOctagon, stat: '3×', label: 'Year-on-year growth in account recovery fraud', colour: '#B71C1C' },
  { icon: Clock, stat: '17 days', label: 'Average time to detect a compromised recovery', colour: '#E65100' },
];

const features = [
  { title: 'Zero Code Change', desc: 'Plugs into existing BoB infrastructure via API gateway. No core banking modification required.' },
  { title: 'RBI Compliant', desc: 'Immutable audit logs, PDPB 2023 data minimisation, RBI-aligned risk scoring.' },
  { title: '50K RPS', desc: 'Designed for 50,000 concurrent risk evaluations per second at peak load.' },
  { title: 'Sub 200ms', desc: 'Average decision latency under 200 milliseconds — invisible to legitimate users.' },
];

export default function PlatformOverview({ onNavigate }) {
  return (
    <div className="min-h-full bg-bob-gradient px-8 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Layers size={18} className="text-primary" />
            <span className="text-primary text-xs font-bold tracking-widest uppercase">The Problem</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-3">
            Account Recovery is Fraud's <span className="text-gradient-primary">Weakest Link</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
            Attackers exploit "forgotten password" flows using SIM swaps, stolen OTPs, and synthetic identities.
            Traditional systems have no way to distinguish Priya (legitimate user) from an attacker using her number.
          </p>
        </motion.div>

        {/* Problem stats */}
        <div className="grid grid-cols-3 gap-5 mb-10">
          {problems.map(({ icon: Icon, stat, label, colour }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-6 text-center"
            >
              <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: colour + '20', border: `1px solid ${colour}30` }}>
                <Icon size={22} style={{ color: colour }} />
              </div>
              <div className="text-3xl font-black mb-2" style={{ color: colour }}>{stat}</div>
              <div className="text-white/50 text-sm leading-tight">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Solution architecture */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-8 mb-8"
        >
          <h2 className="text-white font-bold text-xl mb-6 text-center">The Identity Trust Platform</h2>
          <div className="flex items-stretch gap-3">
            {['Signal Collection', 'ICE Engine', 'Decision Gate', 'Action Layer'].map((step, i) => (
              <React.Fragment key={step}>
                <div className="flex-1 bg-navy-700/50 rounded-xl p-4 text-center">
                  <div className="text-primary text-xs font-bold mb-2">STEP {i + 1}</div>
                  <div className="text-white font-semibold text-sm">{step}</div>
                </div>
                {i < 3 && <div className="flex items-center text-white/20"><ArrowRight size={16} /></div>}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Enterprise features */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-start gap-3 p-4 glass-card"
            >
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <div>
                <div className="text-white font-semibold text-sm">{f.title}</div>
                <div className="text-white/50 text-xs mt-1 leading-relaxed">{f.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <button onClick={() => onNavigate('pillars')} className="btn-primary flex items-center gap-2">
            Explore Four Pillars <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
