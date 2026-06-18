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
    <div className="min-h-full bg-bob-gradient px-8 py-8">
      <div className="max-w-5xl mx-auto">
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
            <h1 className="text-white text-2xl font-bold">Analysing Identity Signals</h1>
            <p className="text-white/50 text-sm">
              {scenario.name} · {scenario.label}
            </p>
          </div>

          {isComplete && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => onNavigate('ice', scenarioId)}
              className="btn-primary flex items-center gap-2"
            >
              Analyse Risk
              <ArrowRight size={16} />
            </motion.button>
          )}
        </motion.div>

        {/* Content: Map + Feed */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Map */}
          <div className="h-80">
            <SignalMapPanel scenarioId={scenarioId} />
          </div>

          {/* Signal feed */}
          <div className="flex flex-col gap-3">
            <div className="text-white/50 text-xs uppercase tracking-wider font-semibold">
              Live Signal Feed
            </div>
            {signals.map((s, i) => (
              <SignalFeedItem key={s.id} signal={s} index={i} />
            ))}
            {signals.length < scenario.signals.length && (
              <div className="flex items-center gap-2 p-4 border border-white/10 rounded-xl border-dashed">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-white/30 text-sm">Collecting signals...</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-white/40">
            <span>Signal collection progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full"
            />
          </div>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-green-400 text-xs font-semibold mt-2"
            >
              ✓ All signals collected — Computing identity confidence score...
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
