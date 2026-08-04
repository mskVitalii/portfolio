import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ArrowLeft, Building2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PROJECTS, EDUCATION_PROJECTS, periodEndKey, imageSrc } from "@/data/projects";
import { COMPANY_BUNDLES, getCompanyBundleBySlug } from "@/data/companies";
import { CompanyBlurb } from "@/components/projects/CompanyBlurb";
import { CompanyCredit } from "@/components/projects/CompanyCredit";
import { ProjectDetailSection } from "@/components/projects/ProjectDetailSection";
import { NextProjectLink } from "@/components/projects/NextProjectLink";
import { localize } from "@/lib/localized";
import { routing } from "@/i18n/routing";

function getCompanyProjects(companyName: string) {
  return [...PROJECTS, ...EDUCATION_PROJECTS]
    .filter((p) => p.company === companyName)
    .sort((a, b) => periodEndKey(b.period) - periodEndKey(a.period));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; companySlug: string }>;
}): Promise<Metadata> {
  const { locale, companySlug } = await params;
  const bundle = getCompanyBundleBySlug(companySlug);
  if (!bundle) return {};

  const t = await getTranslations({ locale, namespace: "Common" });
  const siteName = t("siteName");
  const description = localize(bundle.blurb.business, locale);
  const ogUrl = buildOgImageUrl(locale, { title: bundle.name, subtitle: description });

  return {
    title: bundle.name,
    description,
    openGraph: {
      title: `${bundle.name} | ${siteName}`,
      description,
      type: "website",
      siteName,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
      ...buildOpenGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: `${bundle.name} | ${siteName}`,
      description,
      images: [ogUrl],
    },
    alternates: buildAlternates(locale, `/projects/company/${companySlug}`),
  };
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    COMPANY_BUNDLES.map((bundle) => ({ locale, companySlug: bundle.slug }))
  );
}

export default async function CompanyProjectsPage({
  params,
}: {
  params: Promise<{ locale: string; companySlug: string }>;
}) {
  const { locale, companySlug } = await params;
  setRequestLocale(locale);

  const bundle = getCompanyBundleBySlug(companySlug);
  if (!bundle) notFound();

  const projects = getCompanyProjects(bundle.name);
  if (projects.length === 0) notFound();

  const t = await getTranslations({ locale, namespace: "Projects" });
  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const bundleDescription = localize(bundle.blurb.business, locale);
  const breadcrumbItems = [
    { name: tNav("home"), path: "" },
    { name: tNav("projects"), path: "/projects" },
    { name: bundle.name, path: `/projects/company/${companySlug}` },
  ];
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(locale, breadcrumbItems);
  const webPageJsonLd = buildWebPageJsonLd({
    locale,
    path: `/projects/company/${companySlug}`,
    name: bundle.name,
    description: bundleDescription,
  });

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <Breadcrumbs items={breadcrumbItems} />
      <Link
        href="/projects"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-8 -ml-2")}
      >
        <ArrowLeft className="h-4 w-4 mr-1.5" />
        {t("allProjects")}
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-2.5 mb-4">
          <Building2 className="h-6 w-6 text-primary" />
          <h1 className="text-4xl font-bold">{bundle.name}</h1>
        </div>
        <CompanyBlurb blurb={bundle.blurb} className="mb-4" />
        {bundle.credit && <CompanyCredit credit={bundle.credit} />}
      </header>

      {projects.map((project, i) => {
        const { demoUrl, relatedUrls } = classifyProjectLinks(project.links);
        const projectJsonLd = buildProjectJsonLd({
          locale,
          path: `/projects/company/${companySlug}#${project.slug}`,
          name: localize(project.title, locale),
          description: localize(project.description.business, locale),
          image: project.images?.[0] ? `${BASE_URL}${imageSrc(project.images[0])}` : undefined,
          keywords: project.stack,
          demoUrl,
          relatedUrls,
        });
        return (
          <div key={project.slug} id={project.slug} className="scroll-mt-20">
            <JsonLd data={projectJsonLd} />
            {i > 0 && <hr className="border-border my-12" />}
            <ProjectDetailSection project={project} locale={locale} titleAs="h2" />
          </div>
        );
      })}
      <NextProjectLink slug={projects[projects.length - 1].slug} locale={locale} />
    </main>
  );
}
