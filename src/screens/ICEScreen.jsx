import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, ArrowRight } from 'lucide-react';
import scenarios from '@/mock/scenarios.json';
import ConfidenceGauge from '@/components/identity/ConfidenceGauge';
import FactorBar from '@/components/identity/FactorBar';
import ExplainabilityPanel from '@/components/identity/ExplainabilityPanel';

export default function ICEScreen({ scenarioId = 'A', onNavigate }) {
  const scenario = scenarios.scenarios.find((s) => s.id === scenarioId) || scenarios.scenarios[0];
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-full bg-bob-gradient px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-1">
            <Cpu size={16} className="text-primary" />
            <span className="text-primary text-xs font-bold tracking-widest uppercase">
              Identity Confidence Engine
            </span>
          </div>
          <h1 className="text-white text-2xl font-bold">Computing Trust Score</h1>
          <p className="text-white/50 text-sm">{scenario.name} · {scenario.label}</p>
        </motion.div>

        {/* 3-column layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left: Factor bars */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 flex flex-col gap-5"
          >
            <div className="text-white/60 text-xs uppercase tracking-wider font-semibold border-b border-white/10 pb-3">
              Trust Factors
            </div>
            {scenario.factors.map((f, i) => (
              <FactorBar
                key={f.name}
                name={f.name}
                score={f.score}
                weight={f.weight}
                delay={0.3 + i * 0.15}
              />
            ))}
          </motion.div>

          {/* Centre: Gauge */}
          <div className="flex flex-col items-center justify-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <ConfidenceGauge score={scenario.trustScore} size={220} animated />
            </motion.div>

            {/* User context strip */}
            <div className="glass-card p-4 w-full text-center">
              <div className="text-white/40 text-xs mb-1">Evaluating</div>
              <div className="text-white font-bold">{scenario.name}</div>
              <div className="text-white/50 text-xs">{scenario.label}</div>
            </div>
          </div>

          {/* Right: Explainability */}
          <ExplainabilityPanel
            explanation={scenario.explanation}
            score={scenario.trustScore}
            factors={scenario.factors}
          />
        </div>

        {/* View Decision CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showButton ? 1 : 0 }}
          className="flex justify-center mt-8"
        >
          <button
            onClick={() => onNavigate('decision', scenarioId)}
            className="btn-primary flex items-center gap-2 text-base px-8 py-4"
          >
            View Decision
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
