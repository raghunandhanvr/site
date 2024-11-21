import Image from "next/image";
import { socialLinks } from "./config";
import { SiGoland, SiTypescript, SiPhp, SiJavascript, SiTerraform, SiAmazon, SiMicrosoftazure, SiPython, SiBitcoin, SiEthereum, SiSolidity, SiGit, SiPostgresql, SiMysql, SiMongodb, SiBurpsuite, SiWireshark, SiLinux } from 'react-icons/si';
import dynamic from 'next/dynamic';

const AgeCounter = dynamic(() => import('./components/age-counter'), { ssr: false });

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

      <h1 className="mb-8 text-2xl font-medium tracking-tight">
        I build, break, innovate, engineer & code!
      </h1>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Hi! I'm Raghu.
        </p>
        <p>
        {' '} <AgeCounter />{' '} old human developer, security researcher, and deeply passionate about web2 and web3.
        </p>
        <p>
          Sometimes, I'm into blockchain and Generative AI, with a serious passion for self-hosted setups. Bringing datacenter vibes to my living room, one ambitious server at a time, is just how I roll.         
        </p>
        <p>Some things I believe:</p>
        <ul>
          <li>
            Anyone can learn anything on the internet (for free) if they're
            truly passionate about it
          </li>
          <li>
            I feel like LLMs are super helpful, but sometimes they make me feel dumber by overdoing the assistance          
          </li>
          <li>
            The{" "}
            <a
              href="https://en.wikipedia.org/wiki/Effective_accelerationism"
              target="_blank"
            >
              e/acc
            </a>{" "}
            techno-optimist philosophy is the way forward. We should speed up
            technological progress, especially in developing AGI
          </li>
          <li>
            We don't need to be dependent on AWS or any cloud provider always. Just take the risk and deploy on your own home server
          </li>
          <li>
            Open source and open research are crucial
          </li>
          <li>AGI is more likely to help humans than harm them</li>
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