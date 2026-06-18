import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowRight } from 'lucide-react';
import scenarios from '@/mock/scenarios.json';
import { useSignalFeed } from '@/hooks/useSignalFeed';
import SignalFeedItem from '@/components/signals/SignalFeedItem';
import SignalMapPanel from '@/components/signals/SignalMapPanel';

export default function SignalCollection({ scenarioId = 'A', onNavigate }) {
  const scenario = scenarios.scenarios.find((s) => s.id === scenarioId) || scenarios.scenarios[0];
  const { signals, isComplete } = useSignalFeed(scenario.signals);

  const progress = scenario.signals.length > 0
    ? (signals.length / scenario.signals.length) * 100
    : 0;

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => onNavigate('ice', scenarioId), 1200);
      return () => clearTimeout(timer);
    }
  }, [isComplete, scenarioId]);

  return (
    <div className="min-h-full bg-transparent px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity size={16} className="text-primary" />
              <span className="text-primary text-xs font-bold tracking-widest uppercase">
                Signal Collection
              </span>
            </div>
            <h1 className="text-corporate text-3xl font-black">Analysing Identity Signals</h1>
            <p className="text-text-secondary font-medium text-sm mt-1">
              {scenario.name} · {scenario.label}
            </p>
          </div>

          {isComplete && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => onNavigate('ice', scenarioId)}
              className="btn-primary flex items-center gap-2 shadow-sm"
            >
              Analyse Risk
              <ArrowRight size={18} />
            </motion.button>
          )}
        </motion.div>

        {/* Content: Map + Feed */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Map */}
          <div className="h-96">
            <SignalMapPanel scenarioId={scenarioId} />
          </div>

          {/* Signal feed */}
          <div className="flex flex-col gap-3">
            <div className="text-text-secondary text-xs uppercase tracking-widest font-bold mb-1">
              Live Signal Feed
            </div>
            {signals.map((s, i) => (
              <SignalFeedItem key={s.id} signal={s} index={i} />
            ))}
            {signals.length < scenario.signals.length && (
              <div className="flex items-center gap-3 p-4 border border-border bg-slate-50 rounded-xl border-dashed">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="text-text-secondary font-medium text-sm">Collecting signals...</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <div className="flex justify-between text-xs text-text-secondary font-bold uppercase tracking-wider">
            <span>Signal collection progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-orange-400 to-primary rounded-full"
            />
          </div>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-green-700 text-xs font-bold mt-3 bg-green-50 py-1.5 rounded-md"
            >
              ✓ All signals collected — Computing identity confidence score...
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
