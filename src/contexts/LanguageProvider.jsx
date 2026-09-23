import { useState, useEffect, useMemo } from 'react';
import translations from '../data/translations';
import { LanguageContext } from './languageContext';

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('lang');
      if (saved === 'pt' || saved === 'en') return saved;
    } catch {
      // Navegacao privada bloqueia o storage: cai no padrao.
    }
    return 'pt';
  });

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
    try {
      localStorage.setItem('lang', lang);
    } catch {
      // Navegacao privada bloqueia o storage: o idioma so nao persiste.
    }
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    toggleLang: () => setLang((current) => (current === 'pt' ? 'en' : 'pt')),
    t: translations[lang],
    // Vários campos *EN em portfolioData estão vazios — nesses casos, PT.
    field: (item, key) => (lang === 'en' && item[`${key}EN`]) || item[key],
  }), [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
