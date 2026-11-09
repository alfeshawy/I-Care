import { useState, useCallback, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import type { Product, BrandId } from '@/data/types';
import { useTranslation } from '@/i18n/useTranslation';
import { useTheme } from '@/theme/useTheme';
import { useProducts } from '@/hooks/useProducts';
import { usePageMetadata } from '@/hooks/usePageMetadata';
import { getProductById } from '@/data/registry';
import { SearchBar } from '@/components/catalog/SearchBar';
import { FilterBar } from '@/components/catalog/FilterBar';
import { ProductGrid } from '@/components/catalog/ProductGrid';
import { ProductModal } from '@/components/product/ProductModal';

export function CatalogPage() {
  const { brandId: routeBrandId } = useParams<{ brandId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, lang } = useTranslation();
  const { brandId, brand, setBrand } = useTheme();

  // Sync route brand parameter with theme context
  useEffect(() => {
    const validBrands: BrandId[] = ['icare', 'sabona', 'grace'];
    if (routeBrandId && validBrands.includes(routeBrandId as BrandId)) {
      if (routeBrandId !== brandId) {
        setBrand(routeBrandId as BrandId);
      }
    }
  }, [routeBrandId, brandId, setBrand]);

  const {
    products,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    resetFilters,
    totalCount,
  } = useProducts(brandId);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Sync deep-linked product from URL query parameter
  const productParam = searchParams.get('product');
  useEffect(() => {
    if (productParam) {
      const match = getProductById(productParam);
      if (match && match.brandId === brandId) {
        setSelectedProduct(match);
        setModalOpen(true);
      }
    } else {
      setModalOpen(false);
    }
  }, [productParam, brandId]);

  // Dynamic SEO metadata (page title, description, OG tags)
  usePageMetadata({
    brand,
    lang,
    selectedProduct: modalOpen ? selectedProduct : null,
  });

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
    setSearchParams({ product: product.id }, { replace: false });
  }, [setSearchParams]);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  // Reset search and filters whenever the active brand switches
  useEffect(() => {
    resetFilters();
  }, [brandId, resetFilters]);

  const brandName = lang === 'ar' ? brand.nameAr : brand.nameEn;
  const tagline = lang === 'ar' ? brand.taglineAr : brand.taglineEn;

  return (
    <main
      className="flex-1 flex flex-col transition-colors duration-300"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* Brand Hero Banner */}
      <section 
        className="py-10 sm:py-14 border-b transition-colors relative overflow-hidden"
        style={{ 
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl relative z-10">
            <span
              className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-md mb-2.5 transition-colors"
              style={{
                backgroundColor: 'var(--color-hover)',
                color: 'var(--color-primary)',
              }}
            >
              {lang === 'ar' ? 'العلامة التجارية' : 'Brand Experience'}
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight"
              style={{ color: 'var(--color-primary)' }}
            >
              {brandName}
            </h1>
            <p
              className="mt-2.5 text-base sm:text-lg font-medium leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {tagline}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: 'var(--color-bg-primary)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {totalCount} {lang === 'ar' ? 'منتج معتمد' : 'Verified Products'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Category Filter Bar */}
      <section 
        className="sticky top-[var(--header-height)] z-30 py-4 backdrop-blur-md border-b transition-colors"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-bg-primary) 94%, transparent)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-3.5 md:items-center justify-between">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <FilterBar
              categories={brand.categories}
              activeCategory={categoryFilter}
              onCategoryChange={setCategoryFilter}
            />
          </div>
        </div>
      </section>

      {/* Main Product Catalog Grid */}
      <section className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between text-xs sm:text-sm font-semibold opacity-75" style={{ color: 'var(--color-text-secondary)' }}>
            <span>
              {searchQuery.trim()
                ? (lang === 'ar' 
                    ? `عرض ${products.length} من أصل ${totalCount} منتج لـ "${searchQuery}"`
                    : `Showing ${products.length} of ${totalCount} products for "${searchQuery}"`)
                : (lang === 'ar' 
                    ? `عرض ${products.length} من أصل ${totalCount} منتج` 
                    : `Showing ${products.length} of ${totalCount} products`)}
            </span>
            {(searchQuery || categoryFilter !== null) && (
              <button
                type="button"
                onClick={resetFilters}
                className="hover:underline cursor-pointer"
                style={{ color: 'var(--color-primary)' }}
              >
                {lang === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset filters'}
              </button>
            )}
          </div>

          <ProductGrid
            products={products}
            onProductClick={handleProductClick}
            onResetFilters={resetFilters}
          />
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}
