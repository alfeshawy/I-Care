/**
 * Hook to detect user's reduced motion preference.
 * 
 * @module hooks/useReducedMotion
 */

import { useMediaQuery } from './useMediaQuery';

/**
 * Returns true if the user prefers reduced motion.
 * Used to disable or simplify animations for accessibility.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
