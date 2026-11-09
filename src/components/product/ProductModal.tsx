import { useState, useCallback } from 'react';
import type { Product } from '@/data/types';
import { useTranslation } from '@/i18n/useTranslation';
import { Modal } from '@/components/ui/Modal';
import { ImageGallery } from './ImageGallery';
import { WHATSAPP_URL } from '@/config/contact';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { t, lang } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(() => {
    if (typeof window === 'undefined') return;
    const shareUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      });
    }
  }, []);

  if (!product) return null;

  const primaryName = lang === 'ar' ? product.nameAr : product.nameEn;
  const secondaryName = lang === 'ar' ? product.nameEn : product.nameAr;
  const description = lang === 'ar' ? product.descriptionAr : product.descriptionEn;
  const categoryName = product.category
    ? (lang === 'ar' ? product.category.nameAr : product.category.nameEn)
    : null;

  // Prefilled WhatsApp message for this product with product link
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const inquiryMessage = encodeURIComponent(
    lang === 'ar'
      ? `مرحباً، أود الاستفسار عن منتج: ${product.nameAr} (${product.nameEn})\nرابط المنتج: ${pageUrl}`
      : `Hello, I would like to inquire about: ${product.nameEn} (${product.nameAr})\nProduct link: ${pageUrl}`
  );
  const productWhatsAppUrl = `${WHATSAPP_URL}?text=${inquiryMessage}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={`${t.product.details}: ${primaryName}`}
      maxWidth="max-w-4xl"
    >
      {/* Modal Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 end-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer border shadow-sm hover:scale-105 active:scale-95"
        style={{
          backgroundColor: 'var(--color-bg-primary)',
          borderColor: 'var(--color-border)',
          color: 'var(--color-text-primary)',
        }}
        aria-label={t.product.close}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="p-4 sm:p-7 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Gallery Column */}
          <div>
            <ImageGallery
              images={product.images}
              lang={lang}
              imageOfLabel={t.product.imageOf}
              prevLabel={t.product.previous}
              nextLabel={t.product.next}
            />
          </div>

          {/* Details Column */}
          <div className="flex flex-col gap-5">
            {/* Headers & Tags */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {categoryName && (
                  <span
                    className="px-2.5 py-1 text-xs font-bold rounded-lg uppercase tracking-wider"
                    style={{
                      backgroundColor: 'var(--color-hover)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {categoryName}
                  </span>
                )}
                {product.sku && (
                  <span
                    className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg border"
                    style={{
                      backgroundColor: 'var(--color-bg-secondary)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {t.product.sku}: {product.sku}
                  </span>
                )}
              </div>

              <h2
                className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {primaryName}
              </h2>
              <p
                className="mt-1 text-sm sm:text-base font-semibold opacity-75"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {secondaryName}
              </p>
            </div>

            {/* Description */}
            <div className="border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
              <h3
                className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-2"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {t.product.description}
              </h3>
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {description}
              </p>
            </div>

            {/* Specifications (if present) */}
            {product.specs && product.specs.length > 0 && (
              <div className="border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
                <h3
                  className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-2"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {t.product.specifications}
                </h3>
                <dl className="divide-y text-xs sm:text-sm" style={{ borderColor: 'var(--color-border)' }}>
                  {product.specs.map((spec, idx) => (
                    <div key={idx} className="py-2 flex justify-between gap-4">
                      <dt className="font-medium opacity-70" style={{ color: 'var(--color-text-secondary)' }}>
                        {lang === 'ar' ? spec.labelAr : spec.labelEn}
                      </dt>
                      <dd className="font-semibold text-end" style={{ color: 'var(--color-text-primary)' }}>
                        {lang === 'ar' ? spec.valueAr : spec.valueEn}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Action Buttons: WhatsApp Direct Inquiry + Share Link */}
            <div className="pt-2 mt-auto flex flex-col sm:flex-row gap-2.5">
              <a
                href={productWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-bold text-white shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-98"
                style={{ backgroundColor: '#25D366' }}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>{lang === 'ar' ? 'طلب استفسار عبر واتساب' : 'Inquire via WhatsApp'}</span>
              </a>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold border transition-all duration-200 cursor-pointer hover:bg-black/5 active:scale-95"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg-secondary)',
                  color: 'var(--color-text-primary)',
                }}
                title={t.product.share}
              >
                <svg className="w-4 h-4 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {copied ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  )}
                </svg>
                <span>{copied ? t.product.linkCopied : t.product.share}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
