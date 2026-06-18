import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export default function SMSAlertPreview() {
  return (
    <div className="card border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare size={16} className="text-slate-400" />
        <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">SMS Alert Preview</span>
        <span className="ml-auto text-green-600 text-[10px] font-black tracking-widest bg-green-50 px-2 py-1 rounded border border-green-100">DISPATCHED ✓</span>
      </div>

      {/* Phone SMS bubble */}
      <div className="flex items-end gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 border border-slate-300 shadow-sm">
          <span className="text-slate-600 text-[10px] font-bold">BoB</span>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -15, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="bg-slate-100 border border-slate-200 rounded-2xl rounded-bl-sm px-5 py-4 max-w-[280px] shadow-sm"
        >
          <div className="text-corporate font-medium text-sm leading-relaxed">
            <span className="font-black text-primary">BANK OF BARODA ALERT:</span>
            <br />
            A suspicious account recovery attempt was just blocked.
            If this wasn't you, tap here to report fraud immediately.
            <br />
            <span className="text-primary font-semibold text-sm mt-1 inline-block">→ bkofb.in/secure/7742</span>
          </div>
          <div className="text-slate-400 text-[10px] font-semibold mt-3 text-right">14:02 · +91-****-****-7742</div>
        </motion.div>
      </div>
    </div>
  );
}
