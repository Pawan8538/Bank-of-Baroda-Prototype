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
      className="card p-6 flex flex-col gap-5 bg-slate-50"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
          <Brain className="w-5 h-5 text-primary" />
        </div>
        <div>
          <div className="text-corporate font-bold text-sm">AI Decision Reasoning</div>
          <div className="text-text-secondary text-xs font-medium">Explainable AI · Identity Confidence Engine</div>
        </div>
      </div>

      {/* Explanation text */}
      <p className="text-text-secondary text-sm leading-relaxed font-medium">{explanation}</p>

      {/* Key factors */}
      {topFactors.length > 0 && (
        <div className="flex flex-col gap-2 mt-2">
          <div className="text-xs text-text-secondary uppercase tracking-widest font-bold mb-1">Key Signals</div>
          {factors.map((f, i) => {
            const c = riskColour(f.score);
            const Icon = f.score >= 75 ? CheckCircle2 : f.score >= 45 ? AlertTriangle : XCircle;
            return (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center justify-between text-xs p-3 rounded-lg bg-white border border-slate-100 shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} style={{ color: c.hex }} strokeWidth={2.5} />
                  <span className="text-corporate font-bold">{f.name}</span>
                </div>
                <span className="font-bold text-sm" style={{ color: c.hex }}>
                  {f.score}<span className="text-text-secondary/60 text-xs font-medium">/100</span>
                </span>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
