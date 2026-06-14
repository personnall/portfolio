import { useState } from 'react';
import { useEducation } from '../hooks/useData';
import { supabase } from '../lib/supabase';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function AdminEducation() {
  const { data: items } = useEducation();
  const [editing, setEditing] = useState(null);
  const queryClient = useQueryClient();

  const handleSave = async (e) => {
    e.preventDefault();
    if (editing.id) await supabase.from('education').update(editing).eq('id', editing.id);
    else await supabase.from('education').insert([editing]);
    setEditing(null);
    queryClient.invalidateQueries(['education']);
    toast.success('Education record updated');
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center"><div><h1 className="text-3xl font-bold">Education</h1></div><button onClick={() => setEditing({ institution: '', degree: '', field_of_study: '' })} className="cyber-button flex items-center gap-2"><Plus size={18} /> New Record</button></header>
      <div className="space-y-4">{items?.map(i => (
        <div key={i.id} className="glass-card p-6 flex justify-between items-center">
          <div><p className="font-bold">{i.institution}</p><p className="text-xs text-white/40">{i.degree} in {i.field_of_study}</p></div>
          <div className="flex gap-2"><button onClick={() => setEditing(i)} className="p-2 text-blue-400"><Pencil size={16} /></button><button onClick={async () => { await supabase.from('education').delete().eq('id', i.id); queryClient.invalidateQueries(['education']); }} className="p-2 text-pink-400"><Trash2 size={16} /></button></div>
        </div>
      ))}</div>
      {editing && (<div className="fixed inset-0 z-[100] flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/80" onClick={() => setEditing(null)} /><div className="relative w-full max-w-md glass-card p-8 space-y-6">
        <form onSubmit={handleSave} className="space-y-4">
          <input required placeholder="Institution" value={editing.institution} onChange={e => setEditing({...editing, institution: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl" />
          <input placeholder="Degree" value={editing.degree} onChange={e => setEditing({...editing, degree: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl" />
          <button className="cyber-button w-full">Save</button>
        </form>
      </div></div>)}
    </div>
  );
}
