import React from 'react';
import { riskLevelConfig } from '@/utils/riskColour';

export default function RiskBadge({ level = 'low', className = '' }) {
  const cfg = riskLevelConfig(level);
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${className}`}
      style={{
        backgroundColor: cfg.hex + '18',
        color: cfg.hex,
        borderColor: cfg.hex + '50',
      }}
    >
      {level}
    </span>
  );
}
