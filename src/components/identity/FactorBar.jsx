import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { riskColour } from '@/utils/riskColour';

export default function FactorBar({ name, score, weight, delay = 0 }) {
  const barRef = useRef(null);
  const colours = riskColour(score);

  useEffect(() => {
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { width: '0%' },
        { width: `${score}%`, duration: 0.8, delay, ease: 'power2.out' }
      );
    }
  }, [score, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="flex flex-col gap-1.5"
    >
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/80 font-medium">{name}</span>
        <div className="flex items-center gap-2">
          <span className="text-white/40">weight {weight}%</span>
          <span className="font-bold" style={{ color: colours.hex }}>
            {score}
          </span>
        </div>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{
            width: '0%',
            backgroundColor: colours.hex,
            boxShadow: `0 0 8px ${colours.hex}60`,
          }}
        />
      </div>
    </motion.div>
  );
}
