import { setRequestLocale } from "next-intl/server";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { useMDXComponents } from "../../../../mdx-components";
import { getPageContent } from "@/lib/content";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function SkeletonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { frontmatter, content } = getPageContent("pages", "skeleton", locale);

  const { content: rendered } = await compileMDX({
    source: content,
    components: useMDXComponents({}),
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            { theme: { dark: "github-dark-dimmed", light: "github-light" } },
          ],
        ],
      },
    },
  });

  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">
        {frontmatter.title as string}
      </h1>
      <p className="text-muted-foreground mb-8">
        {frontmatter.summary as string}
      </p>
      <article>{rendered}</article>
    </main>
  );
}
