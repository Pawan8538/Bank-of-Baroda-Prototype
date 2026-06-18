import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ScanEye, ShieldCheck, Bell, RefreshCw, ArrowRight } from 'lucide-react';
import PillarCard from '@/components/scenarios/PillarCard';

const pillars = [
  {
    label: 'Detect',
    subtitle: 'Real-time Signal Collection',
    icon: ScanEye,
    colour: '#D4500A',
    features: [
      { name: 'Device Fingerprinting', desc: 'FP hash tracking across 14+ attributes' },
      { name: 'SIM Swap Detection', desc: 'Telecom-layer identity change monitoring' },
      { name: 'Geo Risk Analysis', desc: 'GPS + IP geolocation cross-validation' },
      { name: 'Impossible Travel', desc: 'Physics-based velocity checks' },
      { name: 'Recovery Timeline', desc: 'Behavioural baseline deviation scoring' },
    ],
  },
  {
    label: 'Prevent',
    subtitle: 'Automated Risk Mitigation',
    icon: ShieldCheck,
    colour: '#2B5797',
    features: [
      { name: 'Known Device Approval', desc: 'Instant zero-friction for trusted devices' },
      { name: 'Blink Liveness Check', desc: 'Passive biometric presence verification' },
      { name: 'Recovery Cooldown', desc: 'Time-gated re-attempt protection' },
      { name: 'Auto Block Engine', desc: 'Score-threshold automated decision rules' },
    ],
  },
  {
    label: 'Respond',
    subtitle: 'Instant Notification & Audit',
    icon: Bell,
    colour: '#E65100',
    features: [
      { name: 'Fraud Alert SMS', desc: 'Real-time notification to registered contact' },
      { name: 'Incident Timeline', desc: 'Millisecond-precision forensic audit log' },
      { name: '"This Wasn\'t Me"', desc: 'One-tap fraud confirmation by account owner' },
    ],
  },
  {
    label: 'Recover',
    subtitle: 'Account Protection & Restoration',
    icon: RefreshCw,
    colour: '#1B7E3A',
    features: [
      { name: 'Protection Mode', desc: '72h automatic account lockdown on critical threats' },
      { name: 'Session Revocation', desc: 'Instant JWT invalidation across all sessions' },
      { name: 'Beneficiary Protection', desc: 'Freeze outbound transfers during investigation' },
    ],
  },
];

export default function FourPillars({ onNavigate }) {
  return (
    <div className="min-h-full bg-background px-8 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield size={20} className="text-primary" />
            <span className="text-primary text-xs font-bold tracking-widest uppercase">
              Platform Architecture
            </span>
          </div>
          <h1 className="text-5xl font-black text-corporate mb-4">The Four Pillars</h1>
          <p className="text-text-secondary text-lg font-medium max-w-lg mx-auto">
            A complete account recovery fraud prevention lifecycle. Click any pillar to explore its capabilities.
          </p>
        </motion.div>

        {/* Pillar cards */}
        <div className="grid grid-cols-2 gap-8 mb-12 items-start">
          {pillars.map((p, i) => (
            <PillarCard key={p.label} pillar={p} delay={i * 0.1} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <button
            onClick={() => onNavigate('select')}
            className="btn-primary flex items-center gap-3 text-lg px-10 py-4 shadow-sm"
          >
            See It In Action
            <ArrowRight size={20} strokeWidth={2.5} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
