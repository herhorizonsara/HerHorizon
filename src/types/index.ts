export interface Subscriber {
  id: string;
  name?: string;
  email: string;
  createdAt: string;
  source: string; // e.g. youtube, pinterest, instagram, medium, search, direct
  campaign?: string; // e.g. solo_saturday, vsl_launch
  timeOnPageSeconds?: number;
  timeOnPageFormatted?: string; // e.g. '2m 14s'
  vslWatched?: boolean; // Boolean: true/false
  gumroadClicked?: boolean; // Boolean: true/false
  status: 'active' | 'sent' | 'pending';
  notes?: string;
  clickedOffer?: boolean;
}

export interface MetricSummary {
  totalSubscribers: number;
  todayCount: number;
  conversionRate: string;
  coreOfferClicks: number;
  totalVisitors: number;
  averageTimeOnPage: string;
  gumroadCtr: string;
}

export interface BlogPostAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface BlogSeo {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  focusKeyword?: string;
  canonicalUrl?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  coverImage?: string;
  coverImageAlt?: string;
  author: BlogPostAuthor;
  category: string;
  tags: string[];
  readingTimeMinutes: number;
  publishedAt: string;
  updatedAt?: string;
  status: 'published' | 'draft';
  featured?: boolean;
  content: string; // Markdown or rich text with formatting, images, links, quotes
  seo: BlogSeo;
  views?: number;
  likes?: number;
}
