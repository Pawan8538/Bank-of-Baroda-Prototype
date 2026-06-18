import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XOctagon } from 'lucide-react';
import { decisionConfig } from '@/utils/riskColour';

const icons = {
  ALLOW: CheckCircle2,
  VERIFY: AlertTriangle,
  BLOCK: XOctagon,
};

const labels = {
  ALLOW: 'APPROVED',
  VERIFY: 'VERIFY REQUIRED',
  BLOCK: 'BLOCKED',
};

export default function DecisionBadge({ decision = 'ALLOW', size = 'lg' }) {
  const cfg = decisionConfig(decision);
  const Icon = icons[decision] ?? CheckCircle2;
  const isLarge = size === 'lg';
  const isPulsing = decision === 'BLOCK';

  return (
    <motion.div
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, bounce: 0.4 }}
      className={`
        relative flex flex-col items-center justify-center rounded-3xl border-2
        ${isLarge ? 'w-64 h-64' : 'w-36 h-36'}
        ${isPulsing ? 'animate-pulse-ring' : ''}
      `}
      style={{
        backgroundColor: cfg.hex + '15',
        borderColor: cfg.hex,
        boxShadow: `0 0 60px ${cfg.hex}40`,
      }}
    >
      {/* Pulse rings for BLOCK */}
      {isPulsing && (
        <>
          <div
            className="absolute inset-0 rounded-3xl border-2 animate-ping opacity-20"
            style={{ borderColor: cfg.hex }}
          />
        </>
      )}

      <Icon
        className={isLarge ? 'w-16 h-16 mb-3' : 'w-8 h-8 mb-2'}
        style={{ color: cfg.hex }}
        strokeWidth={1.5}
      />
      <div
        className={`font-black tracking-widest ${isLarge ? 'text-3xl' : 'text-lg'}`}
        style={{ color: cfg.hex }}
      >
        {labels[decision]}
      </div>
      {isLarge && (
        <div className="text-white/30 text-xs mt-2 font-mono uppercase tracking-wider">
          Identity Confidence Engine
        </div>
      )}
    </motion.div>
  );
}
