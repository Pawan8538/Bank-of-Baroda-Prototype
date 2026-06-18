import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ShieldCheck } from 'lucide-react';
import PhoneFrameMockup from '@/components/verification/PhoneFrameMockup';
import BlinkVerification from '@/components/verification/BlinkVerification';

export default function BlinkScreen({ onNavigate }) {
  const handleVerified = () => {
    onNavigate('success', 'B');
  };

  return (
    <div className="min-h-full bg-background flex flex-col items-center justify-center px-8 py-10">
      <div className="max-w-3xl w-full text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Eye size={20} className="text-primary" />
            <span className="text-primary text-xs font-bold tracking-widest uppercase">
              Blink Liveness Verification
            </span>
          </div>
          <h1 className="text-corporate text-4xl font-black mb-3">Confirm Your Presence</h1>
          <p className="text-text-secondary font-medium text-lg max-w-lg mx-auto leading-relaxed">
            A new device was detected. A quick liveness check confirms it's really you.
            No passwords. Just a blink.
          </p>
        </motion.div>

        {/* Context banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-3 bg-orange-50 border border-orange-200 shadow-sm rounded-xl px-5 py-2.5 mb-10"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse shadow-sm" />
          <span className="text-orange-700 text-sm font-bold tracking-wide">
            New device FP_5541B · Bengaluru — Liveness required
          </span>
        </motion.div>

        {/* Phone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-10"
        >
          <PhoneFrameMockup>
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="text-slate-400 text-xs font-black uppercase tracking-widest">
                BoB Secure Verify
              </div>
              <BlinkVerification onVerified={handleVerified} />
            </div>
          </PhoneFrameMockup>
        </motion.div>

        {/* Trust note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2 text-text-secondary/60 text-xs font-semibold"
        >
          <ShieldCheck size={14} />
          <span>Passive biometric · No image stored · RBI-compliant</span>
        </motion.div>
      </div>
    </div>
  );
}
