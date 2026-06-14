import { useProfile } from '../hooks/useData';
import { Download, Printer, Share2, FileText, ChevronRight } from 'lucide-react';

export default function Resume() {
  const { data: profile } = useProfile();
  const resumeUrl = profile?.resume_url || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div><h1 className="text-4xl font-bold mb-2">Resume</h1><p className="text-white/40">Professional overview and downloadable resume.</p></div>
        <div className="flex gap-3"><button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group" title="Print Resume"><Printer size={20} className="text-white/40 group-hover:text-white" /></button><button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group" title="Share Resume"><Share2 size={20} className="text-white/40 group-hover:text-white" /></button><a href={resumeUrl} download className="cyber-button flex items-center gap-2"><Download size={18} /> Download CV</a></div>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="space-y-6">
          <section className="glass-card p-6 space-y-6"><h3 className="font-bold text-lg mb-4 border-b border-white/5 pb-4">Resume Sections</h3><div className="space-y-1">{['Education', 'Experience', 'Skills', 'Projects', 'Achievements'].map(section => (<button key={section} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all text-sm text-white/60 hover:text-primary group">{section}<ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></button>))}</div></section>
          <section className="glass-card p-6"><div className="flex items-center gap-4 mb-4 text-accent"><FileText size={24} /><h4 className="font-bold">ATS Friendly</h4></div><p className="text-xs text-white/40 leading-relaxed">This resume is optimized for Applicant Tracking Systems.</p></section>
        </div>
        <div className="lg:col-span-3"><div className="glass-card h-[1100px] relative overflow-hidden bg-white/[0.02]"><iframe src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`} className="w-full h-full border-none filter invert contrast-125" title="Resume Viewer" /><div className="absolute inset-0 pointer-events-none border-[20px] border-surface/50 mix-blend-overlay" /></div></div>
      </div>
    </div>
  );
}
