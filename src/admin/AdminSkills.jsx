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
    if (editing.id) await api.save('skills', editing);
    else await api.save('skills', editing);
    setEditing(null);
    queryClient.invalidateQueries(['skills']);
    toast.success('Skill updated');
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center"><div><h1 className="text-3xl font-bold">Skills</h1></div><button onClick={() => setEditing({ name: '', proficiency: 80, category: 'Frontend' })} className="cyber-button flex items-center gap-2"><Plus size={18} /> New Skill</button></header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{skills?.map(s => (
        <div key={s.id} className="glass-card p-6 flex justify-between items-center">
          <div><p className="font-bold">{s.name}</p><p className="text-xs text-white/40">{s.category} • {s.proficiency}%</p></div>
          <div className="flex gap-2"><button onClick={() => setEditing(s)} className="p-2 text-blue-400"><Pencil size={16} /></button><button onClick={async () => { await api.delete('skills', s.id); queryClient.invalidateQueries(['skills']); }} className="p-2 text-pink-400"><Trash2 size={16} /></button></div>
        </div>
      ))}</div>
      {editing && (<div className="fixed inset-0 z-[100] flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/80" onClick={() => setEditing(null)} /><div className="relative w-full max-w-md glass-card p-8 space-y-6">
        <form onSubmit={handleSave} className="space-y-4">
          <input required placeholder="Name" value={editing.name} onChange={e => setEditing({...editing, name: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl" />
          <input type="number" value={editing.proficiency} onChange={e => setEditing({...editing, proficiency: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl" />
          <select value={editing.category} onChange={e => setEditing({...editing, category: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl">{['Frontend', 'Backend', 'Database', 'Tools', 'Learning'].map(c => <option key={c} value={c}>{c}</option>)}</select>
          <button className="cyber-button w-full">Save</button>
        </form>
      </div></div>)}
    </div>
  );
}
