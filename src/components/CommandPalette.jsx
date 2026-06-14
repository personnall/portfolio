import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, User, FolderDot, Zap, History, GraduationCap,
  Award, FileText, Mail, Settings, Command, Search,
  Github, Linkedin, Download, PanelLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CommandPalette({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const commands = [
    { name: 'Go to Dashboard', icon: Home, action: () => navigate('/') },
    { name: 'Go to About', icon: User, action: () => navigate('/about') },
    { name: 'Go to Projects', icon: FolderDot, action: () => navigate('/projects') },
    { name: 'Go to Skills', icon: Zap, action: () => navigate('/skills') },
    { name: 'Go to Experience', icon: History, action: () => navigate('/experience') },
    { name: 'Go to Education', icon: GraduationCap, action: () => navigate('/education') },
    { name: 'Go to Certificates', icon: Award, action: () => navigate('/certificates') },
    { name: 'Go to Resume', icon: FileText, action: () => navigate('/resume') },
    { name: 'Go to Contact', icon: Mail, action: () => navigate('/contact') },
    { name: 'Go to Settings', icon: Settings, action: () => navigate('/settings') },
    { name: 'Download Resume', icon: Download, action: () => console.log('Download') },
    { name: 'Open GitHub', icon: Github, action: () => window.open('https://github.com/miankhizar', '_blank') },
    { name: 'sudo access', icon: Command, action: () => alert('Developer Override Enabled') },
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        <motion.div initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} className="relative w-full max-w-xl glass-card neon-border-purple shadow-2xl overflow-hidden">
          <div className="flex items-center px-4 py-3 border-b border-white/10">
            <Search className="w-5 h-5 text-white/40 mr-3" />
            <input autoFocus placeholder="Type a command or search..." className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-white/20" value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className="px-2 py-1 bg-white/5 rounded text-xs text-white/40 border border-white/10">ESC</div>
          </div>
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {filteredCommands.map((cmd, i) => (
              <button key={i} onClick={() => { cmd.action(); setIsOpen(false); }} className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors group">
                <cmd.icon className="w-5 h-5 mr-3 text-white/40 group-hover:text-primary" />
                <span>{cmd.name}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
