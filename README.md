# I-Care Multi-Brand Product Catalog

A premium, data-driven multi-brand product catalog web application built for the Saudi Arabian market. Showcases medical and personal care products across three distinct brands: **ICARE** (primary brand), **SABONA**, and **GRACE**.

Designed and optimized for static deployment on **GitHub Pages**, featuring native RTL/LTR bilingual support (Arabic & English), brand-specific dynamic theming, viewport-aware image carousels, accessible product detail modals with zoom, and direct WhatsApp/Phone contact integrations.

---

## 🌟 Key Features

- **Multi-Brand Architectural Independence**: Not just categories, but three distinct brand experiences with independent color tokens, typography directions, and product collections.
  - **ICARE** (Primary): Professional clinical medical blue aesthetic.
  - **SABONA**: Luxurious obsidian & gold aesthetic for magnetic therapy bracelets.
  - **GRACE**: Elegant purple/lavender wellness aesthetic for personal care products.
- **Zero-Modification Asset Integration**: Built directly around existing, manually-organized product folders in `Materials/` without renaming, moving, or altering original files.
- **First-Class Localization (i18n)**: Arabic (default, RTL) and English (LTR) with full document layout direction switching and persistent language selection.
- **High-Performance Carousel & Gallery**:
  - Auto-rotating multi-image cards with viewport intersection observer (pauses offscreen).
  - Pauses on hover and keyboard focus.
  - Interactive product details modal with cursor-tracking zoom (2.2x), fullscreen lightbox, thumbnail strip, and touch swipe gestures.
  - URL Deep-Linking (`/#/brand/icare?product=<id>`) with browser history navigation and one-click link sharing with toast confirmation.
- **Bilingual Live Search & Filter**: Instant multi-token search across Arabic and English titles, descriptions, categories, and SKUs with full Arabic normalization (tashkeel, alef variants, alef maksura, taa marbuta).
- **Saudi Arabia Contact Integrations**: Floating, non-obtrusive WhatsApp and Phone direct-action buttons (+966 57 058 0415) plus pre-filled product inquiries with direct page link.
- **Dynamic SEO & Metadata**: Synchronous page title, description, and Open Graph card updates on brand change, language switch, and product modal open.
- **Optimized Bundle Footprint**: Code-split into vendor and motion chunks for lightning-fast First Contentful Paint (~138 kB total gzipped JS).
- **GitHub Pages Ready**: Client-side routing via `HashRouter` ensuring 100% route reliability on static hosts without server-side rewrite rules.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS v4 + Dynamic CSS Custom Properties |
| **Motion** | Framer Motion 11 |
| **Routing** | React Router DOM 7 (`HashRouter`) |
| **Deployment** | GitHub Pages via GitHub Actions |

---

## 📁 Repository Structure

```
├── .github/workflows/deploy.yml   # Automated GitHub Pages CI/CD workflow
├── Materials/                     # UNTOUCHED original product photography
│   ├── I-Care/                    # I-Care brand assets & subfolders
│   ├── Sabona/                    # Sabona luxury bracelets by SKU
│   └── Grace/                     # Grace hygiene products (flat layout)
├── public/                        # Static assets (favicon, robots.txt, sitemap.xml)
├── src/
│   ├── config/
│   │   ├── brands.ts              # Brand visual tokens & identity definitions
│   │   └── contact.ts             # Contact details (WhatsApp & Phone)
│   ├── data/
│   │   ├── types.ts               # Core TypeScript domain models
│   │   ├── registry.ts            # Central product catalog registry
│   │   └── products/              # Brand-specific product manifests
│   │       ├── icare.ts
│   │       ├── sabona.ts
│   │       └── grace.ts
│   ├── i18n/                      # Bilingual context & translations (ar/en)
│   ├── theme/                     # Dynamic CSS token theme manager
│   ├── hooks/                     # Custom hooks (carousel, intersection, products)
│   ├── utils/                     # Asset URL resolvers and Arabic search normalizers
│   ├── components/                # Modular UI & Layout components
│   │   ├── layout/                # Header, BrandSwitcher, FloatingActions
│   │   ├── catalog/               # ProductCard, ProductGrid, Carousel, SearchBar
│   │   ├── product/               # ProductModal, ImageGallery
│   │   └── ui/                    # Modal shell, LazyImage
│   ├── pages/
│   │   └── CatalogPage.tsx        # Main catalog view
│   ├── styles/
│   │   └── globals.css            # Design tokens & Tailwind CSS imports
│   ├── App.tsx                    # Root providers and routing
│   └── main.tsx                   # Application DOM mount
├── vite.config.ts                 # Asset copy plugin & static dev server middleware
├── tsconfig.json                  # Strict TypeScript configuration with @/ alias
├── ARCHITECTURE.md                # Comprehensive system architecture documentation
├── DEVELOPMENT_GUIDE.md           # Developer workflow and expansion guide
└── AI_HANDOFF.md                  # Detailed context & instructions for next AI developer
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation
```bash
# Clone the repository
git clone https://github.com/saif-alfeshawy/I-Care-Catalog.git
cd "I-Care Catalog"

# Install dependencies
npm install
```

### Development
```bash
# Start local development server with HMR
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
# Type check and build static production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment to GitHub Pages

The repository includes a GitHub Actions workflow in `.github/workflows/deploy.yml`.

1. Push your repository to GitHub (`main` branch).
2. Go to **Settings > Pages** in your GitHub repository.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. The site will automatically build and publish to `https://<username>.github.io/<repo>/`.

---

## 📖 Further Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: In-depth technical breakdown of state management, theme engine, asset mapping layer, and performance characteristics.
- **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)**: Step-by-step instructions for adding new products, registering new brands, and updating styles.
- **[AI_HANDOFF.md](./AI_HANDOFF.md)**: Dedicated handoff guide for subsequent AI models (Gemini Flash).

