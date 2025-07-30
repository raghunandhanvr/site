export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  tags: string[];
  image?: string;
  content?: string;
  readingTime?: number;
}

export interface BlogMetadata {
  title: string;
  summary: string;
  publishedAt: string;
  tags: string[];
  image?: string;
}

export interface NavItem {
  name: string;
  path: string;
  external?: boolean;
}

export interface Breadcrumb {
  name: string;
  path: string;
}

export interface PageProps {
  params: Promise<{ [key: string]: string | string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}