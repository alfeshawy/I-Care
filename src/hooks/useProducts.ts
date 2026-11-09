/**
 * Hook for product search and filtering.
 * 
 * Provides filtered, searched, and sorted products for the current brand.
 * 
 * @module hooks/useProducts
 */

import { useState, useMemo, useCallback } from 'react';
import type { BrandId, Product } from '@/data/types';
import { getProductsByBrand } from '@/data/registry';
import { searchAndFilter } from '@/utils/search';

export interface UseProductsReturn {
  /** Filtered and sorted products */
  products: Product[];
  /** Current search query */
  searchQuery: string;
  /** Set search query */
  setSearchQuery: (query: string) => void;
  /** Current category filter (null = all) */
  categoryFilter: string | null;
  /** Set category filter */
  setCategoryFilter: (categoryId: string | null) => void;
  /** Reset all filters */
  resetFilters: () => void;
  /** Total product count for this brand (unfiltered) */
  totalCount: number;
}

export function useProducts(brandId: BrandId): UseProductsReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const allBrandProducts = useMemo(
    () => getProductsByBrand(brandId),
    [brandId]
  );

  const products = useMemo(
    () => searchAndFilter(allBrandProducts, searchQuery, categoryFilter),
    [allBrandProducts, searchQuery, categoryFilter]
  );

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setCategoryFilter(null);
  }, []);

  return {
    products,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    resetFilters,
    totalCount: allBrandProducts.length,
  };
}
