import { useCallback } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '@/data/types';
import { useTranslation } from '@/i18n/useTranslation';
import { useIntersection } from '@/hooks/useIntersection';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ImageCarousel } from './ImageCarousel';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { lang } = useTranslation();
  const [cardRef, isVisible] = useIntersection<HTMLElement>({ rootMargin: '150px' });
  const reducedMotion = useReducedMotion();

  const handleClick = useCallback(() => onClick(product), [onClick, product]);
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(product);
      }
    },
    [onClick, product]
  );

  const primaryName = lang === 'ar' ? product.nameAr : product.nameEn;
  const secondaryName = lang === 'ar' ? product.nameEn : product.nameAr;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.25 }}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="group flex flex-col h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border hover:shadow-lg hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderColor: 'var(--color-border)',
      }}
      aria-label={`${primaryName} - ${secondaryName}`}
    >
      {/* Product Image presentation */}
      <div className="relative overflow-hidden w-full bg-[var(--color-bg-secondary)]">
        <ImageCarousel
          images={product.images}
          lang={lang}
          isVisible={isVisible}
          aspectRatio="aspect-square"
        />
        {product.images.length > 1 && (
          <div 
            className="absolute top-2.5 end-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider opacity-85 shadow-xs"
            style={{
              backgroundColor: 'var(--color-bg-primary)',
              color: 'var(--color-text-secondary)',
              border: '1px solid var(--color-border)',
            }}
          >
            {product.images.length} {lang === 'ar' ? 'صور' : 'images'}
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-4.5 justify-between gap-2">
        <div>
          <h3
            className="text-sm sm:text-base font-bold line-clamp-1 transition-colors group-hover:text-[var(--color-primary)]"
            style={{ color: 'var(--color-text-primary)' }}
            title={primaryName}
          >
            {primaryName}
          </h3>
          <p
            className="mt-0.5 text-xs sm:text-sm font-medium line-clamp-1 opacity-70"
            style={{ color: 'var(--color-text-secondary)' }}
            title={secondaryName}
          >
            {secondaryName}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-[var(--color-border)]/50 text-[11px] sm:text-xs">
          {product.sku ? (
            <span 
              className="font-mono font-semibold opacity-75"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {product.sku}
            </span>
          ) : (
            <span 
              className="font-medium opacity-60"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {product.category ? (lang === 'ar' ? product.category.nameAr : product.category.nameEn) : ''}
            </span>
          )}
          <span 
            className="font-semibold transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
            style={{ color: 'var(--color-primary)' }}
          >
            {lang === 'ar' ? 'التفاصيل ←' : 'Details →'}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

