import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, CircleDashed, Award, Code, Database, Globe } from 'lucide-react';

const ActivityFeed = ({ activities = [] }) => {
  const defaultActivities = [
    { id: 1, content: "Updated Portfolio with Cyberpunk UI", timestamp: "Today", type: "update" },
    { id: 2, content: "Implemented Supabase Authentication", timestamp: "Yesterday", type: "system" },
    { id: 3, content: "Created PDF Generator Utility", timestamp: "3 Days Ago", type: "project" },
    { id: 4, content: "Completed Database Fundamentals Course", timestamp: "1 Week Ago", type: "achievement" },
  ];

  const displayActivities = activities.length > 0 ? activities : defaultActivities;

  const getIcon = (type) => {
    switch (type) {
      case 'achievement': return <Award size={12} className="text-yellow-500" />;
      case 'project': return <Code size={12} className="text-secondary" />;
      case 'system': return <Database size={12} className="text-primary" />;
      default: return <CheckCircle2 size={12} className="text-green-500" />;
    }
  };

  return (
    <div className="glass-panel border-primary/20 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[10px] uppercase tracking-[0.2em] font-black text-primary/70">Activity Log</h3>
        <CircleDashed size={14} className="text-muted animate-spin-slow" />
      </div>

      <div className="relative space-y-6">
        {/* Timeline line */}
        <div className="absolute left-1.5 top-2 bottom-2 w-[1px] bg-white/10" />

        {displayActivities.map((activity, i) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative pl-8"
          >
            <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-surface border border-white/20 flex items-center justify-center z-10 shadow-[0_0_10px_rgba(255,255,255,0.05)]">
               <div className="w-1 h-1 rounded-full bg-primary" />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                {getIcon(activity.type)}
                <span className="text-[10px] text-muted uppercase tracking-widest">{activity.timestamp}</span>
              </div>
              <p className="text-sm text-white/90 font-medium">{activity.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
