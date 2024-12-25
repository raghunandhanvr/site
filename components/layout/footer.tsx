import { socialLinks } from '@/app/config';

function Footer() {
  const links = [
    { name: 'twitter', url: socialLinks.twitter },
    { name: 'github', url: socialLinks.github },
    { name: 'instagram', url: socialLinks.instagram },
    { name: 'linkedin', url: socialLinks.linkedin },
    { name: 'rss', url: '/rss.xml' },
  ];

  return (
    <footer className="mt-12 text-center">
      <div className="flex justify-center space-x-4 tracking-tight">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target={link.name === 'rss' ? '_self' : '_blank'}
            rel={link.name === 'rss' ? undefined : 'noopener noreferrer'}
            className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;

