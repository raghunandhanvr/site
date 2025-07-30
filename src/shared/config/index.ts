import { SiteConfig } from "../types";

// Environment configuration
export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  VERCEL_URL: process.env.VERCEL_URL,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID || "G-8E3Y6STYEC",
} as const;

// Site configuration
export const siteConfig: SiteConfig = {
  url: env.VERCEL_URL 
    ? `https://${env.VERCEL_URL}` 
    : "https://raghu.app",
  name: "Raghunandhan VR",
  shortName: "Raghu",
  description: "I own a computer and I like to develop things with it.",
  location: "Chennai, India",
  jobTitle: "Software Engineer",
  image: "/opengraph-image.png",
  email: "raghunandhanvr@outlook.com",
  social: {
    twitter: "https://x.com/raghuvrx",
    github: "https://github.com/raghunandhanvr",
    instagram: "https://www.instagram.com/raghuvrx",
    linkedin: "https://www.linkedin.com/in/raghunandhanvr",
    email: "raghunandhanvr@outlook.com",
  },
  keywords: [
    "Software Engineer",
    "Tech Blog",
    "Web Development",
    "Distributed Systems",
    "TypeScript",
    "React",
    "Next.js",
  ] as const,
} as const;

// Structured data for SEO
export function getStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: siteConfig.jobTitle,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressCountry: "IN",
    },
    image: siteConfig.image,
    sameAs: Object.values(siteConfig.social),
    knowsAbout: [
      "Software Development",
      "Databases",
      "Distributed Systems",
      "Web Development",
      "TypeScript",
      "React",
      "Next.js",
    ],
  };
}

// Redis configuration
export const redisConfig = {
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
  enabled: Boolean(env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN),
} as const;

// Analytics configuration
export const analyticsConfig = {
  googleAnalyticsId: env.GOOGLE_ANALYTICS_ID,
  enabled: env.NODE_ENV === "production",
} as const;

// Development utilities
export const isDevelopment = env.NODE_ENV === "development";
export const isProduction = env.NODE_ENV === "production";
export const isTest = env.NODE_ENV === "test";