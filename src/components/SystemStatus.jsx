import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Database, Github, Globe, Terminal } from 'lucide-react';

const SystemStatus = () => {
  const systems = [
    { name: "Portfolio Core", status: "ONLINE", icon: Globe, color: "text-primary" },
    { name: "GitHub Interface", status: "ONLINE", icon: Github, color: "text-secondary" },
    { name: "Database", status: "ONLINE", icon: Database, color: "text-accent" },
    { name: "Admin Console", status: "SECURED", icon: ShieldCheck, color: "text-green-500" },
  ];

  return (
    <div className="glass-panel border-white/5 p-6 space-y-6">
       <div className="flex items-center justify-between">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-muted">System Status</h4>
          <Activity size={14} className="text-primary animate-pulse" />
       </div>

       <div className="space-y-4">
          {systems.map((s, i) => (
            <div key={i} className="flex items-center justify-between group">
               <div className="flex items-center gap-3">
                  <div className={cn("p-1.5 rounded bg-surface border border-white/5", s.color)}>
                     <s.icon size={12} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">{s.name}</span>
               </div>
               <div className="flex items-center gap-2">
                  <span className={cn("text-[9px] font-black uppercase tracking-widest", s.status === 'ONLINE' ? "text-primary" : "text-green-500")}>
                    {s.status}
                  </span>
                  <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", s.status === 'ONLINE' ? "bg-primary shadow-[0_0_5px_#8b5cf6]" : "bg-green-500 shadow-[0_0_5px_#10b981]")} />
               </div>
            </div>
          ))}
       </div>

       <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[8px] text-muted uppercase tracking-widest font-black">
          <div className="flex items-center gap-1"><Terminal size={10} /> LATENCY: 24MS</div>
          <div className="flex items-center gap-1">PK-NODE-7</div>
       </div>
    </div>
  );
};

const cn = (...classes) => classes.filter(Boolean).join(' ');

export default SystemStatus;
