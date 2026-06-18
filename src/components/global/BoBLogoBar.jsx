import React, { useState } from 'react';
import { Shield, Globe, ChevronDown } from 'lucide-react';

export default function BoBLogoBar({ onNavigate }) {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'HI', name: 'हिंदी' },
    { code: 'GU', name: 'ગુજરાતી' },
    { code: 'MR', name: 'मराठी' }
  ];

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

      {/* Right: status & language */}
      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <div className="relative">
          <button 
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 text-text-secondary hover:text-corporate transition-colors px-2 py-1 rounded-md hover:bg-slate-50"
          >
            <Globe size={16} />
            <span className="text-xs font-bold">{currentLang}</span>
            <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {langOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      currentLang === lang.code 
                        ? 'bg-primary/10 text-primary font-bold' 
                        : 'text-text-secondary hover:bg-slate-50 hover:text-corporate'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="w-px h-6 bg-border" />

        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1">
          <div className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse" />
          <span className="text-green-700 text-xs font-semibold">LIVE DEMO</span>
        </div>
      </div>
    </div>
  );
}
