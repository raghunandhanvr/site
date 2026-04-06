export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  year: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Munnar",
    slug: "/writings/munnar",
    date: "2025-09-27",
    year: "2025",
  },
  {
    title: "Code for Deletion, Not Reuse",
    slug: "/writings/deletion-focused",
    date: "2025-07-29",
    year: "2025",
  },
  {
    title: "High‑Performance Reverse Proxy",
    slug: "/writings/skipper",
    date: "2025-02-02",
    year: "2025",
  },
  {
    title: "On Developer Experience",
    slug: "/writings/dx",
    date: "2025-01-24",
    year: "2025",
  },
  {
    title: "Other DB options",
    slug: "/writings/db",
    date: "2024-08-10",
    year: "2024",
  },
];
