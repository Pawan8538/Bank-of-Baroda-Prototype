import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowRight } from 'lucide-react';
import scenarios from '@/mock/scenarios.json';
import ScenarioCard from '@/components/scenarios/ScenarioCard';

export default function ScenarioSelect({ onNavigate }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (id) => {
    setSelected(id);
  };

  const handleBegin = () => {
    if (selected) onNavigate('signals', selected);
  };

  return (
    <div className="min-h-full bg-bob-gradient px-8 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Users size={18} className="text-primary" />
            <span className="text-primary text-xs font-bold tracking-widest uppercase">
              Interactive Demo
            </span>
          </div>
          <h1 className="section-title text-4xl">Choose a Scenario</h1>
          <p className="section-subtitle mt-2">
            Three real-world account recovery attempts. One platform. Different outcomes.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {scenarios.scenarios.map((s, i) => (
            <ScenarioCard
              key={s.id}
              scenario={s}
              isSelected={selected === null ? null : selected === s.id}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Begin button */}
        <motion.div
          className="flex justify-center"
          animate={{ opacity: selected ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={handleBegin}
            disabled={!selected}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all
              ${selected
                ? 'bg-primary text-white shadow-glow hover:bg-primary-dark'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
              }
            `}
          >
            Begin Signal Collection
            <ArrowRight size={18} />
          </button>
        </motion.div>

        {selected && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/30 text-xs mt-3"
          >
            Running: {scenarios.scenarios.find((s) => s.id === selected)?.name} — {scenarios.scenarios.find((s) => s.id === selected)?.label}
          </motion.p>
        )}
      </div>
    </div>
  );
}
