import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAchievements } from '../store/AchievementContext';

const EasterEggs = () => {
  const [konami, setKonami] = useState([]);
  const [showMatrix, setShowMatrix] = useState(false);
  const location = useLocation();
  const { trackVisit } = useAchievements();

  const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    trackVisit(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeydown = (e) => {
      const newKonami = [...konami, e.key].slice(-10);
      setKonami(newKonami);

      if (newKonami.join('') === code.join('')) {
        triggerCyberMode();
      }
    };

    const handleMatrix = () => {
      setShowMatrix(true);
      setTimeout(() => setShowMatrix(false), 3000);
    };

    const handleAnime = () => {
        document.body.classList.add('anime-mode');
        setTimeout(() => document.body.classList.remove('anime-mode'), 5000);
    };

    window.addEventListener('keydown', handleKeydown);
    document.body.addEventListener('trigger-matrix', handleMatrix);
    document.body.addEventListener('trigger-anime', handleAnime);

    return () => {
        window.removeEventListener('keydown', handleKeydown);
        document.body.removeEventListener('trigger-matrix', handleMatrix);
        document.body.removeEventListener('trigger-anime', handleAnime);
    };
  }, [konami]);

  const triggerCyberMode = () => {
    document.body.classList.add('cyber-mode');
    const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-3.mp3');
    audio.play().catch(() => {});

    setTimeout(() => {
      document.body.classList.remove('cyber-mode');
    }, 5000);
  };

  return (
    <AnimatePresence>
      {showMatrix && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/80 pointer-events-none overflow-hidden font-mono text-green-500 text-xs flex flex-wrap"
        >
          {Array.from({ length: 50 }).map((_, i) => (
            <MatrixColumn key={i} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MatrixColumn = () => {
  const [chars, setChars] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChars(prev => [
        String.fromCharCode(0x30A0 + Math.random() * 96),
        ...prev.slice(0, 20)
      ]);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col opacity-50 px-1">
      {chars.map((c, i) => (
        <div key={i} style={{ opacity: 1 - i * 0.05 }}>{c}</div>
      ))}
    </div>
  );
};

export default EasterEggs;
