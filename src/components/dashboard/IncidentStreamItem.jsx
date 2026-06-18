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
  blocked: 'text-red-600',
  verified: 'text-orange-600',
  allowed: 'text-green-600',
};

export default function IncidentStreamItem({ incident, index = 0 }) {
  const cfg = riskLevelConfig(incident.severity === 'critical' ? 'critical' : incident.severity === 'high' ? 'high' : 'medium');
  const Icon = statusIcons[incident.status] || CheckCircle2;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3 py-3 px-3 border-b border-border hover:bg-slate-50 transition-colors cursor-default"
    >
      {/* Severity dot */}
      <div
        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: cfg.hex }}
      />

      {/* Time */}
      <span className="text-text-secondary/60 font-mono text-xs w-10 flex-shrink-0 font-medium">{incident.time}</span>

      {/* Type */}
      <span className="text-corporate text-xs font-bold flex-shrink-0 w-32 truncate">{incident.type}</span>

      {/* User */}
      <span className="text-text-secondary font-mono text-xs flex-shrink-0 w-20">{incident.user}</span>

      {/* Location */}
      <span className="text-text-secondary text-xs flex-1 truncate">{incident.location}</span>

      {/* Status */}
      <div className={`flex items-center gap-1.5 text-[10px] font-bold flex-shrink-0 ${statusColours[incident.status] || 'text-text-secondary'}`}>
        <Icon size={12} strokeWidth={2.5} />
        <span className="uppercase tracking-wider">{incident.status}</span>
      </div>
    </motion.div>
  );
}
