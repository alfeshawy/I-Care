/**
 * Core TypeScript interfaces for the I-Care Catalog.
 * 
 * These types define the data model for brands, products, and related entities.
 * All product data files and components depend on these types.
 * 
 * @module types
 */

/** Supported brand identifiers */
export type BrandId = 'icare' | 'sabona' | 'grace';

/** Supported languages */
export type Language = 'ar' | 'en';

/** Text direction */
export type Direction = 'rtl' | 'ltr';

/**
 * A single product image reference.
 * Points to an image file within the Materials/ directory.
 */
export interface ProductImage {
  /** Unique identifier for this image within the product */
  id: string;
  /** Path relative to the public root, e.g., '/materials/I-Care/Face Guard/image.png' */
  src: string;
  /** Alt text in Arabic */
  altAr: string;
  /** Alt text in English */
  altEn: string;
}

/**
 * Optional product category for filtering.
 */
export interface ProductCategory {
  /** Unique category identifier */
  id: string;
  /** Category name in Arabic */
  nameAr: string;
  /** Category name in English */
  nameEn: string;
}

/**
 * Product specification entry (key-value pair).
 */
export interface ProductSpec {
  /** Specification label in Arabic */
  labelAr: string;
  /** Specification label in English */
  labelEn: string;
  /** Specification value in Arabic */
  valueAr: string;
  /** Specification value in English */
  valueEn: string;
}

/**
 * Complete product definition.
 * 
 * Products are defined in brand-specific manifest files
 * and registered in the central product registry.
 */
export interface Product {
  /** Unique product identifier (globally unique across all brands) */
  id: string;
  /** The brand this product belongs to */
  brandId: BrandId;
  /** Product name in Arabic */
  nameAr: string;
  /** Product name in English */
  nameEn: string;
  /** Product description in Arabic */
  descriptionAr: string;
  /** Product description in English */
  descriptionEn: string;
  /** Product images (at least one required) */
  images: ProductImage[];
  /** Optional product category */
  category?: ProductCategory;
  /** Optional SKU / model number */
  sku?: string;
  /** Optional product specifications */
  specs?: ProductSpec[];
  /** Display order within the brand (lower = first) */
  order: number;
}

/**
 * Design tokens for a brand's visual identity.
 * These values are applied as CSS custom properties.
 */
export interface BrandTheme {
  /** Primary brand color (hex) */
  primary: string;
  /** Secondary brand color (hex) */
  secondary: string;
  /** Accent color for interactive elements (hex) */
  accent: string;
  /** Primary background color (hex) */
  bgPrimary: string;
  /** Secondary background color (hex) */
  bgSecondary: string;
  /** Card/surface background color (hex) */
  bgCard: string;
  /** Primary text color (hex) */
  textPrimary: string;
  /** Secondary/muted text color (hex) */
  textSecondary: string;
  /** Border color (hex) */
  border: string;
  /** Hover state color for interactive elements (hex) */
  hover: string;
  /** Text color rendered on top of primary color buttons/elements */
  textOnPrimary: string;
}

/**
 * Complete brand definition.
 */
export interface Brand {
  /** Unique brand identifier */
  id: BrandId;
  /** Brand name in Arabic */
  nameAr: string;
  /** Brand name in English */
  nameEn: string;
  /** Path to brand logo, relative to public root */
  logoPath: string;
  /** Whether this brand has an actual logo file */
  hasLogo: boolean;
  /** Brand tagline in Arabic */
  taglineAr: string;
  /** Brand tagline in English */
  taglineEn: string;
  /** Brand visual theme */
  theme: BrandTheme;
  /** Product categories available for this brand */
  categories: ProductCategory[];
}

/**
 * UI translation strings.
 * Organized by section for maintainability.
 */
export interface Translation {
  /** Navigation and header */
  nav: {
    catalog: string;
    brands: string;
    search: string;
    allProducts: string;
    switchLanguage: string;
  };
  /** Product-related strings */
  product: {
    details: string;
    description: string;
    specifications: string;
    sku: string;
    category: string;
    images: string;
    noProducts: string;
    searchPlaceholder: string;
    allCategories: string;
    previous: string;
    next: string;
    close: string;
    zoomIn: string;
    zoomOut: string;
    imageOf: string; // "Image {current} of {total}"
    share: string;
    linkCopied: string;
  };
  /** Brand switcher */
  brand: {
    switchTo: string; // "Switch to {brand}"
    currentBrand: string;
  };
  /** Contact */
  contact: {
    whatsapp: string;
    phone: string;
    callUs: string;
    messageUs: string;
  };
  /** Common */
  common: {
    loading: string;
    error: string;
    retry: string;
  };
}
