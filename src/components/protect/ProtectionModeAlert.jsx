import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Fingerprint } from 'lucide-react';

export default function ProtectionModeAlert({ incidentId = 'INC-2026-00847' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-3xl border-2 border-red-300 bg-red-50 p-8 text-center shadow-lg"
      style={{ boxShadow: '0 20px 60px rgba(183, 28, 28, 0.1)' }}
    >
      {/* Pulse rings */}
      <div className="absolute inset-0 rounded-3xl border-2 border-red-400 animate-ping opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-20 h-20 rounded-full bg-red-100 border-[3px] border-red-300 flex items-center justify-center shadow-inner relative"
        >
          <Shield className="w-12 h-12 text-red-600" strokeWidth={1.5} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Fingerprint className="w-6 h-6 text-red-600" strokeWidth={2} />
          </div>
        </motion.div>

        <div>
          <div className="text-red-600 text-xs font-black tracking-widest uppercase mb-2">
            🚨 Critical Threat Detected
          </div>
          <h2 className="text-corporate text-4xl font-black leading-tight">
            ACCOUNT PROTECTION MODE
            <br />
            <span className="text-red-600">ACTIVATED</span>
          </h2>
        </div>

        <div className="flex items-center gap-3 px-5 py-2.5 bg-white border border-red-200 shadow-sm rounded-xl">
          <AlertTriangle size={16} className="text-red-500" />
          <span className="text-red-700 text-sm font-mono font-bold tracking-wide">Incident: {incidentId}</span>
        </div>

        <p className="text-text-secondary text-base font-medium max-w-md leading-relaxed mt-2">
          Multiple critical threat signals detected simultaneously. Account has been automatically
          secured. All recovery attempts are blocked for 72 hours.
        </p>
      </div>
    </motion.div>
  );
}
