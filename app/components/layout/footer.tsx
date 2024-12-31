import { siteConfig } from '@/app/config';
import AgeCounter from '@/app/components/ui/age-counter';

function Footer() {
  const links = [
    { name: 'twitter', url: siteConfig.social.twitter },
    { name: 'github', url: siteConfig.social.github },
    { name: 'instagram', url: siteConfig.social.instagram },
    { name: 'linkedin', url: siteConfig.social.linkedin },
    { name: 'rss', url: '/rss.xml' },
  ];

  return (
    <footer className="mt-12 text-center text-sm">
      <div className="flex justify-center space-x-4 tracking-tight mb-2">
        {links.map((link) => (
          <a
          key={link.name}
          href={link.url}
          target={link.name === 'rss' ? '_self' : '_blank'}
          rel={link.name === 'rss' ? undefined : 'noopener noreferrer'}
          className="text-gray-400 hover:text-blue-500 transition-colors duration-200 work-link"
          >
            {link.name}
          </a>
        ))}
      </div>
      <AgeCounter/>
    </footer>
  );
}

export default Footer;

