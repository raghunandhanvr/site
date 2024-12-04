"use client";

import React from "react";
import { TbMailFilled } from "react-icons/tb";
import { metaData, socialLinks } from "app/config";
import {
  SiX,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiRss
} from "react-icons/si";

const YEAR = new Date().getFullYear();

function SocialLink({ href, icon: Icon }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Icon />
    </a>
  );
}

function SocialLinks() {
  return (
    <div className="flex text-lg gap-3.5 float-right transition-opacity duration-300 hover:opacity-90">
      <SocialLink href={socialLinks.twitter} icon={SiX} />
      <SocialLink href={socialLinks.github} icon={SiGithub} />
      <SocialLink href={socialLinks.instagram} icon={SiInstagram} />
      <SocialLink href={socialLinks.linkedin} icon={SiLinkedin} />
      <SocialLink href={socialLinks.email} icon={TbMailFilled} />
      <a href="/rss.xml" target="_self">
        <SiRss />
      </a>
    </div>
  );
}

export default function Footer() {
  return (
    <small className="block lg:mt-24 mt-16 text-[#1C1C1C] dark:text-[#D4D4D4]">
      <time>© {YEAR}</time>{" "}
      <a
        className="no-underline"
        href={socialLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
      >
        {metaData.title}
      </a>
      <span className="ml-2 inline-block cursor-default group">
        🇮🇳
        <span className="hidden group-hover:inline ml-1">Surviving in India</span>
      </span>
      <style jsx>{`
        @media screen and (max-width: 480px) {
          article {
            padding-top: 2rem;
            padding-bottom: 4rem;
          }
        }
      `}</style>
      <SocialLinks />
    </small>
  );
}

