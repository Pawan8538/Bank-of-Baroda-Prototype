import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft, ArrowRight, BarChart3, AlertTriangle, ShieldAlert } from 'lucide-react';
import scenarios from '@/mock/scenarios.json';
import { counterAnim } from '@/utils/gsapAnimations';

export default function DuressOutcome({ scenarioId = 'D', onNavigate }) {
  const scenario = scenarios.scenarios.find((s) => s.id === scenarioId) || scenarios.scenarios[0];
  const finalScore = scenario.trustScore;
  const scoreRef = useRef(null);
  const [showOpsOverlay, setShowOpsOverlay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => counterAnim(scoreRef, finalScore, 1.2), 600);
    // Show the Ops overlay after a delay to surprise the judges
    const overlayTimer = setTimeout(() => setShowOpsOverlay(true), 2500);
    return () => {
      clearTimeout(timer);
      clearTimeout(overlayTimer);
    };
  }, [finalScore]);

  return (
    <div className="min-h-full bg-transparent flex flex-col items-center justify-center px-8 py-12 relative overflow-hidden">
      
      {/* What the attacker/coercer sees (Looks like a normal success) */}
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-lg w-full text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, bounce: 0.5, delay: 0.2 }}
          className="w-32 h-32 rounded-full bg-green-50 border-[3px] border-green-200 flex items-center justify-center"
          style={{ boxShadow: '0 10px 40px rgba(27, 126, 58, 0.15)' }}
        >
          <CheckCircle2 size={64} className="text-green-600" strokeWidth={2} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-4xl font-black text-corporate mb-3">
            Login <span className="text-green-600">Successful</span>
          </h1>
          <p className="text-text-secondary text-lg font-medium max-w-sm mx-auto leading-relaxed">
            Welcome back. Your account is fully unlocked and ready to use.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="card p-6 w-full flex items-center justify-around bg-white border-slate-200 shadow-sm"
        >
          <div className="text-center">
            <div className="text-text-secondary/60 text-[10px] font-bold uppercase tracking-widest mb-1">Trust Score</div>
            <div ref={scoreRef} className="text-4xl font-black text-green-600">0</div>
          </div>
          <div className="w-px h-12 bg-slate-200" />
          <div className="text-center">
            <div className="text-text-secondary/60 text-[10px] font-bold uppercase tracking-widest mb-1">User</div>
            <div className="text-corporate font-bold text-base">{scenario.name}</div>
          </div>
        </motion.div>
      </div>

      {/* What the Judges / Ops Team Sees (The Silent Alarm Overlay) */}
      {showOpsOverlay && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-0 left-0 w-full bg-slate-900 border-t-4 border-red-500 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-50 p-6 flex items-center justify-between"
        >
          {/* Flashing red background effect */}
          <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none" />
          
          <div className="relative z-10 flex items-center gap-6 max-w-7xl mx-auto w-full">
            <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center border border-red-500/50 flex-shrink-0 animate-bounce">
              <ShieldAlert size={32} className="text-red-500" />
            </div>
            
            <div className="flex-1 text-left">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-white text-xl font-black uppercase tracking-widest">Silent Alarm Active</h2>
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Priority 1</span>
              </div>
              <p className="text-slate-300 font-medium text-sm leading-relaxed">
                A Physical Threat / Duress PIN was entered. The system faked a successful login to protect the user from physical harm (e.g., robbery or coercion). <br/>
                <span className="text-red-400 font-bold">All outbound funds are frozen. Law enforcement and emergency response teams have been dispatched.</span>
              </p>
            </div>
            
            <div className="flex gap-4 flex-shrink-0">
              <button 
                onClick={() => onNavigate('select')}
                className="bg-slate-800 text-white hover:bg-slate-700 px-6 py-3 rounded-lg font-bold text-sm transition-colors border border-slate-700 cursor-pointer"
              >
                Reset Demo
              </button>
              <button 
                onClick={() => onNavigate('timeline', 'D')}
                className="bg-red-600 text-white hover:bg-red-500 px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors shadow-lg shadow-red-600/20 cursor-pointer"
              >
                View Incident Timeline <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
