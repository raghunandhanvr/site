import type { ReactNode } from "react"

/** URL-safe slug from plain text (article title, heading text). */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

/** MDX heading id: derive from rich children (`strong`, `code`, etc.). */
export function mdxHeadingSlug(children: ReactNode): string {
  const plain = headingChildrenToPlainText(children).trim()
  return slugify(plain || "section")
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
