import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Monitor, Cpu, Database, Shield } from 'lucide-react';

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
    <div className="min-h-full bg-bob-gradient px-8 py-10">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Layers size={18} className="text-primary" />
            <span className="text-primary text-xs font-bold tracking-widest uppercase">Technical Architecture</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-3">Built for Production</h1>
          <p className="text-white/60">
            Enterprise-grade architecture designed for BoB's scale — 50M+ customers.
          </p>
        </motion.div>

        {/* Architecture layers */}
        <div className="flex flex-col gap-4 mb-10">
          {layers.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="glass-card p-5 flex items-center gap-6"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: layer.colour + '20', border: `2px solid ${layer.colour}30` }}
                >
                  <Icon size={24} style={{ color: layer.colour }} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="text-white font-bold text-base mb-2">{layer.label}</div>
                  <div className="flex flex-wrap gap-2">
                    {layer.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-2.5 py-1 rounded-lg font-medium"
                        style={{
                          backgroundColor: layer.colour + '15',
                          color: layer.colour,
                          border: `1px solid ${layer.colour}25`,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-white/20 text-xs text-right flex-shrink-0">
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
          className="glass-card p-5 border border-primary/20 mb-8"
        >
          <div className="text-primary text-xs font-bold uppercase tracking-wider mb-2">Deployment Compliance</div>
          <div className="flex flex-wrap gap-4 text-sm text-white/60">
            <span>✓ No core banking changes</span>
            <span>✓ RBI-compliant audit logs</span>
            <span>✓ PDPB 2023 data minimisation</span>
            <span>✓ 50,000 RPS designed capacity</span>
            <span>✓ Sub-200ms decision latency</span>
          </div>
        </motion.div>

        <div className="flex justify-center">
          <button onClick={() => onNavigate('impact')} className="btn-primary flex items-center gap-2">
            View Business Impact →
          </button>
        </div>
      </div>
    </div>
  );
}
