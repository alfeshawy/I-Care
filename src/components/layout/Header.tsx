import { useTranslation } from '@/i18n/useTranslation';
import { useTheme } from '@/theme/useTheme';
import { resolveBrandLogo } from '@/utils/assets';
import { BrandSwitcher } from './BrandSwitcher';
import { LangSwitcher } from './LangSwitcher';

export function Header() {
  const { lang } = useTranslation();
  const { brand } = useTheme();

  const brandName = lang === 'ar' ? brand.nameAr : brand.nameEn;
  const logoSrc = brand.hasLogo ? resolveBrandLogo(brand.logoPath) : '';
  const isICare = brand.id === 'icare';

  return (
    <header
      className="sticky top-0 w-full border-b backdrop-blur-md transition-colors"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--color-bg-primary) 94%, transparent)',
        borderColor: 'var(--color-border)',
        zIndex: 'var(--z-header)',
      }}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Desktop Single-Row Navigation (md and up: >= 768px) */}
        <div className="hidden md:flex h-17 items-center justify-between gap-4">
          {/* Brand Identity / Logo */}
          <div className="flex items-center gap-3 min-w-0">
            {brand.hasLogo && logoSrc ? (
              <img
                src={logoSrc}
                alt={brandName}
                className={`${
                  isICare 
                    ? 'h-13 lg:h-15 -my-2' 
                    : 'h-8 lg:h-9'
                } w-auto object-contain transition-all`}
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

          {/* Desktop Right Side Nav */}
          <nav className="flex items-center gap-3" aria-label="Main Navigation">
            <BrandSwitcher />
            <div
              className="w-px h-6"
              style={{ backgroundColor: 'var(--color-border)' }}
              aria-hidden="true"
            />
            <LangSwitcher />
          </nav>
        </div>

        {/* Mobile / Narrow Screen Navigation (< md: < 768px) - ALWAYS VISIBLE, NO HAMBURGER */}
        <div className="md:hidden py-2.5 flex flex-col gap-2">
          {/* Top Row: Logo & Language Switcher */}
          <div className="flex items-center justify-between gap-2 min-h-10">
            <div className="flex items-center gap-2 min-w-0">
              {brand.hasLogo && logoSrc ? (
                <img
                  src={logoSrc}
                  alt={brandName}
                  className={`${
                    isICare 
                      ? 'h-11 sm:h-13 -my-1' 
                      : 'h-7 sm:h-8'
                  } w-auto object-contain transition-all`}
                />
              ) : (
                <div 
                  className="px-2.5 py-0.5 rounded-md border font-black tracking-wider text-base uppercase"
                  style={{
                    color: 'var(--color-primary)',
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-bg-secondary)',
                  }}
                >
                  {brandName}
                </div>
              )}
            </div>

            {/* Language Switcher - prominently displayed on mobile */}
            <LangSwitcher className="shrink-0" />
          </div>

          {/* Bottom Row: 3 Brand Switcher Tabs - full width, always visible, 1-tap switch */}
          <div className="w-full">
            <BrandSwitcher className="w-full flex" />
          </div>
        </div>
      </div>
    </header>
  );
}
