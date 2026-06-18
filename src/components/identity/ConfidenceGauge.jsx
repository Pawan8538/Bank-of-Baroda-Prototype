import React, { useRef, useEffect } from 'react';
import { riskColour } from '@/utils/riskColour';
import { gaugeAnim } from '@/utils/gsapAnimations';

const RADIUS = 80;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ConfidenceGauge({ score = 0, size = 200, animated = true, label = 'Trust Score' }) {
  const arcRef = useRef(null);
  const numberRef = useRef(null);
  const colours = riskColour(score);
  const filled = (score / 100) * CIRCUMFERENCE;
  const strokeDashoffset = CIRCUMFERENCE - filled;

  useEffect(() => {
    if (animated) {
      gaugeAnim(arcRef, score, colours.hex);
    }
    // Counter animation
    if (numberRef.current) {
      let start = 0;
      const step = () => {
        start += Math.ceil((score - start) / 8);
        if (numberRef.current) numberRef.current.textContent = start;
        if (start < score) requestAnimationFrame(step);
        else if (numberRef.current) numberRef.current.textContent = score;
      };
      requestAnimationFrame(step);
    }
  }, [score, animated]);

  const svgSize = size;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const strokeW = 14;

  return (
    <div className="flex flex-col items-center gap-2">
      <div style={{ width: svgSize, height: svgSize }} className="relative">
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="rotate-[-90deg]"
        >
          {/* Background track */}
          <circle
            cx={cx}
            cy={cy}
            r={RADIUS}
            fill="none"
            stroke="rgba(15,32,68,0.08)"
            strokeWidth={strokeW}
            strokeLinecap="round"
          />
          {/* Foreground arc */}
          <circle
            ref={arcRef}
            cx={cx}
            cy={cy}
            r={RADIUS}
            fill="none"
            stroke={colours.hex}
            strokeWidth={strokeW}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={animated ? CIRCUMFERENCE : strokeDashoffset}
            style={{ transition: animated ? 'none' : `stroke-dashoffset 1.5s ease-out` }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            ref={numberRef}
            className="text-corporate font-bold leading-none"
            style={{ fontSize: svgSize * 0.22 }}
          >
            {animated ? 0 : score}
          </span>
          <span className="text-text-secondary font-medium mt-1" style={{ fontSize: svgSize * 0.07 }}>
            / 100
          </span>
        </div>
      </div>

      <div className="text-center">
        <div className="text-text-secondary/80 text-xs font-bold uppercase tracking-wider">{label}</div>
        <div
          className="text-xs font-bold mt-1 px-3 py-0.5 rounded-full inline-block"
          style={{ color: colours.hex, backgroundColor: colours.hex + '15', border: `1px solid ${colours.hex}30` }}
        >
          {score >= 75 ? 'LOW RISK' : score >= 45 ? 'MEDIUM RISK' : 'HIGH RISK'}
        </div>
      </div>
    </div>
  );
}
