import type { ReactNode } from "react";

/** Match MDX heading `id` generation in `mdx-components.tsx`. */
export function slugifyHeadingText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Plain text from heading children for stable slug ids (MDX often nests `strong`/`code`). */
export function slugifyHeadingChildren(children: ReactNode): string {
  const plain = headingChildrenToPlainText(children).trim();
  return slugifyHeadingText(plain || "section");
}

function headingChildrenToPlainText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(headingChildrenToPlainText).join("");
  if (typeof node === "object" && "props" in node && node.props) {
    const p = node.props as { children?: ReactNode };
    if (p.children !== undefined) return headingChildrenToPlainText(p.children);
  }
  return "";
}
