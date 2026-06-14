import { useState } from 'react';
import { useProjects } from '../hooks/useData';
import { supabase } from '../lib/supabase';
import { Plus, Pencil, Trash2, Search, Loader2, X, Globe, Code, Layers } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function AdminProjects() {
  const { data: projects } = useProjects();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const { error } = editing.id
      ? await supabase.from('projects').update(editing).eq('id', editing.id)
      : await supabase.from('projects').insert([editing]);

    if (!error) {
      toast.success('System module updated');
      setEditing(null);
      queryClient.invalidateQueries(['projects']);
    } else toast.error(error.message);
    setIsSaving(false);
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div><h1 className="text-3xl font-bold">Project Management</h1><p className="text-white/40 text-sm">Deploy and maintain system modules.</p></div>
        <button onClick={() => setEditing({ name: '', category: 'Frontend', technologies: [] })} className="cyber-button flex items-center gap-2"><Plus size={18} /> Deploy New</button>
      </header>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center gap-4"><Search size={18} className="text-white/20" /><input placeholder="Filter modules..." className="bg-transparent border-none outline-none text-sm w-full" value={search} onChange={e => setSearch(e.target.value)} /></div>
        <div className="overflow-x-auto"><table className="w-full text-left text-sm">
          <thead><tr className="bg-white/5 text-white/40 uppercase text-[10px] tracking-widest font-mono"><th className="px-6 py-4">Module</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
          <tbody className="divide-y divide-white/5">{projects?.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(p => (
            <tr key={p.id} className="hover:bg-white/[0.02] group"><td className="px-6 py-4"><div><p className="font-bold">{p.name}</p><p className="text-[10px] text-primary uppercase font-mono">{p.category}</p></div></td><td className="px-6 py-4"><span className="text-green-400 text-[10px] font-bold uppercase tracking-tighter">Active</span></td><td className="px-6 py-4 text-right"><div className="flex justify-end gap-2"><button onClick={() => setEditing(p)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"><Pencil size={16} /></button><button onClick={async () => { if(confirm('Purge module?')) await supabase.from('projects').delete().eq('id', p.id); queryClient.invalidateQueries(['projects']); }} className="p-2 text-pink-400 hover:bg-pink-400/10 rounded-lg transition-all"><Trash2 size={16} /></button></div></td></tr>
          ))}</tbody>
        </table></div>
      </div>

      {editing && (<div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditing(null)} />
        <form onSubmit={handleSave} className="relative w-full max-w-2xl glass-card p-8 space-y-6">
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-bold">Module Configuration</h3><X size={20} className="cursor-pointer text-white/40" onClick={() => setEditing(null)} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1"><label className="text-[10px] uppercase text-white/40 font-mono">Module Name</label><input required value={editing.name} onChange={e => setEditing({...editing, name: e.target.value})} className="w-full bg-white/5 border border-white/10 p-2.5 rounded-xl outline-none focus:border-primary/50" /></div>
            <div className="space-y-1"><label className="text-[10px] uppercase text-white/40 font-mono">Category</label><select value={editing.category} onChange={e => setEditing({...editing, category: e.target.value})} className="w-full bg-white/5 border border-white/10 p-2.5 rounded-xl outline-none">
              {['Frontend', 'Backend', 'Full Stack', 'API', 'Open Source', 'Portfolio'].map(c => <option key={c} value={c}>{c}</option>)}
            </select></div>
          </div>
          <div className="space-y-1"><label className="text-[10px] uppercase text-white/40 font-mono">Description</label><textarea rows="3" value={editing.description} onChange={e => setEditing({...editing, description: e.target.value})} className="w-full bg-white/5 border border-white/10 p-2.5 rounded-xl outline-none focus:border-primary/50" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1"><label className="text-[10px] uppercase text-white/40 font-mono">Demo URL</label><div className="relative"><Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" /><input value={editing.live_url} onChange={e => setEditing({...editing, live_url: e.target.value})} className="w-full bg-white/5 border border-white/10 p-2.5 pl-10 rounded-xl outline-none" /></div></div>
            <div className="space-y-1"><label className="text-[10px] uppercase text-white/40 font-mono">Source URL</label><div className="relative"><Code size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" /><input value={editing.github_url} onChange={e => setEditing({...editing, github_url: e.target.value})} className="w-full bg-white/5 border border-white/10 p-2.5 pl-10 rounded-xl outline-none" /></div></div>
          </div>
          <button disabled={isSaving} className="cyber-button w-full py-3 font-bold uppercase tracking-widest">{isSaving ? 'Synchronizing...' : 'Initialize Deployment'}</button>
        </form>
      </div>)}
    </div>
  );
}
