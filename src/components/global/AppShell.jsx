import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import BoBLogoBar from './BoBLogoBar';
import SidebarNav from './SidebarNav';

export default function AppShell({ currentScreen, onNavigate, children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-navy">
      {/* Top Bar */}
      <BoBLogoBar onNavigate={onNavigate} />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <motion.aside
          animate={{ width: collapsed ? 56 : 220 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="flex-shrink-0 flex flex-col bg-navy/90 border-r border-white/10 overflow-hidden relative"
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <SidebarNav
              currentScreen={currentScreen}
              onNavigate={onNavigate}
              collapsed={collapsed}
            />
          </div>

          {/* Collapse toggle */}
          <div className="p-2 border-t border-white/10">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-full flex items-center justify-center p-2 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            </button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="min-h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
