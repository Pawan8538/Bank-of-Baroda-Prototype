import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft, BarChart3 } from 'lucide-react';
import scenarios from '@/mock/scenarios.json';
import { counterAnim } from '@/utils/gsapAnimations';

const MESSAGES = {
  A: 'Recovery approved instantly. No friction required for trusted users.',
  B: 'Liveness confirmed. New device FP_5541B registered for 30 days.',
};

const SCORES = { A: 91, B: 81 };

// Simple confetti particles
function Confetti() {
  const colours = ['#D4500A', '#1B7E3A', '#2B5797', '#E65100', '#ffffff'];
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="confetti-piece rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}px`,
            backgroundColor: colours[i % colours.length],
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function SuccessOutcome({ scenarioId = 'A', onNavigate }) {
  const scenario = scenarios.scenarios.find((s) => s.id === scenarioId) || scenarios.scenarios[0];
  const finalScore = SCORES[scenarioId] ?? scenario.trustScore;
  const scoreRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => counterAnim(scoreRef, finalScore, 1.2), 600);
    return () => clearTimeout(timer);
  }, [finalScore]);

  return (
    <div className="min-h-full bg-bob-gradient flex flex-col items-center justify-center px-8 py-12 relative overflow-hidden">
      <Confetti />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-lg w-full text-center">
        {/* Success circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, bounce: 0.5, delay: 0.2 }}
          className="w-32 h-32 rounded-full bg-green-900/30 border-2 border-green-500 flex items-center justify-center"
          style={{ boxShadow: '0 0 60px rgba(27, 126, 58, 0.4)' }}
        >
          <CheckCircle2 size={60} className="text-green-400" strokeWidth={1.5} />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-4xl font-black text-white mb-2">
            Recovery <span className="text-green-400">Successful</span>
          </h1>
          <p className="text-white/60 text-base leading-relaxed">
            {MESSAGES[scenarioId] || MESSAGES.A}
          </p>
        </motion.div>

        {/* Score card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6 w-full flex items-center justify-around"
        >
          <div className="text-center">
            <div className="text-white/40 text-xs mb-1">Final Trust Score</div>
            <div ref={scoreRef} className="text-4xl font-black text-green-400">0</div>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="text-center">
            <div className="text-white/40 text-xs mb-1">User</div>
            <div className="text-white font-bold">{scenario.name}</div>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="text-center">
            <div className="text-white/40 text-xs mb-1">Scenario</div>
            <div className="text-green-400 font-bold text-sm">{scenario.decision}</div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex items-center gap-4 w-full"
        >
          <button
            onClick={() => onNavigate('select')}
            className="flex-1 btn-outline flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            Return to Scenarios
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            View Dashboard
            <BarChart3 size={16} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
