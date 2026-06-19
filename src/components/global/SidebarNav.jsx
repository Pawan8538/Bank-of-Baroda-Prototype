import React from 'react';
import { motion } from 'framer-motion';
import {
  Home, Layers, FileText, Users, Activity, Cpu,
  Shield, Eye, Bell, RefreshCw, BarChart3,
  ChevronRight, Zap
} from 'lucide-react';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { key: 'landing', label: 'Landing Page', icon: Home },
      { key: 'overview', label: 'Platform Overview', icon: Layers },
    ],
  },
  {
    label: 'Interactive Demo',
    items: [
      { key: 'select', label: 'Run Attack Scenarios', icon: Zap },
    ],
  },
  {
    label: 'Enterprise Dashboards',
    items: [
      { key: 'dashboard', label: 'Fraud Ops Center', icon: BarChart3 },
      { key: 'architecture', label: 'System Architecture', icon: Cpu },
      { key: 'impact', label: 'Business Impact', icon: FileText },
    ],
  },
];

export default function SidebarNav({ currentScreen, onNavigate, collapsed }) {
  return (
    <nav className="flex flex-col gap-1 py-4 px-2">
      {navGroups.map((group) => (
        <div key={group.label} className="mb-3">
          {!collapsed && (
            <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/60 px-3 mb-2">
              {group.label}
            </div>
          )}
          {group.items.map(({ key, label, icon: Icon }) => {
            const isActive = currentScreen === key;
            return (
              <motion.button
                key={key}
                onClick={() => onNavigate(key)}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.97 }}
                className={`
                  w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-left transition-all duration-150
                  ${isActive
                    ? 'bg-slate-100 text-corporate font-semibold shadow-sm'
                    : 'text-text-secondary hover:text-corporate hover:bg-slate-50'
                  }
                `}
                title={collapsed ? label : undefined}
              >
                <Icon
                  className={`flex-shrink-0 ${isActive ? 'text-corporate' : 'text-text-secondary/60'}`}
                  size={16}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {!collapsed && (
                  <span className="text-sm truncate">{label}</span>
                )}
                {!collapsed && isActive && (
                  <ChevronRight size={14} className="ml-auto text-corporate" />
                )}
              </motion.button>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
