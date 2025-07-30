import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function capitalizeWords(text: string): string {
  return text.replace(/\b\w/g, char => char.toUpperCase());
}

export function kebabToTitle(kebabCase: string): string {
  return capitalizeWords(kebabCase.replace(/-/g, " "));
}

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

export function extractExcerpt(content: string, length = 150): string {
  const cleanContent = content
    .replace(/#{1,6}\s?/g, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/\n+/g, " ")
    .trim();

  return cleanContent.length <= length 
    ? cleanContent 
    : cleanContent.slice(0, length).trim() + "...";
}
