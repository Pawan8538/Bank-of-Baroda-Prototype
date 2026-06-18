import React from 'react';
import { motion } from 'framer-motion';
import { riskLevelConfig } from '@/utils/riskColour';
import { AlertTriangle, ShieldCheck, XOctagon, CheckCircle2 } from 'lucide-react';

const statusIcons = {
  blocked: XOctagon,
  verified: ShieldCheck,
  allowed: CheckCircle2,
};

const statusColours = {
  blocked: 'text-red-400',
  verified: 'text-orange-400',
  allowed: 'text-green-400',
};

export default function IncidentStreamItem({ incident, index = 0 }) {
  const cfg = riskLevelConfig(incident.severity === 'critical' ? 'critical' : incident.severity === 'high' ? 'high' : 'medium');
  const Icon = statusIcons[incident.status] || CheckCircle2;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3 py-2.5 px-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-default"
    >
      {/* Severity dot */}
      <div
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: cfg.hex }}
      />

      {/* Time */}
      <span className="text-white/30 font-mono text-xs w-10 flex-shrink-0">{incident.time}</span>

      {/* Type */}
      <span className="text-white/70 text-xs font-medium flex-shrink-0 w-32 truncate">{incident.type}</span>

      {/* User */}
      <span className="text-white/40 font-mono text-xs flex-shrink-0 w-20">{incident.user}</span>

      {/* Location */}
      <span className="text-white/40 text-xs flex-1 truncate">{incident.location}</span>

      {/* Status */}
      <div className={`flex items-center gap-1 text-xs font-bold flex-shrink-0 ${statusColours[incident.status] || 'text-white/40'}`}>
        <Icon size={11} />
        <span className="uppercase">{incident.status}</span>
      </div>
    </motion.div>
  );
}
