import React from 'react';
import { Shield } from 'lucide-react';

export default function BoBLogoBar({ onNavigate }) {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-surface z-20 shadow-sm relative">
      {/* Left: BoB branding */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onNavigate?.('landing')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="text-left">
            <div className="text-corporate font-black text-xl tracking-tight leading-none">Bank of Baroda</div>
            <div className="text-primary text-[10px] font-bold tracking-widest uppercase leading-tight mt-1">
              Identity Trust Platform
            </div>
          </div>
        </button>
      </div>

      {/* Right: status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1">
          <div className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse" />
          <span className="text-green-700 text-xs font-semibold">LIVE DEMO</span>
        </div>
        <div className="text-text-secondary/60 text-xs font-mono">Prototype v1.0</div>
      </div>
    </div>
  );
}
