/**
 * Asset path utilities.
 * 
 * Handles base path resolution for GitHub Pages deployment.
 * All product image paths should go through these helpers.
 * 
 * In development, Vite serves files from the project root.
 * In production (GitHub Pages), the base path may include the repo name or relative path.
 * 
 * @module utils/assets
 */

/**
 * Get the base path for static assets.
 * Guarantees a trailing slash so paths concatenate predictably.
 */
export function getBasePath(): string {
  const base = import.meta.env.BASE_URL || './';
  return base.endsWith('/') ? base : `${base}/`;
}

/**
 * Resolve a materials asset path.
 * 
 * @param brandFolder - The brand folder name as it exists in Materials/ (e.g., 'I-Care', 'Sabona', 'Grace')
 * @param productFolder - The product folder name (e.g., 'Face Guard')
 * @param filename - The image filename (e.g., 'image.png')
 * @returns Full path ready for use in <img> src
 */
export function resolveProductImage(
  brandFolder: string,
  productFolder: string,
  filename: string
): string {
  const base = getBasePath();
  // Encode path segments to handle spaces and Arabic characters
  const encodedBrand = encodeURIComponent(brandFolder);
  const encodedProduct = encodeURIComponent(productFolder);
  const encodedFile = encodeURIComponent(filename);
  return `${base}materials/${encodedBrand}/${encodedProduct}/${encodedFile}`;
}

/**
 * Resolve a flat materials asset path (for brands like Grace with no subfolders).
 * 
 * @param brandFolder - The brand folder name
 * @param filename - The image filename
 * @returns Full path ready for use in <img> src
 */
export function resolveDirectImage(
  brandFolder: string,
  filename: string
): string {
  const base = getBasePath();
  const encodedBrand = encodeURIComponent(brandFolder);
  const encodedFile = encodeURIComponent(filename);
  return `${base}materials/${encodedBrand}/${encodedFile}`;
}

/**
 * Resolve a brand logo path.
 */
export function resolveBrandLogo(logoPath: string): string {
  if (!logoPath) return '';
  const base = getBasePath();
  const cleanPath = logoPath.replace(/^\/?materials\//, '');
  const parts = cleanPath.split('/');
  const encoded = parts.map(p => encodeURIComponent(p)).join('/');
  return `${base}materials/${encoded}`;
}
