import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';
import timelineData from '@/mock/timeline.json';
import TimelineTrack from '@/components/timeline/TimelineTrack';

const severityConfig = {
  info: { bg: 'bg-blue-900/30', border: 'border-blue-700/30', text: 'text-blue-300' },
  warning: { bg: 'bg-orange-900/30', border: 'border-orange-700/30', text: 'text-orange-300' },
  critical: { bg: 'bg-red-900/30', border: 'border-red-700/30', text: 'text-red-300' },
};

export default function IncidentTimeline({ onNavigate }) {
  const [selectedId, setSelectedId] = useState(null);
  const selectedEvent = timelineData.events.find((e) => e.t === selectedId);
  const cfg = selectedEvent ? (severityConfig[selectedEvent.severity] || severityConfig.info) : null;

  return (
    <div className="min-h-full bg-bob-gradient px-8 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-1">
            <FileText size={16} className="text-primary" />
            <span className="text-primary text-xs font-bold tracking-widest uppercase">
              Forensic Audit Log
            </span>
          </div>
          <h1 className="text-white text-2xl font-bold">Incident Timeline</h1>
          <p className="text-white/50 text-sm">
            Incident {timelineData.incidentId} · Immutable record · 10 events in 5 seconds
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8">
          {/* Timeline */}
          <div className="glass-card p-6 overflow-y-auto max-h-[600px]">
            <TimelineTrack
              events={timelineData.events}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          {/* Detail panel */}
          <div>
            <AnimatePresence mode="wait">
              {selectedEvent ? (
                <motion.div
                  key={selectedEvent.t}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`glass-card p-6 border ${cfg.border} ${cfg.bg}`}
                >
                  <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${cfg.text}`}>
                    {selectedEvent.severity} event
                  </div>
                  <div className="text-white font-bold text-lg mb-2">{selectedEvent.actor}</div>
                  <div className="font-mono text-xs text-white/40 mb-4">{selectedEvent.t}</div>
                  <p className="text-white/80 leading-relaxed">{selectedEvent.action}</p>

                  {/* Fake extra detail */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex flex-col gap-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Incident ID</span>
                      <span className="text-white/70 font-mono">{timelineData.incidentId}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Rule triggered</span>
                      <span className="text-white/70 font-mono">AUTO_BLOCK_CRITICAL</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Logged</span>
                      <span className="text-white/70 font-mono">Immutable · Audit Ledger</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-10 flex flex-col items-center justify-center text-center h-64"
                >
                  <FileText size={28} className="text-white/20 mb-3" />
                  <p className="text-white/30 text-sm">Click any event to view details</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={() => onNavigate('dashboard')}
              className="mt-5 btn-primary flex items-center gap-2 w-full justify-center"
            >
              View Fraud Ops Center
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
