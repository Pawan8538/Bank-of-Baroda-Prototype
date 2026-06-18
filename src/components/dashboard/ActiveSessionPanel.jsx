import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { riskLevelConfig } from '@/utils/riskColour';
import { XCircle } from 'lucide-react';

export default function ActiveSessionPanel({ sessions = [] }) {
  const [revoked, setRevoked] = useState([]);

  const handleRevoke = (id) => setRevoked((prev) => [...prev, id]);

  return (
    <div className="glass-card p-5">
      <div className="text-white font-semibold text-sm mb-4">Active Sessions</div>
      <div className="flex flex-col gap-2">
        {sessions.map((s) => {
          const cfg = riskLevelConfig(s.riskLevel);
          const isRevoked = revoked.includes(s.id);
          return (
            <motion.div
              key={s.id}
              animate={{ opacity: isRevoked ? 0.4 : 1 }}
              className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl"
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: cfg.hex }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-white/80 text-xs font-medium truncate">{s.device}</div>
                <div className="text-white/40 text-[10px]">{s.user} · {s.location} · {s.duration}</div>
              </div>
              {isRevoked ? (
                <span className="text-red-400 text-[10px] font-bold">REVOKED</span>
              ) : (
                <button
                  onClick={() => handleRevoke(s.id)}
                  className="flex items-center gap-1 text-red-400/70 hover:text-red-400 text-[10px] font-semibold transition-colors"
                >
                  <XCircle size={11} />
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
