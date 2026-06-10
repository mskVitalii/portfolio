import { readFileSync, readdirSync, existsSync } from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "src/content");

export function getPageSlugs(type: string, locale = "en"): string[] {
  const dir = path.join(CONTENT_ROOT, type, locale);
  if (!existsSync(dir)) {
    const enDir = path.join(CONTENT_ROOT, type, "en");
    if (!existsSync(enDir)) return [];
    return readdirSync(enDir)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(".mdx", ""));
  }
  return readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}

export function getPageContent(
  type: string,
  slug: string,
  locale = "en"
): { frontmatter: Record<string, unknown>; content: string; slug: string } {
  const localePath = path.join(CONTENT_ROOT, type, locale, `${slug}.mdx`);
  const enPath = path.join(CONTENT_ROOT, type, "en", `${slug}.mdx`);
  const filePath = existsSync(localePath) ? localePath : enPath;

  const raw = readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data, content, slug };
}
