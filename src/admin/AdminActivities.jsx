import { useState } from 'react';
import { useActivities } from '../hooks/useData';
import { supabase } from '../lib/supabase';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function AdminActivities() {
  const { data: activities } = useActivities();
  const [editing, setEditing] = useState(null);
  const queryClient = useQueryClient();

  const handleSave = async (e) => {
    e.preventDefault();
    if (editing.id) await supabase.from('activities').update(editing).eq('id', editing.id);
    else await supabase.from('activities').insert([editing]);
    setEditing(null);
    queryClient.invalidateQueries(['activities']);
    toast.success('Activity logged');
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center"><div><h1 className="text-3xl font-bold">Activity Feed</h1></div><button onClick={() => setEditing({ title: '', description: '', category: 'Development' })} className="cyber-button flex items-center gap-2"><Plus size={18} /> New Activity</button></header>
      <div className="space-y-4">{activities?.map(a => (
        <div key={a.id} className="glass-card p-6 flex justify-between items-center">
          <div><p className="font-bold">{a.title}</p><p className="text-xs text-white/40">{new Date(a.activity_date).toLocaleDateString()} • {a.category}</p></div>
          <div className="flex gap-2"><button onClick={() => setEditing(a)} className="p-2 text-blue-400"><Pencil size={16} /></button><button onClick={async () => { await supabase.from('activities').delete().eq('id', a.id); queryClient.invalidateQueries(['activities']); }} className="p-2 text-pink-400"><Trash2 size={16} /></button></div>
        </div>
      ))}</div>
      {editing && (<div className="fixed inset-0 z-[100] flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/80" onClick={() => setEditing(null)} /><div className="relative w-full max-w-md glass-card p-8 space-y-6">
        <form onSubmit={handleSave} className="space-y-4">
          <input required placeholder="Title" value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl" />
          <textarea placeholder="Description" value={editing.description} onChange={e => setEditing({...editing, description: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl" />
          <button className="cyber-button w-full">Commit</button>
        </form>
      </div></div>)}
    </div>
  );
}
