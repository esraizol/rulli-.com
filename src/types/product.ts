import type { SEOMetadata } from './seo';

export interface ProductImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export interface ProductVideo {
  id: string;
  src: string;
  poster: string;
  type: 'mp4' | 'webm';
}

export type ProductCategory = 'scarves' | 'belts' | 'brooches' | 'accessories';
export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'pre_order';
export type Currency = 'TRY' | 'EUR' | 'USD';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  currency: Currency;
  description: string;
  story: string;
  material: string;
  careInstructions: string[];
  gallery: ProductImage[];
  videos: ProductVideo[];
  collection?: string;
  relatedProducts: string[];
  stockStatus: StockStatus;
  isFeatured: boolean;
  isNew: boolean;
  shopierUrl: string;
  seo: SEOMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilterOptions {
  category?: ProductCategory;
  collection?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'featured';
  search?: string;
}
