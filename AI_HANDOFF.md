# AI Developer Handoff Specification (for Gemini Flash)

> **To Gemini Flash**: Read this document thoroughly before writing or altering any code in this project.
> This project has a rigorous, complete architectural foundation that is currently fully functional, tested, and building with 0 errors. Follow the principles below to continue extending this codebase seamlessly.

---

## 1. Project Status Summary

- **Architecture Status**: 100% complete, fully modular, highly polished, and verified.
- **Build Status**: `tsc -b && vite build` completes with **0 errors**.
- **Dev Server Status**: Vite HMR and dynamic asset streaming verified with **200 OK**.
- **Static Assets**: 61 product image references verified on disk with **0 broken links**.
- **Production Bundles**: Fully code-split (`react-vendor`, `motion`, `index`) with lightweight footprint (~138 kB total gzipped JS).
- **Hosting Target**: GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`).

---

## 2. Completed Architecture & Deliverables

### A. Data & Manifest Layer
- [`src/data/types.ts`](file:///home/saif-alfeshawy/Alfeshawy/I-Care%20Catalog/src/data/types.ts): Canonical TypeScript models (`Brand`, `Product`, `ProductImage`, `ProductCategory`, `BrandTheme`, `Translation`).
- [`src/data/products/icare.ts`](file:///home/saif-alfeshawy/Alfeshawy/I-Care%20Catalog/src/data/products/icare.ts): 8 ICARE medical products mapped to existing subfolders in `Materials/I-Care/`.
- [`src/data/products/sabona.ts`](file:///home/saif-alfeshawy/Alfeshawy/I-Care%20Catalog/src/data/products/sabona.ts): 15 SABONA luxury magnetic bracelets mapped to `Materials/Sabona/`.
- [`src/data/products/grace.ts`](file:///home/saif-alfeshawy/Alfeshawy/I-Care%20Catalog/src/data/products/grace.ts): 7 GRACE personal care products mapped to flat assets in `Materials/Grace/`.
- [`src/data/registry.ts`](file:///home/saif-alfeshawy/Alfeshawy/I-Care%20Catalog/src/data/registry.ts): Unified registry with brand getters (`getProductsByBrand`, `getProductById`, `getProductCount`).

### B. Configuration & Theming
- [`src/config/brands.ts`](file:///home/saif-alfeshawy/Alfeshawy/I-Care%20Catalog/src/config/brands.ts): Central brand registry for ICARE, SABONA, and GRACE with tailored palettes (`textOnPrimary`, luxury gold `#D4AF37` for Sabona, clinical blue for Icare, wellness lavender for Grace).
- [`src/config/contact.ts`](file:///home/saif-alfeshawy/Alfeshawy/I-Care%20Catalog/src/config/contact.ts): Saudi Arabia contact details (+966 57 058 0415, WhatsApp & Phone).
- [`src/theme/context.tsx`](file:///home/saif-alfeshawy/Alfeshawy/I-Care%20Catalog/src/theme/context.tsx): Dynamic CSS Custom Property injector with `data-brand` attribute syncing and mobile `theme-color` meta updates.

### C. Localization (i18n)
- [`src/i18n/context.tsx`](file:///home/saif-alfeshawy/Alfeshawy/I-Care%20Catalog/src/i18n/context.tsx): RTL/LTR bi-directional engine with document direction and language persistence.
- Arabic translations in [`src/i18n/translations/ar.ts`](file:///home/saif-alfeshawy/Alfeshawy/I-Care%20Catalog/src/i18n/translations/ar.ts).
- English translations in [`src/i18n/translations/en.ts`](file:///home/saif-alfeshawy/Alfeshawy/I-Care%20Catalog/src/i18n/translations/en.ts).

### D. Search & SEO Engine
- [`src/utils/search.ts`](file:///home/saif-alfeshawy/Alfeshawy/I-Care%20Catalog/src/utils/search.ts): Multi-token bilingual search engine with full Arabic normalization (tashkeel stripping, alef variants `أ`/`إ`/`آ` -> `ا`, taa marbuta `ة` -> `ه`, alef maksura `ى` -> `ي`).
- [`src/hooks/usePageMetadata.ts`](file:///home/saif-alfeshawy/Alfeshawy/I-Care%20Catalog/src/hooks/usePageMetadata.ts): Dynamic title, description, and Open Graph metadata syncing for brand switching, language changes, and product modal views.

### E. Component Hierarchy
- **Layout**:
  - `Header.tsx`: Responsive navigation, brand logo fallback, brand switcher, language switcher, mobile drawer.
  - `BrandSwitcher.tsx`: Interactive tabbed switcher switching routes and color tokens simultaneously.
  - `LangSwitcher.tsx`: Arabic/English toggle.
  - `FloatingActions.tsx`: Non-obtrusive floating WhatsApp and Call buttons respecting RTL/LTR positioning and brand theme.
- **Catalog**:
  - `SearchBar.tsx`: Real-time debounced search bar with clear button.
  - `FilterBar.tsx`: Category pill filtering with active indicator.
  - `ProductCard.tsx`: Accessible card with image carousel, bilingual titles, and hover micro-animations.
  - `ProductGrid.tsx`: Responsive 2/3/4-column grid with empty state and retry button.
  - `ImageCarousel.tsx`: Multi-image auto-rotation pausing on hover/focus and offscreen (via `useIntersection`).
- **Product Details & Deep Linking**:
  - `CatalogPage.tsx`: Full deep-linking integration with `useSearchParams` (`/#/brand/icare?product=<id>`).
  - `ProductModal.tsx`: Accessible dialog with focus trap, body scroll lock, Escape key, direct WhatsApp inquiry with product link, and copy direct link button with toast feedback.
  - `ImageGallery.tsx`: Main view with interactive cursor-tracking zoom (2.2x), fullscreen lightbox modal, thumbnail strip, arrow buttons, touch swipe gestures, and image counter.

---

## 3. Strict Rules for Continuing Development

1. **NEVER modify files inside `Materials/`**:
   - Do NOT delete, rename, resize, move, or reorganize any folder or file inside `Materials/`.
   - All mapping must happen through `src/data/products/*.ts`.
2. **DO NOT replace HashRouter with BrowserRouter**:
   - GitHub Pages does not support SPA HTML5 pushState without custom 404 hacks. HashRouter guarantees 100% route delivery.
3. **DO NOT hardcode colors in components**:
   - Use CSS custom properties: `var(--color-primary)`, `var(--color-bg-primary)`, `var(--color-border)`, `var(--color-text-on-primary)`, etc.
   - Or use dynamic styles matching the theme context.
4. **DO NOT hardcode product text in components**:
   - All product information comes from `Product` objects.
   - UI text comes from `useTranslation().t`.
5. **DO NOT invent fake brand logos**:
   - ICARE and GRACE have `logo.png` files.
   - SABONA does not have a logo image and uses the styled typography badge fallback (`hasLogo: false`).

---

## 4. File-by-File Responsibility Directory

| File | Primary Responsibility | Safe to Modify? |
|---|---|---|
| `Materials/*` | Raw photography assets | ⛔ **DO NOT TOUCH** |
| `vite.config.ts` | Asset streaming middleware & build copy | ⚠️ Modify with extreme care |
| `src/data/types.ts` | TypeScript domain types | ⚠️ Update if extending schemas |
| `src/config/brands.ts` | Brand identities, tokens, categories | ✅ Safe for brand token tuning |
| `src/config/contact.ts` | Phone & WhatsApp numbers | ✅ Safe for contact updates |
| `src/data/products/*.ts` | Product manifests | ✅ Safe for adding/updating products |
| `src/i18n/translations/*.ts` | Arabic & English dictionary | ✅ Safe for adding UI copy |
| `src/components/*` | UI Presentation layer | ✅ Safe for visual refinements |

---

## 5. How to Safely Modify the UI

When tweaking UI styling:
- Ensure classes work across both light and dark themes (SABONA uses dark mode tokens by design: `#0A0A0C` background with `#F6F6F9` text; ICARE uses white `#FFFFFF` with medical blue `#0D4F8B`).
- Always verify RTL layout: elements should not have hardcoded `left-0` or `right-0` unless conditionally flipped or using logical properties (`start-0`, `end-0`, `rtl:rotate-180`).
- Ensure all clickable items have `cursor-pointer`, focus rings, and proper keyboard `onKeyDown` handlers.

---

## 6. Build Verification Checklist for Gemini Flash

Before reporting any task complete, run:
```bash
cd "/home/saif-alfeshawy/Alfeshawy/I-Care Catalog"
npm run lint
npm run build
```
Both commands must finish with code `0`.
