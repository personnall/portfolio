import { useProfile, useSocialLinks } from '../hooks/useData';
import { SITE_CONFIG } from '../config/site';
import { Mail, MapPin, Clock, Send, CheckCircle2, Github, Linkedin } from 'lucide-react';

export default function Contact() {
  const { data: profile } = useProfile();
  const { data: socialLinks } = useSocialLinks();
  const availability = [{ label: 'Freelance', available: profile?.availability_status?.freelance ?? true }, { label: 'Internship', available: profile?.availability_status?.internship ?? true }, { label: 'Collaboration', available: profile?.availability_status?.collaboration ?? true }];

  return (
    <div className="space-y-12">
      <header><h1 className="text-4xl font-bold mb-2">Get in Touch</h1><p className="text-white/40">Available for new opportunities.</p></header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="glass-card p-8 space-y-8">
            <h3 className="text-xl font-bold">Contact Information</h3>
            <div className="space-y-6">
              <a href="mailto:miankhizar@gmail.com" className="flex items-center gap-4 group"><div className="p-3 bg-primary/10 rounded-xl border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all"><Mail size={20} className="text-primary group-hover:text-inherit" /></div><div><p className="text-xs text-white/40 uppercase font-mono">Email</p><p className="text-white/80 group-hover:text-primary transition-colors">miankhizar@gmail.com</p></div></a>
              <div className="flex items-center gap-4"><div className="p-3 bg-secondary/10 rounded-xl border border-secondary/20"><MapPin size={20} className="text-secondary" /></div><div><p className="text-xs text-white/40 uppercase font-mono">Location</p><p className="text-white/80">{profile?.location || SITE_CONFIG.location}</p></div></div>
              <div className="flex items-center gap-4"><div className="p-3 bg-accent/10 rounded-xl border border-accent/20"><Clock size={20} className="text-accent" /></div><div><p className="text-xs text-white/40 uppercase font-mono">Timezone</p><p className="text-white/80">GMT +5 (Pakistan)</p></div></div>
            </div>
            <div className="pt-8 border-t border-white/5"><h4 className="text-sm font-bold mb-4 uppercase tracking-widest text-white/40">Social Profiles</h4><div className="flex gap-4">{socialLinks?.map((link) => (<a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 rounded-xl transition-all group"><Github size={20} className="text-white/60 group-hover:text-primary" /></a>))}</div></div>
          </div>
          <div className="glass-card p-8"><h3 className="text-lg font-bold mb-6">Current Availability</h3><div className="space-y-4">{availability.map((item) => (<div key={item.label} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5"><span className="text-sm text-white/80">{item.label}</span>{item.available ? (<div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase"><CheckCircle2 size={14} /> Available</div>) : (<span className="text-white/20 text-xs font-bold uppercase">Closed</span>)}</div>))}</div></div>
        </div>
        <div className="lg:col-span-2"><form className="glass-card p-8 space-y-6" onSubmit={(e) => e.preventDefault()}><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="space-y-2"><label className="text-xs font-mono uppercase text-white/40 ml-1">Full Name</label><input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all" /></div><div className="space-y-2"><label className="text-xs font-mono uppercase text-white/40 ml-1">Email Address</label><input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all" /></div></div><div className="space-y-2"><label className="text-xs font-mono uppercase text-white/40 ml-1">Subject</label><input type="text" placeholder="Project Inquiry" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all" /></div><div className="space-y-2"><label className="text-xs font-mono uppercase text-white/40 ml-1">Message</label><textarea rows="6" placeholder="How can I help you?" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all resize-none"></textarea></div><button className="cyber-button w-full py-4 flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-sm"><Send size={18} /> Send Transmission</button></form></div>
      </div>
    </div>
  );
}
