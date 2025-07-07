import { Badge } from "@/app/components/ui/badge"; 
import { Briefcase, GraduationCap, Laptop, Rocket, BookOpen, Star, Shield, Trophy } from 'lucide-react';    

export interface Work {
    title: string;
    year: string;
    description: string[];
    url: string;
    techStack: string;
    category: 'Work Experience' | 'Internship' | 'Freelancing' | 'Side Project' | 'Publication' | 'Security Research' | 'Leadership';
    current?: boolean;
    highlight?: boolean;
}
  
export const works: Work[] = [
  {
    title: "Lumel",
    year: "July 2025 - Present",
    description: [
      "Building systems designed to handle very high volumes of data"
    ],
    url: "https://lumel.com/",
    techStack: "Go, React, .NET, Azure",
    category: "Work Experience",
    current: true,
    highlight: true
  },
  {
    title: "Freightify",
    year: "July 2023 - July 2025",
    description: [
      "Built central AuthN/AuthZ microservice; reduced authentication latency by ~50%, handling 100K+ daily users",
      "Implemented comprehensive SSO and OAuth 2.0 flows (all grant types)",
      "Developed a high-performance reverse proxy using Zalando Skipper; reduced average API latency by ~60%, routing 1M+ daily requests",
      "Engineered custom microservice for dynamic API route management",
      "Delivered critical rate-search and booking workflows, ensuring 99.5% uptime across services"
    ],
    url: "https://www.freightify.com",
    techStack: "Go, PHP, AngularJS, React.js, Kubernetes, MySQL, MongoDB, Redis, Node.js",
    category: "Work Experience",
    current: false,
    highlight: true
  },
  {
    title: "Freightbro (Now Freightify)",
    year: "July 2022 - July 2023",
    description: [
      "Developed internal dashboards and automation tools used by 150+ employees of Freightify",
      "Ran org-wide SADT/DAST, driving rapid remediation of high-risk issues"
    ],
    url: "https://www.freightify.com",
    techStack: "Golang, Node.js, React, AngularJS, K8s",
    category: "Internship"
  },
  {
    title: "Gurguram Police",
    year: "March 2021 - June 2021",
    description: [
      "Analysed 25+ cybercrime cases, including ransomware attacks, identity theft, and cyber blackmail"
    ],
    url: "#",
    techStack: "OSINT, Python, C, C++",
    category: "Internship"
  },
  {
    title: "CNN-Based Fake Face Detection Research",
    year: "2023",
    description: [
      "Published IEEE research paper on AI-generated fake face detection",
      "Achieved 87.5% accuracy surpassing previous benchmarks",
      "Explored CNN architecture variations and activation functions"
    ],
    url: "https://ieeexplore.ieee.org/document/10046797",
    techStack: "Python, TensorFlow, PyTorch, CNN, GAN",
    category: "Publication",
    highlight: true
  },
  {
    title: "Security Research & Bug Bounty",
    year: "2021 - Present",
    description: [
      "Earned rewards from McAfee, Uber, and other platforms",
      "Fixed XSS and SQL injection vulnerabilities at Freightify"
    ],
    url: "#",
    techStack: "Burp Suite, Wireshark, Linux, Web Security, OWASP",
    category: "Security Research",
    current: true
  },
  {
    title: "DataAtmos",
    year: "2024",
    description: [
      "Building unified platform for data management and analytics",
      "Single source of truth for all data-related activities"
    ],
    url: "https://dataatmos.ai",
    techStack: "Next.js, Terraform, AWS, PostgreSQL",
    category: "Side Project",
    current: true
  },
  {
    title: "President, Cyberspace Club",
    year: "2019 - 2023",
    description: [
      "Led cybersecurity education for 4 years",
      "Organized CTFs and workshops for hundreds of students weekly",
      "Mentored on web security and networking fundamentals"
    ],
    url: "https://sece.ac.in/",
    techStack: "Leadership, Cybersecurity Education, CTF Challenges",
    category: "Leadership",
    highlight: true
  },
  {
    title: "Smart India Hackathon",
    year: "2022",
    description: [
      "Led 5-member team to top 50 finalists",
      "Developed scalable solutions for real-world problems"
    ],
    url: "#",
    techStack: "Full-stack Development, Team Leadership, Problem Solving",
    category: "Leadership"
  },
  {
    title: "KG Hospital Network Infrastructure",
    year: "2022",
    description: [
      "Designed enterprise network for 500+ concurrent users",
      "Deployed VLAN segmentation and VoIP integration",
      "Achieved 99.99% uptime with secure VPN access"
    ],
    url: "https://www.kghospital.com/",
    techStack: "Cisco Catalyst 9000, ISR 4000, Network Security, VoIP",
    category: "Freelancing"
  },
  {
    title: "College Social Media Platform",
    year: "2020",
    description: [
      "Built Instagram-like platform for college events",
      "Served 500+ active students with real-time features"
    ],
    url: "https://sece.ac.in/",
    techStack: "Node.js, React.js, MySQL, Socket.io",
    category: "Side Project"
  },
  {
    title: "Micro-Finance Portfolio Website",
    year: "2019",
    description: [
      "First freelance project using WordPress",
      "Implemented SEO and Google My Business maintenance"
    ],
    url: "#",
    techStack: "WordPress, SEO, Google My Business",
    category: "Freelancing"
  },
  {
    title: "ERC-4337 Account Abstraction",
    year: "2024",
    description: [
      "Developing user-friendly blockchain solutions",
      "Removing barriers to mainstream blockchain adoption"
    ],
    url: "https://www.erc4337.io/",
    techStack: "TypeScript, Solidity, Ethereum, Web3",
    category: "Side Project",
    current: true
  },
  {
    title: "Custom PC Building Service",
    year: "2018 - Present",
    description: [
      "Assembled 20+ high-performance computers",
      "Specialized in gaming rigs and workstations with custom cooling"
    ],
    url: "#",
    techStack: "Hardware Assembly, Performance Tuning, Custom Cooling",
    category: "Freelancing",
    current: true
  }
];

const categoryIcons = { 
  "Work Experience": Briefcase, 
  "Internship": GraduationCap, 
  "Freelancing": Laptop, 
  "Side Project": Rocket, 
  "Publication": BookOpen,
  "Security Research": Shield,
  "Leadership": Trophy,
};  

export const CategoryBadge: React.FC<{ category: Work['category'] }> = ({ category }) => ( 
  <Badge variant={category} icon={categoryIcons[category]} className="text-xs"> 
      {category} 
  </Badge> 
);  

export const CurrentTag: React.FC = () => ( 
  <Badge variant="current" icon={Star} className="text-xs ml-2"> 
      Current 
  </Badge> 
);
  
  
