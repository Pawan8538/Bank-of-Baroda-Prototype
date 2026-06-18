import React from 'react';
import { motion } from 'framer-motion';

const severityConfig = {
  info: { dot: '#2B5797', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
  warning: { dot: '#E65100', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700' },
  critical: { dot: '#B71C1C', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
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
        className="absolute -left-8 top-1 w-3.5 h-3.5 rounded-full border-2 border-white flex-shrink-0 z-10 group-hover:scale-110 transition-transform shadow-sm"
        style={{ backgroundColor: cfg.dot, boxShadow: `0 2px 4px ${cfg.dot}40` }}
      />

      {/* Content */}
      <div
        className={`flex-1 p-4 rounded-xl border transition-all duration-200 shadow-sm
          ${isSelected ? `${cfg.bg} ${cfg.border}` : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
        `}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-text-secondary/70 font-semibold">{event.t}</span>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${cfg.text}`}>
              {event.severity}
            </span>
          </div>
          <span className="text-text-secondary/60 text-xs font-medium">{event.actor}</span>
        </div>
        <p className="text-corporate font-medium text-sm leading-relaxed">{event.action}</p>
      </div>
    </motion.div>
  );
}
