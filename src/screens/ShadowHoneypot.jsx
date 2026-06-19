import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Send, ArrowRight, EyeOff, Activity } from 'lucide-react';

export default function ShadowHoneypot({ onNavigate }) {
  const [fakeTransfer, setFakeTransfer] = useState(false);

  return (
    <div className="min-h-full bg-transparent flex flex-col items-center justify-center px-8 py-10 relative overflow-hidden">
      
      {/* The Fake User Dashboard (What the attacker sees) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden relative z-10"
      >
        <div className="bg-corporate px-6 py-4 text-white flex justify-between items-center">
          <div className="font-bold text-lg">My Accounts</div>
          <div className="text-xs opacity-70">Welcome back</div>
        </div>
        
        <div className="p-8 flex gap-8">
          {/* Fake Balance */}
          <div className="flex-1">
            <div className="text-text-secondary font-medium mb-2">Savings Account (**** 4421)</div>
            <div className="text-4xl font-black text-corporate mb-6">₹ 4,52,000.00</div>
            
            <div className="space-y-4">
              <div className="font-bold text-sm text-corporate border-b pb-2">Recent Activity</div>
              <div className="flex justify-between text-sm py-2 border-b border-slate-100">
                <span>Zomato</span>
                <span className="text-red-500 font-medium">- ₹ 450</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-slate-100">
                <span>Salary Credit</span>
                <span className="text-green-600 font-medium">+ ₹ 1,20,000</span>
              </div>
            </div>
          </div>
          
          {/* Fake Transfer Panel */}
          <div className="w-[300px] bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div className="font-bold text-corporate mb-4">Quick Transfer</div>
            <div className="bg-white border border-slate-200 p-3 rounded-lg text-sm text-text-secondary mb-4">
              To: Unknown Beneficiary
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-lg text-sm text-corporate font-bold mb-4">
              ₹ 50,000
            </div>
            <button 
              onClick={() => setFakeTransfer(true)}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2"
            >
              <Send size={16} /> Send Money
            </button>
            
            {fakeTransfer && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 text-xs font-bold rounded-lg text-center"
              >
                Transfer Successful!
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* The "Judge/Presenter" Overlay (Revealing the Honeypot) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-3xl bg-slate-900 border border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-2xl p-6 z-50 text-white flex flex-col items-center text-center overflow-hidden"
      >
        {/* Radar scanning background effect */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #4ade80 2px, #4ade80 4px)', backgroundSize: '100% 4px' }} />
        
        <div className="relative z-10 flex items-center gap-3 mb-3 text-green-400">
          <EyeOff size={24} />
          <h2 className="text-xl font-black tracking-widest uppercase">Shadow Infrastructure Active</h2>
          <EyeOff size={24} />
        </div>
        
        <p className="text-slate-300 font-medium text-sm max-w-xl leading-relaxed mb-6">
          The attacker is currently interacting with a heavily monitored decoy ledger. 
          {fakeTransfer ? (
            <span className="text-red-400 block mt-2 font-bold animate-pulse">
              ⚠ FAKE TRANSFER INTERCEPTED. Funds routed to holding ledger. Threat intel captured.
            </span>
          ) : (
            <span className="block mt-2">
              Waiting for attacker to make a move. Harvesting IP, keystroke dynamics, and device vectors...
            </span>
          )}
        </p>
        
        <div className="flex gap-4 w-full justify-center">
          <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 flex items-center gap-2">
            <Activity size={14} className="text-green-400" />
            <span className="text-xs font-mono text-slate-300">Target IP: 192.168.1.x (Logged)</span>
          </div>
          <button 
            onClick={() => onNavigate('protection')}
            className="bg-white text-slate-900 hover:bg-slate-200 px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors"
          >
            Review Security Incident <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
      
    </div>
  );
}
