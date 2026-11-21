import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, extname } from 'node:path';
import { copyFileSync, mkdirSync, readdirSync, statSync, existsSync, createReadStream } from 'node:fs';
import type { IncomingMessage, ServerResponse } from 'node:http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Custom Vite plugin for Materials asset management:
 * 1. During local development: serves `/materials/...` directly from `./Materials/...`
 *    with proper MIME types, UTF-8 decoding, and directory traversal protection.
 * 2. On production build: recursively copies `./Materials/` to `dist/materials/`.
 */
function materialsPlugin(): Plugin {
  function copyRecursive(src: string, dest: string) {
    if (!existsSync(src)) return;
    const stat = statSync(src);
    if (stat.isDirectory()) {
      mkdirSync(dest, { recursive: true });
      for (const child of readdirSync(src)) {
        copyRecursive(resolve(src, child), resolve(dest, child));
      }
    } else {
      copyFileSync(src, dest);
    }
  }

  const mimeMap: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.svg': 'image/svg+xml',
  };

  return {
    name: 'materials-plugin',
    configureServer(server) {
      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (!req.url) return next();
        const urlWithoutQuery = req.url.split('?')[0] || '';

        // Match /materials/... (supporting both root and base prefixed URLs)
        if (urlWithoutQuery.startsWith('/materials/') || urlWithoutQuery.includes('/materials/')) {
          const match = urlWithoutQuery.match(/\/materials\/(.+)$/);
          if (match && match[1]) {
            try {
              const decodedPath = decodeURIComponent(match[1]);
              const materialsRoot = resolve(__dirname, 'Materials');
              const filePath = resolve(materialsRoot, decodedPath);

              // Guard against directory traversal attacks
              if (!filePath.startsWith(materialsRoot)) {
                res.statusCode = 403;
                res.end('Forbidden');
                return;
              }

              if (existsSync(filePath) && statSync(filePath).isFile()) {
                const ext = extname(filePath).toLowerCase();
                let contentType = mimeMap[ext];
                if (!contentType) {
                  const lower = filePath.toLowerCase();
                  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith(' jpg') || lower.endsWith(' jpeg')) {
                    contentType = 'image/jpeg';
                  } else if (lower.endsWith('.png') || lower.endsWith(' png')) {
                    contentType = 'image/png';
                  } else if (lower.endsWith('.webp') || lower.endsWith(' webp')) {
                    contentType = 'image/webp';
                  } else {
                    contentType = 'application/octet-stream';
                  }
                }

                res.setHeader('Content-Type', contentType);
                res.setHeader('Cache-Control', 'public, max-age=3600');
                createReadStream(filePath).pipe(res);
                return;
              }
            } catch (err) {
              console.warn('[materials-plugin] Error serving file:', err);
            }
          }
        }
        next();
      });
    },
    closeBundle() {
      const src = resolve(__dirname, 'Materials');
      const dest = resolve(__dirname, 'dist', 'materials');
      try {
        copyRecursive(src, dest);
        console.log('✓ Materials copied to dist/materials/');
      } catch (e) {
        console.warn('⚠ Could not copy Materials:', e);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), materialsPlugin()],
  // Base path configured specifically for the I-Care repository on GitHub Pages
  base: '/I-Care/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    fs: {
      allow: ['.'],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion': ['framer-motion'],
        },
      },
    },
  },
});
