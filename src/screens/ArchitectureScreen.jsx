import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Monitor, Cpu, Database, Shield, ArrowRight } from 'lucide-react';

const layers = [
  {
    icon: Monitor,
    label: 'Presentation Layer',
    colour: '#D4500A',
    items: ['React SPA', 'Tailwind CSS', 'Framer Motion', 'GSAP Animations', 'Recharts'],
  },
  {
    icon: Cpu,
    label: 'Signal Processing',
    colour: '#2B5797',
    items: ['Device Fingerprinting', 'Geo Engine', 'SIM Integrity Check', 'Behaviour Baseline', 'Impossible Travel'],
  },
  {
    icon: Database,
    label: 'Intelligence Engine (ICE)',
    colour: '#E65100',
    items: ['Identity Confidence Score', 'Decision Matrix', 'Explainable AI', 'Risk Rule Engine', 'Fraud Pattern ML'],
  },
  {
    icon: Shield,
    label: 'Protection Layer',
    colour: '#1B7E3A',
    items: ['Auto Block Engine', 'Session Revocation', 'Account Protection Mode', 'SMS Alert Service', 'Audit Ledger'],
  },
];

export default function ArchitectureScreen({ onNavigate }) {
  return (
    <div className="min-h-full bg-transparent px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Layers size={20} className="text-primary" />
            <span className="text-primary text-xs font-bold tracking-widest uppercase">Technical Architecture</span>
          </div>
          <h1 className="text-5xl font-black text-corporate mb-4">Built for Production</h1>
          <p className="text-text-secondary font-medium text-lg max-w-lg mx-auto">
            Enterprise-grade architecture designed for BoB's scale — 50M+ customers.
          </p>
        </motion.div>

        {/* Architecture layers */}
        <div className="flex flex-col gap-6 mb-12">
          {layers.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="card bg-white border border-slate-200 p-6 flex items-center gap-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white shadow-sm"
                  style={{ border: `1px solid ${layer.colour}30`, boxShadow: `0 2px 8px ${layer.colour}15` }}
                >
                  <Icon size={28} style={{ color: layer.colour }} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="text-corporate font-bold text-lg mb-3">{layer.label}</div>
                  <div className="flex flex-wrap gap-2.5">
                    {layer.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-3 py-1.5 rounded-lg font-bold"
                        style={{
                          backgroundColor: layer.colour + '10',
                          color: layer.colour,
                          border: `1px solid ${layer.colour}25`,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest text-right flex-shrink-0">
                  Layer {i + 1} of {layers.length}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Compliance note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="card p-6 border border-orange-200 bg-orange-50 mb-10 shadow-sm"
        >
          <div className="text-orange-700 text-xs font-black uppercase tracking-widest mb-4 text-center">Deployment Compliance</div>
          <div className="flex flex-wrap gap-6 justify-center text-sm font-semibold text-corporate">
            <span>✓ No core banking changes</span>
            <span>✓ RBI-compliant audit logs</span>
            <span>✓ PDPB 2023 data minimisation</span>
            <span>✓ 50,000 RPS designed capacity</span>
            <span>✓ Sub-200ms decision latency</span>
          </div>
        </motion.div>

        <div className="flex justify-center pb-8">
          <button onClick={() => onNavigate('impact')} className="btn-primary flex items-center gap-3 text-lg px-10 py-4 shadow-sm">
            View Business Impact <ArrowRight size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
