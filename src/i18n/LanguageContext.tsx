import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, LanguageInfo, SUPPORTED_LANGUAGES } from './types';
import { translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  languages: LanguageInfo[];
  currentLanguageInfo: LanguageInfo;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'packet_scanner_language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
        return saved;
      }
      // Check navigator language
      const navLang = navigator.language?.split('-')[0];
      if (navLang && SUPPORTED_LANGUAGES.some(l => l.code === navLang)) {
        return navLang as Language;
      }
    } catch {
      // fallback
    }
    return 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
      document.documentElement.lang = language;
    } catch {
      // ignore storage error
    }
  }, [language]);

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
  };

  const t = (key: string, fallback?: string): string => {
    const langDict = translations[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English if translation is missing in selected language
    if (translations.en[key]) {
      return translations.en[key];
    }
    return fallback || key;
  };

  const currentLanguageInfo = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages: SUPPORTED_LANGUAGES,
        currentLanguageInfo
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
