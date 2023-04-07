export interface GhostPostMetadata {
  title: string;
  tags: string[];
  status: 'draft' | 'published';
  id?: string;
}
