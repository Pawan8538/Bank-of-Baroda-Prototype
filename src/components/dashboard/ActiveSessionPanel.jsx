import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { riskLevelConfig } from '@/utils/riskColour';
import { XCircle } from 'lucide-react';

export default function ActiveSessionPanel({ sessions = [] }) {
  const [revoked, setRevoked] = useState([]);

  const handleRevoke = (id) => setRevoked((prev) => [...prev, id]);

  return (
    <div className="card p-5">
      <div className="text-corporate font-bold text-lg mb-4">Active Sessions</div>
      <div className="flex flex-col gap-2.5">
        {sessions.map((s) => {
          const cfg = riskLevelConfig(s.riskLevel);
          const isRevoked = revoked.includes(s.id);
          return (
            <motion.div
              key={s.id}
              animate={{ opacity: isRevoked ? 0.4 : 1 }}
              className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl"
            >
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: cfg.hex }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-corporate text-xs font-bold truncate">{s.device}</div>
                <div className="text-text-secondary text-[10px] font-medium">{s.user} · {s.location} · {s.duration}</div>
              </div>
              {isRevoked ? (
                <span className="text-red-700 text-[10px] font-bold px-2 py-0.5 bg-red-50 rounded">REVOKED</span>
              ) : (
                <button
                  onClick={() => handleRevoke(s.id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded text-[10px] font-semibold transition-colors"
                >
                  <XCircle size={12} strokeWidth={2.5} />
                  Revoke
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
