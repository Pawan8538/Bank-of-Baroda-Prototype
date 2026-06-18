import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export default function SMSAlertPreview() {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare size={14} className="text-white/40" />
        <span className="text-white/40 text-xs uppercase tracking-wider font-semibold">SMS Alert Preview</span>
        <span className="ml-auto text-green-400 text-xs font-semibold">DISPATCHED ✓</span>
      </div>

      {/* Phone SMS bubble */}
      <div className="flex items-end gap-3">
        <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center flex-shrink-0">
          <span className="text-white/60 text-xs">BoB</span>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -15, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="bg-navy-700 rounded-2xl rounded-bl-sm px-4 py-3 max-w-xs"
        >
          <div className="text-white/90 text-sm leading-relaxed">
            <span className="font-bold text-primary">BANK OF BARODA ALERT:</span>
            <br />
            A suspicious account recovery attempt was just blocked.
            If this wasn't you, tap here to report fraud immediately.
            <br />
            <span className="text-primary/80 text-xs">→ bkofb.in/secure/7742</span>
          </div>
          <div className="text-white/30 text-[10px] mt-2 text-right">14:02 · +91-****-****-7742</div>
        </motion.div>
      </div>
    </div>
  );
}
