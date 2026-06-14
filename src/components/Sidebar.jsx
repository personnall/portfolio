import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, User, FolderDot, Zap, History, GraduationCap,
  Award, FileText, Mail, Settings, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useProfile } from '../hooks/useData';
import { SITE_CONFIG } from '../config/site';

const navItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/about', icon: User, label: 'About' },
  { path: '/projects', icon: FolderDot, label: 'Projects' },
  { path: '/skills', icon: Zap, label: 'Skills' },
  { path: '/experience', icon: History, label: 'Experience' },
  { path: '/education', icon: GraduationCap, label: 'Education' },
  { path: '/certificates', icon: Award, label: 'Certificates' },
  { path: '/resume', icon: FileText, label: 'Resume' },
  { path: '/contact', icon: Mail, label: 'Contact' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { data: profile } = useProfile();

  // Persist sidebar state
  useEffect(() => {
    const saved = localStorage.getItem('sidebar_collapsed');
    if (saved !== null) setCollapsed(saved === 'true');
  }, [setCollapsed]);

  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem('sidebar_collapsed', String(newState));
  };

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 260, x: mobileOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? -260 : 0) }}
        className={`fixed left-0 top-0 h-screen bg-surface border-r border-white/5 flex flex-col z-50 transition-all duration-300 ease-in-out shadow-2xl lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5 shrink-0">
          {!collapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-bold bg-cyber-gradient bg-clip-text text-transparent">MianOS</motion.span>}
          <button onClick={toggleSidebar} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/60 hover:text-primary hidden lg:block">{collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}</button>
          <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/60 hover:text-primary lg:hidden"><ChevronLeft size={20} /></button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2 custom-scrollbar">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => `flex items-center px-4 py-3 rounded-xl transition-all duration-300 group relative ${isActive ? 'bg-primary/10 text-primary neon-border-purple' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
              <item.icon size={22} className="min-w-[22px]" />
              {!collapsed && <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="ml-4 font-medium">{item.label}</motion.span>}
              {collapsed && <div className="absolute left-full ml-4 px-2 py-1 bg-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">{item.label}</div>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 shrink-0">
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} p-2 rounded-xl bg-white/5`}>
            <img src={profile?.avatar_url || SITE_CONFIG.placeholders.avatar} alt="Profile" className="w-10 h-10 rounded-lg object-cover ring-1 ring-primary/30" />
            {!collapsed && <div className="flex-1 min-w-0"><p className="text-sm font-semibold truncate">{profile?.full_name || SITE_CONFIG.name}</p><p className="text-xs text-white/40 truncate">System Admin</p></div>}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
