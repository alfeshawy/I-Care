import { useEffect } from 'react';
import type { Brand, Product, Language } from '@/data/types';

interface PageMetadataProps {
  brand: Brand;
  lang: Language;
  selectedProduct?: Product | null;
}

export function usePageMetadata({ brand, lang, selectedProduct }: PageMetadataProps) {
  useEffect(() => {
    const isAr = lang === 'ar';
    const brandName = isAr ? brand.nameAr : brand.nameEn;
    const tagline = isAr ? brand.taglineAr : brand.taglineEn;

    let title = '';
    let description = '';

    if (selectedProduct) {
      const productName = isAr ? selectedProduct.nameAr : selectedProduct.nameEn;
      const productDesc = isAr ? selectedProduct.descriptionAr : selectedProduct.descriptionEn;
      title = `${productName} | ${brandName}`;
      description = productDesc || `${productName} - ${brandName}`;
    } else {
      title = isAr 
        ? `${brandName} - ${tagline} | المملكة العربية السعودية`
        : `${brandName} - ${tagline} | Saudi Arabia`;
      description = isAr
        ? `استكشف كتالوج منتجات ${brandName} في المملكة العربية السعودية: ${tagline}. تصفح المنتجات واطلب الاستفسار المباشر عبر واتساب.`
        : `Explore ${brandName} product catalog in Saudi Arabia: ${tagline}. Browse products and inquire directly via WhatsApp.`;
    }

    // Update document title
    document.title = title;

    // Helper to update or create meta tags
    const setMetaTag = (attribute: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:locale', isAr ? 'ar_SA' : 'en_US');
    setMetaTag('property', 'og:site_name', brandName);
  }, [brand, lang, selectedProduct]);
}

