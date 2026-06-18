import React from 'react';
import { motion } from 'framer-motion';

const severityConfig = {
  info: { dot: '#4A7AC8', bg: 'bg-blue-900/30', border: 'border-blue-700/30', text: 'text-blue-400' },
  warning: { dot: '#E65100', bg: 'bg-orange-900/30', border: 'border-orange-700/30', text: 'text-orange-400' },
  critical: { dot: '#B71C1C', bg: 'bg-red-900/30', border: 'border-red-700/30', text: 'text-red-400' },
};

export default function TimelineEvent({ event, index, isSelected, onSelect }) {
  const cfg = severityConfig[event.severity] || severityConfig.info;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
      onClick={onSelect}
      className={`
        relative flex items-start gap-4 pb-6 cursor-pointer group
        transition-all duration-200
      `}
    >
      {/* Dot on timeline */}
      <div
        className="absolute -left-8 top-1 w-3.5 h-3.5 rounded-full border-2 border-navy flex-shrink-0 z-10 group-hover:scale-110 transition-transform"
        style={{ backgroundColor: cfg.dot, boxShadow: `0 0 8px ${cfg.dot}60` }}
      />

      {/* Content */}
      <div
        className={`flex-1 p-4 rounded-xl border transition-all duration-200
          ${isSelected ? `${cfg.bg} ${cfg.border} border` : 'bg-white/5 border border-white/10 hover:border-white/20'}
        `}
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-white/40">{event.t}</span>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${cfg.text}`}>
              {event.severity}
            </span>
          </div>
          <span className="text-white/30 text-xs">{event.actor}</span>
        </div>
        <p className="text-white/80 text-sm">{event.action}</p>
      </div>
    </motion.div>
  );
}
