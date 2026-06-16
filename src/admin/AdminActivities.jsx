import { useState } from 'react';
import { useActivities } from '../hooks/useData';
import { api } from '../lib/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function AdminActivities() {
  const { data: activities } = useActivities();
  const [editing, setEditing] = useState(null);
  const queryClient = useQueryClient();

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.save('activities', editing);
      setEditing(null);
      queryClient.invalidateQueries(['activities']);
      toast.success('OS Event logged');
    } catch (err) { toast.error(err.message); }
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div><h1 className="text-3xl font-bold">Event Log</h1></div>
        <button onClick={() => setEditing({ content: '', type: 'update' })} className="cyber-button flex items-center gap-2"><Plus size={18} /> New Event</button>
      </header>
      <div className="space-y-4">{activities?.map(a => (
        <div key={a.id} className="glass-card p-6 flex justify-between items-center">
          <div><p className="font-bold">{a.content}</p><p className="text-xs text-white/40">{new Date(a.timestamp).toLocaleString()} • {a.type}</p></div>
          <div className="flex gap-2">
            <button onClick={() => setEditing(a)} className="p-2 text-blue-400"><Pencil size={16} /></button>
            <button onClick={async () => { if(confirm('Purge event?')) { await api.delete('activities', a.id); queryClient.invalidateQueries(['activities']); } }} className="p-2 text-pink-400"><Trash2 size={16} /></button>
          </div>
        </div>
      ))}</div>
      {editing && (<div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80" onClick={() => setEditing(null)} />
        <form onSubmit={handleSave} className="relative w-full max-w-md glass-card p-8 space-y-4">
          <h3 className="text-xl font-bold font-mono">LOG_EVENT_ENTRY</h3>
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-white/40">Payload (Content)</label>
            <input required placeholder="Launched v2.0" value={editing.content || ''} onChange={e => setEditing({...editing, content: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-white/40">Tag (Type)</label>
            <select value={editing.type || 'update'} onChange={e => setEditing({...editing, type: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none">
              {['update', 'project', 'system', 'achievement'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <button className="cyber-button w-full">Commit to Ledger</button>
        </form>
      </div>)}
    </div>
  );
}
