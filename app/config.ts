export const metaData = {
    baseUrl: "https://raghu.app/",
    title: "Raghunandhan VR (Raghu)",
    name: "Raghunandhan VR",
    ogImage: "/opengraph-image.png",
    description: "My name is (Raghunandhan VR / raghunandhanvr). I like coding in an editor built for coding and reading articles",
    alternateNames: [ 
      "Raghunandhan VR", "raghunandhan vr",
      "Raghu Nandhan", "raghu nandhan",  
      "Raghu", "raghu",
      "RaghuVR", "raghuvr",
      "Raghunandhanvr", "raghunandhanvr"
    ],
    location: "Chennai, India",
    jobTitle: "Software Engineer",
  };
  
  export const socialLinks = {
    twitter: "https://x.com/raghuvrx",
    github: "https://github.com/raghunandhanvr",
    instagram: "https://www.instagram.com/raghuvrx",
    linkedin: "https://www.linkedin.com/in/raghunandhanvr",
    email: "mailto:raghunandhanvr@outlook.com",
  };
  
  export const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: metaData.name,
    alternateName: metaData.alternateNames,
    url: metaData.baseUrl,
    jobTitle: metaData.jobTitle,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressCountry: "IN"
    },
    image: metaData.ogImage,
    sameAs: Object.values(socialLinks),
    knowsAbout: ["Software Development", "Databases", "Distributed Systems", "Web Development"]
  } as const;