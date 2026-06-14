import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCertificates } from '../hooks/useData';
import { Award, ExternalLink, Download, Search, Maximize2, Calendar, Building2 } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export default function Certificates() {
  const { data: certificates } = useCertificates();
  const [selectedCert, setSelectedCert] = useState(null);
  const [search, setSearch] = useState('');
  const filteredCerts = certificates?.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.provider.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div><h1 className="text-4xl font-bold mb-2">Certifications</h1><p className="text-white/40">Verified skills and professional achievements.</p></div>
        <div className="relative group"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-primary transition-colors" /><input type="text" placeholder="Search certificates..." className="pl-10 pr-4 py-2 bg-surface border border-white/10 rounded-xl outline-none focus:border-primary/50 transition-all w-full md:w-64" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCerts?.map((cert) => (
          <motion.div layout key={cert.id} className="glass-card group hover:neon-border-cyan transition-all duration-500">
            <div className="aspect-[4/3] relative overflow-hidden bg-black/40"><img src={cert.image_url || SITE_CONFIG.placeholders.certificate} alt={cert.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" /><div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4"><button onClick={() => setSelectedCert(cert)} className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all scale-90 group-hover:scale-100"><Maximize2 size={20} /></button>{cert.verification_url && (<a href={cert.verification_url} target="_blank" rel="noreferrer" className="p-3 bg-secondary/20 hover:bg-secondary rounded-full backdrop-blur-md transition-all scale-90 group-hover:scale-100"><ExternalLink size={20} /></a>)}</div></div>
            <div className="p-6"><h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-secondary transition-colors">{cert.name}</h3><div className="space-y-3 mb-6"><p className="text-sm text-white/60 flex items-center gap-2"><Building2 size={14} className="text-secondary" /> {cert.provider}</p><p className="text-xs text-white/40 flex items-center gap-2"><Calendar size={14} /> Issued {new Date(cert.issue_date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</p></div><button onClick={() => setSelectedCert(cert)} className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-all">View Certificate</button></div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>{selectedCert && (<div className="fixed inset-0 z-[100] flex items-center justify-center p-4"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCert(null)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" /><motion.div initial={{ opacity: 0, scale: 0.9, rotateX: 20 }} animate={{ opacity: 1, scale: 1, rotateX: 0 }} exit={{ opacity: 0, scale: 0.9, rotateX: 20 }} className="relative w-full max-w-5xl glass-card neon-border-cyan overflow-hidden"><div className="flex flex-col md:flex-row h-[80vh]"><div className="flex-1 bg-black/50 p-4 flex items-center justify-center overflow-hidden"><img src={selectedCert.image_url || SITE_CONFIG.placeholders.certificate} alt={selectedCert.name} className="max-w-full max-h-full object-contain shadow-2xl" /></div><div className="w-full md:w-80 p-8 border-l border-white/10 flex flex-col justify-between"><div className="space-y-6"><div className="flex justify-between items-start"><h2 className="text-2xl font-bold text-white">{selectedCert.name}</h2><button onClick={() => setSelectedCert(null)} className="text-white/40 hover:text-white">✕</button></div><div className="space-y-4"><div><p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Provider</p><p className="text-secondary font-medium">{selectedCert.provider}</p></div><div><p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Issue Date</p><p className="text-white/80">{new Date(selectedCert.issue_date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p></div></div></div><div className="space-y-3">{selectedCert.verification_url && (<a href={selectedCert.verification_url} target="_blank" rel="noreferrer" className="cyber-button w-full flex items-center justify-center gap-2 border-secondary/50 text-secondary hover:bg-secondary"><ExternalLink size={18} /> Verify Credential</a>)}<button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center gap-2 transition-all"><Download size={18} /> Download PDF</button></div></div></div></motion.div></div>)}</AnimatePresence>
    </div>
  );
}
