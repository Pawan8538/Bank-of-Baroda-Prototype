import React from 'react';
import { motion } from 'framer-motion';
import { statusConfig } from '@/utils/riskColour';
import { Smartphone, MapPin, Activity } from 'lucide-react';

const signalIcons = {
  device: Smartphone,
  location: MapPin,
  sim: Smartphone,
  behaviour: Activity,
};

export default function SignalFeedItem({ signal, index = 0 }) {
  const cfg = statusConfig(signal.status);
  const Icon = signalIcons[signal.id] || Activity;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl"
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-navy-700 flex items-center justify-center flex-shrink-0">
        <Icon size={18} className="text-white/60" strokeWidth={1.5} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="text-white text-sm font-semibold">{signal.name}</div>
        <div className="text-white/50 text-xs mt-0.5 truncate">{signal.value}</div>
      </div>

      {/* Status badge */}
      <div className={`px-2.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wide flex-shrink-0 ${cfg.cls}`}>
        {cfg.label}
      </div>

      {/* Status dot */}
      <div
        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: cfg.dot, boxShadow: `0 0 6px ${cfg.dot}` }}
      />
    </motion.div>
  );
}
