import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, Ghost, Smartphone, Lock } from 'lucide-react';
import ProtectionModeAlert from '@/components/protect/ProtectionModeAlert';
import SMSAlertPreview from '@/components/protect/SMSAlertPreview';
import SessionRevocationPanel from '@/components/protect/SessionRevocationPanel';

const actionCards = [
  {
    title: 'Routed to Shadow Ledger',
    icon: Ghost,
    desc: 'Attacker safely contained in honeypot',
    colour: '#B71C1C',
    bg: 'bg-red-950/40',
    border: 'border-red-700/40',
  },
  {
    title: 'SMS Alert Sent',
    icon: Smartphone,
    desc: 'Real user notified at +91-****-****-7742',
    colour: '#E65100',
    bg: 'bg-orange-950/40',
    border: 'border-orange-700/40',
  },
  {
    title: '3 Sessions Revoked',
    icon: Lock,
    desc: 'All JWT tokens invalidated immediately',
    colour: '#2B5797',
    bg: 'bg-navy-700/40',
    border: 'border-navy-600/40',
  },
];

export default function ProtectionMode({ onNavigate }) {
  const [reported, setReported] = React.useState(false);

  return (
    <div
      className="min-h-full px-8 py-10 overflow-hidden bg-transparent"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Alert */}
        <ProtectionModeAlert />

        {/* 3 action cards */}
        <div className="grid grid-cols-3 gap-6">
          {actionCards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ delay: i * 0.4, duration: 0.5 }}
              className={`bg-white border border-slate-200 shadow-sm rounded-2xl p-6 text-center`}
              style={{ perspective: 800 }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-100">
                <c.icon size={28} style={{ color: c.colour }} />
              </div>
              <div className="text-corporate font-black text-lg mb-1">{c.title}</div>
              <div className="text-text-secondary font-medium text-sm leading-snug">{c.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* SMS + Sessions */}
        <div className="grid grid-cols-2 gap-6">
          <SMSAlertPreview />
          <SessionRevocationPanel />
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-6 justify-center pb-8">
          <button
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all shadow-sm cursor-pointer ${
              reported 
                ? 'bg-slate-200 text-slate-500' 
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
            onClick={() => setReported(true)}
            disabled={reported}
          >
            {reported ? '✓ Fraud Report Logged' : "This Wasn't Me"}
          </button>
          <button
            onClick={() => onNavigate('timeline', 'C')}
            className="btn-outline flex items-center gap-3 px-8 py-4 text-lg"
          >
            View Incident Timeline
            <ArrowRight size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
