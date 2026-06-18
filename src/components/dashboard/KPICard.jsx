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
      className="card p-6 flex flex-col justify-between"
    >
      <div className="text-text-secondary text-xs uppercase tracking-widest font-bold mb-4">
        {kpi.label}
      </div>
      <div>
        <div className="flex items-end gap-3 mb-2">
          <span
            ref={ref}
            className="text-4xl font-black"
            style={{ color: cfg.hex }}
          >
            0
          </span>
        </div>
        
        {kpi.delta && (
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md
              ${isPositiveDelta ? 'text-red-700 bg-red-50' : isNegativeDelta ? 'text-green-700 bg-green-50' : 'text-slate-600 bg-slate-100'}
            `}>
              {isPositiveDelta && <TrendingUp size={12} strokeWidth={3} />}
              {isNegativeDelta && <TrendingDown size={12} strokeWidth={3} />}
              {kpi.delta}
            </div>
            <div className="text-text-secondary/60 text-[10px] font-medium uppercase">vs. last week</div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
