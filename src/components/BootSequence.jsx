import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LOGS = [
  "[MianOS v1.0 Initializing...]",
  "✓ Loading Core Modules",
  "✓ Connecting Database",
  "✓ Loading Developer Profile",
  "✓ Initializing GitHub Interface",
  "✓ Loading Projects",
  "✓ Starting System Services",
  "Welcome Back, Mian Khizar"
];

export default function BootSequence({ onComplete }) {
  const [logs, setLogs] = useState([]);
  const [showEnter, setShowEnter] = useState(false);

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowEnter(true), 500);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center font-mono p-4 overflow-hidden">
      <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-[0.05]" />
      <div className="w-full max-w-lg space-y-2">
        <AnimatePresence>
          {logs.map((log, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className={`${i === BOOT_LOGS.length - 1 ? 'text-primary font-bold text-xl mt-6' : 'text-white/60 text-sm'}`}>{log}</motion.div>
          ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showEnter && <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onComplete} className="mt-12 px-8 py-3 bg-primary/20 border border-primary text-primary font-bold tracking-[0.3em] uppercase hover:bg-primary hover:text-white transition-all shadow-neon-purple rounded-md">Enter System</motion.button>}
      </AnimatePresence>
    </div>
  );
}
