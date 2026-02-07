import { Product } from '@/data/products';

const directImageMap: Record<string, string> = {
  'kaju-katli': '/images/products/image.png',
  'motichoor-ladoo': '/images/products/motichoor-ladoo.jpg',
  'rasgulla': '/images/products/sugar-free-sweets.jpg',
  'gulab-jamun': '/images/products/sugar-free-sweets.jpg',
  'sugar-free-kaju-katli': '/images/products/image.png',
  'sugar-free-ladoo': '/images/products/image.png',
  'premium-gift-box': '/images/products/image.png',
  'diwali-special-hamper': '/images/products/image.png'
};

const fallbackImages = [
  '/images/products/motichoor-ladoo.jpg',
  '/images/products/sugar-free-sweets.jpg',
  '/images/products/image.png'
];

const hashSlug = (slug: string) => {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
};

const pickFallbackImage = (slug: string) => {
  const index = hashSlug(slug) % fallbackImages.length;
  return fallbackImages[index];
};

export const getPrimaryProductImage = (product: Product) => {
  const mapped = directImageMap[product.slug];
  if (mapped) {
    return mapped;
  }

  const first = product.images[0];
  if (!first) {
    return fallbackImages[0];
  }

  if (first.endsWith('.svg')) {
    return pickFallbackImage(product.slug);
  }

  return first;
};

export const getProductImages = (product: Product) => {
  const mapped = directImageMap[product.slug];
  if (mapped) {
    return [mapped];
  }

  const hasSvg = product.images.some((image) => image.endsWith('.svg'));
  if (hasSvg) {
    return [pickFallbackImage(product.slug)];
  }

  return product.images;
};
