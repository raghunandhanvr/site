import { Badge } from "@/app/components/ui/badge"; 
import { Briefcase, GraduationCap, Laptop, Rocket, BookOpen, Star } from 'lucide-react';    

export interface Work {
    title: string;
    year: string;
    description: string;
    url: string;
    techStack: string;
    category: 'Work Experience' | 'Internship' | 'Freelancing' | 'Side Project' | 'Publication';
    current?: boolean;
}
  
export const works: Work[] = [
  {
    title: "Freightify",
    year: "2021 - Present",
    description: "Breaking monolithic architecture to microservices. Building an IAM Service in GoLang that functions as an authentication and authorization system for Freightify Services, with features like User management, SSO, MFA, and OAuth2 end-to-end. Utilizing Zalando's Skipper project, a reverse proxy that routes traffic using custom filters (middlewares) in GoLang. Developing features requested by customers. Using Kafka to transfer data from NoSQL and SQL databases to Parquet files in HDFS, assisting the analytics team.",
    url: "https://www.freightify.com",
    techStack: "GoLang, TypeScript, AngularJS, React, Angular, PHP",
    category: "Work Experience",
    current: true
  },
  {
    title: "CNN-Based Technique for Detecting Fake Face Images",
    year: "2023",
    description: "Published a research article proposing a Convolutional Neural Network (CNN) based technique to detect fake face photos produced by state-of-the-art methods. The study achieved an average accuracy of over 87.5% in detecting fake faces, surpassing previous benchmarks. The research also explored variations in CNN architecture, including high bypass filters, layer group variations, and activation functions to further validate the proposed method.",
    url: "https://ieeexplore.ieee.org/document/10046797",
    techStack: "Deep Learning, CNN, GAN, Python, TensorFlow/PyTorch",
    category: "Publication"
  },
  {
    title: "DataAtmos",
    year: "2024 (In Development)",
    description: "We thought everyone needs a single place to manage all of your data-related activities like database, data analytics, data for your AI/ML models. So we built DataAtmos. This is not fully functional yet. But we are working on it. Ping me if you want to join us.",
    url: "https://dataatmos.ai",
    techStack: "Next.js, Terraform",
    category: "Side Project"
  },
  {
    title: "Network Infrastructure for KG Hospital",
    year: "2022",
    description: "Designed and implemented enterprise-level network infrastructure for KG Hospital using Cisco Catalyst 9000 switches and ISR 4000 series routers. Deployed VLAN segmentation for department isolation, configured VoIP integration, and implemented redundant fiber optic connections. Established secure remote access through Cisco AnyConnect VPN and implemented Cisco ISE for network access control. The solution supported 500+ concurrent users across multiple buildings with 99.99% uptime.",
    url: "https://www.kghospital.com/",
    techStack: "Networking hardware, Network protocols, Security implementations",
    category: "Freelancing"
  },
  {
    title: "ERC-4337 Account Abstraction",
    year: "2024 (In Development)",
    description: "With the goal of making blockchain technology easily accessible to everyone, I am working on a project that utilizes ERC-4337 to build a user-friendly solution on top of account abstraction. By leveraging this tech, we aim to simplify the interaction with blockchain networks, removing the complexities and barriers that often deter mainstream adoption. Stay tuned as we prepare to bring this revolutionary solution to the world, empowering individuals and businesses to seamlessly integrate blockchain into their daily lives and operations.",
    url: "https://www.erc4337.io/",
    techStack: "TypeScript, Solidity",
    category: "Side Project"
  },
  {
    title: "Social Media Web Application",
    year: "2020",
    description: "Developed a customized version of Instagram with mandatory features of social media, used for college events. The application was actively used by 500+ students for posting their moments during events. This project was completed as part of the college curriculum at Sri Eshwar College of Engineering.",
    url: "https://sece.ac.in/",
    techStack: "Node.js, React.js, MySQL",
    category: "Side Project"
  },
  {
    title: "Custom Computer Building",
    year: "2018 - Present",
    description: "Assembled and provided custom-built computers for 20+ individuals, specializing in high-performance builds using Intel i7/i9 and AMD Ryzen processors, NVIDIA RTX series GPUs, and custom liquid cooling solutions. Implemented overclocking optimization, M.2 NVMe storage configurations, and RGB synchronization across components. Each build was tailored to client requirements, ranging from gaming rigs with RTX 3080s to workstations with DDR5 RAM and PCIe Gen 4 capabilities.",
    url: "#",
    techStack: "Various hardware components, OS installation, Performance tuning",
    category: "Freelancing"
  }
];

const categoryIcons = { 
  "Work Experience": Briefcase, 
  "Internship": GraduationCap, 
  "Freelancing": Laptop, 
  "Side Project": Rocket, 
  "Publication": BookOpen, 
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
  
  