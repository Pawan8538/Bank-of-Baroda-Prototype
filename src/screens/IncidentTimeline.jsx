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
    <div className="min-h-full bg-background px-8 py-8">
      <div className="max-w-6xl mx-auto">
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
          <h1 className="text-corporate text-3xl font-black">Incident Timeline</h1>
          <p className="text-text-secondary text-sm font-medium mt-1">
            Incident {timelineData.incidentId} · Immutable record · 10 events in 5 seconds
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-10">
          {/* Timeline */}
          <div className="card p-8 bg-slate-50 border-slate-200 overflow-y-auto max-h-[600px] shadow-sm">
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
                  className={`card p-8 border ${cfg.border} ${cfg.bg} shadow-md`}
                >
                  <div className={`text-xs font-bold uppercase tracking-widest mb-4 ${cfg.text}`}>
                    {selectedEvent.severity} event
                  </div>
                  <div className="text-corporate font-bold text-xl mb-2">{selectedEvent.actor}</div>
                  <div className="font-mono text-xs text-text-secondary/70 mb-5 font-semibold">{selectedEvent.t}</div>
                  <p className="text-text-secondary font-medium leading-relaxed mb-6">{selectedEvent.action}</p>

                  {/* Fake extra detail */}
                  <div className="mt-6 pt-5 border-t border-slate-200/50 flex flex-col gap-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary/60 font-medium">Incident ID</span>
                      <span className="text-corporate font-mono font-bold">{timelineData.incidentId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary/60 font-medium">Rule triggered</span>
                      <span className="text-corporate font-mono font-bold">AUTO_BLOCK_CRITICAL</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary/60 font-medium">Logged</span>
                      <span className="text-green-600 font-mono font-bold">Immutable · Audit Ledger</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="card p-10 flex flex-col items-center justify-center text-center h-64 bg-slate-50 border-slate-200 border-dashed"
                >
                  <FileText size={32} className="text-slate-300 mb-4" />
                  <p className="text-text-secondary font-medium text-sm">Click any event to view details</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={() => onNavigate('dashboard')}
              className="mt-8 btn-primary flex items-center gap-3 text-lg w-full justify-center py-4 shadow-sm"
            >
              View Fraud Ops Center
              <ArrowRight size={20} strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
