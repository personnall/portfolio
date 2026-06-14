import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, Home, Terminal, AlertTriangle, RefreshCcw } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full glass-panel border-accent/30 p-12 relative overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.1)]"
      >
        {/* Background Glitch Visuals */}
        <div className="absolute top-0 left-0 w-full h-1 bg-accent/20 animate-scanline" />
        <div className="absolute bottom-0 right-0 w-full h-1 bg-accent/20 animate-scanline" style={{ animationDirection: 'reverse' }} />

        <div className="flex flex-col items-center text-center space-y-8 relative z-10">
           <div className="flex items-center gap-4 text-accent">
              <AlertTriangle size={48} className="animate-pulse" />
              <h1 className="text-6xl font-black italic tracking-tighter">ERROR_404</h1>
              <AlertTriangle size={48} className="animate-pulse" />
           </div>

           <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

           <div className="space-y-4">
              <h2 className="text-xl font-bold uppercase tracking-[0.3em] text-white">Requested Module Not Found</h2>
              <p className="text-muted text-xs uppercase tracking-widest leading-relaxed max-w-md mx-auto">
                Kernel trace: Memory corruption at 0x404. The requested interface has been de-indexed or moved to a higher privilege sector.
              </p>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm">
              <Link to="/" className="cyber-button flex items-center justify-center gap-2 border-accent/50 text-accent hover:bg-accent/10 hover:text-white">
                 <Home size={16} /> Return To Dashboard
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 border border-white/10 rounded hover:border-white/30 transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 text-muted hover:text-white"
              >
                 <RefreshCcw size={16} /> Retry Uplink
              </button>
           </div>
        </div>

        <div className="mt-12 flex justify-between items-center text-[8px] text-accent/50 uppercase tracking-[0.4em] font-black">
           <span>Code: SECTOR_MISSING</span>
           <span>MianOS v2.0.5 Recovery Mode</span>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
