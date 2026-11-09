/**
 * I-CARE product manifest.
 * 
 * Maps product metadata to existing assets in Materials/I-Care/.
 * 
 * IMPORTANT: Do not rename or reorganize the files in Materials/I-Care/.
 * This manifest maps TO them; it does not own them.
 * 
 * @module data/products/icare
 */

import type { Product } from '@/data/types';
import { resolveProductImage } from '@/utils/assets';

/** Helper to create I-Care image refs */
function img(folder: string, filename: string, altAr: string, altEn: string) {
  return {
    id: `icare-${folder}-${filename}`.replace(/[^a-zA-Z0-9-]/g, '_'),
    src: resolveProductImage('I-Care', folder, filename),
    altAr,
    altEn,
  };
}

export const icareProducts: Product[] = [
  {
    id: 'icare-face-guard',
    brandId: 'icare',
    nameAr: 'واقي الوجه',
    nameEn: 'Face Guard',
    descriptionAr: 'واقي وجه طبي متميز لحماية الوجه بعد العمليات الجراحية والإصابات. تصميم مريح وخفيف الوزن.',
    descriptionEn: 'Premium medical face guard for post-surgical and injury protection. Comfortable and lightweight design.',
    images: [
      img('Face Guard', 'Premium iCARE Face Guard Packaging.png', 'عبوة واقي الوجه ICARE', 'ICARE Face Guard Packaging'),
      img('Face Guard', 'WhatsApp Image 2026-11-09 at 4.11.08 PM.jpeg', 'واقي الوجه ICARE', 'ICARE Face Guard'),
      img('Face Guard', 'Gemini_Generated_Image_b5p2d5b5p2d5b5p2.jpeg', 'واقي الوجه ICARE', 'ICARE Face Guard'),
    ],
    category: { id: 'protection', nameAr: 'الحماية', nameEn: 'Protection' },
    order: 1,
  },
  {
    id: 'icare-cock-up-splint',
    brandId: 'icare',
    nameAr: 'جبيرة المعصم',
    nameEn: 'Cock-Up Splint',
    descriptionAr: 'جبيرة معصم طبية لدعم وتثبيت المعصم. مناسبة للاستخدام بعد الإصابات والعمليات.',
    descriptionEn: 'Medical wrist splint for support and immobilization. Suitable for post-injury and post-surgical use.',
    images: [
      img('Cock-Up Splint', 'CARE Cock-Up Splint Packaging.png', 'عبوة جبيرة المعصم', 'Cock-Up Splint Packaging'),
      img('Cock-Up Splint', 'Cock-Up Splint.jpeg', 'جبيرة المعصم', 'Cock-Up Splint'),
    ],
    category: { id: 'splints', nameAr: 'الجبائر', nameEn: 'Splints' },
    sku: 'CUS-01',
    order: 2,
  },
  {
    id: 'icare-mallet-finger',
    brandId: 'icare',
    nameAr: 'جبيرة إصبع المطرقة',
    nameEn: 'Mallet Finger Splint',
    descriptionAr: 'جبيرة متخصصة لعلاج إصبع المطرقة. تصميم طبي دقيق لضمان التثبيت الصحيح.',
    descriptionEn: 'Specialized splint for mallet finger treatment. Precise medical design for proper immobilization.',
    images: [
      img('Mallet-Finger', 'CARE_Mallet_Finger_Box_2.jpg', 'عبوة جبيرة إصبع المطرقة', 'Mallet Finger Box'),
      img('Mallet-Finger', 'Four Yellow-Lined Utility Clips.png', 'جبيرة إصبع المطرقة', 'Mallet Finger Splint'),
    ],
    category: { id: 'splints', nameAr: 'الجبائر', nameEn: 'Splints' },
    order: 3,
  },
  {
    id: 'icare-aluminum-nasal-splint',
    brandId: 'icare',
    nameAr: 'جبيرة أنف ألمونيوم',
    nameEn: 'Aluminum Nasal Splint',
    descriptionAr: 'جبيرة أنف مصنوعة من الألمونيوم عالي الجودة. مصممة للاستخدام بعد عمليات الأنف.',
    descriptionEn: 'High-quality aluminum nasal splint. Designed for post-rhinoplasty use.',
    images: [
      img('Alamonium Nasal Splint', 'جبيرة انف الامونيوم.png', 'جبيرة أنف ألمونيوم', 'Aluminum Nasal Splint'),
    ],
    category: { id: 'splints', nameAr: 'الجبائر', nameEn: 'Splints' },
    order: 4,
  },
  {
    id: 'icare-thermoplastic-nasal-splint',
    brandId: 'icare',
    nameAr: 'جبيرة أنف حرارية',
    nameEn: 'Thermoplastic Nasal Splint',
    descriptionAr: 'جبيرة أنف حرارية قابلة للتشكيل. توفر دعماً مخصصاً بعد عمليات تجميل الأنف.',
    descriptionEn: 'Moldable thermoplastic nasal splint. Provides customized support after rhinoplasty.',
    images: [
      img('Thermoplastic Nasal Spint', 'جبيرة انف حرارية.png', 'جبيرة أنف حرارية', 'Thermoplastic Nasal Splint'),
    ],
    category: { id: 'splints', nameAr: 'الجبائر', nameEn: 'Splints' },
    order: 5,
  },
  {
    id: 'icare-derma-pen-a1',
    brandId: 'icare',
    nameAr: 'ديرما بن A1',
    nameEn: 'Derma Pen A1',
    descriptionAr: 'قلم ديرما احترافي للعناية بالبشرة. يساعد في تحفيز الكولاجين وتجديد خلايا البشرة.',
    descriptionEn: 'Professional derma pen for skincare. Helps stimulate collagen and skin cell renewal.',
    images: [
      img('Derma Pen A1', 'Derma Pen A1.webp', 'ديرما بن A1', 'Derma Pen A1'),
    ],
    category: { id: 'derma', nameAr: 'العناية بالبشرة', nameEn: 'Derma Care' },
    order: 6,
  },
  {
    id: 'icare-derma-pen-a6',
    brandId: 'icare',
    nameAr: 'ديرما بن A6',
    nameEn: 'Derma Pen A6',
    descriptionAr: 'قلم ديرما متطور بتقنية A6 للحصول على نتائج احترافية في العناية بالبشرة.',
    descriptionEn: 'Advanced A6 derma pen for professional skincare results.',
    images: [
      img('Deram Pen A6', 'Derama Pen A6.webp', 'ديرما بن A6', 'Derma Pen A6'),
    ],
    category: { id: 'derma', nameAr: 'العناية بالبشرة', nameEn: 'Derma Care' },
    order: 7,
  },
  {
    id: 'icare-derma-needle',
    brandId: 'icare',
    nameAr: 'إبر ديرما',
    nameEn: 'Derma Needle',
    descriptionAr: 'إبر ديرما احترافية متوافقة مع أقلام الديرما. جودة عالية ومعقمة.',
    descriptionEn: 'Professional derma needles compatible with derma pens. High quality and sterilized.',
    images: [
      img('Deram NIdel', 'Derma Nidel-1.avif', 'إبر ديرما', 'Derma Needle'),
      img('Deram NIdel', 'Derma Nidel-2.jpg', 'إبر ديرما', 'Derma Needle'),
    ],
    category: { id: 'derma', nameAr: 'العناية بالبشرة', nameEn: 'Derma Care' },
    order: 8,
  },
];
