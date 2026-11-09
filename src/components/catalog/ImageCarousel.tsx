import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ProductImage, Language } from '@/data/types';
import { useCarousel } from '@/hooks/useCarousel';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { LazyImage } from '@/components/ui/LazyImage';

interface ImageCarouselProps {
  images: ProductImage[];
  lang: Language;
  isVisible: boolean;
  aspectRatio?: string;
}

export function ImageCarousel({ 
  images, 
  lang, 
  isVisible,
  aspectRatio = 'aspect-square' 
}: ImageCarouselProps) {
  const reducedMotion = useReducedMotion();
  const hasMultipleImages = images.length > 1;

  const { currentIndex, pause, resume } = useCarousel({
    totalImages: images.length,
    interval: 3800,
    isVisible,
    autoPlay: hasMultipleImages,
    respectReducedMotion: true,
  });

  const currentImage = useMemo(() => {
    return images[currentIndex] || images[0];
  }, [images, currentIndex]);

  if (!currentImage) return null;

  const alt = lang === 'ar' ? currentImage.altAr : currentImage.altEn;

  return (
    <div
      className={`relative w-full ${aspectRatio} image-container select-none`}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage.id}
          initial={{ opacity: reducedMotion ? 1 : 0.4 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: reducedMotion ? 1 : 0.4 }}
          transition={{ duration: reducedMotion ? 0 : 0.35, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <LazyImage
            src={currentImage.src}
            alt={alt}
            className="w-full h-full p-2.5 sm:p-3"
          />
        </motion.div>
      </AnimatePresence>

      {/* Visual indicators — only rendered when multiple images exist */}
      {hasMultipleImages && (
        <div 
          className="absolute bottom-2.5 left-0 right-0 flex justify-center items-center gap-1.5 px-2 pointer-events-none"
          aria-hidden="true"
        >
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`block rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-4 h-1.5 opacity-100 shadow-xs'
                  : 'w-1.5 h-1.5 opacity-40'
              }`}
              style={{
                backgroundColor: idx === currentIndex ? 'var(--color-primary)' : '#9CA3AF',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

