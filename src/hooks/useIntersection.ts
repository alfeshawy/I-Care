/**
 * Intersection Observer hook for viewport visibility detection.
 * Used to lazy-load images and pause carousels outside the viewport.
 * 
 * @module hooks/useIntersection
 */

import { useState, useEffect, useRef, type RefObject } from 'react';

export interface UseIntersectionOptions {
  /** Margin around the root (e.g., '100px' to trigger before visible) */
  rootMargin?: string;
  /** Visibility threshold (0-1) */
  threshold?: number;
  /** Only trigger once */
  triggerOnce?: boolean;
}

export function useIntersection<T extends HTMLElement = HTMLElement>(
  options: UseIntersectionOptions = {}
): [RefObject<T | null>, boolean] {
  const { rootMargin = '100px', threshold = 0, triggerOnce = false } = options;
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          const visible = entry.isIntersecting;
          setIsVisible(visible);
          if (visible && triggerOnce) {
            observer.unobserve(element);
          }
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, threshold, triggerOnce]);

  return [ref, isVisible];
}
