/**
 * Brand theme context provider.
 * 
 * Applies the active brand's design tokens as CSS custom properties
 * on the document root. Components use these via Tailwind or direct CSS.
 * 
 * @module theme/context
 */

import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { BrandId, Brand, BrandTheme } from '@/data/types';
import { brands, defaultBrandId, getBrand } from '@/config/brands';

export interface ThemeContextValue {
  /** Current brand ID */
  brandId: BrandId;
  /** Current brand configuration */
  brand: Brand;
  /** Current brand theme */
  theme: BrandTheme;
  /** Switch to a different brand */
  setBrand: (id: BrandId) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Apply brand theme as CSS custom properties on :root.
 */
function applyTheme(theme: BrandTheme): void {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', theme.primary);
  root.style.setProperty('--color-secondary', theme.secondary);
  root.style.setProperty('--color-accent', theme.accent);
  root.style.setProperty('--color-bg-primary', theme.bgPrimary);
  root.style.setProperty('--color-bg-secondary', theme.bgSecondary);
  root.style.setProperty('--color-bg-card', theme.bgCard);
  root.style.setProperty('--color-text-primary', theme.textPrimary);
  root.style.setProperty('--color-text-secondary', theme.textSecondary);
  root.style.setProperty('--color-border', theme.border);
  root.style.setProperty('--color-hover', theme.hover);
  root.style.setProperty('--color-text-on-primary', theme.textOnPrimary);

  // Dynamically update mobile browser theme-color
  let metaTheme = document.querySelector('meta[name="theme-color"]');
  if (!metaTheme) {
    metaTheme = document.createElement('meta');
    metaTheme.setAttribute('name', 'theme-color');
    document.head.appendChild(metaTheme);
  }
  metaTheme.setAttribute('content', theme.bgPrimary);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [brandId, setBrandId] = useState<BrandId>(defaultBrandId);

  const brand = getBrand(brandId);
  const theme = brand.theme;

  // Apply CSS custom properties when brand changes
  useEffect(() => {
    applyTheme(theme);
    // Also set a data attribute for brand-specific CSS selectors
    document.documentElement.setAttribute('data-brand', brandId);
  }, [brandId, theme]);

  const setBrand = useCallback((id: BrandId) => {
    if (brands[id]) {
      setBrandId(id);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ brandId, brand, theme, setBrand }}>
      {children}
    </ThemeContext.Provider>
  );
}
