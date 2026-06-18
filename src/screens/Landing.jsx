import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Eye, Bell, RefreshCw, Zap } from 'lucide-react';
import ConfidenceGauge from '@/components/identity/ConfidenceGauge';
import StatCard from '@/components/scenarios/StatCard';

// ─── Cursor Line Effect ───────────────────────────────────────────────────────
function CursorLineEffect() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const lines = useRef([]);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Spawn a new line from cursor every 60ms
    const spawn = () => {
      const { x, y } = mouse.current;
      if (x < 0) return;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.4 + Math.random() * 0.8;
      const len = 40 + Math.random() * 80;
      lines.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len,
        life: 1,
        decay: 0.012 + Math.random() * 0.012,
        hue: Math.random() < 0.7 ? 22 : 210, // orange or blue
      });
    };
    const spawnInterval = setInterval(spawn, 60);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lines.current = lines.current.filter((l) => l.life > 0);

      for (const l of lines.current) {
        const alpha = l.life * 0.6;
        const colour = l.hue === 22
          ? `rgba(212, 80, 10, ${alpha})`
          : `rgba(43, 87, 151, ${alpha})`;

        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(l.x + l.vx * l.len * l.life, l.y + l.vy * l.len * l.life);
        ctx.strokeStyle = colour;
        ctx.lineWidth = 1.5 * l.life;
        ctx.lineCap = 'round';
        ctx.stroke();

        l.x += l.vx;
        l.y += l.vy;
        l.life -= l.decay;
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      clearInterval(spawnInterval);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} id="cursor-canvas" />;
}

// ─── Pillars strip ────────────────────────────────────────────────────────────
const pillars = [
  { icon: Shield, label: 'Detect', desc: 'Signals & Fingerprints' },
  { icon: Eye, label: 'Prevent', desc: 'Real-time Blocking' },
  { icon: Bell, label: 'Respond', desc: 'Instant Alerts' },
  { icon: RefreshCw, label: 'Recover', desc: 'Account Protection' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function Landing({ onNavigate }) {
  return (
    <div className="relative min-h-full bg-bob-gradient flex flex-col overflow-hidden">
      <CursorLineEffect />

      {/* Hero */}
      <div className="relative z-10 flex-1 grid grid-cols-2 gap-0 items-center px-12 py-12 max-w-7xl mx-auto w-full">
        {/* Left copy */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 w-fit"
          >
            <Zap size={13} className="text-primary" />
            <span className="text-primary text-xs font-bold tracking-wider uppercase">
              Bank of Baroda × IIT-GN Hackathon 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl font-black leading-tight"
          >
            <span className="text-white">Stop Fraud</span>
            <br />
            <span className="text-gradient-primary">Before It Starts.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-white/60 text-lg leading-relaxed max-w-md"
          >
            AI-Powered Identity Trust Platform — detecting account recovery fraud
            in real-time with zero friction for legitimate users.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <button
              onClick={() => onNavigate('select')}
              className="btn-primary flex items-center gap-2 text-base px-8 py-4"
            >
              Begin Demo
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => onNavigate('overview')}
              className="btn-outline flex items-center gap-2 text-sm"
            >
              Platform Overview
            </button>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-8 pt-4 border-t border-white/10"
          >
            <StatCard value={2400} prefix="₹" suffix=" Cr" label="Annual Fraud Losses" colour="#D4500A" />
            <StatCard value={3} suffix="×" label="YoY Growth in Attacks" colour="#E65100" />
            <StatCard value={17} suffix=" days" label="Avg Detection Time" colour="#B71C1C" />
          </motion.div>
        </div>

        {/* Right: gauge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex flex-col items-center justify-center gap-4"
        >
          <div className="relative">
            {/* Glow ring */}
            <div
              className="absolute inset-[-20px] rounded-full opacity-20 blur-2xl"
              style={{ backgroundColor: '#D4500A' }}
            />
            <ConfidenceGauge score={94} size={240} animated />
          </div>

          <div className="text-center mt-2">
            <div className="text-white/40 text-sm">Identity Confidence Engine</div>
            <div className="text-white/60 text-xs mt-1">Real-time · Explainable · Zero-Friction</div>
          </div>
        </motion.div>
      </div>

      {/* Four pillars */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 grid grid-cols-4 gap-4 px-12 pb-12 max-w-7xl mx-auto w-full"
      >
        {pillars.map(({ icon: Icon, label, desc }) => (
          <motion.div
            key={label}
            variants={item}
            whileHover={{ y: -4 }}
            className="glass-card p-5 flex flex-col items-center gap-3 text-center cursor-default"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Icon size={22} className="text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-white font-bold text-sm">{label}</div>
              <div className="text-white/40 text-xs">{desc}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
