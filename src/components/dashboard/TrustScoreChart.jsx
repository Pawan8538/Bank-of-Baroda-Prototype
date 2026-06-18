import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface border border-border shadow-sm rounded-lg px-3 py-2 text-xs">
      <div className="text-text-secondary font-medium mb-1">{label}</div>
      <div className="text-corporate font-bold">Score: {payload[0]?.value}</div>
      {payload[1] && <div className="text-red-600 font-medium">Blocked: {payload[1]?.value}</div>}
    </div>
  );
};

export default function TrustScoreChart({ data = [] }) {
  return (
    <div className="card p-6">
      <div className="text-corporate font-bold text-lg mb-6">
        Trust Score Trend (7 Days)
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.1} />
              <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="blockGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-risk-high)" stopOpacity={0.05} />
              <stop offset="95%" stopColor="var(--color-risk-high)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
          <XAxis dataKey="time" tick={{ fill: '#475569', fontSize: 10, fontWeight: 500 }} axisLine={false} tickLine={false} dy={10} />
          <YAxis tick={{ fill: '#475569', fontSize: 10, fontWeight: 500 }} axisLine={false} tickLine={false} dx={-10} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="score" stroke="var(--color-primary)" strokeWidth={2.5} fill="url(#scoreGrad)" />
          <Area type="monotone" dataKey="blocked" stroke="var(--color-risk-high)" strokeWidth={1.5} fill="url(#blockGrad)" strokeDasharray="4 4" />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-6 mt-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-primary rounded-full" />
          <span className="text-text-secondary text-xs font-semibold">Trust Score</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-red-600 rounded-full" />
          <span className="text-text-secondary text-xs font-semibold">Blocked Attempts</span>
        </div>
      </div>
    </div>
  );
}
