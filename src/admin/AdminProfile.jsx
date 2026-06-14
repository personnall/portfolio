import { useState } from 'react';
import { useProfile } from '../hooks/useData';
import { supabase } from '../lib/supabase';
import { Save, User, Camera, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function AdminProfile() {
  const { data: profile } = useProfile();
  const [form, setForm] = useState(null);
  const queryClient = useQueryClient();

  if (!form && profile) setForm(profile);

  const handleSave = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('profiles').update(form).eq('id', form.id);
    if (!error) { toast.success('Profile updated'); queryClient.invalidateQueries(['profile']); }
  };

  if (!form) return null;

  return (
    <div className="space-y-10">
      <header><h1 className="text-3xl font-bold">Profile Configuration</h1></header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2"><form onSubmit={handleSave} className="glass-card p-8 space-y-6">
          <div className="space-y-2"><label className="text-xs uppercase text-white/40">Full Name</label><input value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl" /></div>
          <div className="space-y-2"><label className="text-xs uppercase text-white/40">Bio</label><textarea rows="5" value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl" /></div>
          <button className="cyber-button w-full py-4 flex items-center justify-center gap-2"><Save size={18} /> Update Core Identity</button>
        </form></div>
        <div className="space-y-8">
          <div className="glass-card p-8 text-center"><div className="w-32 h-32 bg-white/5 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-dashed border-white/10"><Camera className="text-white/20" /></div><button className="text-xs text-primary uppercase font-bold tracking-widest">Change Avatar</button></div>
          <div className="glass-card p-8 text-center"><div className="w-20 h-20 bg-white/5 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-white/10"><FileText className="text-white/20" /></div><button className="text-xs text-secondary uppercase font-bold tracking-widest">Update Resume PDF</button></div>
        </div>
      </div>
    </div>
  );
}
