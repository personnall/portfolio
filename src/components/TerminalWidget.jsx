import { useState } from 'react';
import { Terminal } from 'lucide-react';

const COMMANDS = {
  help: "Available commands: about, skills, projects, github, resume, contact, clear",
  about: "Mian Khizar - BSCS Student & Full Stack Developer based in Pakistan.",
  skills: "Frontend: React, JS, CSS, HTML. Backend: Node.js, PHP, MySQL, Supabase.",
  projects: "1. Branch PDF Generator\n2. Anime Streaming Platform\n3. Weather Dashboard\n4. MianOS",
  github: "GitHub: @miankhizar - 25+ Repositories, 15+ Projects Completed.",
  resume: "Resume viewer available in the system. Use 'Go to Resume' in command palette.",
  contact: "Email: miankhizar@gmail.com\nLinkedIn: mian-khizar\nStatus: Available for Freelance",
};

export default function TerminalWidget() {
  const [history, setLogs] = useState([{ type: 'output', content: "MianOS Terminal v1.0.0\nType 'help' for commands." }]);
  const [input, setInput] = useState('');

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.toLowerCase().trim();
      const newHistory = [...history, { type: 'input', content: input }];
      if (cmd === 'clear') setLogs([]);
      else if (COMMANDS[cmd]) { newHistory.push({ type: 'output', content: COMMANDS[cmd] }); setLogs(newHistory); }
      else if (cmd !== '') { newHistory.push({ type: 'output', content: `Command not found: ${cmd}. Type 'help' for assistance.` }); setLogs(newHistory); }
      setInput('');
    }
  };

  return (
    <div className="glass-card bg-black/40 border-primary/20 flex flex-col h-[350px] font-mono text-xs">
      <div className="bg-primary/10 px-4 py-2 border-b border-white/5 flex items-center justify-between"><div className="flex items-center gap-2"><Terminal size={14} className="text-primary" /><span className="text-white/60 uppercase tracking-tighter">System Terminal</span></div></div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">{history.map((log, i) => (<div key={i} className={log.type === 'input' ? 'text-secondary' : 'text-white/80 whitespace-pre-wrap'}>{log.type === 'input' && <span className="mr-2 opacity-50">&gt;</span>}{log.content}</div>))}</div>
      <div className="p-4 bg-white/5 flex items-center gap-2 border-t border-white/5"><span className="text-primary font-bold">&gt;</span><input autoFocus className="bg-transparent border-none outline-none flex-1 text-primary" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleCommand} /></div>
    </div>
  );
}
