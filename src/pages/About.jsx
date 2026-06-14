import { useState } from 'react';
import { useProfile } from '../hooks/useData';
import { SITE_CONFIG } from '../config/site';
import { User, MapPin, GraduationCap, Calendar, Award, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';

export default function About() {
  const { data: profile } = useProfile();
  const [clicks, setClicks] = useState(0);
  const handleAvatarClick = () => { if (clicks + 1 === 5) toast.success('Achievement Unlocked: Anime Developer Mode'); setClicks(clicks + 1); };

  return (
    <div className={`space-y-12 pb-12 ${clicks >= 5 ? 'brightness-125 saturate-150' : ''}`}>
      <header><h1 className="text-4xl font-bold mb-2">About Me</h1><p className="text-white/40">The story behind the developer.</p></header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="glass-card p-8"><h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><User size={24} className="text-primary" /> Introduction</h3><p className="text-white/70 leading-relaxed text-lg">{profile?.bio || 'I am Mian Khizar, a BSCS student passionate about development.'}</p></section>
          <section className="glass-card p-8"><h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><Calendar size={24} className="text-secondary" /> Journey</h3><div className="space-y-4">{['2024: Started', '2025: Frontend', '2026: Advanced'].map(j => <div key={j} className="text-white/60">{j}</div>)}</div></section>
        </div>
        <div className="space-y-8">
          <section className="glass-card p-8 text-center"><div className="relative inline-block cursor-pointer" onClick={handleAvatarClick}><img src={profile?.avatar_url || SITE_CONFIG.placeholders.avatar} className="w-32 h-32 rounded-full ring-4 ring-primary/20 mb-4" alt="Avatar" />{clicks >= 5 && <Trophy className="absolute -top-2 -right-2 text-yellow-400" />}</div><h3 className="text-xl font-bold">{profile?.full_name || SITE_CONFIG.name}</h3></section>
          <section className="glass-card p-8"><div className="space-y-4">{[{ label: 'Location', value: profile?.location || SITE_CONFIG.location, icon: MapPin }].map((info, i) => (<div key={i} className="flex items-center gap-4"><info.icon size={18} className="text-primary" /><div><p className="text-[10px] uppercase text-white/40">{info.label}</p><p className="text-sm font-medium">{info.value}</p></div></div>))}</div></section>
        </div>
      </div>
    </div>
  );
}
