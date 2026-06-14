import { useProjects, useSkills } from '../hooks/useData';
import {
  FolderDot, Zap, Activity, Award,
  ExternalLink, TrendingUp, Clock, Plus, Upload, User, LayoutGrid
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminOverview() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();

  const stats = [
    { label: 'Projects', value: projects?.length || 0, icon: FolderDot, color: 'text-blue-400', loading: projectsLoading },
    { label: 'Skills', value: skills?.length || 0, icon: Zap, color: 'text-yellow-400', loading: skillsLoading },
    { label: 'Activities', value: 2, icon: Activity, color: 'text-green-400' },
    { label: 'Certificates', value: 0, icon: Award, color: 'text-purple-400' },
  ];

  const quickActions = [
    { label: 'Add Project', icon: Plus, path: '/admin/projects', color: 'text-blue-400' },
    { label: 'Add Skill', icon: Plus, path: '/admin/skills', color: 'text-yellow-400' },
    { label: 'Add Activity', icon: Plus, path: '/admin/activities', color: 'text-green-400' },
    { label: 'Upload Resume', icon: Upload, path: '/admin/profile', color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold">System Overview</h1>
        <p className="text-white/40 mt-1">Operational control panel for MianOS.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-6 border-white/5 hover:border-primary/20 transition-all relative overflow-hidden group">
            {stat.loading && <div className="absolute inset-0 bg-white/5 animate-pulse z-10" />}
            <div className="flex justify-between items-start mb-4">
               <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}><stat.icon size={20} /></div>
               <TrendingUp size={16} className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm text-white/40">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-8">
             <div className="flex items-center gap-3 mb-6">
                <LayoutGrid size={20} className="text-primary" />
                <h3 className="text-lg font-bold">Quick Command Center</h3>
             </div>
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {quickActions.map((action, i) => (
                  <Link key={i} to={action.path} className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all group rounded-2xl">
                     <div className={`p-2 rounded-full bg-white/5 mb-3 group-hover:scale-110 transition-transform ${action.color}`}>
                        <action.icon size={20} />
                     </div>
                     <span className="text-[10px] uppercase font-bold tracking-widest text-white/60 group-hover:text-white">{action.label}</span>
                  </Link>
                ))}
             </div>
          </div>

          <div className="glass-card p-8">
             <h3 className="text-lg font-bold mb-6 flex items-center justify-between">Recent Deployment <Link to="/admin/projects" className="text-xs text-primary font-mono uppercase hover:underline">Manage Systems</Link></h3>
             <div className="space-y-4">
                {projects?.slice(0, 3).map(p => (
                  <div key={p.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-default">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center font-bold text-primary font-mono">{p.name.charAt(0)}</div>
                        <div><p className="font-bold text-sm">{p.name}</p><p className="text-xs text-white/40">{p.category} Module</p></div>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] uppercase font-bold text-white/20 font-mono">Active</span>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="glass-card p-8">
           <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Clock size={18} className="text-secondary" /> Access Logs</h3>
           <div className="space-y-6">
              {[
                { log: 'Auth Session Initialized', time: 'Just now', color: 'bg-green-500' },
                { log: 'Database Handshake', time: '5 mins ago', color: 'bg-blue-500' },
                { log: 'System Integrity Check', time: '1 hour ago', color: 'bg-purple-500' },
                { log: 'Auto-Sync Completed', time: '2 hours ago', color: 'bg-yellow-500' },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 group">
                   <div className={`w-1.5 h-1.5 rounded-full ${log.color} mt-2 shrink-0 group-hover:scale-150 transition-transform`} />
                   <div><p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{log.log}</p><p className="text-[10px] text-white/30 uppercase font-mono">{log.time}</p></div>
                </div>
              ))}
           </div>
           <button className="w-full mt-8 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] uppercase font-bold tracking-widest text-white/40 transition-all">Clear Terminal Logs</button>
        </div>
      </div>
    </div>
  );
}
