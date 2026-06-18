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
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: isSelected === null ? 1 : isActive ? 1 : 0.35,
        y: 0,
        scale: isActive ? 1.02 : 1,
      }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`
        relative cursor-pointer rounded-2xl p-6 border transition-all duration-200
        ${isActive
          ? 'border-primary shadow-glow bg-primary/5'
          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
        }
      `}
    >
      {/* Selected ring */}
      {isActive && (
        <motion.div
          layoutId="selected-ring"
          className="absolute inset-0 rounded-2xl border-2 border-primary pointer-events-none"
          transition={{ type: 'spring', stiffness: 300 }}
        />
      )}

      {/* Avatar + name */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black"
            style={{ backgroundColor: cfg.hex + '25', color: cfg.hex, border: `2px solid ${cfg.hex}40` }}
          >
            {scenario.avatar}
          </div>
          <div>
            <div className="text-white font-bold text-base">{scenario.name}</div>
            <div className="text-white/50 text-xs">{scenario.label}</div>
          </div>
        </div>
        <RiskBadge level={scenario.riskLevel} />
      </div>

      {/* Trust score */}
      <div className="flex items-center gap-3 mb-5 p-3 bg-white/5 rounded-xl">
        <div>
          <div className="text-white/40 text-xs">Trust Score</div>
          <div className="text-2xl font-black" style={{ color: cfg.hex }}>
            {scenario.trustScore}
          </div>
        </div>
        <div className="flex-1">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
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
          className="px-2.5 py-1 rounded-lg text-xs font-bold"
          style={{ backgroundColor: cfg.hex + '20', color: cfg.hex }}
        >
          {scenario.decision}
        </div>
      </div>

      {/* Signals preview */}
      <div className="flex flex-col gap-2 mb-5">
        {scenario.signals?.slice(0, 3).map((s) => (
          <div key={s.id} className="flex items-center gap-2 text-xs text-white/50">
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{
                backgroundColor:
                  s.status === 'trusted' || s.status === 'stable' || s.status === 'normal'
                    ? '#4ade80'
                    : s.status === 'unknown' || s.status === 'elevated'
                    ? '#fb923c'
                    : '#f87171',
              }}
            />
            <span className="truncate">{s.name}: {s.value.split('—')[0].trim()}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/30">Click to run demo</span>
        <ArrowRight
          size={16}
          className={`transition-all ${isActive ? 'text-primary translate-x-1' : 'text-white/20'}`}
        />
      </div>
    </motion.div>
  );
}
