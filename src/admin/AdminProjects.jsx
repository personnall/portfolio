import { useState } from 'react';
import { useProjects } from '../hooks/useData';
import { api } from '../lib/api';
import { Plus, Pencil, Trash2, Search, Loader2, X, Globe, Code } from 'lucide-react';
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
    try {
      await api.save('projects', editing);
      toast.success('Project updated');
      setEditing(null);
      queryClient.invalidateQueries(['projects']);
    } catch (err) {
      toast.error(err.message);
    }
    setIsSaving(false);
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div><h1 className="text-3xl font-bold">Projects</h1><p className="text-white/40">Manage portfolio modules.</p></div>
        <button onClick={() => setEditing({ name: '', category: 'Frontend', status: 'STABLE' })} className="cyber-button flex items-center gap-2"><Plus size={18} /> New</button>
      </header>
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center gap-4"><Search size={18} className="text-white/20" /><input placeholder="Filter..." className="bg-transparent border-none outline-none text-sm w-full" value={search} onChange={e => setSearch(e.target.value)} /></div>
        <div className="overflow-x-auto"><table className="w-full text-left text-sm">
          <thead><tr className="bg-white/5 text-white/40 uppercase text-[10px] font-mono"><th className="px-6 py-4">Name</th><th className="px-6 py-4">Category</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
          <tbody className="divide-y divide-white/5">{projects?.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(p => (
            <tr key={p.id} className="hover:bg-white/[0.02] group"><td className="px-6 py-4 font-bold">{p.name}</td><td className="px-6 py-4 text-primary text-[10px] font-bold">{p.category}</td><td className="px-6 py-4 text-right"><div className="flex justify-end gap-2"><button onClick={() => setEditing(p)} className="p-2 text-blue-400"><Pencil size={16} /></button><button onClick={async () => { if(confirm('Delete?')) { await api.delete('projects', p.id); queryClient.invalidateQueries(['projects']); } }} className="p-2 text-pink-400"><Trash2 size={16} /></button></div></td></tr>
          ))}</tbody>
        </table></div>
      </div>
      {editing && (<div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80" onClick={() => setEditing(null)} />
        <form onSubmit={handleSave} className="relative w-full max-w-2xl glass-card p-8 space-y-4 overflow-y-auto max-h-[90vh]">
          <h3 className="text-xl font-bold">Project Config</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase text-white/40">Name</label>
              <input required placeholder="Name" value={editing.name || ''} onChange={e => setEditing({...editing, name: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase text-white/40">Category</label>
              <select value={editing.category || 'Frontend'} onChange={e => setEditing({...editing, category: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none">
                {['Frontend', 'Backend', 'Full Stack', 'API', 'Open Source', 'Portfolio'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-white/40">Short Description</label>
            <input placeholder="Short hook..." value={editing.description || ''} onChange={e => setEditing({...editing, description: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-white/40">Long Description</label>
            <textarea rows="3" placeholder="Detailed overview..." value={editing.long_description || ''} onChange={e => setEditing({...editing, long_description: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase text-white/40">Thumbnail URL</label>
              <input placeholder="https://..." value={editing.thumbnail_url || ''} onChange={e => setEditing({...editing, thumbnail_url: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase text-white/40">Live URL</label>
              <input placeholder="https://..." value={editing.live_url || ''} onChange={e => setEditing({...editing, live_url: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none" />
            </div>
          </div>
          <button disabled={isSaving} className="cyber-button w-full">{isSaving ? 'Syncing...' : 'Commit to Database'}</button>
        </form>
      </div>)}
    </div>
  );
}
