import { motion } from 'framer-motion';

export default function CyberBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary/20 blur-[150px] rounded-full"
      />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-[0.02]" />
    </div>
  );
}
