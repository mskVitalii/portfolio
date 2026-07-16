import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildAlternates, buildOpenGraphLocale, buildBreadcrumbJsonLd, buildOgImageUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowLeft, Building2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PROJECTS, EDUCATION_PROJECTS } from "@/data/projects";
import { COMPANY_BUNDLES, getCompanyBundleBySlug } from "@/data/companies";
import { CompanyBlurb } from "@/components/projects/CompanyBlurb";
import { CompanyCredit } from "@/components/projects/CompanyCredit";
import { ProjectDetailSection } from "@/components/projects/ProjectDetailSection";
import { localize } from "@/lib/localized";
import { routing } from "@/i18n/routing";

// Same "MM/YYYY" end-date comparison used across the projects section, kept
// local since each usage only needs a simple descending sort.
function periodEndKey(period: string): number {
  const parts = period.split(/\s*[–—-]\s*/);
  const endToken = (parts[1] ?? parts[0]).trim();
  if (endToken.toLowerCase() === "present") return Infinity;
  const match = endToken.match(/(\d{1,2})\/(\d{4})/);
  if (match) return parseInt(match[2], 10) * 12 + parseInt(match[1], 10);
  const year = endToken.match(/\d{4}/);
  return year ? parseInt(year[0], 10) * 12 : 0;
}

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

export const dynamicParams = false;

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
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(locale, [
    { name: tNav("home"), path: "" },
    { name: tNav("projects"), path: "/projects" },
    { name: bundle.name, path: `/projects/company/${companySlug}` },
  ]);

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <JsonLd data={breadcrumbJsonLd} />
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

      {projects.map((project, i) => (
        <div key={project.slug} id={project.slug} className="scroll-mt-20">
          {i > 0 && <hr className="border-border my-12" />}
          <ProjectDetailSection project={project} locale={locale} titleAs="h2" />
        </div>
      ))}
    </main>
  );
}
