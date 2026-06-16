import { useState, useEffect } from 'react';
import { useProfile, useSocialLinks } from '../hooks/useData';
import { api } from '../lib/api';
import { Save, User, Camera, FileText, Globe, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function AdminProfile() {
  const { data: profile } = useProfile();
  const { data: socialLinks } = useSocialLinks();
  const [form, setForm] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (profile && !form) {
      setForm({ ...profile });
    }
  }, [profile]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.save('profiles', form);
      toast.success('Identity updated');
      queryClient.invalidateQueries(['profile']);
    } catch (err) { toast.error(err.message); }
  };

  if (!form) return null;

  return (
    <div className="space-y-10">
      <header><h1 className="text-3xl font-bold">Profile Configuration</h1></header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <form onSubmit={handleSave} className="glass-card p-8 space-y-6">
            <div className="space-y-2"><label className="text-xs uppercase text-white/40">Full Name</label><input value={form.name || ''} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-primary/50" /></div>
            <div className="space-y-2"><label className="text-xs uppercase text-white/40">Title</label><input value={form.title || ''} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none" /></div>
            <div className="space-y-2"><label className="text-xs uppercase text-white/40">Location</label><input value={form.location || ''} onChange={e => setForm({...form, location: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none" /></div>
            <div className="space-y-2"><label className="text-xs uppercase text-white/40">Current Semester</label><input value={form.semester || ''} onChange={e => setForm({...form, semester: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-primary/50" /></div>
            <div className="space-y-2"><label className="text-xs uppercase text-white/40">Age</label><input type="number" value={form.age || ''} onChange={e => setForm({...form, age: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none" /></div>
            <div className="space-y-2"><label className="text-xs uppercase text-white/40">Bio (Short Intro)</label><textarea rows="3" value={form.bio || ''} onChange={e => setForm({...form, bio: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none" /></div>
            <div className="space-y-2"><label className="text-xs uppercase text-white/40">Career Goal</label><input value={form.career_goal || ''} onChange={e => setForm({...form, career_goal: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none" /></div>
            <div className="space-y-2"><label className="text-xs uppercase text-white/40">Availability</label><input value={form.availability_status || ''} onChange={e => setForm({...form, availability_status: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none" placeholder="Open to Internships" /></div>

            <button className="cyber-button w-full py-4 flex items-center justify-center gap-2 font-bold uppercase"><Save size={18} /> Synchronize Profile</button>
          </form>

          <div className="glass-card p-8 space-y-6">
            <div className="flex justify-between items-center"><h3 className="text-xl font-bold flex items-center gap-2"><Globe size={20} /> Social Links</h3><button onClick={async () => { const p = prompt('Platform?'); if(p) { await api.save('social_links', { platform: p, url: 'https://' }); queryClient.invalidateQueries(['social_links']); } }} className="text-xs text-primary uppercase font-bold">+ Add Platform</button></div>
            <div className="space-y-4">
              {socialLinks?.map(link => (
                <div key={link.id} className="flex gap-4 items-center">
                  <div className="w-24 text-xs uppercase text-white/40 font-mono truncate">{link.platform}</div>
                  <input value={link.url} onChange={async (e) => { await api.save('social_links', {...link, url: e.target.value}); }} className="flex-1 bg-white/5 border border-white/10 p-2 rounded-lg text-sm outline-none" />
                  <button onClick={async () => { await api.delete('social_links', link.id); queryClient.invalidateQueries(['social_links']); }} className="text-pink-400 p-2"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="glass-card p-8 text-center">
            <div className="w-32 h-32 bg-white/5 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-dashed border-white/10 relative overflow-hidden group">
               <img src={form.avatar_url} className="absolute inset-0 w-full h-full object-cover group-hover:opacity-20" alt="Profile" />
               <Camera className="text-white/40 opacity-0 group-hover:opacity-100 z-10" />
            </div>
            <input placeholder="Avatar URL" value={form.avatar_url || ''} onChange={e => setForm({...form, avatar_url: e.target.value})} className="w-full bg-white/5 border border-white/10 p-2 rounded-lg text-[10px] outline-none mb-2" />
          </div>
          <div className="glass-card p-8 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-white/10"><FileText className="text-white/20" /></div>
            <input placeholder="Resume URL" value={form.resume_url || ''} onChange={e => setForm({...form, resume_url: e.target.value})} className="w-full bg-white/5 border border-white/10 p-2 rounded-lg text-[10px] outline-none mb-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
