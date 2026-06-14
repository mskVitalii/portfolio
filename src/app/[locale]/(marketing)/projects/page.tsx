import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { PROJECTS, EDUCATION_PROJECTS } from "@/data/projects";
import { ProjectsView } from "@/components/projects/ProjectsView";

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
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates(locale, "/projects"),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Case studies from real engineering work. Switch the audience mode in the
          header to see each project from a different perspective.
        </p>
      </div>

      <ProjectsView
          projects={PROJECTS}
          allProjects={[...PROJECTS, ...EDUCATION_PROJECTS]}
        />
    </main>
  );
}
