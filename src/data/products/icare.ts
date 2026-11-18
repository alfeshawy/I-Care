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
    category: { id: 'protection', nameAr: 'الحماية والوقاية', nameEn: 'Protection' },
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
    category: { id: 'splints', nameAr: 'الجبائر والدعامات', nameEn: 'Splints & Braces' },
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
    category: { id: 'splints', nameAr: 'الجبائر والدعامات', nameEn: 'Splints & Braces' },
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
    category: { id: 'splints', nameAr: 'الجبائر والدعامات', nameEn: 'Splints & Braces' },
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
    category: { id: 'splints', nameAr: 'الجبائر والدعامات', nameEn: 'Splints & Braces' },
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
  {
    id: 'icare-diabetic-shoes',
    brandId: 'icare',
    nameAr: 'حذاء لمرضى السكر',
    nameEn: 'Diabetic Shoes',
    descriptionAr: 'حذاء طبي مخصص لمرضى السكر لتوفير أقصى درجات الراحة والحماية وتقليل الضغط على القدمين أثناء المشي.',
    descriptionEn: 'Medical shoes specially designed for diabetic patients, providing maximum comfort, protection, and foot pressure relief.',
    images: [
      img('حذاء لمرضى السكر', 'Gemini_Generated_Image_lquf37lquf37lquf.jpeg', 'حذاء لمرضى السكر ICARE', 'ICARE Diabetic Shoes'),
      img('حذاء لمرضى السكر', 'Gemini_Generated_Image_f40fkuf40fkuf40f.jpeg', 'حذاء لمرضى السكر ICARE', 'ICARE Diabetic Shoes'),
    ],
    category: { id: 'footwear', nameAr: 'الأحذية الطبية', nameEn: 'Medical Footwear' },
    order: 9,
  },
  {
    id: 'icare-diabetic-clogs-women',
    brandId: 'icare',
    nameAr: 'سابو لمرضى السكر (حريمي)',
    nameEn: "Diabetic Clogs (Women's)",
    descriptionAr: 'سابو وشبشب طبي مريح وأنيق للنساء من مرضى السكر، مصمم بنعل طبي لامتصاص الصدمات وتخفيف آلام القدمين.',
    descriptionEn: "Comfortable and elegant medical clogs for diabetic women, featuring an orthopedic shock-absorbing sole and ergonomic design.",
    images: [
      img('سابو لمرضى السكر (حريمي)', 'راحة وأناقة_ شبشب طبي مريح.png', 'سابو لمرضى السكر حريمي', "Diabetic Clogs Women's"),
      img('سابو لمرضى السكر (حريمي)', 'Glossy Black Slides on Woven Rug.png', 'سابو لمرضى السكر حريمي', "Diabetic Clogs Women's"),
    ],
    category: { id: 'footwear', nameAr: 'الأحذية الطبية', nameEn: 'Medical Footwear' },
    order: 10,
  },
  {
    id: 'icare-diabetic-sandals-women',
    brandId: 'icare',
    nameAr: 'صندل لمرضى السكر (حريمي)',
    nameEn: "Diabetic Sandals (Women's)",
    descriptionAr: 'صندل طبي مريح لمرضى السكر للنساء، خفيف الوزن ويوفر تهوية مثالية ودعماً فائقاً للقدم مع كل خطوة.',
    descriptionEn: "Comfortable orthopedic diabetic sandals for women, lightweight with optimal breathability and superior foot support.",
    images: [
      img('صندل لمرضى السكر (حريمي)', 'راحة طبية مع كل خطوة.png', 'صندل لمرضى السكر حريمي', "Diabetic Sandals Women's"),
      img('صندل لمرضى السكر (حريمي)', 'dراحة طبية في كل خطوة.png', 'صندل لمرضى السكر حريمي', "Diabetic Sandals Women's"),
    ],
    category: { id: 'footwear', nameAr: 'الأحذية الطبية', nameEn: 'Medical Footwear' },
    order: 11,
  },
  {
    id: 'icare-diabetic-sandals-men',
    brandId: 'icare',
    nameAr: 'صندل لمرضى السكر (رجالي)',
    nameEn: "Diabetic Sandals (Men's)",
    descriptionAr: 'صندل طبي رجالي لمرضى السكر مصمم بعناية لتوفير راحة تامة وحماية القدمين وتقليل الاحتكاك والإجهاد.',
    descriptionEn: "Men's medical orthopedic sandals for diabetics, engineered for superior walking comfort and foot protection.",
    images: [
      img('صندل لمرضى السكر (رجالي)', 'Gemini_Generated_Image_a7mw5va7mw5va7mw.jpeg', 'صندل لمرضى السكر رجالي', "Diabetic Sandals Men's"),
      img('صندل لمرضى السكر (رجالي)', 'Gemini_Generated_Image_ub8smbub8smbub8s.jpeg', 'صندل لمرضى السكر رجالي', "Diabetic Sandals Men's"),
    ],
    category: { id: 'footwear', nameAr: 'الأحذية الطبية', nameEn: 'Medical Footwear' },
    order: 12,
  },
  {
    id: 'icare-diabetic-sandals-grey',
    brandId: 'icare',
    nameAr: 'صندل لمرضى السكر (رمادي)',
    nameEn: 'Diabetic Sandals (Grey)',
    descriptionAr: 'صندل طبي أنيق باللون الرمادي لمرضى السكر، نعل مرن ممتص للصدمات وخامات عالية الجودة لراحة يومية مستمرة.',
    descriptionEn: 'Stylish grey medical sandals for diabetics, featuring a flexible shock-absorbing sole and premium materials for daily comfort.',
    images: [
      img('صندل لمرضى السكر رمادي', 'راحة في كل خطوة.png', 'صندل لمرضى السكر رمادي', 'Diabetic Sandals Grey'),
      img('صندل لمرضى السكر رمادي', 'راحة طبية في كل خطوة.png', 'صندل لمرضى السكر رمادي', 'Diabetic Sandals Grey'),
    ],
    category: { id: 'footwear', nameAr: 'الأحذية الطبية', nameEn: 'Medical Footwear' },
    order: 13,
  },
  {
    id: 'icare-cast-shoe',
    brandId: 'icare',
    nameAr: 'صندل جبيرة الجبس',
    nameEn: 'Orthopedic Cast Shoe',
    descriptionAr: 'حذاء صندل طبي لحماية ودعم القدم بعد التجبير والعمليات الجراحية، بنعل مقوس مانع للانزلاق وأشرطة قابلة للتعديل.',
    descriptionEn: 'Medical post-op cast shoe designed to protect and support the foot over plaster casts, with non-skid rocker sole and adjustable straps.',
    images: [
      img('صندل جبيرة الجبس', 'I Care Cast Shoe Packaging.png', 'عبوة صندل جبيرة الجبس I-Care', 'I-Care Cast Shoe Packaging'),
      img('صندل جبيرة الجبس', 'Comfort-Focused Orthopedic Cast Shoe Ad.png', 'صندل جبيرة الجبس الطبي', 'Orthopedic Cast Shoe'),
    ],
    category: { id: 'footwear', nameAr: 'الأحذية الطبية', nameEn: 'Medical Footwear' },
    order: 14,
  },
  {
    id: 'icare-shoulder-support',
    brandId: 'icare',
    nameAr: 'واقي الكتف الطبي',
    nameEn: 'Shoulder Support Brace',
    descriptionAr: 'دعامة وواقي كتف طبي لتثبيت ودعم مفصل الكتف وتخفيف الألم والتورم بعد الإصابات والخلع والعمليات.',
    descriptionEn: 'Medical shoulder support brace designed to stabilize the joint and relieve pain, inflammation, and injury discomfort.',
    images: [
      img('واقى كتف', 'Gemini_Generated_Image_dr0ozcdr0ozcdr0o.jpeg', 'واقي الكتف الطبي ICARE', 'ICARE Shoulder Support Brace'),
    ],
    category: { id: 'splints', nameAr: 'الجبائر والدعامات', nameEn: 'Splints & Braces' },
    order: 15,
  },
  {
    id: 'icare-medical-earplugs',
    brandId: 'icare',
    nameAr: 'سدادات أذن طبية',
    nameEn: 'Medical Earplugs',
    descriptionAr: 'سدادات أذن طبية عالية الجودة من السيليكون المريح لعزل الضوضاء وحماية الأذن أثناء النوم أو السباحة والعمل.',
    descriptionEn: 'High-quality medical silicone earplugs for noise reduction, swimming protection, and peaceful sleep.',
    images: [
      img('سدادات اذن طبية', 'Gemini_Generated_Image_7r9fon7r9fon7r9f.jpeg', 'سدادات أذن طبية ICARE', 'ICARE Medical Earplugs'),
    ],
    category: { id: 'protection', nameAr: 'الحماية والوقاية', nameEn: 'Protection' },
    order: 16,
  },
  {
    id: 'icare-eye-mask',
    brandId: 'icare',
    nameAr: 'غمامة عين طبية',
    nameEn: 'Medical Eye Mask',
    descriptionAr: 'غطاء وغمامة عين طبية مريحة وناعمة لحجب الضوء التام والمساعدة على الاسترخاء والنوم العميق وحماية العين بعد العلاج.',
    descriptionEn: 'Comfortable soft medical eye mask for complete light blocking, relaxation, deep sleep, and eye recovery.',
    images: [
      img('غمامة عين', 'Gemini_Generated_Image_4scck94scck94scc.jpeg', 'غمامة عين طبية ICARE', 'ICARE Medical Eye Mask'),
    ],
    category: { id: 'protection', nameAr: 'الحماية والوقاية', nameEn: 'Protection' },
    order: 17,
  },
];
