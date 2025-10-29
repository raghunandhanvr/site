import { siteConfig } from '@/app/config';
import AgeCounter from '@/app/components/ui/age-counter';

export default function Footer() {
  return (
    <footer className="pt-6 flex justify-between items-center text-xs dark:text-gray-400 text-gray-500 font-mono">
      <div>
        <AgeCounter/>
      </div>
      <div>
        <a
          target="_blank"
          href={siteConfig.social.github}
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          Source
        </a>
      </div>
    </footer>
  );
}