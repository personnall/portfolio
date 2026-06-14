import { useState } from 'react';
import { useCertificates } from '../hooks/useData';
import { api } from '../lib/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function AdminCertificates() {
  const { data: items } = useCertificates();
  const [editing, setEditing] = useState(null);
  const queryClient = useQueryClient();

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.save('certificates', editing);
      setEditing(null);
      queryClient.invalidateQueries(['certificates']);
      toast.success('Certificate saved');
    } catch (err) { toast.error(err.message); }
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center"><div><h1 className="text-3xl font-bold">Certificates</h1></div><button onClick={() => setEditing({ name: '', provider: '', issue_date: '' })} className="cyber-button flex items-center gap-2"><Plus size={18} /> New</button></header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{items?.map(i => (
        <div key={i.id} className="glass-card p-6 flex justify-between items-center">
          <div><p className="font-bold">{i.name}</p><p className="text-xs text-white/40">{i.provider}</p></div>
          <div className="flex gap-2"><button onClick={() => setEditing(i)} className="p-2 text-blue-400"><Pencil size={16} /></button><button onClick={async () => { if(confirm('Delete?')) { await api.delete('certificates', i.id); queryClient.invalidateQueries(['certificates']); } }} className="p-2 text-pink-400"><Trash2 size={16} /></button></div>
        </div>
      ))}</div>
      {editing && (<div className="fixed inset-0 z-[100] flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/80" onClick={() => setEditing(null)} /><form onSubmit={handleSave} className="relative w-full max-w-md glass-card p-8 space-y-4">
        <h3 className="text-xl font-bold">Certificate Data</h3>
        <input required placeholder="Name" value={editing.name} onChange={e => setEditing({...editing, name: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none" />
        <input required placeholder="Provider" value={editing.provider} onChange={e => setEditing({...editing, provider: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none" />
        <input type="date" value={editing.issue_date} onChange={e => setEditing({...editing, issue_date: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none" />
        <input placeholder="Verification URL" value={editing.verification_url || ''} onChange={e => setEditing({...editing, verification_url: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none" />
        <button className="cyber-button w-full">Commit Changes</button>
      </form></div>)}
    </div>
  );
}
