import type { SEOMetadata } from './seo';

export type JournalCategory =
  | 'styling'
  | 'behind-the-scenes'
  | 'editorial'
  | 'fashion'
  | 'culture'
  | 'news'
  | 'design'
  | 'sustainability';

export interface JournalArticle {
  id: string;
  title: string;
  slug: string;
  category: JournalCategory;
  tags: string[];
  excerpt: string;
  content: string;
  author: JournalAuthor;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  coverImage: string;
  coverImageAlt: string;
  relatedProducts: string[];
  relatedArticles: string[];
  isFeatured: boolean;
  seo: SEOMetadata;
}

export interface JournalAuthor {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  role?: string;
}
