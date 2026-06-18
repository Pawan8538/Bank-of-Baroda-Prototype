import React from 'react';
import { Shield } from 'lucide-react';

export default function BoBLogoBar({ onNavigate }) {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-navy/80 backdrop-blur-md">
      {/* Left: BoB branding */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onNavigate?.('landing')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow">
            <Shield className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-none">Bank of Baroda</div>
            <div className="text-primary text-[10px] font-semibold tracking-widest uppercase leading-tight">
              Identity Trust Platform
            </div>
          </div>
        </button>

        <div className="w-px h-8 bg-white/10 mx-2" />

        <div className="flex items-center gap-2">
          <div className="text-navy-100/50 text-xs">×</div>
          <div className="text-white/60 text-xs font-medium">IIT Gandhinagar Hackathon 2026</div>
        </div>
      </div>

      {/* Right: status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-xs font-medium">LIVE DEMO</span>
        </div>
        <div className="text-navy-100/40 text-xs font-mono">Prototype v1.0</div>
      </div>
    </div>
  );
}
