import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import BoBLogoBar from './BoBLogoBar';
import SidebarNav from './SidebarNav';
import ParticleNetwork from './ParticleNetwork';
import ChatbotFAQ from './ChatbotFAQ';

export default function AppShell({ currentScreen, onNavigate, children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background relative">
      <ParticleNetwork />
      <ChatbotFAQ />
      
      {/* Top Bar */}
      <BoBLogoBar onNavigate={onNavigate} />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Sidebar */}
        <motion.aside
          animate={{ width: collapsed ? 56 : 220 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="flex-shrink-0 flex flex-col bg-surface border-r border-border overflow-hidden relative shadow-sm z-10"
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <SidebarNav
              currentScreen={currentScreen}
              onNavigate={onNavigate}
              collapsed={collapsed}
            />
          </div>

          {/* Collapse toggle */}
          <div className="p-2 border-t border-border bg-surface">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-full flex items-center justify-center p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background transition-all"
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
