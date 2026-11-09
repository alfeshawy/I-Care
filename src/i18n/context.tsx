/**
 * Language context provider.
 * 
 * Manages the current language, direction, and persists preference to localStorage.
 * Wraps the entire app to provide language state to all components.
 * 
 * @module i18n/context
 */

import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Language, Direction, Translation } from '@/data/types';
import { ar } from './translations/ar';
import { en } from './translations/en';

const translations: Record<Language, Translation> = { ar, en };

const STORAGE_KEY = 'icare-catalog-lang';

export interface LanguageContextValue {
  /** Current language */
  lang: Language;
  /** Current text direction */
  dir: Direction;
  /** Current translation object */
  t: Translation;
  /** Switch to a different language */
  setLanguage: (lang: Language) => void;
  /** Toggle between AR and EN */
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'ar' || stored === 'en') return stored;
  } catch {
    // localStorage unavailable
  }
  return 'ar'; // Arabic is the default
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(getInitialLanguage);

  const dir: Direction = lang === 'ar' ? 'rtl' : 'ltr';
  const t = translations[lang];

  // Update document direction and lang when language changes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // localStorage unavailable
    }
  }, [lang, dir]);

  const setLanguage = useCallback((newLang: Language) => {
    setLang(newLang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, dir, t, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
