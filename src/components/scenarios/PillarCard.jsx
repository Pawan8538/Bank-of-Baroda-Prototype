import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function PillarCard({ pillar, delay = 0 }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = pillar.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 30 }}
      layout
      className={`
        glass-card overflow-hidden cursor-pointer transition-all duration-200
        hover:border-primary/30 border border-white/10
        ${expanded ? 'border-primary/40' : ''}
      `}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header */}
      <div className={`p-6 flex items-start justify-between`}>
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: pillar.colour + '20', border: `2px solid ${pillar.colour}30` }}
          >
            <Icon size={22} style={{ color: pillar.colour }} strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-white font-bold text-base">{pillar.label}</div>
            <div className="text-white/50 text-sm">{pillar.subtitle}</div>
          </div>
        </div>
        <div className="text-white/30 mt-1">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {/* Expanded features */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-white/10 pt-4 flex flex-col gap-2">
              {pillar.features.map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3 text-sm"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: pillar.colour }}
                  />
                  <div>
                    <div className="text-white/80 font-medium">{f.name}</div>
                    {f.desc && <div className="text-white/40 text-xs mt-0.5">{f.desc}</div>}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
