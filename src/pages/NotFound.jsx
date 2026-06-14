import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative inline-block"><AlertTriangle size={120} className="text-pink-500 mx-auto animate-pulse" /><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold font-mono">404</div></motion.div>
        <div className="space-y-4"><h1 className="text-3xl font-bold tracking-tighter uppercase font-mono text-white/90">System Error: Route Not Found</h1><p className="text-white/40 font-mono text-sm leading-relaxed">The module you are trying to access has been corrupted, moved, or deleted from the core filesystem.</p></div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center"><Link to="/" className="cyber-button flex items-center justify-center gap-2"><Home size={18} /> Return to Home</Link><button onClick={() => window.location.reload()} className="px-6 py-2 bg-white/5 border border-white/10 rounded-md text-white/60 hover:text-white transition-all flex items-center justify-center gap-2"><RefreshCw size={18} /> Reboot System</button></div>
        <div className="pt-12 font-mono text-[10px] text-white/10 uppercase tracking-[0.5em]">Error ID: 0xDEADBEEF</div>
      </div>
    </div>
  );
}
