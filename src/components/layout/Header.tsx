import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/i18n/useTranslation';
import { useTheme } from '@/theme/useTheme';
import { resolveBrandLogo } from '@/utils/assets';
import { BrandSwitcher } from './BrandSwitcher';
import { LangSwitcher } from './LangSwitcher';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Header() {
  const { t, lang } = useTranslation();
  const { brand } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  const toggleMenu = useCallback(() => setMobileMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  const brandName = lang === 'ar' ? brand.nameAr : brand.nameEn;
  const logoSrc = brand.hasLogo ? resolveBrandLogo(brand.logoPath) : '';

  return (
    <header
      className="sticky top-0 w-full border-b backdrop-blur-md transition-colors"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--color-bg-primary) 92%, transparent)',
        borderColor: 'var(--color-border)',
        zIndex: 'var(--z-header)',
        minHeight: 'var(--header-height)',
      } as React.CSSProperties}
    >
      <div className="mx-auto max-w-7xl h-16 sm:h-17 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Identity / Logo */}
        <div className="flex items-center gap-3 min-w-0">
          {brand.hasLogo && logoSrc ? (
            <img
              src={logoSrc}
              alt={brandName}
              className="h-9 sm:h-11 w-auto object-contain transition-all"
            />
          ) : (
            <div 
              className="px-3 py-1 rounded-md border font-black tracking-widest text-lg sm:text-xl uppercase transition-colors"
              style={{
                color: 'var(--color-primary)',
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-bg-secondary)',
              }}
            >
              {brandName}
            </div>
          )}
          <div className="hidden lg:flex flex-col">
            <span
              className="text-xs font-medium opacity-80"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {lang === 'ar' ? brand.taglineAr : brand.taglineEn}
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3" aria-label="Main Navigation">
          <BrandSwitcher />
          <div
            className="w-px h-6"
            style={{ backgroundColor: 'var(--color-border)' }}
            aria-hidden="true"
          />
          <LangSwitcher />
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border transition-colors cursor-pointer"
          style={{ 
            color: 'var(--color-text-primary)',
            borderColor: 'var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)'
          }}
          aria-label={mobileMenuOpen ? t.product.close : t.nav.brands}
          aria-expanded={mobileMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Collapsible Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            className="md:hidden overflow-hidden border-t"
            style={{
              backgroundColor: 'var(--color-bg-primary)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider opacity-60" style={{ color: 'var(--color-text-secondary)' }}>
                  {t.nav.brands}
                </span>
                <BrandSwitcher onSelect={closeMenu} className="w-full justify-between" />
              </div>
              <div
                className="h-px my-1"
                style={{ backgroundColor: 'var(--color-border)' }}
                aria-hidden="true"
              />
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-wider opacity-60" style={{ color: 'var(--color-text-secondary)' }}>
                  {t.nav.switchLanguage}
                </span>
                <LangSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

