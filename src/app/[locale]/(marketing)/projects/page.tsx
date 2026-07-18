import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildPageMetadata, buildNavBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo";
import { PROJECTS, EDUCATION_PROJECTS } from "@/data/projects";
import { ProjectsView } from "@/components/projects/ProjectsView";
import { JsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Projects" });
  return buildPageMetadata({
    locale,
    path: "/projects",
    title: t("title"),
    description: t("metaDescription"),
  });
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Projects" });
  const breadcrumbJsonLd = await buildNavBreadcrumbJsonLd(locale, "projects", "/projects");
  const webPageJsonLd = buildWebPageJsonLd({
    locale,
    path: "/projects",
    name: t("title"),
    description: t("metaDescription"),
  });

  return (
    <main className="container mx-auto px-4 py-16 max-w-5xl">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">{t("subtitle")}</p>
      </div>

      <ProjectsView
          projects={PROJECTS}
          allProjects={[...PROJECTS, ...EDUCATION_PROJECTS]}
        />
    </main>
  );
}
