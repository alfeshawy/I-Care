import type { Product } from '@/data/types';
import { useTranslation } from '@/i18n/useTranslation';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onResetFilters?: () => void;
}

export function ProductGrid({ products, onProductClick, onResetFilters }: ProductGridProps) {
  const { t } = useTranslation();

  if (products.length === 0) {
    return (
      <div 
        className="py-16 sm:py-24 px-4 text-center rounded-3xl border border-dashed flex flex-col items-center justify-center my-6"
        style={{
          borderColor: 'var(--color-border)',
          backgroundColor: 'var(--color-bg-secondary)',
        }}
      >
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4 opacity-50"
          style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-secondary)' }}
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p
          className="text-base sm:text-lg font-bold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {t.product.noProducts}
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-4 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
            style={{ 
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-text-on-primary, #FFFFFF)'
            }}
          >
            {t.common.retry}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onProductClick}
        />
      ))}
    </div>
  );
}

