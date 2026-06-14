import { useState } from 'react';
import { useSettings } from '../hooks/useData';
import { api } from '../lib/api';
import { Save, Shield, Github, Palette } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function Settings() {
  const { data: settings } = useSettings();
  const [newPass, setNewPass] = useState('');
  const queryClient = useQueryClient();

  const handleUpdatePass = async () => {
    if (!newPass) return;
    try {
      await api.save('settings', { key: 'Admin.Pass', value: newPass });
      localStorage.setItem('mianos_token', newPass); // Update local token to match
      setNewPass('');
      queryClient.invalidateQueries(['settings']);
      toast.success('Access Key updated');
    } catch (err) { toast.error(err.message); }
  };

  return (
    <div className="space-y-12">
      <header><h1 className="text-4xl font-bold mb-2">System Settings</h1><p className="text-white/40">Global configuration and core protocols.</p></header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="glass-card p-8 space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-3"><Shield size={22} className="text-pink-400" /> Security Protocol</h3>
            <div className="space-y-4">
               <label className="text-xs uppercase text-white/40 font-mono">New Administrative Access Key</label>
               <div className="flex gap-4">
                  <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} className="flex-1 bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-pink-500/50" placeholder="••••••••" />
                  <button onClick={handleUpdatePass} className="px-6 py-2 bg-pink-500/20 border border-pink-500/50 text-pink-500 hover:bg-pink-500 hover:text-white transition-all rounded-xl font-bold uppercase text-xs">Update Key</button>
               </div>
               <p className="text-[10px] text-white/20 italic">Warning: Updating this key will terminate all other active sessions.</p>
            </div>
          </section>

          <section className="glass-card p-8 space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-3"><Palette size={22} className="text-secondary" /> UI Enhancement</h3>
            <div className="space-y-4">
               <p className="text-sm text-white/60">Module visual parameters are currently hardcoded for stability. Dynamic theme switching planned for v1.1.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
