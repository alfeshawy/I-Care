/**
 * SABONA product manifest.
 * 
 * Maps product metadata to existing assets in Materials/Sabona/.
 * Sabona products are luxury magnetic bracelets with SKU-named folders.
 * 
 * IMPORTANT: Do not rename or reorganize the files in Materials/Sabona/.
 * 
 * @module data/products/sabona
 */

import type { Product } from '@/data/types';
import { resolveProductImage } from '@/utils/assets';

/** Helper to create Sabona image refs */
function img(folder: string, filename: string, altAr: string, altEn: string) {
  return {
    id: `sabona-${folder}-${filename}`.replace(/[^a-zA-Z0-9-]/g, '_'),
    src: resolveProductImage('Sabona', folder, filename),
    altAr,
    altEn,
  };
}

export const sabonaProducts: Product[] = [
  {
    id: 'sabona-lx16',
    brandId: 'sabona',
    nameAr: 'نوار جولد',
    nameEn: 'Noir Gold',
    descriptionAr: 'سوار مغناطيسي فاخر بتصميم أسود وذهبي أنيق. مصنوع من مواد عالية الجودة.',
    descriptionEn: 'Luxury magnetic bracelet with elegant black and gold design. Made from premium materials.',
    images: [
      img('LX16 - Noir Gold', 'Gemini_Generated_Image_9vw08w9vw08w9vw0.jpeg', 'سوار نوار جولد', 'Noir Gold Bracelet'),
      img('LX16 - Noir Gold', 'Gemini_Generated_Image_b3vm5ob3vm5ob3vm.jpeg', 'سوار نوار جولد', 'Noir Gold Bracelet'),
      img('LX16 - Noir Gold', 'Gemini_Generated_Image_tvdfumtvdfumtvdf.jpeg', 'سوار نوار جولد', 'Noir Gold Bracelet'),
    ],
    category: { id: 'gold', nameAr: 'ذهبي', nameEn: 'Gold' },
    sku: 'LX16',
    order: 1,
  },
  {
    id: 'sabona-cb93',
    brandId: 'sabona',
    nameAr: 'كاربون بلو',
    nameEn: 'Carbon Blue',
    descriptionAr: 'سوار مغناطيسي بتصميم كربوني أزرق عصري. خفيف الوزن ومتين.',
    descriptionEn: 'Magnetic bracelet with modern carbon blue design. Lightweight and durable.',
    images: [
      img('CB93 - Carbon Blue', 'Gemini_Generated_Image_26ndfm26ndfm26nd.jpeg', 'سوار كاربون بلو', 'Carbon Blue Bracelet'),
      img('CB93 - Carbon Blue', 'Gemini_Generated_Image_7o247f7o247f7o24.jpeg', 'سوار كاربون بلو', 'Carbon Blue Bracelet'),
      img('CB93 - Carbon Blue', 'Gemini_Generated_Image_zbqpuwzbqpuwzbqp.jpeg', 'سوار كاربون بلو', 'Carbon Blue Bracelet'),
    ],
    category: { id: 'two-tone', nameAr: 'لونين', nameEn: 'Two-Tone' },
    sku: 'CB93',
    order: 2,
  },
  {
    id: 'sabona-cp60',
    brandId: 'sabona',
    nameAr: 'غنميتال جولد',
    nameEn: 'Gunmetal Gold',
    descriptionAr: 'سوار مغناطيسي فاخر بلون الغنميتال والذهبي. تصميم كلاسيكي أنيق.',
    descriptionEn: 'Premium magnetic bracelet in gunmetal and gold. Classic elegant design.',
    images: [
      img('CP60 - Gunmetal Gold', 'Gemini_Generated_Image_h8erw6h8erw6h8er.jpeg', 'سوار غنميتال جولد', 'Gunmetal Gold Bracelet'),
      img('CP60 - Gunmetal Gold', 'Gemini_Generated_Image_hp9i8fhp9i8fhp9i.jpeg', 'سوار غنميتال جولد', 'Gunmetal Gold Bracelet'),
      img('CP60 - Gunmetal Gold', 'Gemini_Generated_Image_x4w6w5x4w6w5x4w6.jpeg', 'سوار غنميتال جولد', 'Gunmetal Gold Bracelet'),
    ],
    category: { id: 'gold', nameAr: 'ذهبي', nameEn: 'Gold' },
    sku: 'CP60',
    order: 3,
  },
  {
    id: 'sabona-mg71',
    brandId: 'sabona',
    nameAr: 'مات جولد',
    nameEn: 'Matte Gold',
    descriptionAr: 'سوار مغناطيسي بلمسة ذهبية مطفية. أناقة هادئة وفخامة.',
    descriptionEn: 'Magnetic bracelet with matte gold finish. Understated elegance and luxury.',
    images: [
      img('MG71 - Matte Gold', 'Gemini_Generated_Image_1jycpv1jycpv1jyc.jpeg', 'سوار مات جولد', 'Matte Gold Bracelet'),
      img('MG71 - Matte Gold', 'Gemini_Generated_Image_sifjsnsifjsnsifj.jpeg', 'سوار مات جولد', 'Matte Gold Bracelet'),
    ],
    category: { id: 'gold', nameAr: 'ذهبي', nameEn: 'Gold' },
    sku: 'MG71',
    order: 4,
  },
  {
    id: 'sabona-hg59',
    brandId: 'sabona',
    nameAr: 'هيكس جولد',
    nameEn: 'Hex Gold',
    descriptionAr: 'سوار مغناطيسي بتصميم سداسي ذهبي مميز. يجمع بين الحداثة والفخامة.',
    descriptionEn: 'Magnetic bracelet with distinctive hexagonal gold design. Blends modernity with luxury.',
    images: [
      img('HG59 - Hex Gold', 'Gemini_Generated_Image_cag2u5cag2u5cag2.jpeg', 'سوار هيكس جولد', 'Hex Gold Bracelet'),
      img('HG59 - Hex Gold', 'Gemini_Generated_Image_rj92crj92crj92cr.jpeg', 'سوار هيكس جولد', 'Hex Gold Bracelet'),
      img('HG59 - Hex Gold', 'Sabona Gold and Black Bracelet Showcase.png', 'سوار هيكس جولد', 'Hex Gold Bracelet'),
    ],
    category: { id: 'gold', nameAr: 'ذهبي', nameEn: 'Gold' },
    sku: 'HG59',
    order: 5,
  },
  {
    id: 'sabona-nr54',
    brandId: 'sabona',
    nameAr: 'نوار سليم',
    nameEn: 'Noir Slim',
    descriptionAr: 'سوار مغناطيسي أسود نحيف وأنيق. تصميم عصري لكل يوم.',
    descriptionEn: 'Slim black magnetic bracelet. Modern everyday design.',
    images: [
      img('NR54 - Noir Slim', 'Gemini_Generated_Image_x3ziqnx3ziqnx3zi.jpeg', 'سوار نوار سليم', 'Noir Slim Bracelet'),
      img('NR54 - Noir Slim', 'Gemini_Generated_Image_ydzr57ydzr57ydzr.jpeg', 'سوار نوار سليم', 'Noir Slim Bracelet'),
    ],
    category: { id: 'black', nameAr: 'أسود', nameEn: 'Black' },
    sku: 'NR54',
    order: 6,
  },
  {
    id: 'sabona-gb10',
    brandId: 'sabona',
    nameAr: 'غرافيت جولد',
    nameEn: 'Graphite Gold',
    descriptionAr: 'سوار مغناطيسي بمزيج الغرافيت والذهبي. تصميم جريء وعصري.',
    descriptionEn: 'Magnetic bracelet with graphite and gold blend. Bold and contemporary design.',
    images: [
      img('GB10 - Graphite Gold', 'Gemini_Generated_Image_1u03fs1u03fs1u03.jpeg', 'سوار غرافيت جولد', 'Graphite Gold Bracelet'),
      img('GB10 - Graphite Gold', 'Gemini_Generated_Image_tpfpi0tpfpi0tpfp.jpeg', 'سوار غرافيت جولد', 'Graphite Gold Bracelet'),
      img('GB10 - Graphite Gold', 'Gemini_Generated_Image_wsp8j5wsp8j5wsp8.jpeg', 'سوار غرافيت جولد', 'Graphite Gold Bracelet'),
    ],
    category: { id: 'gold', nameAr: 'ذهبي', nameEn: 'Gold' },
    sku: 'GB10',
    order: 7,
  },
  {
    id: 'sabona-st37',
    brandId: 'sabona',
    nameAr: 'كلاسيك إيدج',
    nameEn: 'Classic Edge',
    descriptionAr: 'سوار مغناطيسي بتصميم كلاسيكي مميز. أناقة خالدة.',
    descriptionEn: 'Magnetic bracelet with distinctive classic design. Timeless elegance.',
    images: [
      img('ST37 - Classic Edge', 'Gemini_Generated_Image_gvpv9ygvpv9ygvpv.jpeg', 'سوار كلاسيك إيدج', 'Classic Edge Bracelet'),
      img('ST37 - Classic Edge', 'Gemini_Generated_Image_og8pptog8pptog8p.jpeg', 'سوار كلاسيك إيدج', 'Classic Edge Bracelet'),
      img('ST37 - Classic Edge', 'Gemini_Generated_Image_z996zbz996zbz996.jpeg', 'سوار كلاسيك إيدج', 'Classic Edge Bracelet'),
    ],
    category: { id: 'silver', nameAr: 'فضي', nameEn: 'Silver' },
    sku: 'ST37',
    order: 8,
  },
  {
    id: 'sabona-bk32',
    brandId: 'sabona',
    nameAr: 'بلاك لاين',
    nameEn: 'Black Line',
    descriptionAr: 'سوار مغناطيسي أسود بتصميم عصري. مثالي للإطلالات اليومية والرسمية.',
    descriptionEn: 'Black magnetic bracelet with modern design. Perfect for casual and formal looks.',
    images: [
      img('BK32 - Black Line', 'SABONA Bracelet on Velvet Cushion.png', 'سوار بلاك لاين', 'Black Line Bracelet'),
      img('BK32 - Black Line', 'Man_wearing_black_link_bracelet_370fbfc4.jpg', 'سوار بلاك لاين', 'Black Line Bracelet'),
    ],
    category: { id: 'black', nameAr: 'أسود', nameEn: 'Black' },
    sku: 'BK32',
    order: 9,
  },
  {
    id: 'sabona-hx21',
    brandId: 'sabona',
    nameAr: 'هيكس بلاك',
    nameEn: 'Hex Black',
    descriptionAr: 'سوار مغناطيسي أسود بنمط سداسي. تصميم جريء وقوي.',
    descriptionEn: 'Black magnetic bracelet with hexagonal pattern. Bold and powerful design.',
    images: [
      img('HX21 - Hex Black', 'Create_luxury_jewelry_advertisement_964dbcc8_2K.jpg_e4a39e5b.jpg', 'سوار هيكس بلاك', 'Hex Black Bracelet'),
      img('HX21 - Hex Black', 'Man_wearing_black_link_bracelet_46439f4c.jpg', 'سوار هيكس بلاك', 'Hex Black Bracelet'),
    ],
    category: { id: 'black', nameAr: 'أسود', nameEn: 'Black' },
    sku: 'HX21',
    order: 10,
  },
  {
    id: 'sabona-sg15',
    brandId: 'sabona',
    nameAr: 'سيلفر كور',
    nameEn: 'Silver Core',
    descriptionAr: 'سوار مغناطيسي فضي كلاسيكي. أناقة بسيطة ومتعددة الاستخدامات.',
    descriptionEn: 'Classic silver magnetic bracelet. Simple elegance and versatility.',
    images: [
      img('SG15 - Silver Core', 'Gemini_Generated_Image_rsndcursndcursnd.jpeg', 'سوار سيلفر كور', 'Silver Core Bracelet'),
      img('SG15 - Silver Core', 'Man_wearing_metallic_link_bracelet_f252c68b.jpg', 'سوار سيلفر كور', 'Silver Core Bracelet'),
      img('SG15 - Silver Core', 'Professional_luxury_commercial_jewelry_advertisement_f5755ffb.jpg', 'سوار سيلفر كور', 'Silver Core Bracelet'),
    ],
    category: { id: 'silver', nameAr: 'فضي', nameEn: 'Silver' },
    sku: 'SG15',
    order: 11,
  },
  {
    id: 'sabona-dx48',
    brandId: 'sabona',
    nameAr: 'غراند تو-تون',
    nameEn: 'Grand Two-Tone',
    descriptionAr: 'سوار مغناطيسي فاخر بلونين. تصميم كبير وملفت للأنظار.',
    descriptionEn: 'Premium two-tone magnetic bracelet. Grand and eye-catching design.',
    images: [
      img('DX48 - Grand Two-Tone', 'Gemini_Generated_Image_8bs2xo8bs2xo8bs2.jpeg', 'سوار غراند تو-تون', 'Grand Two-Tone Bracelet'),
      img('DX48 - Grand Two-Tone', 'Gemini_Generated_Image_pcs92upcs92upcs9.jpeg', 'سوار غراند تو-تون', 'Grand Two-Tone Bracelet'),
      img('DX48 - Grand Two-Tone', 'Gemini_Generated_Image_uuwkrvuuwkrvuuwk.jpeg', 'سوار غراند تو-تون', 'Grand Two-Tone Bracelet'),
    ],
    category: { id: 'two-tone', nameAr: 'لونين', nameEn: 'Two-Tone' },
    sku: 'DX48',
    order: 12,
  },
  {
    id: 'sabona-gs26',
    brandId: 'sabona',
    nameAr: 'جولد كور',
    nameEn: 'Gold Core',
    descriptionAr: 'سوار مغناطيسي ذهبي فاخر. القطعة المثالية لعشاق الذهب.',
    descriptionEn: 'Premium gold magnetic bracelet. The perfect piece for gold enthusiasts.',
    images: [
      img('GS26 - Gold Core', 'Man_wearing_metal_link_bracelet_1ea485d2.jpg', 'سوار جولد كور', 'Gold Core Bracelet'),
      img('GS26 - Gold Core', 'SABONA® Gold and Silver Bracelet Display.png', 'سوار جولد كور', 'Gold Core Bracelet'),
      img('GS26 - Gold Core', 'Woman_wearing_metallic_link_brac…_cbfc787f.jpg', 'سوار جولد كور', 'Gold Core Bracelet'),
    ],
    category: { id: 'gold', nameAr: 'ذهبي', nameEn: 'Gold' },
    sku: 'GS26',
    order: 13,
  },
  {
    id: 'sabona-bl82',
    brandId: 'sabona',
    nameAr: 'بلو لاين',
    nameEn: 'Blue Line',
    descriptionAr: 'سوار مغناطيسي بتصميم أزرق أنيق. لمسة لونية مميزة.',
    descriptionEn: 'Magnetic bracelet with elegant blue design. A distinctive color accent.',
    images: [
      img('BL82 - Blue Line', 'Gemini_Generated_Image_1ij381ij381ij381.jpeg', 'سوار بلو لاين', 'Blue Line Bracelet'),
      img('BL82 - Blue Line', 'Gemini_Generated_Image_keywpgkeywpgkeyw.jpeg', 'سوار بلو لاين', 'Blue Line Bracelet'),
      img('BL82 - Blue Line', 'Gemini_Generated_Image_rqzy1rqzy1rqzy1r.jpeg', 'سوار بلو لاين', 'Blue Line Bracelet'),
    ],
    category: { id: 'two-tone', nameAr: 'لونين', nameEn: 'Two-Tone' },
    sku: 'BL82',
    order: 14,
  },
  {
    id: 'sabona-ms04',
    brandId: 'sabona',
    nameAr: 'مات سيلفر',
    nameEn: 'Matte Silver',
    descriptionAr: 'سوار مغناطيسي فضي مطفي. بساطة عصرية وجودة عالية.',
    descriptionEn: 'Matte silver magnetic bracelet. Modern simplicity and high quality.',
    images: [
      img('MS04 - Matte Silver', 'Gemini_Generated_Image_1kgu1d1kgu1d1kgu.jpeg', 'سوار مات سيلفر', 'Matte Silver Bracelet'),
      img('MS04 - Matte Silver', 'Gemini_Generated_Image_auess8auess8aues.jpeg', 'سوار مات سيلفر', 'Matte Silver Bracelet'),
      img('MS04 - Matte Silver', 'Gemini_Generated_Image_ax7itmax7itmax7i.jpeg', 'سوار مات سيلفر', 'Matte Silver Bracelet'),
    ],
    category: { id: 'silver', nameAr: 'فضي', nameEn: 'Silver' },
    sku: 'MS04',
    order: 15,
  },
];
