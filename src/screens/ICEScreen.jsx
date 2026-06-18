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
    <div className="min-h-full bg-background px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Cpu size={20} className="text-primary" />
            <span className="text-primary text-xs font-bold tracking-widest uppercase">
              Identity Confidence Engine
            </span>
          </div>
          <h1 className="text-corporate text-4xl font-black">Computing Trust Score</h1>
          <p className="text-text-secondary text-sm font-medium mt-2">
            {scenario.name} · {scenario.label}
          </p>
        </motion.div>

        {/* 3-column layout */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left: Factor bars */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6 flex flex-col gap-6"
          >
            <div className="text-text-secondary text-xs uppercase tracking-widest font-bold border-b border-border pb-4">
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
          <div className="flex flex-col items-center justify-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="bg-white rounded-full p-6 shadow-sm border border-slate-100"
            >
              <ConfidenceGauge score={scenario.trustScore} size={220} animated />
            </motion.div>

            {/* User context strip */}
            <div className="card p-5 w-full text-center bg-slate-50 border-slate-200">
              <div className="text-text-secondary text-xs font-semibold uppercase tracking-wider mb-2">Evaluating</div>
              <div className="text-corporate font-bold text-lg">{scenario.name}</div>
              <div className="text-text-secondary font-medium text-xs mt-1">{scenario.label}</div>
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
          className="flex justify-center mt-12"
        >
          <button
            onClick={() => onNavigate('decision', scenarioId)}
            className="btn-primary flex items-center gap-3 text-lg px-10 py-4 shadow-sm"
          >
            View Decision
            <ArrowRight size={20} strokeWidth={2.5} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
