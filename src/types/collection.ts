import type { SEOMetadata } from './seo';

export type CollectionMood = 'warm' | 'cool' | 'modern' | 'minimal' | 'editorial' | 'bold';

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  heroImage: string;
  heroVideo?: string;
  mood: CollectionMood;
  products: string[];
  editorialStory: string;
  season?: string;
  year?: number;
  isActive: boolean;
  seo: SEOMetadata;
  createdAt: string;
}

export interface EditorialDrop {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  heroImage: string;
  heroVideo?: string;
  collection: string;
  lookbookImages: string[];
  journalArticles: string[];
  products: string[];
  releaseDate: string;
  isActive: boolean;
}
