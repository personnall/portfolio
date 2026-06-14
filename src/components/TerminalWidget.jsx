import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAchievements } from '../store/AchievementContext';
import { supabase } from '../lib/supabase';

const TerminalWidget = () => {
  const [history, setHistory] = useState([
    { type: 'system', content: "MIANOS [Version 2.0.5]" },
    { type: 'system', content: "Type 'help' for commands." },
    { type: 'system', content: "" },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { trackCommand } = useAchievements();

  const commands = {
    help: () => "Available commands: about, skills, projects, education, experience, github, resume, contact, clear, systeminfo, whoami, coffee, sudo access",
    whoami: () => "Mian Khizar\nBSCS Student\nFull Stack Developer\nStatus: Building The Future",
    systeminfo: () => "MianOS Version: 1.0\nCore: React\nDatabase: Supabase\nTheme: Cyberpunk\nStatus: Operational",
    about: () => {
        setTimeout(() => navigate('/about'), 500);
        return "Navigating to Profile...";
    },
    skills: () => {
        setTimeout(() => navigate('/skills'), 500);
        return "Accessing Skill Matrix...";
    },
    projects: () => {
        setTimeout(() => navigate('/projects'), 500);
        return "Listing Repositories...";
    },
    education: () => {
        setTimeout(() => navigate('/education'), 500);
        return "Retrieving Academic Records...";
    },
    experience: () => {
        setTimeout(() => navigate('/experience'), 500);
        return "Loading Career Timeline...";
    },
    github: () => "Redirecting to GitHub API module...",
    resume: () => {
        setTimeout(() => navigate('/resume'), 500);
        return "Opening Resume Viewer...";
    },
    contact: () => {
        setTimeout(() => navigate('/contact'), 500);
        return "Initializing Communication Protocol...";
    },
    clear: () => {
        setHistory([]);
        return "";
    },
    coffee: () => "Brewing motivation...\n☕ Ready.",
    'sudo access': async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            setTimeout(() => navigate('/admin'), 1000);
            return "Welcome Administrator";
        } else {
            return "Insufficient Privileges";
        }
    },
    matrix: () => {
        document.body.dispatchEvent(new CustomEvent('trigger-matrix'));
        return "Entering Matrix...";
    },
    anime: () => {
        document.body.dispatchEvent(new CustomEvent('trigger-anime'));
        return "Anime Mode Activated";
    },
    easteregg: () => "Achievement Unlocked:\nCurious Developer"
  };

  const handleCommand = async (e) => {
    if (e.key === 'Enter') {
      const trimmedInput = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'input', content: input }];

      trackCommand();

      if (trimmedInput) {
        if (commands[trimmedInput]) {
          const result = await commands[trimmedInput]();
          if (result) newHistory.push({ type: 'output', content: result });
        } else {
          newHistory.push({ type: 'error', content: `Command not found: ${trimmedInput}. Type 'help' for assistance.` });
        }
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="glass-panel border-primary/20 flex flex-col h-[400px] font-mono text-xs sm:text-sm">
      <div className="bg-surface/80 px-4 py-2 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalIcon size={14} className="text-primary" />
          <span className="text-[10px] uppercase tracking-widest text-muted">System Terminal</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-1"
      >
        {history.map((line, i) => (
          <div key={i} className={cn(
            line.type === 'error' ? 'text-red-400' :
            line.type === 'input' ? 'text-primary' :
            line.type === 'system' ? 'text-secondary/70' : 'text-white/80'
          )}>
            {line.type === 'input' && <span className="mr-2 text-primary opacity-50">$</span>}
            <span className="whitespace-pre-wrap">{line.content}</span>
          </div>
        ))}
        <div className="flex items-center">
          <span className="mr-2 text-primary opacity-50">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent border-none outline-none text-primary"
            autoFocus
          />
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-primary ml-1"
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalWidget;
