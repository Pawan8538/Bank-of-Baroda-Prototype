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
    <div className="min-h-full bg-background px-8 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Layers size={20} className="text-primary" />
            <span className="text-primary text-xs font-bold tracking-widest uppercase">The Problem</span>
          </div>
          <h1 className="text-5xl font-black text-corporate mb-4">
            Account Recovery is Fraud's <span className="text-primary">Weakest Link</span>
          </h1>
          <p className="text-text-secondary font-medium max-w-2xl mx-auto leading-relaxed text-lg">
            Attackers exploit "forgotten password" flows using SIM swaps, stolen OTPs, and synthetic identities.
            Traditional systems have no way to distinguish Priya (legitimate user) from an attacker using her number.
          </p>
        </motion.div>

        {/* Problem stats */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          {problems.map(({ icon: Icon, stat, label, colour }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="card p-8 text-center bg-surface border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-sm"
                style={{ backgroundColor: colour + '10', border: `1px solid ${colour}25` }}>
                <Icon size={26} style={{ color: colour }} />
              </div>
              <div className="text-4xl font-black mb-3" style={{ color: colour }}>{stat}</div>
              <div className="text-text-secondary font-medium text-sm leading-snug px-4">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Solution architecture */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="card p-8 mb-10 bg-slate-50 border-slate-200"
        >
          <h2 className="text-corporate font-black text-xl mb-6 text-center uppercase tracking-wider text-sm">The Identity Trust Platform</h2>
          <div className="flex items-stretch gap-4">
            {['Signal Collection', 'ICE Engine', 'Decision Gate', 'Action Layer'].map((step, i) => (
              <React.Fragment key={step}>
                <div className="flex-1 bg-white border border-slate-200 shadow-sm rounded-xl p-5 text-center flex flex-col justify-center">
                  <div className="text-primary/80 text-[10px] font-black tracking-widest mb-1.5 uppercase">STEP {i + 1}</div>
                  <div className="text-corporate font-bold text-sm">{step}</div>
                </div>
                {i < 3 && <div className="flex items-center text-slate-300"><ArrowRight size={20} strokeWidth={2.5} /></div>}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Enterprise features */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-start gap-4 p-5 card hover:bg-slate-50 border-slate-200 transition-colors"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1 flex-shrink-0 shadow-sm" />
              <div>
                <div className="text-corporate font-bold text-base mb-1">{f.title}</div>
                <div className="text-text-secondary font-medium text-sm leading-relaxed">{f.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center pb-8">
          <button onClick={() => onNavigate('pillars')} className="btn-primary flex items-center gap-3 text-lg px-10 py-4 shadow-sm">
            Explore Four Pillars <ArrowRight size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
