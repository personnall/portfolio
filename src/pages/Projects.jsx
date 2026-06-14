import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '../hooks/useData';
import { Search, ExternalLink, Github, Info } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { Link } from 'react-router-dom';

const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'API', 'Open Source', 'Portfolio'];

export default function Projects() {
  const { data: projects } = useProjects();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = projects?.filter(p => {
    const mSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const mFilter = filter === 'All' || p.category === filter;
    return mSearch && mFilter;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div><h1 className="text-4xl font-bold mb-2">Projects</h1><p className="text-white/40">Explore my work and personal projects.</p></div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative group"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-primary" /><input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-surface border border-white/10 rounded-xl outline-none focus:border-primary/50 transition-all w-full sm:w-64" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <div className="flex bg-surface p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar">{categories.map((cat) => (<button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${filter === cat ? 'bg-primary text-white' : 'text-white/40 hover:text-white'}`}>{cat}</button>))}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><AnimatePresence mode="popLayout">{filtered?.map((project) => (<motion.div layout key={project.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card flex flex-col group h-full hover:neon-border-purple transition-all duration-500"><div className="aspect-video relative overflow-hidden"><img src={project.thumbnail_url || SITE_CONFIG.placeholders.project} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" /></div><div className="p-6 flex-1 flex flex-col"><h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.name}</h3><p className="text-white/50 text-sm mb-6 flex-1 line-clamp-3">{project.description}</p><div className="grid grid-cols-3 gap-2"><Link to={`/projects/${project.id}`} className="flex items-center justify-center gap-2 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs transition-all"><Info size={14} /> Details</Link><a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 p-2 bg-primary/20 hover:bg-primary border border-primary/40 rounded-lg text-xs transition-all"><ExternalLink size={14} /> Demo</a><a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs transition-all"><Github size={14} /> Code</a></div></div></motion.div>))}</AnimatePresence></div>
    </div>
  );
}
