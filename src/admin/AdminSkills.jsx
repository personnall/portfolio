import { useState } from 'react';
import { useSkills } from '../hooks/useData';
import { api } from '../lib/api';
import { Plus, Pencil, Trash2, Search, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function AdminSkills() {
  const { data: skills } = useSkills();
  const [editing, setEditing] = useState(null);
  const queryClient = useQueryClient();

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.save('skills', editing);
      setEditing(null);
      queryClient.invalidateQueries(['skills']);
      toast.success('Skill updated');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div><h1 className="text-3xl font-bold">Skills</h1></div>
        <button onClick={() => setEditing({ name: '', level: 80, category: 'Frontend' })} className="cyber-button flex items-center gap-2">
          <Plus size={18} /> New Skill
        </button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{skills?.map(s => (
        <div key={s.id} className="glass-card p-6 flex justify-between items-center">
          <div><p className="font-bold">{s.name}</p><p className="text-xs text-white/40">{s.category} • {s.level}%</p></div>
          <div className="flex gap-2">
            <button onClick={() => setEditing(s)} className="p-2 text-blue-400"><Pencil size={16} /></button>
            <button onClick={async () => { if(confirm('Delete?')) { await api.delete('skills', s.id); queryClient.invalidateQueries(['skills']); } }} className="p-2 text-pink-400"><Trash2 size={16} /></button>
          </div>
        </div>
      ))}</div>
      {editing && (<div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80" onClick={() => setEditing(null)} />
        <div className="relative w-full max-w-md glass-card p-8 space-y-6">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase text-white/40">Identifier</label>
              <input required placeholder="Name" value={editing.name || ''} onChange={e => setEditing({...editing, name: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase text-white/40">Mastery (%)</label>
              <input type="number" min="0" max="100" value={editing.level || 0} onChange={e => setEditing({...editing, level: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase text-white/40">Module (Category)</label>
              <select value={editing.category || 'Frontend'} onChange={e => setEditing({...editing, category: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none">
                {['Frontend', 'Backend', 'Database', 'Tools', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button className="cyber-button w-full">Commit Changes</button>
          </form>
        </div>
      </div>)}
    </div>
  );
}
