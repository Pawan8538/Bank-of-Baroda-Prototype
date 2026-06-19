import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Info } from 'lucide-react';
import scenarios from '@/mock/scenarios.json';
import DecisionBadge from '@/components/identity/DecisionBadge';
import { decisionConfig } from '@/utils/riskColour';

const NEXT_ROUTES = {
  ALLOW: 'success',
  VERIFY: 'blink',
  BLOCK: 'shadow',
  'SILENT ALARM': 'duress',
};

const DESCRIPTIONS = {
  ALLOW: (name) => `${name} has been verified with high confidence. Recovery is permitted instantly — zero friction.`,
  VERIFY: (name) => `Medium risk detected for ${name}. A new device was used. Blink liveness verification required before proceeding.`,
  BLOCK: () => `CRITICAL THREAT. Auto-Block engaged. Attacker is being isolated and routed to Shadow Infrastructure to capture forensics without alerting them.`,
  'SILENT ALARM': () => `DURESS PIN DETECTED. The user is under coercion. Accepting login to protect physical safety, while silently freezing all outbound funds.`,
};

const BUTTON_LABELS = {
  ALLOW: 'View Success →',
  VERIFY: 'Begin Verification →',
  BLOCK: 'Deploy Shadow Honeypot →',
  'SILENT ALARM': 'Trigger Silent Alarm →',
};

export default function DecisionGate({ scenarioId = 'A', onNavigate }) {
  const scenario = scenarios.scenarios.find((s) => s.id === scenarioId) || scenarios.scenarios[0];
  const cfg = decisionConfig(scenario.decision);

  return (
    <div
      className="min-h-full flex flex-col items-center justify-center px-8 py-12 relative overflow-hidden bg-transparent"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${cfg.hex}15 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-lg w-full text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2"
        >
          <Zap size={20} className="text-primary" />
          <span className="text-primary text-xs font-bold tracking-widest uppercase">
            ICE Decision Output
          </span>
        </motion.div>

        {/* Badge */}
        <DecisionBadge decision={scenario.decision} size="lg" />

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6 flex items-start gap-4 text-left shadow-md border-slate-200"
        >
          <Info size={20} className="text-slate-400 mt-0.5 flex-shrink-0" />
          <p className="text-text-secondary font-medium text-sm leading-relaxed">
            {DESCRIPTIONS[scenario.decision]?.(scenario.name) || ''}
          </p>
        </motion.div>

        {/* Score summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-6 card p-4 w-full justify-center bg-slate-50 border-slate-100"
        >
          <div className="text-center">
            <div className="text-text-secondary/60 font-bold uppercase tracking-widest text-[10px] mb-1">Trust Score</div>
            <div className="text-3xl font-black leading-none" style={{ color: cfg.hex }}>
              {scenario.trustScore}
            </div>
          </div>
          <div className="w-px h-12 bg-slate-200" />
          <div className="text-center">
            <div className="text-text-secondary/60 font-bold uppercase tracking-widest text-[10px] mb-1">User</div>
            <div className="text-corporate font-bold text-base leading-none">{scenario.name}</div>
          </div>
          <div className="w-px h-12 bg-slate-200" />
          <div className="text-center">
            <div className="text-text-secondary/60 font-bold uppercase tracking-widest text-[10px] mb-1">Decision</div>
            <div className="text-base font-black leading-none uppercase tracking-wide" style={{ color: cfg.hex }}>
              {scenario.decision}
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: 'spring' }}
          className="w-full flex flex-col gap-3"
        >
          <button
            onClick={() => onNavigate(NEXT_ROUTES[scenario.decision] || 'select', scenarioId)}
            className="btn-primary flex items-center gap-3 text-lg px-10 py-4 w-full justify-center shadow-sm cursor-pointer"
          >
            {BUTTON_LABELS[scenario.decision]}
          </button>
          
          {scenario.decision === 'BLOCK' && (
            <button
              onClick={() => onNavigate('protection', scenarioId)}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700 cursor-pointer w-full text-base"
            >
              Standard Block (Protection Mode) <ArrowRight size={16} />
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
