// score = Identity Confidence Score (0-100). High score = trusted = green.
export function riskColour(score) {
  if (score >= 75) return { text: 'text-green-700', bg: 'bg-green-50', border: 'border-green-600', hex: '#1B7E3A', darkText: 'text-green-400', darkBg: 'bg-green-400/10' };
  if (score >= 45) return { text: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-500', hex: '#E65100', darkText: 'text-orange-400', darkBg: 'bg-orange-400/10' };
  return { text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-700', hex: '#B71C1C', darkText: 'text-red-400', darkBg: 'bg-red-400/10' };
}

export function riskLevelColour(level) {
  const map = {
    low: '#1B7E3A',
    medium: '#E65100',
    high: '#B71C1C',
    critical: '#7B0000',
  };
  return map[level] ?? '#555555';
}

export function riskLevelConfig(level) {
  const map = {
    low: { hex: '#1B7E3A', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-300', darkBg: 'bg-green-900/30', darkText: 'text-green-400' },
    medium: { hex: '#E65100', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-300', darkBg: 'bg-orange-900/30', darkText: 'text-orange-400' },
    high: { hex: '#B71C1C', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-300', darkBg: 'bg-red-900/30', darkText: 'text-red-400' },
    critical: { hex: '#7B0000', bg: 'bg-red-950', text: 'text-red-300', border: 'border-red-700', darkBg: 'bg-red-950/50', darkText: 'text-red-300' },
  };
  return map[level] ?? map.medium;
}

export function decisionConfig(decision) {
  const map = {
    ALLOW: { hex: '#1B7E3A', label: 'APPROVED', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-400', glowClass: 'shadow-glow-green', darkBg: 'bg-green-900/20', darkBorder: 'border-green-500', darkText: 'text-green-400' },
    VERIFY: { hex: '#E65100', label: 'VERIFY', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-400', glowClass: 'shadow-glow', darkBg: 'bg-orange-900/20', darkBorder: 'border-orange-500', darkText: 'text-orange-400' },
    BLOCK: { hex: '#B71C1C', label: 'BLOCKED', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-500', glowClass: 'shadow-glow-red', darkBg: 'bg-red-900/20', darkBorder: 'border-red-500', darkText: 'text-red-400' },
  };
  return map[decision] ?? map.VERIFY;
}

export function statusConfig(status) {
  const map = {
    trusted: { label: 'TRUSTED', cls: 'signal-status-trusted', dot: '#4ade80' },
    stable: { label: 'STABLE', cls: 'signal-status-stable', dot: '#4ade80' },
    normal: { label: 'NORMAL', cls: 'signal-status-normal', dot: '#4ade80' },
    unknown: { label: 'UNKNOWN', cls: 'signal-status-unknown', dot: '#fb923c' },
    elevated: { label: 'ELEVATED', cls: 'signal-status-elevated', dot: '#fb923c' },
    swapped: { label: 'SWAPPED', cls: 'signal-status-swapped', dot: '#f87171' },
    critical: { label: 'CRITICAL', cls: 'signal-status-critical', dot: '#f87171' },
  };
  return map[status] ?? map.unknown;
}
