import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { blinkRingAnim } from '@/utils/gsapAnimations';
import { CheckCircle2, Eye } from 'lucide-react';

export default function BlinkVerification({ onVerified }) {
  const ringRef = useRef(null);
  const [phase, setPhase] = useState('idle'); // idle | scanning | done

  const handleSimulate = () => {
    if (phase !== 'idle') return;
    setPhase('scanning');
    const circumference = 2 * Math.PI * 54;
    if (ringRef.current) {
      ringRef.current.style.strokeDasharray = circumference;
      ringRef.current.style.strokeDashoffset = circumference;
    }
    blinkRingAnim(ringRef, () => {
      setPhase('done');
      setTimeout(() => onVerified?.(), 1500);
    });
  };

  const circumference = 2 * Math.PI * 54;

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      {/* Face scan area */}
      <div className="relative w-48 h-48">
        {/* Outer ring */}
        <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 120 120">
          {/* Background ring */}
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
          {/* Progress ring */}
          <circle
            ref={ringRef}
            cx="60" cy="60" r="54"
            fill="none"
            stroke={phase === 'done' ? '#1B7E3A' : '#D4500A'}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            style={{ transition: 'stroke 0.3s' }}
          />
        </svg>

        {/* Face oval */}
        <div className="absolute inset-4 rounded-full border-2 border-primary/50 overflow-hidden bg-navy-700/50 flex items-center justify-center">
          {/* Scan line animation */}
          {phase === 'scanning' && (
            <motion.div
              className="absolute left-0 right-0 h-0.5 bg-primary/60"
              animate={{ top: ['10%', '90%', '10%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          )}

          <AnimatePresence mode="wait">
            {phase === 'done' ? (
              <motion.div
                key="done"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="flex flex-col items-center gap-1"
              >
                <CheckCircle2 size={40} className="text-green-400" />
                <span className="text-green-400 text-xs font-bold">VERIFIED</span>
              </motion.div>
            ) : (
              <motion.div
                key="face"
                className="flex flex-col items-center gap-1"
                animate={{ scale: phase === 'scanning' ? [0.98, 1.02, 0.98] : 1 }}
                transition={{ duration: 1.5, repeat: phase === 'scanning' ? Infinity : 0 }}
              >
                <Eye size={24} className="text-white/30" />
                <span className="text-white/30 text-xs">
                  {phase === 'idle' ? 'Position face here' : 'Scanning...'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Instruction */}
      <div className="text-center">
        <p className="text-white/70 text-sm font-medium">
          {phase === 'idle' && 'Please blink naturally to verify your presence'}
          {phase === 'scanning' && 'Liveness check in progress...'}
          {phase === 'done' && '✓ Liveness Confirmed — Proceeding...'}
        </p>
      </div>

      {/* CTA */}
      <AnimatePresence>
        {phase === 'idle' && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={handleSimulate}
            className="btn-primary"
          >
            Simulate Blink →
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
