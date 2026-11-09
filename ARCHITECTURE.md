# System Architecture & Technical Specifications

This document outlines the architectural patterns, state design, asset virtualization, and engineering principles governing the I-Care Multi-Brand Product Catalog.

---

## 1. Architectural Principles

1. **Separation of Concerns**: Strict decoupling of Brand Configuration, Product Data Manifests, Presentation Layer, Theming Engine, and Asset Resolution.
2. **Preservation of Raw Media Assets**: The original directory structure under `Materials/` is strictly read-only and immutable. An asset virtualization mapping layer mediates between physical disk paths and web URIs.
3. **Data-Driven UI**: Components never hardcode product titles, descriptions, SKU values, or asset paths. All rendering flows reactively from typed manifests.
4. **Static Resilience**: Zero server-side infrastructure required. Fully operational as static files hosted on GitHub Pages or any CDN.
5. **Multi-Brand Independence**: Brands are independent entities with their own design tokens, not arbitrary filter tags inside a shared bucket.

---

## 2. Directory Structure & Asset Integration Strategy

### The Physical Asset Reality
The `Materials/` folder contains media organized in disparate folder conventions:
- **I-Care**: Standard product subfolders (e.g., `Materials/I-Care/Face Guard/`), 1 to 3 images per product, mixed formats (`.png`, `.jpeg`, `.webp`, `.avif`).
- **Sabona**: SKU-prefixed subfolders (e.g., `Materials/Sabona/BK32 - Black Line/`), 2 to 3 images per product, luxury lifestyle photography.
- **Grace**: **Flat layout** directly inside `Materials/Grace/` with Arabic filenames (`دش مهبلي.jpeg`, `كافار جبيرة ذراع اطفال.png`) and an illustrative guide (`صورة توضيحية لاستعمال اي كافار.jpg`).

### The Asset Mapping Layer (`src/utils/assets.ts`)
Static website browsers cannot enumerate filesystem directories at runtime. Rather than running a fragile runtime discovery mechanism or moving/renaming the user's files, we employ:
1. **Bilingual Type-Safe Manifests**: Each brand has a manifest in `src/data/products/`.
2. **URI Normalization**: Segment encoding (`encodeURIComponent`) ensures spaces and Arabic UTF-8 characters resolve across all web servers and operating systems.
3. **Base Path Polymorphism**: `getBasePath()` evaluates Vite's `import.meta.env.BASE_URL` to ensure paths resolve identically in local development (`/materials/...`), repository subpath deployment (`/I-Care-Catalog/materials/...`), or custom domains.
4. **Vite Dual-Engine Asset Plugin**:
   - **Development**: Dev-server middleware intercepts `/materials/*` requests and pipes raw streams directly from `./Materials/` with precise MIME-type headers.
   - **Production**: A custom Vite rollup hook (`closeBundle`) recursively clones `./Materials/` to `dist/materials/`.

---

## 3. Brand Configuration & Dynamic Theme Engine

### Token Representation (`src/data/types.ts`)
```typescript
export interface BrandTheme {
  primary: string;
  secondary: string;
  accent: string;
  bgPrimary: string;
  bgSecondary: string;
  bgCard: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  hover: string;
}
```

### Runtime CSS Custom Property Injection (`src/theme/context.tsx`)
When a user switches brands via `setBrand(id)`:
1. The active brand tokens are immediately committed to document root CSS custom properties:
   - `--color-primary`
   - `--color-secondary`
   - `--color-accent`
   - `--color-bg-primary`
   - `--color-bg-secondary`
   - `--color-bg-card`
   - `--color-text-primary`
   - `--color-text-secondary`
   - `--color-border`
   - `--color-hover`
2. A `data-brand="<brandId>"` attribute is stamped onto `<html>`.
3. Tailwind CSS classes and custom CSS components bind directly to these CSS custom properties. Brand switching happens instantaneously without requiring page reloads or full component unmounting.

---

## 4. Product Registry System

```
                  ┌──────────────────────┐
                  │   src/data/types.ts  │
                  └──────────┬───────────┘
                             │ (implements)
     ┌───────────────────────┼───────────────────────┐
     ▼                       ▼                       ▼
icare.ts                 sabona.ts                grace.ts
(8 Products)            (15 Products)            (7 Products)
     │                       │                       │
     └───────────────────────┼───────────────────────┘
                             ▼
                  ┌──────────────────────┐
                  │  src/data/registry.ts│
                  └──────────┬───────────┘
                             ▼
                  ┌──────────────────────┐
                  │ hooks/useProducts.ts │
                  └──────────────────────┘
```

- **Querying**: `getProductsByBrand(brandId)` returns products in defined display order.
- **Search & Normalization** (`src/utils/search.ts`): Strips Arabic tashkeel (diacritics), normalizes alef variants (`أ`, `إ`, `آ` → `ا`), normalizes taa marbuta (`ة` → `ه`), and executes case-insensitive bilingual matching across both Arabic and English names, descriptions, and SKUs.
- **Isolation Guarantee**: Live search and category filters operate **strictly** on the active brand's products.

---

## 5. Localization & Bi-directional Layout (RTL / LTR)

- **Default Language**: Arabic (`ar`, `rtl`).
- **Secondary Language**: English (`en`, `ltr`).
- **Synchronized DOM State**:
  - `document.documentElement.lang` updates to `ar` or `en`.
  - `document.documentElement.dir` updates to `rtl` or `ltr`.
- **Typography Switching**:
  - Arabic loads the Google Font **Cairo** with proper baseline alignments.
  - English dynamically adjusts to **Inter** / system sans-serif.
- **State Persistence**: Selected language persists in `localStorage` (`icare-catalog-lang`).

---

## 6. Routing Architecture

- **Engine**: `HashRouter` from `react-router-dom`.
- **Rationale**: GitHub Pages is a static server that returns 404 for deep paths like `/brand/icare` without custom 404 rewrite hacks. `HashRouter` (`/#/brand/icare`) routes cleanly on any static server without server-side routing configuration.
- **Route Definitions**:
  - `/#/` → Redirects to `/#/brand/icare` (ICARE is default)
  - `/#/brand/:brandId` → Renders `CatalogPage`
  - `*` → 404 fallback redirects safely to `/#/brand/icare`

---

## 7. Performance & Optimization Architecture

1. **Intersection-Aware Image Carousels**:
   Product cards utilize `useIntersection` observer. If a product card is outside the viewport, its image rotation timer is completely frozen.
2. **Interaction Pausing**:
   Hovering over a card or focusing it via keyboard halts carousel auto-rotation so visitors can inspect images without abrupt layout changes.
3. **Reduced Motion Accessibility**:
   Both `useCarousel` and `framer-motion` transitions respect `prefers-reduced-motion: reduce`.
4. **Lazy Asset Ingestion**:
   Native `loading="lazy"` and asynchronous decoding (`decoding="async"`) paired with fallback skeletons prevent layout shifts and optimize First Contentful Paint (FCP).

---

## 8. SEO & Static Deployment Considerations

- **Semantic Hierarchy**: `header`, `main`, `section`, `article`, `footer`, `nav`, `aside`.
- **Static Metadata**: `index.html` includes Open Graph cards, language alternates, viewport scaling, preconnect font directives, and Arabic meta tags.
- **Discoverability**: `public/robots.txt` and `public/sitemap.xml` are bundled into the root distribution.
- **Client-Side Rendering Limitation**: Because content is client-rendered via React, search engines requiring static pre-rendering will index the shell meta tags. If full SSR indexing is mandated in the future, Astro or Next.js static export can consume this exact data registry without rewriting data manifests.

