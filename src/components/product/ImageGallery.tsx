import { useState, useCallback, useRef, type TouchEvent, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProductImage, Language } from '@/data/types';
import { LazyImage } from '@/components/ui/LazyImage';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ImageGalleryProps {
  images: ProductImage[];
  lang: Language;
  imageOfLabel: string;
  prevLabel: string;
  nextLabel: string;
}

export function ImageGallery({ 
  images, 
  lang, 
  imageOfLabel, 
  prevLabel, 
  nextLabel 
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [direction, setDirection] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  const activeImage = images[activeIndex] || images[0];
  if (!activeImage) return null;

  const goTo = useCallback((index: number) => {
    setIsZoomed(false);
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }, [activeIndex]);

  const goNext = useCallback(() => {
    if (activeIndex < images.length - 1) {
      setIsZoomed(false);
      setDirection(1);
      setActiveIndex(prev => prev + 1);
    }
  }, [activeIndex, images.length]);

  const goPrev = useCallback(() => {
    if (activeIndex > 0) {
      setIsZoomed(false);
      setDirection(-1);
      setActiveIndex(prev => prev - 1);
    }
  }, [activeIndex]);

  const handleStageClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (stageRef.current) {
      const rect = stageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomOrigin({ x, y });
    }
    setIsZoomed(prev => !prev);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomOrigin({ x, y });
  }, [isZoomed]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const isRtl = document.documentElement.dir === 'rtl';
        const isNext = isRtl ? e.key === 'ArrowLeft' : e.key === 'ArrowRight';
        if (isNext) goNext();
        else goPrev();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    },
    [goNext, goPrev, isFullscreen]
  );

  // Touch gesture
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const diff = touchStartX.current - endX;
    const isRtl = document.documentElement.dir === 'rtl';

    if (Math.abs(diff) > 40) {
      const isSwipeNext = isRtl ? diff < 0 : diff > 0;
      if (isSwipeNext) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  const alt = lang === 'ar' ? activeImage.altAr : activeImage.altEn;
  const counterText = imageOfLabel
    .replace('{current}', String(activeIndex + 1))
    .replace('{total}', String(images.length));

  const slideVariants = {
    enter: (d: number) => ({
      x: reducedMotion ? 0 : d > 0 ? 80 : -80,
      opacity: reducedMotion ? 1 : 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({
      x: reducedMotion ? 0 : d < 0 ? 80 : -80,
      opacity: reducedMotion ? 1 : 0,
    }),
  };

  return (
    <div 
      onKeyDown={handleKeyDown} 
      tabIndex={0} 
      className="flex flex-col gap-3 outline-none"
      aria-label="Image gallery"
    >
      {/* Main Image Stage */}
      <div
        ref={stageRef}
        className={`relative w-full aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden select-none border transition-colors ${
          isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
        }`}
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border)',
        }}
        onClick={handleStageClick}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeImage.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reducedMotion ? 0 : 0.25, ease: 'easeOut' }}
            className="w-full h-full flex items-center justify-center p-3"
            style={{
              transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
              transform: isZoomed ? 'scale(2.2)' : 'scale(1)',
              transition: isZoomed ? 'transform 0.15s ease-out' : 'transform 0.25s ease-out',
            }}
          >
            <LazyImage
              src={activeImage.src}
              alt={alt}
              className="w-full h-full object-contain pointer-events-none"
            />
          </motion.div>
        </AnimatePresence>

        {/* Zoom Hint / Indicator */}
        <div 
          className="absolute top-3 start-3 px-2.5 py-1 rounded-lg bg-black/60 text-white text-[11px] font-semibold backdrop-blur-xs flex items-center gap-1.5 pointer-events-none shadow-xs"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isZoomed ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0M13 10H7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0M10 7v6m3-3H7" />
            )}
          </svg>
          <span>{isZoomed ? (lang === 'ar' ? 'تصغير' : 'Zoom out') : (lang === 'ar' ? 'تكبير' : 'Zoom in')}</span>
        </div>

        {/* Fullscreen Expand Action */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsFullscreen(true);
          }}
          className="absolute top-3 end-3 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
          title={lang === 'ar' ? 'عرض ملء الشاشة' : 'Fullscreen preview'}
          aria-label={lang === 'ar' ? 'عرض ملء الشاشة' : 'Fullscreen preview'}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              disabled={activeIndex === 0}
              className="absolute top-1/2 -translate-y-1/2 start-3 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all disabled:opacity-20 cursor-pointer shadow-md disabled:cursor-not-allowed"
              aria-label={prevLabel}
            >
              <svg className="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              disabled={activeIndex === images.length - 1}
              className="absolute top-1/2 -translate-y-1/2 end-3 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all disabled:opacity-20 cursor-pointer shadow-md disabled:cursor-not-allowed"
              aria-label={nextLabel}
            >
              <svg className="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Counter pill */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-semibold backdrop-blur-xs shadow-xs pointer-events-none">
            {counterText}
          </div>
        )}
      </div>

      {/* Thumbnails strip */}
      {images.length > 1 && (
        <div 
          className="flex gap-2 sm:gap-2.5 overflow-x-auto py-1 scrollbar-none" 
          role="tablist"
          aria-label="Product thumbnails"
        >
          {images.map((image, idx) => {
            const isSelected = idx === activeIndex;
            const thumbAlt = lang === 'ar' ? image.altAr : image.altEn;

            return (
              <button
                key={image.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => goTo(idx)}
                className={`relative flex-shrink-0 w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-offset-2 opacity-100 scale-102'
                    : 'opacity-50 hover:opacity-85'
                }`}
                style={{
                  borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
                  backgroundColor: 'var(--color-bg-secondary)',
                }}
              >
                <LazyImage
                  src={image.src}
                  alt={thumbAlt}
                  className="w-full h-full p-1"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 end-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              aria-label="Close fullscreen view"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img
              src={activeImage.src}
              alt={alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
