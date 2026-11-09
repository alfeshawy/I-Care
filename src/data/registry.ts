/**
 * Unified product registry.
 * 
 * Aggregates all brand product manifests into a single queryable registry.
 * This is the only import needed to access product data.
 * 
 * @module data/registry
 */

import type { Product, BrandId } from '@/data/types';
import { icareProducts } from './products/icare';
import { sabonaProducts } from './products/sabona';
import { graceProducts } from './products/grace';

/** All products across all brands */
export const allProducts: Product[] = [
  ...icareProducts,
  ...sabonaProducts,
  ...graceProducts,
];

/** Products indexed by brand ID */
const productsByBrand: Record<BrandId, Product[]> = {
  icare: icareProducts,
  sabona: sabonaProducts,
  grace: graceProducts,
};

/**
 * Get all products for a specific brand.
 */
export function getProductsByBrand(brandId: BrandId): Product[] {
  return productsByBrand[brandId] ?? [];
}

/**
 * Get a single product by its ID.
 */
export function getProductById(id: string): Product | undefined {
  return allProducts.find(p => p.id === id);
}

/**
 * Get product count for a brand.
 */
export function getProductCount(brandId: BrandId): number {
  return (productsByBrand[brandId] ?? []).length;
}
