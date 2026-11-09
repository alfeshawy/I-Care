# Developer Guide & Extension Manual

This guide provides practical instructions for developers maintaining, extending, and adding products or brands to the I-Care Catalog.

---

## 1. Development Commands

```bash
# Start local development server (with HMR & Materials streaming)
npm run dev

# Check TypeScript types without emitting code
npm run lint

# Build production bundle and copy Materials/ to dist/
npm run build

# Preview the production build locally
npm run preview
```

---

## 2. Managing Products

All product assets reside in the immutable directory:
`/home/saif-alfeshawy/Alfeshawy/I-Care Catalog/Materials/`

Never modify original filenames or relocate folders unless strictly necessary.

### Adding a Product to I-CARE
1. Place product images in a folder under `Materials/I-Care/<Folder Name>/`.
2. Open `src/data/products/icare.ts`.
3. Add a new object adhering to the `Product` interface:

```typescript
{
  id: 'icare-my-product',
  brandId: 'icare',
  nameAr: 'اسم المنتج بالعربية',
  nameEn: 'Product Name in English',
  descriptionAr: 'الوصف الكامل للمنتج باللغة العربية...',
  descriptionEn: 'Full product description in English...',
  images: [
    img('<Folder Name>', '<Exact Image Filename.ext>', 'وصف الصورة بالعربية', 'Image alt in English'),
    img('<Folder Name>', '<Second Image.ext>', 'وصف الصورة الثانية', 'Second image alt'),
  ],
  category: { id: 'splints', nameAr: 'الجبائر', nameEn: 'Splints' },
  sku: 'OPTIONAL-SKU-123',
  specs: [
    { labelAr: 'المادة', labelEn: 'Material', valueAr: 'ألومنيوم طبي', valueEn: 'Medical Grade Aluminum' }
  ],
  order: 9,
}
```

### Adding a Product to SABONA
1. Place images in `Materials/Sabona/<SKU> - <Product Name>/`.
2. Open `src/data/products/sabona.ts`.
3. Add the product using the `img('Folder Name', 'File Name', altAr, altEn)` helper.

### Adding a Product to GRACE
Grace utilizes a flat directory: `Materials/Grace/<Image Filename.ext>`.
1. Place image in `Materials/Grace/`.
2. Open `src/data/products/grace.ts`.
3. Add the product using the flat helper `img('Exact Image Filename.ext', altAr, altEn)`.

---

## 3. Brand Theming & Configuration

Brand configurations reside in `src/config/brands.ts`.

### Modifying Brand Colors
To alter a brand's palette, adjust its `theme` property in `src/config/brands.ts`:

```typescript
theme: {
  primary: '#0D4F8B',       // Main brand accent, buttons, headings
  secondary: '#1A6FC2',     // Subheadings, secondary badges
  accent: '#2A8FE5',        // Focus rings, active indicator
  bgPrimary: '#FFFFFF',     // Main background
  bgSecondary: '#F5F8FC',   // Header banner & card container background
  bgCard: '#FFFFFF',        // Card & modal background
  textPrimary: '#111827',   // Primary readable text
  textSecondary: '#6B7280', // Subtle captions & secondary text
  border: '#E5E7EB',        // Border lines
  hover: '#EBF4FF',         // Badge background & hover fills
}
```

### Adding or Renaming Categories
Each brand defines its allowed categories in `src/config/brands.ts`:
```typescript
categories: [
  { id: 'splints', nameAr: 'الجبائر', nameEn: 'Splints' },
  { id: 'derma', nameAr: 'العناية بالبشرة', nameEn: 'Derma Care' },
]
```
Ensure products assigned to this category use the identical `id`.

---

## 4. Updating Contact Information

To update WhatsApp or Phone contact numbers:
1. Open `src/config/contact.ts`.
2. Modify the constants:
```typescript
export const PHONE_DISPLAY = '+966 57 058 0415';
export const PHONE_TEL = '+966570580415';
export const WHATSAPP_URL = 'https://wa.me/966570580415';
```
Changes instantly propagate to the floating contact triggers and the modal WhatsApp pre-fill action.

---

## 5. UI Translations (i18n)

UI copy is maintained in:
- `src/i18n/translations/ar.ts` (Arabic)
- `src/i18n/translations/en.ts` (English)

When adding a new UI string:
1. Add the key to `Translation` in `src/data/types.ts`.
2. Supply translations in both `ar.ts` and `en.ts`.
3. Access in components via:
```tsx
const { t } = useTranslation();
return <span>{t.product.myNewKey}</span>;
```

---

## 6. Pre-Commit Validation

Before pushing any commit, run:
```bash
npm run lint && npm run build
```
Verify that:
- TypeScript reports zero errors.
- Vite build passes cleanly.
- `Materials copied to dist/materials/` logs successfully.

