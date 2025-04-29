import React, { createContext, useContext, useState } from 'react';
import en from '../translations/en';
import fa from '../translations/fa';

type Language = 'fa' | 'en';
type Translations = {
  common: {
    [key: string]: string | { [subKey: string]: string };
  };
  header: Record<string, string>;
  home: Record<string, any>;
  [key: string]: any;
};

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fa');

  const translations: Record<Language, Translations> = {
    en,
    fa,
  };

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const dir = language === 'fa' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};