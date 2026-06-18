import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, RefreshCw } from 'lucide-react';
import dashboardData from '@/mock/dashboard.json';
import incidentsData from '@/mock/incidents.json';
import KPICard from '@/components/dashboard/KPICard';
import TrustScoreChart from '@/components/dashboard/TrustScoreChart';
import IncidentStreamItem from '@/components/dashboard/IncidentStreamItem';
import ActiveSessionPanel from '@/components/dashboard/ActiveSessionPanel';

const INDIA_REGIONS = [
  { name: 'Maharashtra', risk: 85, incidents: 14 },
  { name: 'Delhi NCR', risk: 72, incidents: 9 },
  { name: 'Karnataka', risk: 60, incidents: 7 },
  { name: 'Tamil Nadu', risk: 45, incidents: 5 },
  { name: 'Gujarat', risk: 38, incidents: 4 },
  { name: 'West Bengal', risk: 55, incidents: 6 },
];

export default function FraudOpsCenter() {
  const [streamItems, setStreamItems] = useState(incidentsData.incidents.slice(0, 8));

  // Rotate new incident every 4s
  useEffect(() => {
    let idx = 8;
    const interval = setInterval(() => {
      const next = incidentsData.incidents[idx % incidentsData.incidents.length];
      setStreamItems((prev) => [next, ...prev.slice(0, 11)]);
      idx++;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-full bg-background px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 size={16} className="text-primary" />
              <span className="text-primary text-xs font-bold tracking-widest uppercase">
                Operations Dashboard
              </span>
            </div>
            <h1 className="text-corporate text-3xl font-black">Fraud Ops Center</h1>
            <p className="text-text-secondary text-sm font-medium mt-1">Real-time · Last 24 hours</p>
          </div>
          <div className="flex items-center gap-2 text-text-secondary text-xs">
            <RefreshCw size={12} className="animate-spin text-primary" style={{ animationDuration: '3s' }} />
            Live feed active
          </div>
        </motion.div>

        {/* KPI row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {dashboardData.kpis.map((kpi, i) => (
            <KPICard key={kpi.id} kpi={kpi} delay={i * 0.1} />
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-5 gap-5">
          {/* Left 60%: Chart + Stream */}
          <div className="col-span-3 flex flex-col gap-5">
            <TrustScoreChart data={dashboardData.chartData} />

            {/* Incident stream */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-corporate font-bold text-lg">Live Incident Stream</div>
                <div className="flex items-center gap-1.5 bg-red-50 px-2 py-1 rounded-md border border-red-100">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-red-700 font-semibold text-xs uppercase tracking-wider">Live</span>
                </div>
              </div>

              {/* Table header */}
              <div className="flex items-center gap-3 px-3 py-2 border-b border-border text-[10px] text-text-secondary uppercase tracking-wider font-bold mb-1 bg-slate-50/50 rounded-t-lg">
                <span className="w-2">·</span>
                <span className="w-10">Time</span>
                <span className="w-32">Type</span>
                <span className="w-20">User</span>
                <span className="flex-1">Location</span>
                <span>Status</span>
              </div>

              <AnimatePresence>
                {streamItems.map((inc, i) => (
                  <IncidentStreamItem key={`${inc.id}-${i}`} incident={inc} index={i} />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right 40% */}
          <div className="col-span-2 flex flex-col gap-5">
            {/* India Risk Heatmap */}
            <div className="card p-5">
              <div className="text-corporate font-bold text-lg mb-4">India Region Risk</div>
              <div className="flex flex-col gap-3">
                {INDIA_REGIONS.map((r) => (
                  <div key={r.name} className="flex items-center gap-3">
                    <span className="text-text-secondary text-sm font-medium w-24 truncate">{r.name}</span>
                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${r.risk}%` }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{
                          backgroundColor:
                            r.risk >= 70 ? 'var(--color-risk-high)' : r.risk >= 50 ? 'var(--color-risk-medium)' : 'var(--color-risk-low)',
                        }}
                      />
                    </div>
                    <span className="text-text-secondary font-bold text-xs w-8 text-right">{r.incidents}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-[10px] font-bold uppercase tracking-wider text-text-secondary flex items-center justify-center gap-4 bg-slate-50 py-2 rounded-lg border border-slate-100">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{backgroundColor: 'var(--color-risk-high)'}} />High</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{backgroundColor: 'var(--color-risk-medium)'}} />Medium</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{backgroundColor: 'var(--color-risk-low)'}} />Low</span>
              </div>
            </div>

            <ActiveSessionPanel sessions={dashboardData.sessions} />
          </div>
        </div>
      </div>
    </div>
  );
}
