import React, { useRef, useEffect } from 'react';
import { mapLineAnim } from '@/utils/gsapAnimations';

// City coordinates (approximate % positions on SVG viewBox)
const CITIES = {
  A: { name: 'Ahmedabad', cx: 63, cy: 56 },
  B: { name: 'Bengaluru', cx: 65, cy: 68 },
  C: { name: 'Mumbai', cx: 62, cy: 61, origin: { name: 'London', cx: 48, cy: 35 } },
};

const SERVER = { cx: 65, cy: 58, name: 'BoB Server' };

export default function SignalMapPanel({ scenarioId = 'A' }) {
  const lineRef = useRef(null);
  const city = CITIES[scenarioId] || CITIES.A;
  const hasOrigin = !!city.origin;

  useEffect(() => {
    const timer = setTimeout(() => {
      mapLineAnim(lineRef);
    }, 800);
    return () => clearTimeout(timer);
  }, [scenarioId]);

  return (
    <div className="card p-5 h-full flex flex-col">
      <div className="text-text-secondary text-xs font-bold uppercase tracking-widest mb-4">
        Signal Map · Live Geo Analysis
      </div>

      <div className="flex-1 relative bg-slate-50 border border-slate-100 rounded-xl overflow-hidden">
        <svg
          viewBox="0 0 100 70"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* World map simplified outline */}
          <path
            d="M5,25 Q10,20 20,22 Q30,18 35,25 Q42,20 45,28 Q50,22 55,25 Q60,30 65,28 Q72,26 78,30 Q85,28 90,32 Q95,30 95,40 Q90,50 80,52 Q70,55 65,60 Q60,65 55,60 Q48,58 42,62 Q35,60 30,55 Q22,52 15,55 Q8,52 5,45 Z"
            fill="none"
            stroke="rgba(15,32,68,0.15)"
            strokeWidth="0.3"
          />
          {/* India shape approximation */}
          <path
            d="M60,48 Q63,45 68,47 Q72,50 70,56 Q67,62 64,60 Q60,58 59,54 Q58,50 60,48 Z"
            fill="rgba(15,32,68,0.1)"
            stroke="rgba(15,32,68,0.3)"
            strokeWidth="0.3"
          />
          {/* UK/Europe shape approximation */}
          {hasOrigin && (
            <ellipse cx={city.origin.cx} cy={city.origin.cy} rx={3} ry={2}
              fill="rgba(220,38,38,0.1)" stroke="rgba(220,38,38,0.4)" strokeWidth="0.3"
            />
          )}

          {/* Connection line from city to server */}
          <line
            ref={lineRef}
            x1={city.cx}
            y1={city.cy}
            x2={SERVER.cx}
            y2={SERVER.cy}
            stroke="var(--color-primary)"
            strokeWidth="0.5"
            strokeDasharray="2 1"
            opacity="0.8"
          />

          {/* Impossible travel line for scenario C */}
          {hasOrigin && (
            <path
              d={`M${city.origin.cx},${city.origin.cy} Q50,${(city.origin.cy + city.cy) / 2 - 5} ${city.cx},${city.cy}`}
              fill="none"
              stroke="var(--color-risk-high)"
              strokeWidth="0.5"
              strokeDasharray="1 1"
              opacity="0.7"
            />
          )}

          {/* City pin */}
          <circle cx={city.cx} cy={city.cy} r={1.5}
            fill="var(--color-primary)" stroke="#fff" strokeWidth="0.4"
          />
          <circle cx={city.cx} cy={city.cy} r={3}
            fill="none" stroke="var(--color-primary)" strokeWidth="0.3" opacity="0.5"
            className="animate-ping"
          />

          {/* Origin pin for scenario C */}
          {hasOrigin && (
            <>
              <circle cx={city.origin.cx} cy={city.origin.cy} r={1.5}
                fill="var(--color-risk-high)" stroke="#fff" strokeWidth="0.4"
              />
              <text x={city.origin.cx} y={city.origin.cy - 2.5}
                textAnchor="middle" fontSize="2" fill="var(--color-risk-high)" fontWeight="600"
              >
                {city.origin.name}
              </text>
            </>
          )}

          {/* Server node */}
          <rect x={SERVER.cx - 3} y={SERVER.cy - 2} width={6} height={4}
            rx={0.5} fill="var(--color-corporate-light)" stroke="var(--color-corporate)" strokeWidth="0.3"
          />

          {/* Labels */}
          <text x={city.cx} y={city.cy + 3}
            textAnchor="middle" fontSize="2.2" fill="var(--color-corporate)" fontWeight="600"
          >
            {city.name}
          </text>
          <text x={SERVER.cx} y={SERVER.cy + 4}
            textAnchor="middle" fontSize="2" fill="var(--color-text-secondary)" fontWeight="500"
          >
            {SERVER.name}
          </text>
        </svg>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 flex flex-col gap-1.5 bg-white/80 backdrop-blur-sm p-2 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-text-secondary font-medium text-[10px]">Login origin</span>
          </div>
          {hasOrigin && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-600" />
              <span className="text-red-700 text-[10px] font-bold">Previous location (45min ago)</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-primary opacity-60" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #F15A29 0, #F15A29 4px, transparent 4px, transparent 7px)' }} />
            <span className="text-text-secondary font-medium text-[10px]">ICE analysis</span>
          </div>
        </div>
      </div>

      {/* City label */}
      <div className="mt-4 text-center">
        <div className="text-corporate text-sm font-bold">{city.name}</div>
        <div className="text-text-secondary font-medium text-xs mt-0.5">Signal origin detected</div>
      </div>
    </div>
  );
}
