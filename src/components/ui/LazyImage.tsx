import { useState, useCallback, type ImgHTMLAttributes, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError'> {
  fallback?: ReactNode;
}

export function LazyImage({ 
  src, 
  alt = '', 
  className = '', 
  fallback,
  ...props 
}: LazyImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const reducedMotion = useReducedMotion();

  const handleLoad = useCallback(() => setStatus('loaded'), []);
  const handleError = useCallback(() => setStatus('error'), []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder skeleton */}
      <AnimatePresence>
        {status === 'loading' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
            aria-hidden="true"
          >
            <div className="w-8 h-8 rounded-full border-2 border-current opacity-20 animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error state */}
      {status === 'error' && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center"
          style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}
          role="img"
          aria-label={alt || 'Image failed to load'}
        >
          {fallback || (
            <svg className="w-10 h-10 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>
      )}

      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          status === 'loaded' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDuration: reducedMotion ? '0ms' : '300ms' }}
        {...props}
      />
    </div>
  );
}

