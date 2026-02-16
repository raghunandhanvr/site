import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join, relative } from "path";
import matter from "gray-matter";

const BLOGS_DIR = join(process.cwd(), "app", "writings");
const OUTPUT_JSON = join(process.cwd(), "app", "lib", "blog-manifest.json");
const OUTPUT_TS = join(process.cwd(), "app", "lib", "blog-manifest.ts");

interface BlogManifestEntry {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  tags: string;
  image: string;
  content: string;
}

function extractExportMetadata(content: string): Record<string, unknown> {
  const idx = content.indexOf("export const metadata =");
  if (idx === -1) return {};

  const braceStart = content.indexOf("{", idx);
  if (braceStart === -1) return {};

  let depth = 0;
  for (let i = braceStart; i < content.length; i++) {
    const c = content[i];
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) {
        try {
          const objStr = content.slice(braceStart, i + 1);
          const parsed = new Function(`return ${objStr}`)();
          return parsed as Record<string, unknown>;
        } catch {
          return {};
        }
      }
    }
  }
  return {};
}

function extractCreatedAt(content: string): string | null {
  const match = content.match(
    /createdAt\s*=\s*\{\s*new\s+Date\s*\(\s*["']([^"']+)["']\s*\)\s*\}/
  );
  return match ? match[1] : null;
}

function getBlogSlugs(): string[] {
  const entries = readdirSync(BLOGS_DIR, {
    recursive: true,
    withFileTypes: true,
  });
  return entries
    .filter((e) => e.isFile() && e.name === "page.mdx")
    .map((e) => {
      const fullPath = join(e.parentPath ?? "", e.name);
      const rel = relative(BLOGS_DIR, fullPath);
      return rel.replace(/\\/g, "/").replace(/\/page\.mdx$/, "");
    })
    .filter(Boolean);
}

function generateManifest(): BlogManifestEntry[] {
  const slugs = getBlogSlugs();
  const entries: BlogManifestEntry[] = [];

  for (const slug of slugs) {
    const fullPath = join(BLOGS_DIR, slug, "page.mdx");
    const raw = readFileSync(fullPath, "utf8");
    const { data: fm, content } = matter(raw);
    const exportMeta = extractExportMetadata(raw);
    const createdAt = extractCreatedAt(raw);

    const title =
      (fm.title as string) ??
      (exportMeta.title as string) ??
      slug;
    const summary =
      (fm.summary as string) ??
      (exportMeta.description as string) ??
      "";
    const publishedAt =
      (fm.publishedAt as string) ?? createdAt ?? new Date().toISOString();
    const tags = (fm.tags as string) ?? "";
    const image = (fm.image as string) ?? "";

    entries.push({
      slug: `/writings/${slug}`,
      title: String(title),
      summary: String(summary),
      publishedAt,
      tags: String(tags),
      image: String(image),
      content,
    });
  }

  return entries.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

const manifest = generateManifest();
writeFileSync(OUTPUT_JSON, JSON.stringify(manifest, null, 2), "utf8");

const tsContent = `// Auto-generated at build time. Do not edit.
import type { BlogManifestEntry } from "./blog-manifest-types";

export const blogManifest: BlogManifestEntry[] = ${JSON.stringify(manifest)} as BlogManifestEntry[];
`;

writeFileSync(OUTPUT_TS, tsContent, "utf8");
console.log(`Generated blog manifest: ${manifest.length} posts`);
