import React from 'react';
import { motion } from 'framer-motion';
import { useProfile, useProjects } from '../hooks/useData';
import TerminalWidget from '../components/TerminalWidget';
import GithubWidget from '../components/GithubWidget';
import ActivityFeed from '../components/ActivityFeed';
import SystemStatus from '../components/SystemStatus';
import {
  Projector,
  Code2,
  Database,
  MapPin,
  Briefcase,
  Rocket,
  ExternalLink,
  Github as GithubIcon
} from 'lucide-react';

const Dashboard = () => {
  const { data: profile } = useProfile();
  const { data: projects } = useProjects();

  const stats = [
    { label: "Projects Completed", value: "15+", icon: Projector, color: "text-primary" },
    { label: "Technologies", value: "10+", icon: Code2, color: "text-secondary" },
    { label: "GitHub Repos", value: "25+", icon: GithubIcon, color: "text-accent" },
    { label: "Semester", value: profile?.semester || "2nd", icon: Rocket, color: "text-green-500" },
  ];

  const quickProjects = projects?.slice(0, 4).map(p => ({
    id: p.id,
    name: p.name,
    desc: p.description,
    tags: p.technologies?.slice(0, 2) || []
  })) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
      {/* Hero Section */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel border-primary/20 p-8 relative overflow-hidden"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            <div className="relative group cursor-pointer" onClick={() => {
                 const count = parseInt(sessionStorage.getItem('avatar_clicks') || '0') + 1;
                 sessionStorage.setItem('avatar_clicks', count);
                 if(count === 5) {
                    alert("ACHIEVEMENT UNLOCKED: SYSTEM TAMPERING DETECTED");
                    document.body.classList.toggle('cyber-mode');
                 }
            }}>
               <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-colors">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mian&backgroundColor=b6e3f4"
                    alt="Mian Khizar"
                    className="w-full h-full object-cover"
                  />
               </div>
               <div className="absolute -bottom-2 -right-2 bg-background border border-primary/30 px-2 py-1 rounded text-[10px] font-bold text-primary animate-pulse">
                  ONLINE
               </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-4xl font-black tracking-tight mb-1">{profile?.name?.toUpperCase() || 'MIAN KHIZAR'}</h1>
                <p className="text-muted flex items-center gap-2 text-sm uppercase tracking-widest font-bold">
                  <Briefcase size={14} className="text-primary" />
                  {profile?.title || 'BSCS Student & Full Stack Developer'}
                </p>
                <p className="text-muted flex items-center gap-2 text-xs mt-1">
                  <MapPin size={12} className="text-primary" />
                  {profile?.location || 'Pakistan'}
                </p>
              </div>

              <p className="text-white/70 max-w-xl leading-relaxed">
                {profile?.bio || 'Passionate about building futuristic, user-centric web applications. Currently focusing on mastering full-stack development and exploring AI integration in modern OS interfaces.'}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                 {profile?.availability_status?.split(',').map(status => (
                   <span key={status} className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">{status.trim()}</span>
                 )) || (
                   <>
                     <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">Open to Internships</span>
                     <span className="px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-[10px] font-bold text-secondary uppercase tracking-wider">Freelance Available</span>
                   </>
                 )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {stats.map((stat, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="glass-panel border-white/5 p-4 flex flex-col items-center text-center group hover:border-primary/30 transition-all"
             >
                <stat.icon className={cn("mb-2 group-hover:scale-110 transition-transform", stat.color)} size={20} />
                <div className="text-xl font-black">{stat.value}</div>
                <div className="text-[9px] uppercase tracking-widest text-muted font-bold">{stat.label}</div>
             </motion.div>
           ))}
        </div>

        {/* Terminal Section */}
        <TerminalWidget />
      </div>

      {/* Right Column */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        {/* System Status */}
        <SystemStatus />

        {/* GitHub Card */}
        <GithubWidget />

        {/* Quick Projects */}
        <div className="glass-panel border-primary/20 p-6">
           <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/70 mb-4">Recent Projects</h3>
           <div className="space-y-4">
              {quickProjects.map((p, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-bold group-hover:text-primary transition-colors">{p.name}</span>
                    <ExternalLink size={12} className="text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[10px] text-muted mb-2">{p.desc}</p>
                  <div className="flex gap-2">
                    {p.tags.map(tag => (
                      <span key={tag} className="text-[8px] px-1.5 py-0.5 bg-white/5 border border-white/10 rounded uppercase">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
           </div>
           <button className="w-full mt-6 py-2 border border-primary/30 text-[10px] uppercase tracking-widest hover:bg-primary/10 transition-all rounded">
              View All Projects
           </button>
        </div>

        {/* Activity Feed */}
        <ActivityFeed />
      </div>
    </div>
  );
};

const cn = (...classes) => classes.filter(Boolean).join(' ');

export default Dashboard;
