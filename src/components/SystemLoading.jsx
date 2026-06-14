import React from 'react';

const SystemLoading = ({ message = "Syncing Data..." }) => (
  <div className="flex flex-col items-center justify-center p-20 space-y-6 font-mono">
    <div className="relative">
       <div className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
       <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-primary/10 rounded-full animate-pulse" />
       </div>
    </div>
    <div className="space-y-2 text-center">
       <div className="text-[10px] text-primary uppercase tracking-[0.4em] font-black animate-pulse">
         {message}
       </div>
       <div className="flex gap-1 justify-center">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-1 h-1 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
       </div>
    </div>
  </div>
);

export default SystemLoading;
