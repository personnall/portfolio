import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LayoutDashboard, FolderDot, Zap, History, GraduationCap, Award, Activity, LogOut, User } from 'lucide-react';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AdminLayout() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setSession(session); setLoading(false); if (!session) navigate('/login'); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => { setSession(session); if (!session) navigate('/login'); });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => { await supabase.auth.signOut(); toast.success('Logged out'); };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-background text-white flex">
      <aside className="w-64 border-r border-white/5 bg-surface/50 backdrop-blur-xl flex flex-col shrink-0">
        <div className="h-20 flex items-center px-8 border-b border-white/5"><span className="text-xl font-bold bg-cyber-gradient bg-clip-text text-transparent">MianOS Admin</span></div>
        <nav className="flex-1 py-6 px-4 space-y-1">
          {[
            { path: '/admin', icon: LayoutDashboard, label: 'Overview', end: true },
            { path: '/admin/projects', icon: FolderDot, label: 'Projects' },
            { path: '/admin/skills', icon: Zap, label: 'Skills' },
            { path: '/admin/experience', icon: History, label: 'Experience' },
            { path: '/admin/education', icon: GraduationCap, label: 'Education' },
            { path: '/admin/certificates', icon: Award, label: 'Certificates' },
            { path: '/admin/activities', icon: Activity, label: 'Activities' },
            { path: '/admin/profile', icon: User, label: 'Profile' }
          ].map(item => (
            <NavLink key={item.path} to={item.path} end={item.end} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-primary text-white shadow-neon-purple' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}><item.icon size={18} /><span className="text-sm font-medium">{item.label}</span></NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5"><button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-pink-400 hover:bg-pink-400/10 transition-all"><LogOut size={18} /><span className="text-sm font-medium">Terminate Session</span></button></div>
      </aside>
      <main className="flex-1 h-screen overflow-y-auto"><header className="h-20 border-b border-white/5 flex items-center justify-between px-10 sticky top-0 bg-background/80 backdrop-blur-xl z-20"><h2 className="text-lg font-bold text-white/40 uppercase tracking-widest font-mono">Administrative Interface</h2></header><div className="p-10 max-w-6xl mx-auto"><Outlet /></div></main>
    </div>
  );
}
