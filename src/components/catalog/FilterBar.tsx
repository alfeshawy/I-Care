import { useTranslation } from '@/i18n/useTranslation';
import type { ProductCategory } from '@/data/types';

interface FilterBarProps {
  categories: ProductCategory[];
  activeCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  className?: string;
}

export function FilterBar({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  className = '' 
}: FilterBarProps) {
  const { t, lang } = useTranslation();

  if (categories.length === 0) return null;

  return (
    <div 
      className={`flex flex-wrap items-center gap-1.5 sm:gap-2 ${className}`} 
      role="tablist" 
      aria-label={t.product.category}
    >
      {/* "All" button */}
      <button
        type="button"
        role="tab"
        aria-selected={activeCategory === null}
        onClick={() => onCategoryChange(null)}
        className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-xl border transition-all duration-200 cursor-pointer ${
          activeCategory === null
            ? 'shadow-xs font-bold'
            : 'hover:bg-black/5 opacity-80 hover:opacity-100'
        }`}
        style={{
          backgroundColor: activeCategory === null ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
          borderColor: activeCategory === null ? 'transparent' : 'var(--color-border)',
          color: activeCategory === null ? 'var(--color-text-on-primary, #FFFFFF)' : 'var(--color-text-primary)',
        }}
      >
        {t.product.allCategories}
      </button>

      {/* Individual category pills */}
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        const name = lang === 'ar' ? category.nameAr : category.nameEn;

        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onCategoryChange(category.id)}
            className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-xl border transition-all duration-200 cursor-pointer ${
              isActive
                ? 'shadow-xs font-bold'
                : 'hover:bg-black/5 opacity-80 hover:opacity-100'
            }`}
            style={{
              backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
              borderColor: isActive ? 'transparent' : 'var(--color-border)',
              color: isActive ? 'var(--color-text-on-primary, #FFFFFF)' : 'var(--color-text-primary)',
            }}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}

