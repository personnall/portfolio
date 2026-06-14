import { useState, useEffect } from 'react';

export function useKonamiCode(callback) {
  const [input, setInput] = useState('');
  const code = '38384040373937396665';

  useEffect(() => {
    const onKeyDown = (e) => {
      const key = e.keyCode.toString();
      const newInput = input + key;
      if (code.startsWith(newInput)) {
        setInput(newInput);
        if (newInput === code) { callback(); setInput(''); }
      } else { setInput(key); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [input, callback]);
}
