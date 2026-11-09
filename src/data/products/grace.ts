/**
 * GRACE product manifest.
 * 
 * Grace has a flat asset structure — images are directly in Materials/Grace/.
 * Unlike I-Care and Sabona, there are no product subfolders.
 * Each product image file represents a separate product.
 * 
 * The file 'صورة توضيحية لاستعمال اي كافار.jpg' is an illustrative image
 * showing how cast covers are used. It is included as a secondary image
 * on relevant products rather than as a standalone product.
 * 
 * IMPORTANT: Do not rename or reorganize the files in Materials/Grace/.
 * 
 * @module data/products/grace
 */

import type { Product } from '@/data/types';
import { resolveDirectImage } from '@/utils/assets';

/** Helper to create Grace image refs (flat structure) */
function img(filename: string, altAr: string, altEn: string) {
  return {
    id: `grace-${filename}`.replace(/[^a-zA-Z0-9-]/g, '_'),
    src: resolveDirectImage('Grace', filename),
    altAr,
    altEn,
  };
}

/** Shared illustrative image showing how cast covers are used */
const castCoverIllustration = img(
  'صورة توضيحية لاستعمال اي كافار.jpg',
  'صورة توضيحية لاستعمال كافار الجبيرة',
  'Illustrative image showing cast cover usage'
);

export const graceProducts: Product[] = [
  {
    id: 'grace-cast-cover-arm-kids',
    brandId: 'grace',
    nameAr: 'كافار جبيرة ذراع أطفال',
    nameEn: 'Cast Cover - Arm (Kids)',
    descriptionAr: 'غطاء مقاوم للماء لجبيرة الذراع مخصص للأطفال. يحمي الجبيرة أثناء الاستحمام.',
    descriptionEn: 'Waterproof arm cast cover designed for children. Protects the cast during bathing.',
    images: [
      img('كافار جبيرة ذراع اطفال.png', 'كافار جبيرة ذراع أطفال', 'Kids Arm Cast Cover'),
      castCoverIllustration,
    ],
    category: { id: 'covers', nameAr: 'أغطية الجبائر', nameEn: 'Cast Covers' },
    order: 1,
  },
  {
    id: 'grace-cast-cover-arm-adults',
    brandId: 'grace',
    nameAr: 'كافار جبيرة ذراع كبار',
    nameEn: 'Cast Cover - Arm (Adults)',
    descriptionAr: 'غطاء مقاوم للماء لجبيرة الذراع للكبار. حماية مثالية أثناء الاستحمام.',
    descriptionEn: 'Waterproof arm cast cover for adults. Perfect protection during bathing.',
    images: [
      img('كافار جبيرة ذراع كبار.png', 'كافار جبيرة ذراع كبار', 'Adult Arm Cast Cover'),
      castCoverIllustration,
    ],
    category: { id: 'covers', nameAr: 'أغطية الجبائر', nameEn: 'Cast Covers' },
    order: 2,
  },
  {
    id: 'grace-cast-cover-leg-kids',
    brandId: 'grace',
    nameAr: 'كافار جبيرة رجل أطفال',
    nameEn: 'Cast Cover - Leg (Kids)',
    descriptionAr: 'غطاء مقاوم للماء لجبيرة الرجل مخصص للأطفال. يوفر حماية كاملة.',
    descriptionEn: 'Waterproof leg cast cover designed for children. Provides complete protection.',
    images: [
      img('كافار جبيرة رجل اطفال.png', 'كافار جبيرة رجل أطفال', 'Kids Leg Cast Cover'),
      castCoverIllustration,
    ],
    category: { id: 'covers', nameAr: 'أغطية الجبائر', nameEn: 'Cast Covers' },
    order: 3,
  },
  {
    id: 'grace-cast-cover-leg-adults',
    brandId: 'grace',
    nameAr: 'كافار جبيرة رجل كبار',
    nameEn: 'Cast Cover - Leg (Adults)',
    descriptionAr: 'غطاء مقاوم للماء لجبيرة الرجل للكبار. حماية متينة وسهلة الاستخدام.',
    descriptionEn: 'Waterproof leg cast cover for adults. Durable and easy-to-use protection.',
    images: [
      img('كافر جبيرة رجل كبار.png', 'كافار جبيرة رجل كبار', 'Adult Leg Cast Cover'),
      castCoverIllustration,
    ],
    category: { id: 'covers', nameAr: 'أغطية الجبائر', nameEn: 'Cast Covers' },
    order: 4,
  },
  {
    id: 'grace-travel-bidet-blue',
    brandId: 'grace',
    nameAr: 'شطاف سفر أزرق',
    nameEn: 'Travel Bidet - Blue',
    descriptionAr: 'شطاف سفر محمول باللون الأزرق. مثالي للسفر والتنقل.',
    descriptionEn: 'Portable travel bidet in blue. Perfect for travel and on-the-go use.',
    images: [
      img('شطاف سفر ازرق.jpeg', 'شطاف سفر أزرق', 'Blue Travel Bidet'),
    ],
    category: { id: 'hygiene', nameAr: 'النظافة الشخصية', nameEn: 'Personal Hygiene' },
    order: 5,
  },
  {
    id: 'grace-travel-bidet-pink',
    brandId: 'grace',
    nameAr: 'شطاف سفر وردي',
    nameEn: 'Travel Bidet - Pink',
    descriptionAr: 'شطاف سفر محمول باللون الوردي. مثالي للسفر والتنقل.',
    descriptionEn: 'Portable travel bidet in pink. Perfect for travel and on-the-go use.',
    images: [
      img('شطاف سفر وردي.jpeg', 'شطاف سفر وردي', 'Pink Travel Bidet'),
    ],
    category: { id: 'hygiene', nameAr: 'النظافة الشخصية', nameEn: 'Personal Hygiene' },
    order: 6,
  },
  {
    id: 'grace-vaginal-douche',
    brandId: 'grace',
    nameAr: 'دش مهبلي',
    nameEn: 'Vaginal Douche',
    descriptionAr: 'دش مهبلي للعناية الشخصية. تصميم صحي وسهل الاستخدام.',
    descriptionEn: 'Vaginal douche for personal hygiene. Hygienic and easy-to-use design.',
    images: [
      img('دش مهبلي.jpeg', 'دش مهبلي', 'Vaginal Douche'),
    ],
    category: { id: 'hygiene', nameAr: 'النظافة الشخصية', nameEn: 'Personal Hygiene' },
    order: 7,
  },
];
