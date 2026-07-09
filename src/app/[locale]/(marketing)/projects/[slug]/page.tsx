import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraphLocale } from "@/lib/seo";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import Image from "next/image";
import { ArrowLeft, Calendar, Building2, AlertCircle, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMDXComponents } from "../../../../../../mdx-components";
import { getPageContent, getPageSlugs } from "@/lib/content";
import { getProject, PROJECTS, EDUCATION_PROJECTS } from "@/data/projects";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const ogUrl = `/og?title=${encodeURIComponent(project.title)}&subtitle=${encodeURIComponent(project.tagline)}${project.impact?.[0] ? `&metric=${encodeURIComponent(project.impact[0].value)}` : ""}`;

  return {
    title: project.title,
    description: project.description.business,
    openGraph: {
      title: `${project.title} | Vitalii Popov`,
      description: project.description.business,
      type: "website",
      siteName: "Vitalii Popov",
      images: [{ url: ogUrl, width: 1200, height: 630 }],
      ...buildOpenGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Vitalii Popov`,
      description: project.description.business,
      images: [ogUrl],
    },
    alternates: buildAlternates(locale, `/projects/${slug}`),
  };
}

export function generateStaticParams() {
  const slugs = [...PROJECTS, ...EDUCATION_PROJECTS].map((p) => p.slug);
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export const dynamicParams = false;

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project) notFound();

  let mdxContent: React.ReactNode = null;
  const slugs = getPageSlugs("projects", locale);

  if (slugs.includes(slug)) {
    const { content } = getPageContent("projects", slug, locale);
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
    mdxContent = rendered;
  }

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <Link
        href="/projects"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-8 -ml-2")}
      >
        <ArrowLeft className="h-4 w-4 mr-1.5" />
        All projects
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <ProjectStatusBadge status={project.status} />
          <Badge variant="outline" className="text-xs capitalize">
            {project.category}
          </Badge>
        </div>

        <h1 className="text-4xl font-bold mb-3">{project.title}</h1>
        <p className="text-xl text-muted-foreground mb-6">{project.tagline}</p>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {project.company && (
            <span className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4" />
              {project.company}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {project.period}
          </span>
        </div>

        {project.statusNote && project.status !== "active" && (
          <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-4 py-3">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{project.statusNote}</span>
          </div>
        )}
      </header>

      {/* Impact metrics */}
      {project.impact && project.impact.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10 p-6 rounded-xl bg-muted/30 border">
          {project.impact.map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-3xl font-bold text-primary">{item.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.stack.map((tech) => (
          <Badge key={tech} variant="secondary">
            {tech}
          </Badge>
        ))}
      </div>

      {/* External links */}
      {project.links && project.links.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-10">
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              {link.label}
              <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
            </a>
          ))}
        </div>
      )}

      {/* Image gallery */}
      {project.images && project.images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
          {project.images.map((src) => (
            <div key={src} className="relative aspect-video rounded-lg overflow-hidden border bg-muted">
              <Image src={src} alt={project.title} fill className="object-cover" sizes="(max-width: 640px) 50vw, 33vw" />
            </div>
          ))}
        </div>
      )}

      {/* MDX body */}
      {mdxContent ? (
        <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-code:text-sm">
          {mdxContent}
        </article>
      ) : (
        <div className="text-muted-foreground text-center py-16 border border-dashed rounded-xl">
          <p className="font-medium mb-2">Detailed write-up coming soon</p>
          <p className="text-sm">The overview is above; the full case study is being written.</p>
        </div>
      )}
    </main>
  );
}
