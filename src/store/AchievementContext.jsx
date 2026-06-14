import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AchievementContext = createContext();

export const AchievementProvider = ({ children }) => {
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('mianos_achievements');
    return saved ? JSON.parse(saved) : {
      explorer: { visited: new Set(), unlocked: false, label: "System Explorer" },
      powerUser: { commands: 0, unlocked: false, label: "Power User" },
      recruiter: { visited: new Set(), unlocked: false, label: "Recruiter Route Complete" }
    };
  });

  // Re-hydrate the Sets from arrays if they exist
  useEffect(() => {
    const saved = localStorage.getItem('mianos_achievements');
    if (saved) {
      const parsed = JSON.parse(saved);
      setAchievements({
        explorer: { ...parsed.explorer, visited: new Set(parsed.explorer.visited) },
        powerUser: parsed.powerUser,
        recruiter: { ...parsed.recruiter, visited: new Set(parsed.recruiter.visited) }
      });
    }
  }, []);

  useEffect(() => {
    // Save to localStorage (convert Sets to Arrays)
    const toSave = {
      explorer: { ...achievements.explorer, visited: Array.from(achievements.explorer.visited) },
      powerUser: achievements.powerUser,
      recruiter: { ...achievements.recruiter, visited: Array.from(achievements.recruiter.visited) }
    };
    localStorage.setItem('mianos_achievements', JSON.stringify(toSave));
  }, [achievements]);

  const unlock = (key) => {
    if (achievements[key].unlocked) return;

    setAchievements(prev => ({
      ...prev,
      [key]: { ...prev[key], unlocked: true }
    }));

    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} glass-panel border-primary/50 p-4 flex flex-col gap-1 min-w-[250px]`}>
        <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">Achievement Unlocked</span>
        <span className="text-sm font-bold">{achievements[key].label}</span>
      </div>
    ), { duration: 4000 });
  };

  const trackVisit = (path) => {
    const coreRoutes = ['/', '/about', '/projects', '/skills', '/experience', '/education', '/certificates', '/resume', '/contact'];
    const recruiterRoutes = ['/about', '/projects', '/resume', '/contact'];

    setAchievements(prev => {
        const next = { ...prev };

        // Explorer
        if (coreRoutes.includes(path)) {
            next.explorer.visited.add(path);
            if (next.explorer.visited.size === coreRoutes.length && !next.explorer.unlocked) {
                // Logic to unlock after the state update
            }
        }

        // Recruiter
        if (recruiterRoutes.includes(path)) {
            next.recruiter.visited.add(path);
        }

        return next;
    });
  };

  useEffect(() => {
     if (achievements.explorer.visited.size === 9 && !achievements.explorer.unlocked) unlock('explorer');
     if (achievements.recruiter.visited.size === 4 && !achievements.recruiter.unlocked) unlock('recruiter');
  }, [achievements]);

  const trackCommand = () => {
    setAchievements(prev => {
        const nextCount = prev.powerUser.commands + 1;
        if (nextCount === 10 && !prev.powerUser.unlocked) {
            // Unlock will be handled in separate effect or here
        }
        return { ...prev, powerUser: { ...prev.powerUser, commands: nextCount } };
    });
  };

  useEffect(() => {
     if (achievements.powerUser.commands === 10 && !achievements.powerUser.unlocked) unlock('powerUser');
  }, [achievements.powerUser.commands]);

  return (
    <AchievementContext.Provider value={{ achievements, trackVisit, trackCommand }}>
      {children}
    </AchievementContext.Provider>
  );
};

export const useAchievements = () => useContext(AchievementContext);
