import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Shield, Zap, ArrowLeft } from 'lucide-react';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

const impacts = [
  { icon: TrendingUp, value: 85, suffix: '%', label: 'Reduction in successful SIM swap frauds', colour: '#1B7E3A' },
  { icon: Users, value: 1203847, suffix: '+', label: 'Users protected in simulated 24h period', colour: '#2B5797' },
  { icon: Shield, value: 94, suffix: '%', label: 'Legitimate users approved with zero friction', colour: '#D4500A' },
  { icon: Zap, value: 180, suffix: 'ms', label: 'Average decision latency', colour: '#E65100' },
];

function ImpactStat({ impact }) {
  const { ref } = useAnimatedCounter(impact.value, { suffix: impact.suffix, localize: impact.value > 1000 });
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 flex flex-col items-center text-center gap-3"
    >
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: impact.colour + '20', border: `2px solid ${impact.colour}30` }}>
        <impact.icon size={26} style={{ color: impact.colour }} strokeWidth={1.5} />
      </div>
      <div ref={ref} className="text-4xl font-black" style={{ color: impact.colour }}>
        0
      </div>
      <div className="text-white/60 text-sm leading-tight">{impact.label}</div>
    </motion.div>
  );
}

export default function BusinessImpact({ onNavigate }) {
  return (
    <div className="min-h-full bg-bob-gradient px-8 py-12 flex flex-col">
      <div className="max-w-5xl mx-auto flex-1 flex flex-col">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <TrendingUp size={18} className="text-primary" />
            <span className="text-primary text-xs font-bold tracking-widest uppercase">Business Impact</span>
          </div>
          <h1 className="text-5xl font-black text-white mb-4">
            Real Results for <span className="text-gradient-primary">Real People</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
            The Identity Trust Platform stops fraud before it happens — without adding friction
            for the 94% of users who are legitimate.
          </p>
        </motion.div>

        {/* Impact stats */}
        <div className="grid grid-cols-2 gap-5 mb-10 flex-1">
          {impacts.map((impact, i) => (
            <motion.div key={impact.label} transition={{ delay: i * 0.15 }}>
              <ImpactStat impact={impact} />
            </motion.div>
          ))}
        </div>

        {/* Final quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-8 text-center mb-8 border border-primary/20"
        >
          <p className="text-white/80 text-lg italic leading-relaxed">
            "Protecting 50 million customers at the moment of highest vulnerability —
            not with more friction, but with more intelligence."
          </p>
          <div className="text-primary/60 text-sm mt-3 font-semibold">
            — Identity Trust Platform · Bank of Baroda × IIT-GN 2026
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <button onClick={() => onNavigate('select')} className="btn-outline flex items-center gap-2">
            <ArrowLeft size={16} /> Run Demo Again
          </button>
          <button onClick={() => onNavigate('landing')} className="btn-primary flex items-center gap-2">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
