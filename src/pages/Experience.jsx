import { motion } from 'framer-motion';
import { useExperience } from '../hooks/useData';
import { Briefcase, Calendar, MapPin, Rocket, Code } from 'lucide-react';

export default function Experience() {
  const { data: experience } = useExperience();
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Work': return Briefcase;
      case 'Freelance': return Rocket;
      case 'Open Source': return Code;
      default: return Briefcase;
    }
  };

  return (
    <div className="space-y-12">
      <header><h1 className="text-4xl font-bold mb-2">Professional Experience</h1><p className="text-white/40">My career journey and contributions.</p></header>
      <div className="max-w-4xl space-y-12 relative">
        <div className="absolute left-[39px] top-4 bottom-4 w-px bg-gradient-to-b from-primary via-secondary to-transparent hidden md:block" />
        {experience?.map((exp, i) => {
          const Icon = getTypeIcon(exp.type);
          return (
            <motion.div key={exp.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative pl-0 md:pl-24">
              <div className="absolute left-[24px] top-8 w-8 h-8 rounded-full bg-background border-2 border-primary hidden md:flex items-center justify-center z-10 shadow-neon-purple"><div className="w-2 h-2 rounded-full bg-primary animate-pulse" /></div>
              <div className="glass-card p-8 hover:neon-border-purple transition-all duration-500 group">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2"><div className="p-2 bg-primary/10 rounded-lg"><Icon className="w-5 h-5 text-primary" /></div><span className="text-xs font-bold uppercase tracking-widest text-primary">{exp.type}</span></div>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{exp.title}</h3><p className="text-lg text-white/60">{exp.company}</p>
                  </div>
                  <div className="flex flex-col items-end"><span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/40">{new Date(exp.start_date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })} — {exp.is_current ? ' Present' : ` ${new Date(exp.end_date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}`}</span></div>
                </div>
                <p className="text-white/70 leading-relaxed max-w-3xl mb-6">{exp.description}</p>
                <div className="flex flex-wrap gap-4"><div className="flex items-center gap-2 text-xs text-white/40"><MapPin size={14} /> Remote / Pakistan</div></div>
              </div>
            </motion.div>
          );
        })}
        {(!experience || experience.length === 0) && (<div className="pl-0 md:pl-24"><div className="glass-card p-12 text-center border-dashed border-white/10"><Briefcase size={48} className="mx-auto text-white/10 mb-4" /><p className="text-white/40 italic">Building my experience... stay tuned!</p></div></div>)}
      </div>
    </div>
  );
}
