import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Server, Zap, Target } from 'lucide-react';
import { useProfile, useProjects, useActivities, useSkills } from '../hooks/useData';
import { SITE_CONFIG } from '../config/site';
import GithubWidget from '../components/GithubWidget';
import TerminalWidget from '../components/TerminalWidget';

export default function Dashboard() {
  const { data: profile } = useProfile();
  const { data: projects } = useProjects();
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={item} className="lg:col-span-2 glass-card p-8 flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -mr-16 -mt-16" />
          <img src={profile?.avatar_url || SITE_CONFIG.placeholders.avatar} alt="Profile" className="w-40 h-40 rounded-2xl object-cover ring-2 ring-primary/50 shadow-neon-purple z-10" />
          <div className="flex-1 text-center md:text-left z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs mb-4"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /><span>Available for Freelance</span></div>
            <h1 className="text-4xl font-bold mb-2 tracking-tight">{profile?.full_name || SITE_CONFIG.name}</h1>
            <p className="text-xl text-primary font-medium mb-4">{profile?.title || SITE_CONFIG.title}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-white/60 text-sm mb-6"><span className="flex items-center gap-1.5"><MapPin size={16} className="text-secondary" /> {profile?.location || SITE_CONFIG.location}</span><span className="flex items-center gap-1.5"><GraduationCap size={16} className="text-secondary" /> 2nd Semester</span></div>
            <p className="text-white/70 leading-relaxed max-w-xl">{profile?.bio || 'Full-stack developer building modern web experiences.'}</p>
          </div>
        </motion.div>
        <motion.div variants={item} className="glass-card p-6 border-secondary/30">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-6 flex items-center gap-2"><Server size={16} /> System Status</h3>
          <div className="space-y-4">{[{ label: 'Database', value: 'Online', color: 'text-green-400' }, { label: 'GitHub API', value: 'Connected', color: 'text-green-400' }, { label: 'OS Version', value: SITE_CONFIG.version, color: 'text-primary' }].map((status, i) => (<div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5"><span className="text-xs text-white/40 uppercase font-mono">{status.label}</span><span className={`text-xs font-bold font-mono ${status.color}`}>{status.value}</span></div>))}</div>
        </motion.div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={item} className="lg:col-span-2"><TerminalWidget /></motion.div>
        <div className="space-y-8">
          <motion.div variants={item} className="glass-card p-6"><h3 className="text-sm font-bold uppercase tracking-[0.2em] text-accent mb-6 flex items-center gap-2"><Zap size={16} /> Currently Learning</h3><div className="grid grid-cols-2 gap-3">{['TypeScript', 'Next.js', 'Docker', 'System Design'].map((tech) => (<div key={tech} className="p-3 bg-white/5 border border-white/10 rounded-xl text-center text-xs font-medium">{tech}</div>))}</div></motion.div>
          <motion.div variants={item} className="glass-card p-6"><h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2"><Target size={16} /> 2026 Goals</h3><div className="space-y-3">{['Build SaaS Product', 'Learn TypeScript', 'Contribute Open Source', 'Get Internship'].map((goal) => (<div key={goal} className="flex items-center gap-3 text-xs text-white/60"><div className="w-4 h-4 border border-white/20 rounded flex items-center justify-center shrink-0" />{goal}</div>))}</div></motion.div>
        </div>
      </div>
      <motion.div variants={item}><GithubWidget username={profile?.github_username || SITE_CONFIG.githubUsername} /></motion.div>
      <motion.div variants={item}><div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-bold">Recent Projects</h2><button className="text-primary hover:text-primary/80 text-sm font-medium">View All Projects →</button></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{projects?.slice(0, 4).map((project, i) => (<div key={i} className="glass-card group hover:neon-border-purple transition-all duration-500"><div className="aspect-video relative overflow-hidden"><img src={project.thumbnail_url || SITE_CONFIG.placeholders.project} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /><div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" /></div><div className="p-4"><h4 className="font-bold mb-2">{project.name}</h4><p className="text-xs text-white/40 line-clamp-2 mb-4">{project.description}</p></div></div>))}</div></motion.div>
    </motion.div>
  );
}
