import React from 'react';
import { motion } from 'framer-motion';
import { riskLevelConfig } from '@/utils/riskColour';
import RiskBadge from '@/components/identity/RiskBadge';
import { ArrowRight, Monitor, MapPin, Smartphone } from 'lucide-react';

const signalIcons = ['Monitor', 'MapPin', 'Smartphone', 'Activity'];

export default function ScenarioCard({ scenario, isSelected, onSelect }) {
  const cfg = riskLevelConfig(scenario.riskLevel);
  const isActive = isSelected;

  return (
    <motion.div
      onClick={() => onSelect(scenario.id)}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isSelected === null ? 1 : isActive ? 1 : 0.4,
        y: 0,
        scale: isActive ? 1.02 : 1,
      }}
      transition={{ duration: 0.2 }}
      className={`
        relative cursor-pointer rounded-2xl p-5 border transition-all duration-200 bg-surface shadow-sm
        ${isActive
          ? 'border-primary ring-2 ring-primary/30 bg-orange-50/20'
          : 'border-border hover:border-primary/40 hover:bg-slate-50 hover:shadow-md'
        }
      `}
    >

      {/* Avatar + name */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black shadow-sm"
            style={{ backgroundColor: cfg.hex + '15', color: cfg.hex, border: `1px solid ${cfg.hex}30` }}
          >
            {scenario.avatar}
          </div>
          <div>
            <div className="text-corporate font-bold text-base">{scenario.name}</div>
            <div className="text-text-secondary font-medium text-xs">{scenario.label}</div>
          </div>
        </div>
        <RiskBadge level={scenario.riskLevel} />
      </div>

      {/* Trust score */}
      <div className="flex items-center gap-3 mb-5 p-3 bg-slate-50 border border-slate-100 rounded-xl">
        <div>
          <div className="text-text-secondary font-semibold text-xs mb-1">Trust Score</div>
          <div className="text-2xl font-black leading-none" style={{ color: cfg.hex }}>
            {scenario.trustScore}
          </div>
        </div>
        <div className="flex-1 px-2">
          <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${scenario.trustScore}%` }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'power2.out' }}
              className="h-full rounded-full"
              style={{ backgroundColor: cfg.hex }}
            />
          </div>
        </div>
        <div
          className="px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm"
          style={{ backgroundColor: cfg.hex + '15', color: cfg.hex, border: `1px solid ${cfg.hex}30` }}
        >
          {scenario.decision}
        </div>
      </div>

      {/* Signals preview */}
      <div className="flex flex-col gap-2.5 mb-6">
        {scenario.signals?.slice(0, 3).map((s) => (
          <div key={s.id} className="flex items-center gap-2.5 text-xs text-text-secondary font-medium">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                backgroundColor:
                  s.status === 'trusted' || s.status === 'stable' || s.status === 'normal'
                    ? 'var(--color-risk-low)'
                    : s.status === 'unknown' || s.status === 'elevated'
                    ? 'var(--color-risk-medium)'
                    : 'var(--color-risk-high)',
              }}
            />
            <span className="truncate">{s.name}: <span className="text-corporate font-bold">{s.value.split('—')[0].trim()}</span></span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between border-t border-border pt-4">
        <span className="text-xs font-semibold text-text-secondary/60 uppercase tracking-wider">Click to run demo</span>
        <ArrowRight
          size={18}
          className={`transition-all ${isActive ? 'text-primary translate-x-1' : 'text-slate-300'}`}
        />
      </div>
    </motion.div>
  );
}
