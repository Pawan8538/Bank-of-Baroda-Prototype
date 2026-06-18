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
    <div className="min-h-full bg-background px-8 py-10">
      <div className="max-w-6xl mx-auto">
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
          <p className="section-subtitle mt-3">
            Three real-world account recovery attempts. One platform. Different outcomes.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-8 mb-12">
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
          className="flex flex-col items-center justify-center"
          animate={{ opacity: selected ? 1 : 0.4 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={handleBegin}
            disabled={!selected}
            className={`flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-sm
              ${selected
                ? 'bg-primary text-white hover:bg-orange-600 hover:shadow-md'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              }
            `}
          >
            Begin Signal Collection
            <ArrowRight size={20} />
          </button>
          
          {selected && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-text-secondary font-medium text-sm mt-4"
            >
              Running: <span className="text-corporate font-bold">{scenarios.scenarios.find((s) => s.id === selected)?.name}</span> — {scenarios.scenarios.find((s) => s.id === selected)?.label}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
