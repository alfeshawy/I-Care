import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from '@/i18n/context';
import { ThemeProvider } from '@/theme/context';
import { useTranslation } from '@/i18n/useTranslation';
import { Header } from '@/components/layout/Header';
import { FloatingActions } from '@/components/layout/FloatingActions';
import { CatalogPage } from '@/pages/CatalogPage';
import { PHONE_DISPLAY } from '@/config/contact';

function AppLayout() {
  const { lang } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/brand/icare" replace />} />
        <Route path="/brand/:brandId" element={<CatalogPage />} />
        <Route path="*" element={<Navigate to="/brand/icare" replace />} />
      </Routes>
      
      {/* Site Footer */}
      <footer 
        className="mt-auto py-8 border-t text-center text-xs sm:text-sm transition-colors"
        style={{
          borderColor: 'var(--color-border)',
          backgroundColor: 'var(--color-bg-secondary)',
          color: 'var(--color-text-secondary)',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-semibold">
            {lang === 'ar' ? '© 2026 ICARE. جميع الحقوق محفوظة.' : '© 2026 ICARE. All rights reserved.'}
          </p>
          <p className="font-mono opacity-80" dir="ltr">
            {PHONE_DISPLAY}
          </p>
          <p className="opacity-70 text-[11px] sm:text-xs">
            {lang === 'ar' ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia'}
          </p>
        </div>
      </footer>

      <FloatingActions />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <LanguageProvider>
        <ThemeProvider>
          <AppLayout />
        </ThemeProvider>
      </LanguageProvider>
    </HashRouter>
  );
}

