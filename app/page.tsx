import Image from "next/image";
import { socialLinks } from "@/app/config";
import { SiGoland, SiTypescript, SiPhp, SiJavascript, SiTerraform, SiAmazon, SiMicrosoftazure, SiPython, SiBitcoin, SiEthereum, SiSolidity, SiGit, SiPostgresql, SiMysql, SiMongodb, SiBurpsuite, SiWireshark, SiLinux } from 'react-icons/si';
import dynamic from 'next/dynamic';

const AgeCounter = dynamic(() => import('@/components/age-counter'), { ssr: false });
const WavingHand = dynamic(() => import('@/components/waving-hand'), { ssr: false });

export default function Page() {
  return (
    <section>
      <div className="sm:block hidden">
        <a href={socialLinks.github} target="_blank">
          <Image
            src="/profile.jpg"
            alt="Profile photo"
            className="rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0"
            unoptimized
            width={160}
            height={160}
            priority
          />
        </a>
      </div>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Hi! I'm Raghu <WavingHand />
        </p>
        <h3>About</h3>
        <p>
          {' '} <AgeCounter />{' '} old human developer, security researcher, and <strong>deeply passionate about web2 and web3</strong> from India.
        </p>
        <p>
          I hold a <strong>B.Tech in Information Technology</strong> from <a href="https://sece.ac.in/" target="_blank" rel="noopener noreferrer">Sri Eshwar College of Engineering</a>.
        </p>
        <p>
          Sometimes, I'm into blockchain and GenAI. I write code in both statically and dynamically typed languages, I like deploying on <strong>self-hosted bare metal</strong> instead of just cloud infrastructure. Not anti-cloud, but <strong>homelab supremacy</strong> ⌐■_■
        </p>


        <h3>Technical Contributions</h3>
        <ul>
          <li>Developed an <strong>IAM Service</strong> at <a href="https://www.freightify.com/" target="_blank" rel="noopener noreferrer">Freightify</a> using GoLang, MySQL, PHP, and K8s, serving over 100,000 customers daily</li>
          <li>Built a custom <strong>API Gateway</strong> at <a href="https://www.freightify.com/" target="_blank" rel="noopener noreferrer">Freightify</a> based on <a href="https://opensource.zalando.com/skipper/" target="_blank" rel="noopener noreferrer">Skipper</a>, handling over 1 million daily API requests with fully flexible configurations</li>
          <li>Contributed to breaking down monolithic software into <strong>microservice architecture</strong> at <a href="https://www.freightify.com/" target="_blank" rel="noopener noreferrer">Freightify</a> with Node, GoLang, K8s and PHP</li>
          <li>Published <strong>research</strong> on detecting fake face images using a <strong>Convolutional Neural Network (CNN)</strong> with an accuracy over <strong>87.5%</strong> - More details at <a href="https://ieeexplore.ieee.org/document/10046797" target="_blank" rel="noopener noreferrer">IEEE Xplore</a></li>
          <li>Engaged in <strong>bug bounty hunting</strong>, earning rewards from companies like McAfee, Uber</li>
          <li>Implemented security measures to fix XSS and SQL injection vulnerabilities at <a href="https://www.freightify.com/" target="_blank" rel="noopener noreferrer">Freightify</a></li>
          <li>Developed a <strong>social media application</strong> for <a href="https://sece.ac.in/" target="_blank" rel="noopener noreferrer">Sri Eshwar College of Engineering</a>, used by 500+ students for college events</li>
          <li>Created <a href="https://dev.dataatmos.com/" target="_blank" rel="noopener noreferrer">DataAtmos</a>, a platform for managing data-related activities using Next.js and Terraform (in progress)</li>
          <li>Built and implemented a <strong>network infrastructure</strong> for <a href="https://www.kghospital.com/" target="_blank" rel="noopener noreferrer">KG Hospital</a>, a renowned hospital in <a href="https://www.google.com/search?q=coimbatore" target="_blank" rel="noopener noreferrer">Coimbatore</a></li>
          <li>Assembled and provided <strong>custom-built computers</strong> for 20+ individuals</li>
          <li>Developed a <strong>Micro-Finance Portfolio Website</strong> using WordPress, implementing SEO and Google My Business maintenance</li>
          <li>Led a team of 5 members and was shortlisted to the top 50 in the <strong>Smart India Hackathon</strong></li>
          <li>Served as <strong>President of the Cyberspace Club</strong> at <a href="https://sece.ac.in/" target="_blank" rel="noopener noreferrer">Sri Eshwar College of Engineering</a> for all 4 years</li>
          <li>Shared knowledge on Developing and Securing Web Applications, solving challenges in HackTheBox, and Basics of Networking with hundreds of students weekly</li>
        </ul>

        <p>Some things I believe:</p>
        <ul>
          <li>
            <strong>Anyone can learn anything on the internet (for free)</strong> if they're
            truly passionate about it
          </li>
          <li>
            I feel like LLMs are super helpful, but sometimes they make me feel dumber by overdoing the assistance          
          </li>
          <li>
            Just like filter coffee requires the perfect brew, technological progress (
            <span>
              <a
                href="https://en.wikipedia.org/wiki/Effective_accelerationism"
                target="_blank"
              >
                e/acc
              </a>
            </span>
            ) needs the right balance, but we should certainly push for <strong>faster AGI development</strong>
          </li>
          <li>
            Cloud providers are like paying rent in Bangalore - sometimes it's better to just buy your own server and host it at home
          </li>
          <li>
            <strong>Open source and open research are crucial</strong>
          </li>
          <li>
            AGI is more likely to help humans than harm them
          </li>
        </ul>
        <p>
          If you're interested in collaborating on web-stuffs (or not), just
          DM me on{" "}
          <a href={socialLinks.linkedin} target="_blank">
            LinkedIn
          </a>
          . I'm always open to new ideas and projects!
        </p>
      </div>
      <div className="mt-8 text-gray-400">
        <div className="grid grid-cols-6 gap-4 lg:hidden">
          <SiGoland size={24} />
          <SiTypescript size={24} />
          <SiPhp size={24} />
          <SiJavascript size={24} />
          <SiPython size={24} />
          <SiSolidity size={24} />
          <SiAmazon size={24} />
          <SiMicrosoftazure size={24} />
          <SiLinux size={24} />
          <SiTerraform size={24} />
          <SiGit size={24} />
          <SiBurpsuite size={24} />
          <SiWireshark size={24} />
          <SiPostgresql size={24} />
          <SiMysql size={24} />
          <SiMongodb size={24} />
          <SiBitcoin size={24} />
          <SiEthereum size={24} />
        </div>
        <div className="hidden lg:flex justify-center space-x-4">
          <SiGoland size={24} />
          <SiTypescript size={24} />
          <SiPhp size={24} />
          <SiJavascript size={24} />
          <SiPython size={24} />
          <SiSolidity size={24} />
          <SiAmazon size={24} />
          <SiMicrosoftazure size={24} />
          <SiLinux size={24} />
          <SiTerraform size={24} />
          <SiGit size={24} />
          <SiBurpsuite size={24} />
          <SiWireshark size={24} />
          <SiPostgresql size={24} />
          <SiMysql size={24} />
          <SiMongodb size={24} />
          <SiBitcoin size={24} />
          <SiEthereum size={24} />
        </div>
      </div>
    </section>
  );
}