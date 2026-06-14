import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useData';
import { ChevronLeft, ExternalLink, Github, Info, Zap } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: projects } = useProjects();
  const project = projects?.find(p => p.id === id);

  if (!project) return <div className="p-20 text-center">Project not found.</div>;

  return (
    <div className="space-y-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors"><ChevronLeft size={20} /> Back to Projects</button>
      <div className="glass-card neon-border-purple"><div className="p-8 space-y-8">
        <div className="flex justify-between items-start"><div><h1 className="text-3xl font-bold mb-2">{project.name}</h1><div className="flex items-center gap-4 text-sm text-white/40"><span className="text-primary font-mono">v{project.version}</span><span>|</span><span className="text-secondary">{project.status}</span></div></div></div>
        <div className="aspect-video rounded-xl overflow-hidden border border-white/10"><img src={project.thumbnail_url || SITE_CONFIG.placeholders.project} alt={project.name} className="w-full h-full object-cover" /></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <section><h4 className="text-lg font-bold mb-3 flex items-center gap-2"><Info size={20} className="text-primary" /> Overview</h4><p className="text-white/70 leading-relaxed">{project.description}</p></section>
            <section><h4 className="text-lg font-bold mb-3 flex items-center gap-2"><Zap size={20} className="text-secondary" /> Features</h4><ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">{project.features?.map((f, i) => (<li key={i} className="flex items-center gap-2 text-sm text-white/60">▹ {f}</li>))}</ul></section>
          </div>
          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><h4 className="font-bold mb-4">Tech Stack</h4><div className="flex flex-wrap gap-2">{project.technologies?.map((tech, i) => (<span key={i} className="px-3 py-1 bg-surface border border-white/5 rounded-lg text-xs text-white/80 font-mono">{tech}</span>))}</div></div>
            <div className="flex flex-col gap-3"><a href={project.live_url} target="_blank" rel="noreferrer" className="cyber-button text-center flex items-center justify-center gap-2"><ExternalLink size={18} /> Live Demo</a><a href={project.github_url} target="_blank" rel="noreferrer" className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all rounded-md flex items-center justify-center gap-2"><Github size={18} /> View Source</a></div>
          </div>
        </div>
      </div></div>
    </div>
  );
}
