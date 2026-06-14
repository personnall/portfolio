import { useState } from 'react';
import { useEducation } from '../hooks/useData';
import { api } from '../lib/api';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function AdminEducation() {
  const { data: items } = useEducation();
  const [editing, setEditing] = useState(null);
  const queryClient = useQueryClient();

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.save('education', editing);
      setEditing(null);
      queryClient.invalidateQueries(['education']);
      toast.success('Record saved');
    } catch (err) { toast.error(err.message); }
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center"><div><h1 className="text-3xl font-bold">Education</h1></div><button onClick={() => setEditing({ institution: '', degree: '', current_semester: '' })} className="cyber-button flex items-center gap-2"><Plus size={18} /> New</button></header>
      <div className="space-y-4">{items?.map(i => (
        <div key={i.id} className="glass-card p-6 flex justify-between items-center">
          <div><p className="font-bold">{i.institution}</p><p className="text-xs text-white/40">{i.degree} • {i.current_semester}</p></div>
          <div className="flex gap-2"><button onClick={() => setEditing(i)} className="p-2 text-blue-400"><Pencil size={16} /></button><button onClick={async () => { if(confirm('Delete?')) { await api.delete('education', i.id); queryClient.invalidateQueries(['education']); } }} className="p-2 text-pink-400"><Trash2 size={16} /></button></div>
        </div>
      ))}</div>
      {editing && (<div className="fixed inset-0 z-[100] flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/80" onClick={() => setEditing(null)} /><form onSubmit={handleSave} className="relative w-full max-w-md glass-card p-8 space-y-4">
        <h3 className="text-xl font-bold">Academic Data</h3>
        <input required placeholder="Institution" value={editing.institution} onChange={e => setEditing({...editing, institution: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none" />
        <input required placeholder="Degree" value={editing.degree} onChange={e => setEditing({...editing, degree: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none" />
        <input placeholder="Semester" value={editing.current_semester} onChange={e => setEditing({...editing, current_semester: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none" />
        <button className="cyber-button w-full">Commit Changes</button>
      </form></div>)}
    </div>
  );
}
