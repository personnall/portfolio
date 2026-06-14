import { useState } from 'react';
import { useProfile } from '../hooks/useData';
import { Github, User, Bell, Shield, Palette, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Settings() {
  const { data: profile } = useProfile();
  const [githubUser, setGithubUser] = useState(profile?.github_username || 'miankhizar');
  const handleSave = () => toast.success('Configuration updated (Mock)');

  return (
    <div className="space-y-12">
      <header><h1 className="text-4xl font-bold mb-2">System Settings</h1><p className="text-white/40">Configure your OS experience.</p></header>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="space-y-2">{[{ id: 'profile', label: 'Profile', icon: User }, { id: 'theme', label: 'Theme', icon: Palette }, { id: 'github', label: 'GitHub', icon: Github }, { id: 'security', label: 'Security', icon: Shield }].map(tab => (<button key={tab.id} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${tab.id === 'profile' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}><tab.icon size={18} /><span className="text-sm font-medium">{tab.label}</span></button>))}</aside>
        <div className="lg:col-span-3 space-y-8">
          <section className="glass-card p-8 space-y-8">
            <div className="flex items-center justify-between"><h3 className="text-xl font-bold flex items-center gap-3"><Github size={22} className="text-primary" /> GitHub Configuration</h3><button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary border border-primary/50 rounded-lg text-sm transition-all"><Save size={16} /> Save</button></div>
            <div className="space-y-2"><label className="text-xs font-mono uppercase text-white/40 ml-1">GitHub Username</label><div className="relative"><Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" /><input type="text" value={githubUser} onChange={(e) => setGithubUser(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-primary/50 transition-all" /></div></div>
          </section>
        </div>
      </div>
    </div>
  );
}
