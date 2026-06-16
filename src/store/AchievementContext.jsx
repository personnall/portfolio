import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const AchievementContext = createContext();

export const AchievementProvider = ({ children }) => {
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('mianos_achievements');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          explorer: {
            ...parsed.explorer,
            visited: new Set(Array.isArray(parsed.explorer.visited) ? parsed.explorer.visited : [])
          },
          powerUser: parsed.powerUser,
          recruiter: {
            ...parsed.recruiter,
            visited: new Set(Array.isArray(parsed.recruiter.visited) ? parsed.recruiter.visited : [])
          }
        };
      } catch (e) {
        console.error("Failed to parse achievements:", e);
      }
    }
    return {
      explorer: { visited: new Set(), unlocked: false, label: "System Explorer" },
      powerUser: { commands: 0, unlocked: false, label: "Power User" },
      recruiter: { visited: new Set(), unlocked: false, label: "Recruiter Route Complete" }
    };
  });

  useEffect(() => {
    const toSave = {
      explorer: { ...achievements.explorer, visited: Array.from(achievements.explorer.visited) },
      powerUser: achievements.powerUser,
      recruiter: { ...achievements.recruiter, visited: Array.from(achievements.recruiter.visited) }
    };
    localStorage.setItem('mianos_achievements', JSON.stringify(toSave));
  }, [achievements]);

  const unlock = useCallback((key) => {
    if (achievements[key].unlocked) return;

    setAchievements(prev => ({
      ...prev,
      [key]: { ...prev[key], unlocked: true }
    }));

    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} glass-panel border-primary/50 p-4 flex flex-col gap-1 min-w-[250px] bg-background/90 backdrop-blur-xl z-[9999]`}>
        <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">Achievement Unlocked</span>
        <span className="text-sm font-bold">{achievements[key].label}</span>
      </div>
    ), { duration: 4000, position: 'top-right' });
  }, [achievements]);

  const trackVisit = useCallback((path) => {
    const coreRoutes = ['/', '/about', '/projects', '/skills', '/experience', '/education', '/certificates', '/resume', '/contact'];
    const recruiterRoutes = ['/about', '/projects', '/resume', '/contact'];

    setAchievements(prev => {
        const next = { ...prev };

        // Use new Sets to trigger state updates properly
        const newExplorerVisited = new Set(prev.explorer.visited);
        const newRecruiterVisited = new Set(prev.recruiter.visited);

        if (coreRoutes.includes(path)) {
            newExplorerVisited.add(path);
        }

        if (recruiterRoutes.includes(path)) {
            newRecruiterVisited.add(path);
        }

        return {
            ...prev,
            explorer: { ...prev.explorer, visited: newExplorerVisited },
            recruiter: { ...prev.recruiter, visited: newRecruiterVisited }
        };
    });
  }, []);

  useEffect(() => {
     if (achievements.explorer.visited.size >= 9 && !achievements.explorer.unlocked) {
        unlock('explorer');
     }
     if (achievements.recruiter.visited.size >= 4 && !achievements.recruiter.unlocked) {
        unlock('recruiter');
     }
  }, [achievements.explorer.visited.size, achievements.recruiter.visited.size, achievements.explorer.unlocked, achievements.recruiter.unlocked, unlock]);

  const trackCommand = useCallback(() => {
    setAchievements(prev => {
        const nextCount = prev.powerUser.commands + 1;
        return { ...prev, powerUser: { ...prev.powerUser, commands: nextCount } };
    });
  }, []);

  useEffect(() => {
     if (achievements.powerUser.commands >= 10 && !achievements.powerUser.unlocked) {
        unlock('powerUser');
     }
  }, [achievements.powerUser.commands, achievements.powerUser.unlocked, unlock]);

  return (
    <AchievementContext.Provider value={{ achievements, trackVisit, trackCommand }}>
      {children}
    </AchievementContext.Provider>
  );
};

export const useAchievements = () => useContext(AchievementContext);
