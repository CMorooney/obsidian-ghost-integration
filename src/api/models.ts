export interface GhostPostMetadata {
  title: string;
  tags: string[];
  status: 'draft' | 'published';
  id?: string;
}

export interface GhostTag {
  created_at: string;
  description?: string;
  feature_image?: string;
  id: string;
  meta_description?: string;
  meta_title?: string;
  name: string;
  slug: string;
  updated_at: string;
  url: string;
  visibility: 'public' | 'private';
}

export interface GhostRole {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface GhostAuthor {
  id: string;
  name: string;
  slug: string;
  email: string;
  profile_image?: string;
  cover_image?: string;
  bio?: string;
  website?: string;
  location?: string;
  facebook?: string;
  twitter?: string;
  accessibility?: string;
  status: string;
  meta_title?: string;
  meta_description?: string;
  tour?: string;
  last_seen?: string;
  created_at: string;
  updated_at: string;
  roles: GhostRole[];
  url: string;
}

export interface GhostPrimaryTag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  feature_image?: string;
  visibility: 'public' | 'private',
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
  og_image?: string;
  og_title?: string;
  og_description?: string;
  twitter_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  codeinjection_head?: string;
  codeinjection_foot: string;
  canonical_url?: string;
  accent_color?: string;
  parent?: string;
  url: string;
}

export interface GhostNewsletter {
  id: string;
  name: string;
  description?: string;
  slug: string;
  sender_name: string;
  sender_email?: string;
  sender_reply_to: string;
  status: string;
  visibility: string;
  subscribe_on_signup: boolean;
  sort_order: number;
  header_image?: string;
  show_header_icon: boolean,
  show_header_title: boolean;
  title_font_category: string;
  title_alignment: string;
  show_feature_image: boolean;
  body_font_category: string;
  footer_content?: string;
  show_badge: boolean;
  created_at: string;
  updated_at: string;
  show_header_name: boolean;
  uuid: string;
}

export interface GhostEmail {
  id: string;
  uuid: string;
  status: string;
  recipient_filter: string;
  error?: string;
  error_data: any[];
  email_count: number;
  delivered_count: number;
  opened_count: number;
  failed_count: number;
  subject: string;
  from: string;
  reply_to: string;
  html: string;
  plaintext: string;
  track_opens: boolean;
  submitted_at: string;
  created_at: string;
  updated_at: string;
}

export interface GhostPost {
  slug: string;
  id: string;
  uuid: string;// not sure how/why this is different than id
  title: string;
  mobiledoc: any;// this is complex content of post
  html: string;// this is html content of post
  comment_id: string;// idk what this is
  feature_image?: string;
  feature_image_alt?: string;
  feature_image_caption?: string;
  featured: boolean,
  status: 'draft' | 'published',
  visibility: 'public' | 'private',
  created_at: string;
  updated_at: string;
  published_at: string;
  custom_excerpt?: string;
  codeinjection_head?: string;
  codeinjection_foot?: string;
  custom_template?: string;
  canonical_url?: string;
  tags: GhostTag[];
  authors: GhostAuthor[],
  primary_author: GhostAuthor;
  primary_tag: GhostPrimaryTag;
  url: string;
  excerpt: string;
  og_image?: string;
  og_title?: string;
  og_description?: string;
  twitter_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  meta_title?: string;
  meta_description?: string;
  email_only: boolean;
  newsletter: GhostNewsletter;
  email: GhostEmail;
}

