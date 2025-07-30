// Application Constants
export const APP_CONFIG = {
  DEFAULT_TITLE: "Raghunandhan VR",
  DEFAULT_DESCRIPTION: "I own a computer and I like to develop things with it.",
  DEFAULT_LOCALE: "en_US",
  DEFAULT_THEME: "light" as const,
} as const;

// Route Constants
export const ROUTES = {
  HOME: "/",
  WORK: "/work",
  WRITINGS: "/writings",
  API: {
    FEED: {
      RSS: "/api/feed/rss.xml",
      ATOM: "/api/feed/atom.xml",
      JSON: "/api/feed/feed.json",
    },
    OG: "/api/og",
  },
} as const;

// SEO Constants
export const SEO = {
  MAX_TITLE_LENGTH: 60,
  MAX_DESCRIPTION_LENGTH: 160,
  MAX_KEYWORDS: 10,
} as const;

// Content Constants
export const CONTENT = {
  BLOG_POSTS_PER_PAGE: 10,
  EXCERPT_LENGTH: 150,
  READING_SPEED_WPM: 200, // Words per minute
} as const;

// Cache Constants
export const CACHE = {
  BLOG_POSTS_TTL: 60 * 60, // 1 hour in seconds
  STATIC_ASSETS_TTL: 60 * 60 * 24 * 7, // 1 week in seconds
} as const;

// Validation Constants
export const VALIDATION = {
  MIN_SEARCH_QUERY_LENGTH: 2,
  MAX_SEARCH_QUERY_LENGTH: 100,
  MAX_TAG_LENGTH: 50,
} as const;

// External URLs
export const EXTERNAL_URLS = {
  RESUME: "https://dub.sh/raghu-resume",
  SOCIAL: {
    TWITTER: "https://x.com/raghuvrx",
    GITHUB: "https://github.com/raghunandhanvr",
    INSTAGRAM: "https://www.instagram.com/raghuvrx",
    LINKEDIN: "https://www.linkedin.com/in/raghunandhanvr",
  },
} as const;

// Feature Flags
export const FEATURES = {
  ANALYTICS_ENABLED: true,
  COMMENTS_ENABLED: false,
  SEARCH_ENABLED: true,
  DARK_MODE_ENABLED: true,
} as const;