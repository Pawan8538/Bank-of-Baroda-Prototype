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
        card overflow-hidden cursor-pointer transition-all duration-200 bg-white
        hover:border-primary/40 hover:shadow-md border border-slate-200
        ${expanded ? 'border-primary/50 shadow-md ring-1 ring-primary/10' : ''}
      `}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header */}
      <div className={`p-6 flex items-start justify-between ${expanded ? 'bg-slate-50' : ''}`}>
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white shadow-sm"
            style={{ border: `1px solid ${pillar.colour}30`, boxShadow: `0 2px 8px ${pillar.colour}15` }}
          >
            <Icon size={24} style={{ color: pillar.colour }} strokeWidth={2} />
          </div>
          <div>
            <div className="text-corporate font-bold text-lg">{pillar.label}</div>
            <div className="text-text-secondary font-medium text-sm mt-0.5">{pillar.subtitle}</div>
          </div>
        </div>
        <div className={`mt-2 transition-colors ${expanded ? 'text-primary' : 'text-slate-400'}`}>
          {expanded ? <ChevronUp size={20} strokeWidth={2.5} /> : <ChevronDown size={20} />}
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
            className="overflow-hidden bg-white"
          >
            <div className="px-6 pb-6 border-t border-slate-100 pt-5 flex flex-col gap-3">
              {pillar.features.map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3.5 text-sm"
                >
                  <div
                    className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: pillar.colour }}
                  />
                  <div>
                    <div className="text-corporate font-bold leading-tight">{f.name}</div>
                    {f.desc && <div className="text-text-secondary font-medium text-xs mt-1 leading-snug">{f.desc}</div>}
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
