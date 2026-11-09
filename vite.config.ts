import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve, extname } from 'path';
import { copyFileSync, mkdirSync, readdirSync, statSync, existsSync, createReadStream } from 'fs';

/**
 * Custom Vite plugin for Materials asset management:
 * 1. During local development: serves `/materials/...` directly from `./Materials/...`
 *    with proper MIME types and UTF-8 path decoding.
 * 2. On production build: recursively copies `./Materials/` to `dist/materials/`.
 */
function materialsPlugin() {
  function copyRecursive(src: string, dest: string) {
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
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (!req.url) return next();
        const urlWithoutQuery = req.url.split('?')[0];
        
        // Match /materials/...
        if (urlWithoutQuery.startsWith('/materials/') || urlWithoutQuery.includes('/materials/')) {
          const match = urlWithoutQuery.match(/\/materials\/(.+)$/);
          if (match && match[1]) {
            try {
              const decodedPath = decodeURIComponent(match[1]);
              const filePath = resolve(__dirname, 'Materials', decodedPath);
              if (existsSync(filePath) && statSync(filePath).isFile()) {
                const ext = extname(filePath).toLowerCase();
                res.setHeader('Content-Type', mimeMap[ext] || 'application/octet-stream');
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
  // Relative base allows seamless deployment to GitHub Pages (repo subpath or custom domain)
  // or can be overridden via VITE_BASE_PATH environment variable
  base: process.env.VITE_BASE_PATH || './',
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
