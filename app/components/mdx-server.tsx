import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export async function serializeMDX(content: string) {
  return serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeKatex],
    },
  })
}

