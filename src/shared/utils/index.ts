import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CONTENT } from "../constants";

// Tailwind CSS utility function
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date utilities
export const dateUtils = {
  formatDate: (date: string | Date, locale = "en-US"): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },

  formatRelativeTime: (date: string | Date): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  },

  isValidDate: (date: string | Date): boolean => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj instanceof Date && !isNaN(dateObj.getTime());
  },
};

// String utilities
export const stringUtils = {
  slugify: (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  },

  truncate: (text: string, length: number): string => {
    if (text.length <= length) return text;
    return text.slice(0, length).trim() + "...";
  },

  extractExcerpt: (content: string, length = CONTENT.EXCERPT_LENGTH): string => {
    // Remove markdown syntax and HTML tags
    const cleanContent = content
      .replace(/#{1,6}\s?/g, "") // Remove headers
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
      .replace(/\*(.*?)\*/g, "$1") // Remove italic
      .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Remove links
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .replace(/\n+/g, " ") // Replace newlines with spaces
      .trim();

    return stringUtils.truncate(cleanContent, length);
  },

  capitalizeWords: (text: string): string => {
    return text.replace(/\b\w/g, char => char.toUpperCase());
  },

  kebabToTitle: (kebabCase: string): string => {
    return stringUtils.capitalizeWords(kebabCase.replace(/-/g, " "));
  },
};

// URL utilities
export const urlUtils = {
  isExternalUrl: (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname !== window.location.hostname;
    } catch {
      return false;
    }
  },

  buildUrl: (base: string, params: Record<string, string | number>): string => {
    const url = new URL(base, window.location.origin);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
    return url.toString();
  },

  getQueryParams: (): Record<string, string> => {
    const params = new URLSearchParams(window.location.search);
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  },
};

// Content utilities
export const contentUtils = {
  calculateReadingTime: (content: string): number => {
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / CONTENT.READING_SPEED_WPM);
  },

  extractTags: (content: string): string[] => {
    const tagRegex = /#(\w+)/g;
    const matches = content.match(tagRegex);
    return matches ? matches.map(tag => tag.slice(1)) : [];
  },

  generateTOC: (
    content: string
  ): Array<{ id: string; text: string; level: number }> => {
    const headerRegex = /^(#{1,6})\s+(.+)$/gm;
    const toc = [];
    let match;

    while ((match = headerRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = stringUtils.slugify(text);
      toc.push({ id, text, level });
    }

    return toc;
  },
};

// Validation utilities
export const validationUtils = {
  isEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  isEmpty: (value: unknown): boolean => {
    if (value === null || value === undefined) return true;
    if (typeof value === "string") return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === "object") return Object.keys(value).length === 0;
    return false;
  },
};

// Performance utilities
export const performanceUtils = {
  debounce: <T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
  ): T => {
    let timeout: NodeJS.Timeout;
    return ((...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    }) as T;
  },

  throttle: <T extends (...args: unknown[]) => unknown>(
    func: T,
    limit: number
  ): T => {
    let inThrottle: boolean;
    return ((...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    }) as T;
  },

  memoize: <T extends (...args: unknown[]) => unknown>(func: T): T => {
    const cache = new Map();
    return ((...args: Parameters<T>) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = func(...args);
      cache.set(key, result);
      return result;
    }) as T;
  },
};

// Error utilities
export const errorUtils = {
  createError: (message: string, code?: string, statusCode?: number) => {
    const error = new Error(message) as any;
    if (code) error.code = code;
    if (statusCode) error.statusCode = statusCode;
    return error;
  },

  isAppError: (error: unknown): error is Error & { code?: string; statusCode?: number } => {
    return error instanceof Error;
  },

  getErrorMessage: (error: unknown): string => {
    if (errorUtils.isAppError(error)) {
      return error.message;
    }
    return "An unexpected error occurred";
  },
};