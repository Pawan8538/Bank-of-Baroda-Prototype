import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { counterAnim } from '@/utils/gsapAnimations';
import { XCircle } from 'lucide-react';

const SESSIONS = [
  { id: 'S-A12', device: 'Chrome / Windows', location: 'Mumbai', ip: '203.xx.xx.42' },
  { id: 'S-B34', device: 'Safari / iPhone', location: 'Delhi', ip: '103.xx.xx.18' },
  { id: 'S-C56', device: 'Edge / Android', location: 'Pune', ip: '117.xx.xx.91' },
];

export default function SessionRevocationPanel() {
  const countRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      counterAnim(countRef, 3, 0.8);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="text-white/60 text-xs uppercase tracking-wider font-semibold">Sessions Revoked</div>
        <div className="flex items-center gap-2">
          <span
            ref={countRef}
            className="text-2xl font-black text-red-400"
          >
            0
          </span>
          <span className="text-white/30 text-sm">sessions</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {SESSIONS.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.2 }}
            className="flex items-center gap-3 p-3 bg-red-950/30 border border-red-700/30 rounded-xl"
          >
            <XCircle size={16} className="text-red-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-white/80 text-xs font-medium">{s.device}</div>
              <div className="text-white/40 text-[10px]">{s.location} · {s.ip}</div>
            </div>
            <div className="text-red-400 text-[10px] font-bold uppercase">REVOKED</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-3 p-2.5 bg-orange-900/20 border border-orange-700/30 rounded-lg">
        <div className="text-orange-400 text-xs text-center">
          All JWT tokens invalidated · Sessions terminated
        </div>
      </div>
    </div>
  );
}
