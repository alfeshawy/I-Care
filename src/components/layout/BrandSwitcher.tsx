import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/i18n/useTranslation';
import { useTheme } from '@/theme/useTheme';
import { brands, brandOrder } from '@/config/brands';
import type { BrandId } from '@/data/types';

interface BrandSwitcherProps {
  onSelect?: () => void;
  className?: string;
}

export function BrandSwitcher({ onSelect, className = '' }: BrandSwitcherProps) {
  const { lang } = useTranslation();
  const { brandId, setBrand } = useTheme();
  const navigate = useNavigate();

  const handleBrandSelect = (id: BrandId) => {
    setBrand(id);
    navigate(`/brand/${id}`);
    onSelect?.();
  };

  return (
    <div 
      className={`inline-flex items-center p-1 rounded-xl gap-1 border transition-colors ${className}`}
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderColor: 'var(--color-border)',
      }}
      role="tablist" 
      aria-label="Brand switcher"
    >
      {brandOrder.map((id) => {
        const brand = brands[id];
        const isActive = id === brandId;
        const name = lang === 'ar' ? brand.nameAr : brand.nameEn;

        return (
          <button
            key={id}
            role="tab"
            aria-selected={isActive}
            onClick={() => handleBrandSelect(id)}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
              isActive
                ? 'shadow-xs font-bold'
                : 'opacity-75 hover:opacity-100 hover:bg-black/5'
            }`}
            style={{
              backgroundColor: isActive ? brand.theme.primary : 'transparent',
              color: isActive ? (brand.theme.textOnPrimary || '#FFFFFF') : 'var(--color-text-primary)',
            }}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}

