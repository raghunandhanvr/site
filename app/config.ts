export const siteConfig = {
  url: "https://raghu.app/",
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
    "Distributed Systems"
  ]
} as const;

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
      addressCountry: "IN"
    },
    image: siteConfig.image,
    sameAs: Object.values(siteConfig.social),
    knowsAbout: ["Software Development", "Databases", "Distributed Systems", "Web Development"]
  }
}

