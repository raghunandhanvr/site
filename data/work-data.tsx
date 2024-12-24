export interface Work {
  title: string;
  year: string;
  description: string;
  url: string;
  techStack: string;
}

export const works: Work[] = [
  {
    title: "Freightify (I work here)",
    year: "2021 - Present",
    description: "Breaking monolithic architecture to microservices. Building an IAM Service in GoLang that functions as an authentication and authorization system for Freightify Services, with features like User management, SSO, MFA, and OAuth2 end-to-end. Utilizing Zalando's Skipper project, a reverse proxy that routes traffic using custom filters (middlewares) in GoLang. Developing features requested by customers. Using Kafka to transfer data from NoSQL and SQL databases to Parquet files in HDFS, assisting the analytics team.",
    url: "https://www.freightify.com",
    techStack: "GoLang, TypeScript, AngularJS, React, Angular, PHP",
  },
  {
    title: "DataAtmos",
    year: "2024 (In Development)",
    description: "We thought everyone needs a single place to manage all of your data-related activities like database, data analytics, data for your AI/ML models. So we built DataAtmos. This is not fully functional yet. But we are working on it. Ping me if you want to join us.",
    url: "https://dev.dataatmos.com",
    techStack: "Next.js, Terraform",
  },
  {
    title: "ERC-4337 Account Abstraction",
    year: "2024 (In Development)",
    description: "With the goal of making blockchain technology easily accessible to everyone, I am working on a project that utilizes ERC-4337 to build a user-friendly solution on top of account abstraction. By leveraging this tech, we aim to simplify the interaction with blockchain networks, removing the complexities and barriers that often deter mainstream adoption. Stay tuned as we prepare to bring this revolutionary solution to the world, empowering individuals and businesses to seamlessly integrate blockchain into their daily lives and operations.",
    url: "https://www.erc4337.io/",
    techStack: "TypeScript, Solidity",
  },
];