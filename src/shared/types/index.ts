// Core Domain Types
export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  tags: string[];
  image?: string;
  content?: string;
  readingTime?: number;
  views?: number;
}

export interface BlogMetadata {
  title: string;
  summary: string;
  publishedAt: string;
  tags: string[];
  image?: string;
}

export interface Author {
  name: string;
  shortName: string;
  email: string;
  location: string;
  jobTitle: string;
  image: string;
  bio: string;
}

export interface SocialLinks {
  twitter: string;
  github: string;
  instagram: string;
  linkedin: string;
  email: string;
}

export interface SiteConfig {
  url: string;
  name: string;
  shortName: string;
  description: string;
  location: string;
  jobTitle: string;
  image: string;
  email: string;
  social: SocialLinks;
  keywords: readonly string[];
}

// Navigation Types
export interface NavItem {
  name: string;
  path: string;
  external?: boolean;
}

export interface Breadcrumb {
  name: string;
  path: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface PageProps {
  params: Promise<{ [key: string]: string | string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Theme Types
export type Theme = "light" | "dark" | "system";

// Error Types
export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  details?: unknown;
}

// Utility Types
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type OptionalBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Event Types
export type AnalyticsEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};