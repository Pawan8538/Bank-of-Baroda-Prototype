import React from 'react';
import { motion } from 'framer-motion';
import { Brain, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { riskColour } from '@/utils/riskColour';

export default function ExplainabilityPanel({ explanation, score, factors = [] }) {
  const colours = riskColour(score);

  const topFactors = factors
    .slice()
    .sort((a, b) => Math.abs(b.score - 50) - Math.abs(a.score - 50))
    .slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="glass-card p-5 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <div className="w-8 h-8 rounded-lg bg-navy-700 flex items-center justify-center">
          <Brain className="w-4 h-4 text-primary" />
        </div>
        <div>
          <div className="text-white font-semibold text-sm">AI Decision Reasoning</div>
          <div className="text-white/40 text-xs">Explainable AI · Identity Confidence Engine</div>
        </div>
      </div>

      {/* Explanation text */}
      <p className="text-white/75 text-sm leading-relaxed">{explanation}</p>

      {/* Key factors */}
      {topFactors.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="text-xs text-white/40 uppercase tracking-wider font-semibold">Key Signals</div>
          {factors.map((f, i) => {
            const c = riskColour(f.score);
            const Icon = f.score >= 75 ? CheckCircle2 : f.score >= 45 ? AlertTriangle : XCircle;
            return (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/5"
              >
                <div className="flex items-center gap-2">
                  <Icon size={13} style={{ color: c.hex }} />
                  <span className="text-white/70">{f.name}</span>
                </div>
                <span className="font-bold" style={{ color: c.hex }}>
                  {f.score}/100
                </span>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
