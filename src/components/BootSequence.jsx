import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BootSequence = ({ onComplete }) => {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showGreeting, setShowGreeting] = useState(false);

  const messages = [
    "[MianOS Boot Sequence]",
    "",
    "Loading Core...",
    "Loading Modules...",
    "Establishing Secure Connection...",
    "Initializing Developer Profile...",
    "Loading Project Database...",
    "System Ready."
  ];

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < messages.length) {
        setLogs(prev => [...prev, messages[currentLog]]);
        setProgress(((currentLog + 1) / messages.length) * 100);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowGreeting(true), 500);
        setTimeout(onComplete, 2500);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-[100] font-mono p-4">
      <AnimatePresence mode="wait">
        {!showGreeting ? (
          <motion.div
            key="boot"
            exit={{ opacity: 0, scale: 1.1 }}
            className="max-w-lg w-full"
          >
            <div className="mb-8 text-primary font-bold text-xl flex items-center gap-4">
              <div className="w-12 h-12 border-2 border-primary rounded-lg flex items-center justify-center animate-pulse-glow">
                M
              </div>
              <div className="flex flex-col">
                <span className="tracking-widest">MIANOS</span>
                <span className="text-[10px] text-primary/50">STABLE BUILD 2025.02.21</span>
              </div>
            </div>

            <div className="space-y-1 mb-8 h-48 overflow-hidden">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className={cn("text-sm", log.startsWith('[') ? "text-secondary font-bold" : "text-primary/80")}
                >
                  {log}
                </motion.div>
              ))}
            </div>

            <div className="w-full h-1 bg-surface rounded-full overflow-hidden border border-white/5">
              <motion.div
                className="h-full bg-primary shadow-[0_0_10px_#8b5cf6]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-2 flex justify-between text-[10px] text-muted uppercase tracking-widest">
              <span>Initializing System</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="greeting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
             <h2 className="text-4xl font-black tracking-tighter uppercase">Welcome Back, <span className="text-primary">Mian Khizar</span></h2>
             <div className="flex justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <span className="text-[10px] text-muted uppercase tracking-[0.4em]">System Session Initialized</span>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-scanlines animate-scanline" />
      </div>
    </div>
  );
};

const cn = (...classes) => classes.filter(Boolean).join(' ');

export default BootSequence;
