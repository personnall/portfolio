import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import toast from 'react-hot-toast';

export default function Login() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.login(password);
      localStorage.setItem('mianos_token', res.token);
      toast.success('Access Granted');
      navigate('/admin');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <div className="text-center mb-8"><div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl mb-4 shadow-neon-purple"><Lock className="text-primary w-8 h-8" /></div><h1 className="text-3xl font-bold tracking-tighter">System Access</h1></div>
        <form onSubmit={handleLogin} className="glass-card p-8 space-y-6">
          <div className="space-y-2"><label className="text-xs font-mono uppercase text-white/40">Access Key</label><input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all" placeholder="••••••••" /></div>
          <button disabled={loading} className="cyber-button w-full py-4 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-sm disabled:opacity-50">{loading ? <Loader2 className="animate-spin" size={18} /> : <>Initialize Session <ChevronRight size={18} /></>}</button>
        </form>
      </motion.div>
    </div>
  );
}
