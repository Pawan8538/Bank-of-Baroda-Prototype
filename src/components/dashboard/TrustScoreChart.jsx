import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-navy-700 border border-white/10 rounded-lg px-3 py-2 text-xs">
      <div className="text-white/50 mb-1">{label}</div>
      <div className="text-white font-bold">Score: {payload[0]?.value}</div>
      {payload[1] && <div className="text-red-400">Blocked: {payload[1]?.value}</div>}
    </div>
  );
};

export default function TrustScoreChart({ data = [] }) {
  return (
    <div className="glass-card p-5">
      <div className="text-white font-semibold text-sm mb-4">
        Trust Score Trend · Last 24h
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4500A" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#D4500A" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="blockGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#B71C1C" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#B71C1C" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="score" stroke="#D4500A" strokeWidth={2} fill="url(#scoreGrad)" />
          <Area type="monotone" dataKey="blocked" stroke="#B71C1C" strokeWidth={1.5} fill="url(#blockGrad)" />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-primary rounded" />
          <span className="text-white/40 text-xs">Trust Score</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-red-600 rounded" />
          <span className="text-white/40 text-xs">Blocked Attempts</span>
        </div>
      </div>
    </div>
  );
}
