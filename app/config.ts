export const siteConfig = {
  url: "https://raghu.app/",
  name: "Raghunandhan VR",
  shortName: "Raghu",
  description: "I own a computer and I like to develop things with it.",
  location: "Chennai, India",
  jobTitle: "Software Engineer",
  image: "/opengraph-image.png",
  email: "raghunandhanvr@outlook.com",
  resume: "https://drive.google.com/file/d/1485NhQ5ldfmRCXJqURvS_Ab-_aE3VeID/view?usp=sharing",
  social: {
    twitter: "https://x.com/raghunandhanvr",
    github: "https://github.com/raghunandhanvr",
    instagram: "https://www.instagram.com/raghuvrx",
    linkedin: "https://www.linkedin.com/in/raghunandhanvr",
    email: "raghunandhanvr@outlook.com",
  },
  keywords: [
    "raghunandhan",
    "Raghunandhan",
    "Raghunandhan VR",
    "raghunandhan vr",
    "raghunandhanvr",
    "raghu",
    "raghu.app",
  ],
} as const;

/**
 * Use as `metadata.title` on nested routes. The root layout already sets
 * `title.template` to `%s | ${siteConfig.name}`, so pass only the page title
 * here (no site suffix).
 */
export function withSiteTitle(pageTitle: string): string {
  const t = pageTitle.trim()
  return t.length > 0 ? t : siteConfig.name
}

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
    ],
  };
}
