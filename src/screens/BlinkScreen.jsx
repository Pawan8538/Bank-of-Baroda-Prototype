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
    <div className="min-h-full bg-bob-gradient flex flex-col items-center justify-center px-8 py-10">
      <div className="max-w-3xl w-full text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Eye size={18} className="text-primary" />
            <span className="text-primary text-xs font-bold tracking-widest uppercase">
              Blink Liveness Verification
            </span>
          </div>
          <h1 className="text-white text-3xl font-black mb-2">Confirm Your Presence</h1>
          <p className="text-white/50">
            A new device was detected. A quick liveness check confirms it's really you.
            No passwords. Just a blink.
          </p>
        </motion.div>

        {/* Context banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-orange-900/30 border border-orange-700/40 rounded-xl px-4 py-2 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
          <span className="text-orange-300 text-sm">
            New device FP_5541B · Bengaluru — Liveness required
          </span>
        </motion.div>

        {/* Phone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <PhoneFrameMockup>
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="text-white/60 text-xs font-semibold uppercase tracking-wider">
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
          className="flex items-center justify-center gap-2 text-white/30 text-xs"
        >
          <ShieldCheck size={12} />
          <span>Passive biometric · No image stored · RBI-compliant</span>
        </motion.div>
      </div>
    </div>
  );
}
