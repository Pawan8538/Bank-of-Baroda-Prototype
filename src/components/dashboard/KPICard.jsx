import React from 'react';
import { motion } from 'framer-motion';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { TrendingUp, TrendingDown } from 'lucide-react';

const colourMap = {
  orange: { hex: '#D4500A', bg: 'bg-primary/10', border: 'border-primary/20' },
  red: { hex: '#B71C1C', bg: 'bg-red-900/20', border: 'border-red-700/20' },
  blue: { hex: '#2B5797', bg: 'bg-navy-600/20', border: 'border-navy-600/30' },
  green: { hex: '#1B7E3A', bg: 'bg-green-900/20', border: 'border-green-700/20' },
};

export default function KPICard({ kpi, delay = 0 }) {
  const cfg = colourMap[kpi.colour] || colourMap.orange;
  const { ref } = useAnimatedCounter(kpi.value, { localize: true });
  const isPositiveDelta = kpi.delta?.startsWith('+');
  const isNegativeDelta = kpi.delta?.startsWith('-');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`glass-card p-5 border ${cfg.border} ${cfg.bg}`}
    >
      <div className="text-white/50 text-xs uppercase tracking-wider font-semibold mb-3">
        {kpi.label}
      </div>
      <div className="flex items-end gap-2">
        <span
          ref={ref}
          className="text-3xl font-black"
          style={{ color: cfg.hex }}
        >
          0
        </span>
        {kpi.delta && (
          <div className={`flex items-center gap-0.5 text-xs font-semibold mb-1
            ${isPositiveDelta ? 'text-red-400' : isNegativeDelta ? 'text-green-400' : 'text-white/40'}
          `}>
            {isPositiveDelta && <TrendingUp size={12} />}
            {isNegativeDelta && <TrendingDown size={12} />}
            {kpi.delta}
          </div>
        )}
      </div>
      <div className="text-white/20 text-[10px] mt-1">vs. previous 24h</div>
    </motion.div>
  );
}
