import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import CommandPalette from '../components/CommandPalette';
import CyberBackground from '../components/CyberBackground';
import { Menu } from 'lucide-react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useKonamiCode } from '../hooks/useKonamiCode';
import toast from 'react-hot-toast';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [cyberMode, setCyberMode] = useState(false);
  const location = useLocation();

  useKonamiCode(() => {
    setCyberMode(true);
    toast.success('Cyber Mode Activated', { style: { background: '#ec4899', color: '#fff' } });
  });

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <div className={`min-h-screen bg-background text-white flex overflow-hidden transition-all duration-1000 ${cyberMode ? 'hue-rotate-90 saturate-200' : ''}`}>
      <CyberBackground />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className={`flex-1 transition-all duration-300 ${collapsed ? 'lg:ml-20' : 'lg:ml-[260px]'} ml-0 relative z-10 h-screen overflow-y-auto`}>
        <header className="sticky top-0 h-16 border-b border-white/5 bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 lg:px-8 z-30">
          <div className="flex items-center space-x-4">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"><Menu size={20} /></button>
            <span className="text-white/40 text-xs lg:text-sm font-mono uppercase tracking-widest hidden sm:inline-block">System Status: <span className="text-secondary animate-pulse">Online</span></span>
          </div>
          <button onClick={() => setIsCommandPaletteOpen(true)} className="flex items-center space-x-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-lg hover:border-primary/50 transition-all group"><span className="text-sm text-white/40 group-hover:text-white transition-colors">Search commands...</span><kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 font-mono text-[10px] font-medium bg-white/5 border border-white/20 rounded text-white/40"><span className="text-xs">⌘</span>K</kbd></button>
        </header>
        <div className="p-8 max-w-7xl mx-auto"><AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3, ease: "easeOut" }}><Outlet /></motion.div></AnimatePresence></div>
      </main>
      <CommandPalette isOpen={isCommandPaletteOpen} setIsOpen={setIsCommandPaletteOpen} />
    </div>
  );
}
