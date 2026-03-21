import React, { ComponentPropsWithoutRef } from 'react';
import { Link } from 'next-view-transitions';
import { highlight } from 'sugar-high';

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

const components = {
  h1: (props: HeadingProps) => {
    const id = props.id || generateSlug(props.children as string);
    return (
      <h1 id={id} className="text-2xl font-bold mb-1" {...props} />
    );
  },
  h2: (props: HeadingProps) => {
    const id = props.id || generateSlug(props.children as string);
    return (
      <h2 id={id} className="group font-bold text-xl my-8 relative" {...props} />
    );
  },
  h3: (props: HeadingProps) => {
    const id = props.id || generateSlug(props.children as string);
    return (
      <h3 id={id} className="group font-bold text-lg my-8 relative" {...props} />
    );
  },
  h4: (props: HeadingProps) => {
    const id = props.id || generateSlug(props.children as string);
    return (
      <h4 id={id} className="group font-bold text-base my-6 relative" {...props} />
    );
  },
  p: (props: ParagraphProps) => (
    <p className="leading-snug text-[var(--color-text-muted)]" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol className="list-decimal space-y-2 pl-5 text-[var(--color-text-muted)]" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="list-disc space-y-1 pl-5 text-[var(--color-text-muted)]" {...props} />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = 'transition-colors text-[var(--color-link)] hover:text-[var(--color-link-hover)]';
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table className="my-6">
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-[3px] border-[var(--color-border-strong)] pl-4 text-[var(--color-text-muted)]"
      {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
