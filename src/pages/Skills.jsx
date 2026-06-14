import { motion } from 'framer-motion';
import { useSkills } from '../hooks/useData';
import { Code2, Database, Terminal, Laptop, Wrench, GraduationCap } from 'lucide-react';

export default function Skills() {
  const { data: skills } = useSkills();
  const skillCategories = [
    { name: 'Frontend', icon: Laptop, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { name: 'Backend', icon: Terminal, color: 'text-green-400', bg: 'bg-green-400/10' },
    { name: 'Database', icon: Database, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { name: 'Tools', icon: Wrench, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { name: 'Learning', icon: GraduationCap, color: 'text-pink-400', bg: 'bg-pink-400/10' },
  ];
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="space-y-12">
      <header><h1 className="text-4xl font-bold mb-2">Skills & Technologies</h1><p className="text-white/40">My technical expertise and learning path.</p></header>
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category) => {
          const categorySkills = skills?.filter(s => s.category === category.name);
          if (!categorySkills?.length && category.name !== 'Learning') return null;
          return (
            <motion.div key={category.name} variants={item} className="glass-card p-8">
              <div className="flex items-center gap-4 mb-8"><div className={`p-3 rounded-xl ${category.bg}`}><category.icon className={`w-6 h-6 ${category.color}`} /></div><h3 className="text-xl font-bold">{category.name}</h3></div>
              <div className="space-y-6">
                {categorySkills?.map((skill) => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex justify-between items-center text-sm"><span className="font-medium text-white/80">{skill.name}</span><span className={category.color}>{skill.proficiency}%</span></div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5"><motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.proficiency}%` }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: true }} className={`h-full ${category.bg.replace('/10', '')} shadow-[0_0_10px_rgba(255,255,255,0.2)]`} /></div>
                  </div>
                ))}
                {category.name === 'Learning' && (<div className="grid grid-cols-2 gap-3 mt-4">{['Next.js', 'TypeScript', 'Docker', 'GraphQL'].map((tech) => (<div key={tech} className="px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-center text-sm font-medium hover:border-pink-400/50 transition-all cursor-default group"><span className="group-hover:text-pink-400 transition-colors">{tech}</span></div>))}</div>)}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
