import React from 'react';

export default function PhoneFrameMockup({ children }) {
  return (
    <div className="relative mx-auto" style={{ width: 300, height: 580 }}>
      {/* Phone outer frame */}
      <div
        className="absolute inset-0 rounded-[40px] border-4 border-slate-300 shadow-xl"
        style={{
          background: 'linear-gradient(145deg, #F8FAFC, #E2E8F0)',
          boxShadow: '0 30px 80px rgba(15,32,68,0.15), inset 0 0 0 2px rgba(255,255,255,0.8)',
        }}
      >
        {/* Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-100 rounded-full border border-slate-200 shadow-inner" />

        {/* Screen area */}
        <div className="absolute inset-3 rounded-[32px] bg-white overflow-hidden flex flex-col border border-slate-200">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-8 pb-2">
            <span className="text-slate-400 text-[10px] font-mono font-semibold">14:02</span>
            <div className="flex items-center gap-1">
              <div className="flex items-end gap-0.5 h-3">
                {[2, 3, 4, 4].map((h, i) => (
                  <div key={i} className="w-0.5 bg-slate-400 rounded-sm" style={{ height: `${h * 3}px` }} />
                ))}
              </div>
              <svg viewBox="0 0 24 12" className="w-6 h-3">
                <rect x="0" y="0" width="20" height="12" rx="2" fill="none" stroke="rgba(100,116,139,0.4)" strokeWidth="1.5" />
                <rect x="20" y="3" width="3" height="6" rx="1" fill="rgba(100,116,139,0.4)" />
                <rect x="1.5" y="1.5" width="16" height="9" rx="1" fill="rgba(100,116,139,1)" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-4 pb-4 overflow-hidden">
            {children}
          </div>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-slate-300 rounded-full" />
      </div>
    </div>
  );
}
