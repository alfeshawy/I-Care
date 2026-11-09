/**
 * Hook for image carousel state management.
 * 
 * Handles auto-rotation, pause on hover/focus, and respects reduced motion.
 * Only activates for products with multiple images.
 * 
 * @module hooks/useCarousel
 */

import { useState, useCallback, useEffect, useRef } from 'react';

export interface UseCarouselOptions {
  /** Total number of images */
  totalImages: number;
  /** Auto-rotation interval in ms (default: 3000) */
  interval?: number;
  /** Whether auto-rotation is enabled (default: true) */
  autoPlay?: boolean;
  /** Whether the carousel is visible in the viewport */
  isVisible?: boolean;
  /** Whether to respect reduced motion preference */
  respectReducedMotion?: boolean;
}

export interface UseCarouselReturn {
  /** Current active image index */
  currentIndex: number;
  /** Go to next image */
  next: () => void;
  /** Go to previous image */
  prev: () => void;
  /** Go to a specific image */
  goTo: (index: number) => void;
  /** Pause auto-rotation (e.g., on hover) */
  pause: () => void;
  /** Resume auto-rotation */
  resume: () => void;
  /** Whether auto-rotation is currently paused */
  isPaused: boolean;
}

export function useCarousel({
  totalImages,
  interval = 3000,
  autoPlay = true,
  isVisible = true,
  respectReducedMotion = true,
}: UseCarouselOptions): UseCarouselReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Check reduced motion preference
  const prefersReducedMotion = respectReducedMotion
    ? (typeof window !== 'undefined' &&
       window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    : false;

  const shouldAutoPlay = autoPlay && !isPaused && isVisible && totalImages > 1 && !prefersReducedMotion;

  const next = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % totalImages);
  }, [totalImages]);

  const prev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, totalImages - 1)));
  }, [totalImages]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  // Auto-rotation effect
  useEffect(() => {
    if (shouldAutoPlay) {
      timerRef.current = setInterval(next, interval);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [shouldAutoPlay, next, interval]);

  // Reset index when total images changes (e.g., different product)
  useEffect(() => {
    setCurrentIndex(0);
  }, [totalImages]);

  return { currentIndex, next, prev, goTo, pause, resume, isPaused };
}
