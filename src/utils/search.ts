/**
 * Search and filter utilities for products.
 * 
 * Provides text search across Arabic and English product names/descriptions,
 * and category-based filtering.
 * 
 * @module utils/search
 */

import type { Product, Language } from '@/data/types';

/**
 * Normalize a string for search comparison.
 * Handles Arabic diacritics, case, and extra whitespace.
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    // Remove Arabic diacritics (tashkeel)
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g, '')
    // Normalize alef variants to plain alef (أ, إ, آ, ٱ -> ا)
    .replace(/[\u0622\u0623\u0625\u0671]/g, '\u0627')
    // Normalize taa marbuta to haa (ة -> ه)
    .replace(/\u0629/g, '\u0647')
    // Normalize alef maksura to yaa (ى -> ي)
    .replace(/\u0649/g, '\u064A')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Check if a product matches a search query.
 * Supports multi-token bilingual search across names, descriptions, SKU, and categories.
 */
export function matchesSearch(product: Product, query: string): boolean {
  const trimmed = query.trim();
  if (!trimmed) return true;
  
  const tokens = trimmed.split(/\s+/).map(normalizeText).filter(Boolean);
  if (tokens.length === 0) return true;
  
  const searchableCorpus = [
    product.nameAr,
    product.nameEn,
    product.descriptionAr,
    product.descriptionEn,
    product.sku ?? '',
    product.category?.nameAr ?? '',
    product.category?.nameEn ?? '',
  ]
    .map(normalizeText)
    .join(' ');
  
  return tokens.every(token => searchableCorpus.includes(token));
}

/**
 * Filter products by category.
 * Returns all products if categoryId is null/undefined.
 */
export function filterByCategory(
  products: Product[],
  categoryId: string | null
): Product[] {
  if (!categoryId) return products;
  return products.filter(p => p.category?.id === categoryId);
}

/**
 * Sort products by their display order.
 */
export function sortByOrder(products: Product[]): Product[] {
  return [...products].sort((a, b) => a.order - b.order);
}

/**
 * Get the localized name for a product.
 */
export function getProductName(product: Product, lang: Language): string {
  return lang === 'ar' ? product.nameAr : product.nameEn;
}

/**
 * Get the localized description for a product.
 */
export function getProductDescription(product: Product, lang: Language): string {
  return lang === 'ar' ? product.descriptionAr : product.descriptionEn;
}

/**
 * Combined search and filter pipeline.
 */
export function searchAndFilter(
  products: Product[],
  query: string,
  categoryId: string | null
): Product[] {
  let result = products;
  result = filterByCategory(result, categoryId);
  result = result.filter(p => matchesSearch(p, query));
  result = sortByOrder(result);
  return result;
}
