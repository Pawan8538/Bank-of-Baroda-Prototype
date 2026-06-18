import React from 'react';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

export default function StatCard({ value, label, prefix = '', suffix = '', colour = '#D4500A' }) {
  const { ref } = useAnimatedCounter(
    typeof value === 'number' ? value : parseFloat(value) || 0,
    { prefix, suffix, localize: true }
  );

  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <div
        ref={ref}
        className="text-3xl font-black leading-none"
        style={{ color: colour }}
      >
        {prefix}0{suffix}
      </div>
      <div className="text-white/50 text-xs font-medium">{label}</div>
    </div>
  );
}
