import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield } from 'lucide-react';

export default function ProtectionModeAlert({ incidentId = 'INC-2026-00847' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-3xl border-2 border-red-500 bg-red-950/40 p-8 text-center"
      style={{ boxShadow: '0 0 80px rgba(183, 28, 28, 0.4)' }}
    >
      {/* Pulse rings */}
      <div className="absolute inset-0 rounded-3xl border-2 border-red-500 animate-ping opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center"
        >
          <Shield className="w-10 h-10 text-red-400" />
        </motion.div>

        <div>
          <div className="text-red-400 text-xs font-bold tracking-widest uppercase mb-2">
            🚨 Critical Threat Detected
          </div>
          <h2 className="text-white text-3xl font-black leading-tight">
            ACCOUNT PROTECTION MODE
            <br />
            <span className="text-red-400">ACTIVATED</span>
          </h2>
        </div>

        <div className="flex items-center gap-3 px-5 py-2.5 bg-red-900/40 border border-red-700/50 rounded-xl">
          <AlertTriangle size={14} className="text-red-400" />
          <span className="text-red-300 text-sm font-mono">Incident: {incidentId}</span>
        </div>

        <p className="text-white/60 text-sm max-w-md leading-relaxed">
          Multiple critical threat signals detected simultaneously. Account has been automatically
          secured. All recovery attempts are blocked for 72 hours.
        </p>
      </div>
    </motion.div>
  );
}
