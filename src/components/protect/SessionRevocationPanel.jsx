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
    <div className="card border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Sessions Revoked</div>
        <div className="flex items-center gap-2">
          <span
            ref={countRef}
            className="text-3xl font-black text-red-600 leading-none"
          >
            0
          </span>
          <span className="text-slate-400 font-semibold text-xs uppercase tracking-wide">sessions</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {SESSIONS.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.2 }}
            className="flex items-center gap-4 p-3.5 bg-red-50 border border-red-100 rounded-xl shadow-sm"
          >
            <XCircle size={18} className="text-red-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-corporate font-bold text-sm">{s.device}</div>
              <div className="text-text-secondary font-medium text-[11px] mt-0.5">{s.location} · {s.ip}</div>
            </div>
            <div className="text-red-600 text-[10px] font-black uppercase tracking-wider bg-red-100 px-2 py-1 rounded">REVOKED</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-xl shadow-sm">
        <div className="text-orange-700 text-xs font-semibold text-center uppercase tracking-wide">
          All JWT tokens invalidated · Sessions terminated
        </div>
      </div>
    </div>
  );
}
