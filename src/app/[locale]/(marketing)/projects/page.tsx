import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { PROJECTS } from "@/data/projects";
import { ProjectsFilter } from "@/components/projects/ProjectsFilter";
import { ProjectsMap } from "@/components/projects/ProjectsMap";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Projects",
  description:
    "Work, experiments, and case studies — each with a business, HR, and technical perspective.",
};

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

      <ProjectsMap />
      <ProjectsFilter projects={PROJECTS} />
    </main>
  );
}
