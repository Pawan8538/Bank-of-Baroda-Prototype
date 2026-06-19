import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Smartphone, ShieldAlert, ArrowRight, Lock } from 'lucide-react';

export default function CustomerAttackView({ onNavigate }) {
  const [transferState, setTransferState] = useState('idle'); // idle, processing, sms, locked

  const handleTransfer = () => {
    setTransferState('processing');
    setTimeout(() => {
      setTransferState('sms');
    }, 1500);
  };

  const handleLockAccount = () => {
    setTransferState('locked');
  };

  return (
    <div className="min-h-full bg-slate-50 flex flex-col relative overflow-hidden">
      
      {/* Top Warning Label for Judges */}
      <div className="bg-blue-50 text-blue-700 border-b border-blue-200 px-6 py-2 text-xs font-bold text-center tracking-widest uppercase">
        Customer Web POV (Simulated Attack Scenario)
      </div>

      {/* Fake Bank Web Interface */}
      <div className="w-full max-w-5xl mx-auto mt-10 bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
        {/* Fake Header */}
        <div className="bg-[#F15A29] px-8 py-5 text-white flex justify-between items-center">
          <div className="font-black text-2xl tracking-tight">Bank of Baroda <span className="font-normal opacity-80 text-lg">| NetBanking</span></div>
          <div className="text-sm font-medium flex items-center gap-4">
            <span>Welcome, Ramesh K.</span>
            <button className="text-white/80 hover:text-white border border-white/30 px-3 py-1 rounded text-xs">Logout</button>
          </div>
        </div>
        
        <div className="p-10 flex gap-10">
          {/* Fake Balance */}
          <div className="flex-1">
            <div className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-2">Savings Account (**** 4421)</div>
            <div className="text-5xl font-black text-slate-800 mb-8">₹ 4,52,000.00</div>
            
            <div className="space-y-4">
              <div className="font-bold text-sm text-slate-400 border-b border-slate-100 pb-2 uppercase tracking-wider">Recent Activity</div>
              <div className="flex justify-between text-sm py-3 border-b border-slate-50">
                <span className="font-medium text-slate-700">Zomato Food Order</span>
                <span className="text-red-500 font-bold">- ₹ 450</span>
              </div>
              <div className="flex justify-between text-sm py-3 border-b border-slate-50">
                <span className="font-medium text-slate-700">Salary Credit</span>
                <span className="text-green-600 font-bold">+ ₹ 1,20,000</span>
              </div>
            </div>
          </div>
          
          {/* Fake Transfer Panel */}
          <div className="w-[350px] bg-slate-50 p-8 rounded-xl border border-slate-200 shadow-inner">
            <div className="font-black text-slate-800 text-lg mb-6">Quick Transfer</div>
            <div className="bg-white border border-slate-200 p-4 rounded-lg text-sm text-slate-500 mb-4 font-mono">
              To: UNKNOWN_BENEFICIARY
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-lg text-xl text-slate-800 font-black mb-6">
              ₹ 50,000
            </div>
            <button 
              onClick={handleTransfer}
              disabled={transferState !== 'idle'}
              className="w-full bg-[#F15A29] hover:bg-[#D94F22] disabled:opacity-50 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              <Send size={18} /> 
              {transferState === 'idle' ? 'Send Money' : 'Processing Transfer...'}
            </button>
            
            {transferState === 'processing' && (
               <div className="mt-4 text-center text-xs text-slate-500 animate-pulse">
                 Verifying details securely...
               </div>
            )}

            {(transferState === 'sms' || transferState === 'locked') && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-50 border border-green-200 text-green-700 text-sm font-bold rounded-lg text-center"
              >
                Transfer Successful!
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* The Victim's Phone / SMS Overlay */}
      <AnimatePresence>
        {transferState === 'sms' && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className="fixed bottom-10 right-10 w-[340px] bg-white border border-slate-200 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] rounded-3xl overflow-hidden z-50 flex flex-col"
          >
            <div className="bg-slate-100 py-3 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200">
              Victim's Mobile Phone
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4 text-[#F15A29]">
                <Smartphone size={24} />
                <span className="font-bold">New Message</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                <strong>BoB Alert:</strong> Suspicious login attempt from a new device in Moscow, RU. If this was not you, lock your account instantly.
              </p>
              <button 
                onClick={handleLockAccount}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 shadow-md"
              >
                <Lock size={16} /> It Wasn't Me - Lock Account
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Account Locked Resolution Screen */}
      <AnimatePresence>
        {transferState === 'locked' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-3xl p-10 max-w-lg w-full text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldAlert size={40} />
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-4">Account Secured</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Thank you for confirming. Your account is now locked. All active sessions have been instantly revoked and the fraudster has been isolated. Your funds are 100% safe.
              </p>
              <button 
                onClick={() => onNavigate('landing')}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-colors"
              >
                Return to Demo Menu <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
