export interface GalleryImage {
  src: string;
  title?: string;
  description?: string;
}

export interface ExpandedContent {
  headline: string;
  bullets: string[];
  stats: { value: string; label: string }[];
  images: (string | GalleryImage)[];
}

export interface CaseData {
  name: string;
  tagLabel: string;
  logo?: string;
  description?: string;
  href?: string;
  status?: string;
  expandedContent?: ExpandedContent;
}
