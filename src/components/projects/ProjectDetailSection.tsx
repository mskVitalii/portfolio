import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { getTranslations } from "next-intl/server";
import { Calendar, Building2, AlertCircle, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { localize } from "@/lib/localized";
import { useMDXComponents } from "../../../mdx-components";
import { getPageContent, getPageSlugs } from "@/lib/content";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { ProjectImageGallery } from "./ProjectImageGallery";
import { ProjectDescription } from "./ProjectDescription";
import { AdBidderDemo } from "./AdBidderDemo";
import { IpoSimulator } from "./IpoSimulator";
import { PseoLanguageGrid } from "./PseoLanguageGrid";
import type { Project } from "@/data/projects";

/** Full case-study block for one project — title through MDX write-up. Reused
 * both by the standalone /projects/[slug] page and, per-project, by the
 * merged /projects/company/[slug] bundle page. */
export async function ProjectDetailSection({
  project,
  locale,
  titleAs: Title = "h1",
}: {
  project: Project;
  locale: string;
  titleAs?: "h1" | "h2";
}) {
  const t = await getTranslations({ locale, namespace: "Projects" });
  let mdxContent: React.ReactNode = null;
  const slugs = getPageSlugs("projects", locale);

  if (slugs.includes(project.slug)) {
    const { content } = getPageContent("projects", project.slug, locale);
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
    <div>
      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <ProjectStatusBadge status={project.status} />
          <Badge variant="outline" className="text-xs">
            {t(`categories.${project.category}` as "categories.work")}
          </Badge>
        </div>

        <Title className="text-4xl font-bold mb-3">{localize(project.title, locale)}</Title>
        <p className="text-xl text-muted-foreground mb-6">{localize(project.tagline, locale)}</p>

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
            <span>{localize(project.statusNote, locale)}</span>
          </div>
        )}
      </header>

      {/* Impact metrics */}
      {project.impact && project.impact.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10 p-6 rounded-xl bg-muted/30 border">
          {project.impact.map((item) => (
            <div key={item.label.en} className="text-center">
              <div className="text-3xl font-bold text-primary">{item.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{localize(item.label, locale)}</div>
            </div>
          ))}
        </div>
      )}

      {/* Mode-aware description (STAR cards for HR mode when available) */}
      <ProjectDescription project={project} />

      {/* Interactive demo for the ad-bidding mechanic */}
      {project.slug === "wedo-ecommerce-bidder" && <AdBidderDemo />}

      {/* Interactive demo for the Cyprus IPO mechanic */}
      {project.slug === "audioland-musicgen" && <IpoSimulator />}

      {/* Interactive demo for the programmatic-SEO language-pair mechanic */}
      {project.slug === "wedo-ai-video-dubbing" && <PseoLanguageGrid />}

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
              {t(`linkLabels.${link.labelKey}` as "linkLabels.demo")}
              <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
            </a>
          ))}
        </div>
      )}

      {/* Image gallery */}
      {project.images && project.images.length > 0 && (
        <ProjectImageGallery
          images={project.images}
          alt={localize(project.title, locale)}
          strings={{
            zoomAria: t("galleryZoomAria"),
            closeAria: t("galleryCloseAria"),
            prevAria: t("galleryPrevAria"),
            nextAria: t("galleryNextAria"),
          }}
        />
      )}

      {/* MDX body */}
      {mdxContent && (
        <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-code:text-sm">
          {mdxContent}
        </article>
      )}
    </div>
  );
}
