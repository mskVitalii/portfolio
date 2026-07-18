import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  buildAlternates,
  buildOpenGraphLocale,
  buildBreadcrumbJsonLd,
  buildOgImageUrl,
  buildWebPageJsonLd,
  buildProjectJsonLd,
  classifyProjectLinks,
  BASE_URL,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getProject, PROJECTS, EDUCATION_PROJECTS } from "@/data/projects";
import { getCompanyBundle } from "@/data/companies";
import { ProjectDetailSection } from "@/components/projects/ProjectDetailSection";
import { NextProjectLink } from "@/components/projects/NextProjectLink";
import { localize } from "@/lib/localized";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const t = await getTranslations({ locale, namespace: "Common" });
  const siteName = t("siteName");
  const title = localize(project.title, locale);
  const tagline = localize(project.tagline, locale);
  const description = localize(project.description.business, locale);
  const ogUrl = buildOgImageUrl(locale, {
    title,
    subtitle: tagline,
    metric: project.impact?.[0]?.value,
  });

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      type: "website",
      siteName,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
      ...buildOpenGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
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

  const t = await getTranslations({ locale, namespace: "Projects" });

  // Companies with several conceptually-linked projects now live on one
  // merged case-study page — old standalone slugs redirect to their anchor
  // there instead of duplicating the content.
  const bundle = getCompanyBundle(project.company);
  if (bundle) {
    redirect(`/${locale}/projects/company/${bundle.slug}#${project.slug}`);
  }

  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const projectTitle = localize(project.title, locale);
  const projectDescription = localize(project.description.business, locale);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(locale, [
    { name: tNav("home"), path: "" },
    { name: tNav("projects"), path: "/projects" },
    { name: projectTitle, path: `/projects/${slug}` },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    locale,
    path: `/projects/${slug}`,
    name: projectTitle,
    description: projectDescription,
  });
  const { demoUrl, relatedUrls } = classifyProjectLinks(project.links);
  const projectJsonLd = buildProjectJsonLd({
    locale,
    path: `/projects/${slug}`,
    name: projectTitle,
    description: projectDescription,
    image: project.images?.[0] ? `${BASE_URL}${project.images[0]}` : undefined,
    keywords: project.stack,
    demoUrl,
    relatedUrls,
  });

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={projectJsonLd} />
      <Link
        href="/projects"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-8 -ml-2")}
      >
        <ArrowLeft className="h-4 w-4 mr-1.5" />
        {t("allProjects")}
      </Link>

      <ProjectDetailSection project={project} locale={locale} />
      <NextProjectLink slug={project.slug} locale={locale} />
    </main>
  );
}
