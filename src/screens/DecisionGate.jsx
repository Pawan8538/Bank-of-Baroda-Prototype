import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Info } from 'lucide-react';
import scenarios from '@/mock/scenarios.json';
import DecisionBadge from '@/components/identity/DecisionBadge';
import { decisionConfig } from '@/utils/riskColour';

const NEXT_ROUTES = {
  ALLOW: 'success',
  VERIFY: 'blink',
  BLOCK: 'protection',
};

const DESCRIPTIONS = {
  ALLOW: (name) => `${name} has been verified with high confidence. Recovery is permitted instantly — zero friction.`,
  VERIFY: (name) => `Medium risk detected for ${name}. A new device was used. Blink liveness verification required before proceeding.`,
  BLOCK: () => `Critical threat detected. Multiple fraud indicators active simultaneously. Recovery attempt blocked. Account Protection Mode activating.`,
};

const BUTTON_LABELS = {
  ALLOW: 'View Success →',
  VERIFY: 'Begin Verification →',
  BLOCK: 'View Protection Mode →',
};

export default function DecisionGate({ scenarioId = 'A', onNavigate }) {
  const scenario = scenarios.scenarios.find((s) => s.id === scenarioId) || scenarios.scenarios[0];
  const cfg = decisionConfig(scenario.decision);

  return (
    <div
      className="min-h-full flex flex-col items-center justify-center px-8 py-12 relative overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at center, ${cfg.hex}12 0%, #0F2044 60%)`,
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${cfg.hex}08 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-lg w-full text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <Zap size={16} className="text-primary" />
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
          className="glass-card p-5 flex items-start gap-3 text-left"
        >
          <Info size={16} className="text-white/40 mt-0.5 flex-shrink-0" />
          <p className="text-white/70 text-sm leading-relaxed">
            {DESCRIPTIONS[scenario.decision]?.(scenario.name) || ''}
          </p>
        </motion.div>

        {/* Score summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-4"
        >
          <div className="text-center">
            <div className="text-white/30 text-xs">Trust Score</div>
            <div className="text-2xl font-black" style={{ color: cfg.hex }}>
              {scenario.trustScore}
            </div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <div className="text-white/30 text-xs">User</div>
            <div className="text-white font-semibold text-sm">{scenario.name}</div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <div className="text-white/30 text-xs">Decision</div>
            <div className="text-sm font-bold" style={{ color: cfg.hex }}>
              {scenario.decision}
            </div>
          </div>
        </motion.div>

        {/* Action button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: 'spring' }}
          onClick={() => onNavigate(NEXT_ROUTES[scenario.decision] || 'select', scenarioId)}
          className="btn-primary flex items-center gap-2 text-base px-8 py-4 w-full justify-center"
        >
          {BUTTON_LABELS[scenario.decision]}
        </motion.button>
      </div>
    </div>
  );
}
