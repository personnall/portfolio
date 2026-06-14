import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('mianos_settings');
    return saved ? JSON.parse(saved) : {
      accentColor: '#8b5cf6',
      scanlines: true,
      neonGlow: true,
      particles: false,
      glassmorphism: true,
      animations: 1,
      highContrast: false,
      reduceMotion: false
    };
  });

  useEffect(() => {
    localStorage.setItem('mianos_settings', JSON.stringify(settings));

    // Apply accent color to CSS variables
    document.documentElement.style.setProperty('--primary-color', settings.accentColor);

    // Helper to get RGB for glow effects
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '139, 92, 246';
    };

    document.documentElement.style.setProperty('--primary-glow', hexToRgb(settings.accentColor));

    if (settings.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
