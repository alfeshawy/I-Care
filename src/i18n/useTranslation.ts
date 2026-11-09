/**
 * Hook to access the current language, direction, and translations.
 * 
 * @example
 * const { t, lang, dir } = useTranslation();
 * return <h1>{t.nav.catalog}</h1>;
 */

import { useContext } from 'react';
import { LanguageContext, type LanguageContextValue } from './context';

export function useTranslation(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return ctx;
}
