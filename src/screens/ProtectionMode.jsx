import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';
import ProtectionModeAlert from '@/components/protect/ProtectionModeAlert';
import SMSAlertPreview from '@/components/protect/SMSAlertPreview';
import SessionRevocationPanel from '@/components/protect/SessionRevocationPanel';

const actionCards = [
  {
    title: 'Recovery Blocked',
    icon: '🚫',
    desc: 'Auto-block rule AUTO_BLOCK_CRITICAL engaged',
    colour: '#B71C1C',
    bg: 'bg-red-950/40',
    border: 'border-red-700/40',
  },
  {
    title: 'SMS Alert Sent',
    icon: '📱',
    desc: 'Real user notified at +91-****-****-7742',
    colour: '#E65100',
    bg: 'bg-orange-950/40',
    border: 'border-orange-700/40',
  },
  {
    title: '3 Sessions Revoked',
    icon: '🔐',
    desc: 'All JWT tokens invalidated immediately',
    colour: '#2B5797',
    bg: 'bg-navy-700/40',
    border: 'border-navy-600/40',
  },
];

export default function ProtectionMode({ onNavigate }) {
  return (
    <div
      className="min-h-full px-8 py-8 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #3b0000 0%, #0F2044 60%)' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Alert */}
        <ProtectionModeAlert />

        {/* 3 action cards */}
        <div className="grid grid-cols-3 gap-5">
          {actionCards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ delay: i * 0.4, duration: 0.5 }}
              className={`${c.bg} border ${c.border} rounded-2xl p-5 text-center`}
              style={{ perspective: 800 }}
            >
              <div className="text-3xl mb-3">{c.icon}</div>
              <div className="text-white font-bold mb-1">{c.title}</div>
              <div className="text-white/40 text-xs">{c.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* SMS + Sessions */}
        <div className="grid grid-cols-2 gap-5">
          <SMSAlertPreview />
          <SessionRevocationPanel />
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-4 justify-center">
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all"
            onClick={() => {}}
          >
            This Wasn't Me
          </button>
          <button
            onClick={() => onNavigate('timeline', 'C')}
            className="btn-outline flex items-center gap-2"
          >
            View Incident Timeline
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
