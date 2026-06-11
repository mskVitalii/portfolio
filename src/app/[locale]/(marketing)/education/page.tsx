import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { GraduationCap } from "lucide-react";
import { CAREER } from "@/data/career";
import { EDUCATION_PROJECTS } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Education",
  description: "Academic path, university projects, and coursework — from HSE Moscow to Chemnitz University of Technology.",
};

const EDUCATION_ENTRIES = CAREER.filter((e) => e.type === "education");

export default async function EducationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <GraduationCap className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold">Education</h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Academic path from software engineering foundations to distributed systems and cloud — with hands-on projects at each stage.
        </p>
      </div>

      {/* Degrees */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-6">Degrees</h2>
        <div className="space-y-4">
          {EDUCATION_ENTRIES.map((entry) => (
            <div
              key={entry.org}
              className="flex gap-4 rounded-xl border bg-card p-6"
            >
              <div className="w-2 rounded-full bg-primary/30 shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{entry.role}</h3>
                    <p className="text-muted-foreground">{entry.org}</p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">{entry.period}</Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{entry.description}</p>
                {entry.stack && (
                  <div className="flex flex-wrap gap-1">
                    {entry.stack.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Coursework & Projects</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Selected academic projects — each one a real implementation, not a tutorial copy.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {EDUCATION_PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
