import { motion } from 'framer-motion';
import { useEducation } from '../hooks/useData';
import { GraduationCap, BookOpen, Trophy, Calendar, MapPin } from 'lucide-react';

export default function Education() {
  const { data: education } = useEducation();
  return (
    <div className="space-y-12">
      <header><h1 className="text-4xl font-bold mb-2">Academic Profile</h1><p className="text-white/40">My educational background and achievements.</p></header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {education?.map((edu) => (
            <section key={edu.id} className="glass-card p-8 relative overflow-hidden group">
              <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0"><GraduationCap className="w-8 h-8 text-primary" /></div>
                <div className="flex-1 space-y-4">
                  <div><h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{edu.institution}</h3><p className="text-lg text-primary/80 font-medium">{edu.degree} in {edu.field_of_study}</p></div>
                  <div className="flex flex-wrap gap-4 text-sm text-white/40"><span className="flex items-center gap-2"><Calendar size={16} /> {new Date(edu.start_date).getFullYear()} — {edu.end_date ? new Date(edu.end_date).getFullYear() : 'Present'}</span><span className="px-2 py-0.5 bg-secondary/20 text-secondary border border-secondary/30 rounded text-xs uppercase font-bold">{edu.current_semester}</span></div>
                </div>
              </div>
            </section>
          )) || <div className="glass-card p-12 text-center border-dashed border-white/10"><p className="text-white/40 italic">Academic data synchronizing...</p></div>}
        </div>
      </div>
    </div>
  );
}
