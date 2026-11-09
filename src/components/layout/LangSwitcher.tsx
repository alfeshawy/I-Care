import { useTranslation } from '@/i18n/useTranslation';

interface LangSwitcherProps {
  className?: string;
}

export function LangSwitcher({ className = '' }: LangSwitcherProps) {
  const { t, lang, toggleLanguage } = useTranslation();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`inline-flex items-center justify-center px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg border transition-all duration-200 cursor-pointer hover:bg-black/5 ${className}`}
      style={{
        color: 'var(--color-text-primary)',
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-bg-secondary)',
      }}
      aria-label={t.nav.switchLanguage}
      title={t.nav.switchLanguage}
    >
      <span className="flex items-center gap-1.5">
        <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
      </span>
    </button>
  );
}

