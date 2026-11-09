/**
 * Brand configuration — the central source of truth for all brand definitions.
 * 
 * Each brand defines its own identity, theme colors, and categories.
 * Theme values are applied as CSS custom properties via the ThemeProvider.
 * 
 * @module config/brands
 */

import type { Brand, BrandId } from '@/data/types';

/**
 * I-CARE brand configuration.
 * Primary brand — medical devices and supplies.
 */
const icare: Brand = {
  id: 'icare',
  nameAr: 'ICARE',
  nameEn: 'ICARE',
  logoPath: '/materials/I-Care/logo.png',
  hasLogo: true,
  taglineAr: 'منتجات طبية متميزة',
  taglineEn: 'Premium Medical Products',
  theme: {
    primary: '#0D4F8B',
    secondary: '#1A6FC2',
    accent: '#2A8FE5',
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F5F8FC',
    bgCard: '#FFFFFF',
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    hover: '#EBF4FF',
    textOnPrimary: '#FFFFFF',
  },
  categories: [
    { id: 'splints', nameAr: 'الجبائر', nameEn: 'Splints' },
    { id: 'derma', nameAr: 'العناية بالبشرة', nameEn: 'Derma Care' },
    { id: 'protection', nameAr: 'الحماية', nameEn: 'Protection' },
  ],
};

/**
 * SABONA brand configuration.
 * Luxury magnetic therapy bracelets.
 */
const sabona: Brand = {
  id: 'sabona',
  nameAr: 'SABONA',
  nameEn: 'SABONA',
  logoPath: '',
  hasLogo: false,
  taglineAr: 'أساور مغناطيسية فاخرة',
  taglineEn: 'Luxury Magnetic Bracelets',
  theme: {
    primary: '#D4AF37',
    secondary: '#AA8222',
    accent: '#F3E5AB',
    bgPrimary: '#0A0A0C',
    bgSecondary: '#121216',
    bgCard: '#18181E',
    textPrimary: '#F6F6F9',
    textSecondary: '#A0A0A8',
    border: '#2A2A33',
    hover: '#22222A',
    textOnPrimary: '#0A0A0C',
  },
  categories: [
    { id: 'gold', nameAr: 'ذهبي', nameEn: 'Gold' },
    { id: 'silver', nameAr: 'فضي', nameEn: 'Silver' },
    { id: 'black', nameAr: 'أسود', nameEn: 'Black' },
    { id: 'two-tone', nameAr: 'لونين', nameEn: 'Two-Tone' },
  ],
};

/**
 * GRACE brand configuration.
 * Personal hygiene and care products.
 */
const grace: Brand = {
  id: 'grace',
  nameAr: 'GRACE',
  nameEn: 'GRACE',
  logoPath: '/materials/Grace/logo.png',
  hasLogo: true,
  taglineAr: 'منتجات العناية الشخصية',
  taglineEn: 'Personal Care Products',
  theme: {
    primary: '#7C3AED',
    secondary: '#A855F7',
    accent: '#C084FC',
    bgPrimary: '#FFFFFF',
    bgSecondary: '#FAF5FF',
    bgCard: '#FFFFFF',
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    border: '#E9D5FF',
    hover: '#F3E8FF',
    textOnPrimary: '#FFFFFF',
  },
  categories: [
    { id: 'covers', nameAr: 'أغطية الجبائر', nameEn: 'Cast Covers' },
    { id: 'hygiene', nameAr: 'النظافة الشخصية', nameEn: 'Personal Hygiene' },
  ],
};

/** All brand configurations indexed by brand ID */
export const brands: Record<BrandId, Brand> = {
  icare,
  sabona,
  grace,
};

/** Default brand shown on initial load */
export const defaultBrandId: BrandId = 'icare';

/** Ordered list of brand IDs for the brand switcher */
export const brandOrder: BrandId[] = ['icare', 'sabona', 'grace'];

/**
 * Get a brand configuration by ID.
 * Throws if the brand ID is invalid.
 */
export function getBrand(id: BrandId): Brand {
  const brand = brands[id];
  if (!brand) {
    throw new Error(`Unknown brand: ${id}`);
  }
  return brand;
}
