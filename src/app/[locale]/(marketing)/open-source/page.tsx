import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { ExternalLink, GitFork, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "OpenSourcePage" });
  return buildPageMetadata({
    locale,
    path: "/open-source",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

const CONTRIBUTIONS = [
  {
    repo: "reactjs/react-redux",
    description: "Translated the official React Redux documentation into Russian.",
    type: "translation",
    url: "https://github.com/reactjs/react-redux",
    tags: ["Docs", "React", "Russian"],
  },
];

const OWN_REPOS = [
  {
    name: "Coming soon",
    description: "Extracting internal tooling from work projects. First repo expected Q3 2025.",
    stars: null,
    forks: null,
    tags: ["Go", "CLI"],
    url: null,
    status: "planned" as const,
  },
];

export default async function OpenSourcePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Open Source</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Contributions to open source projects and public experiments. More coming as I
          extract internal tooling from work projects.
        </p>
        <a
          href="https://github.com/mskvitalii"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4 gap-1.5")}
        >
          <ExternalLink className="h-4 w-4" />
          github.com/mskvitalii
        </a>
      </div>

      {/* Contributions */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
          Contributions
        </h2>
        <div className="space-y-4">
          {CONTRIBUTIONS.map((contrib) => (
            <div key={contrib.repo} className="flex items-start gap-4 p-5 rounded-xl border">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <a
                    href={contrib.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
                  >
                    {contrib.repo}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{contrib.description}</p>
                <div className="flex flex-wrap gap-1">
                  {contrib.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Own repos */}
      <section>
        <h2 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
          Own projects
        </h2>
        <div className="space-y-4">
          {OWN_REPOS.map((repo) => (
            <div
              key={repo.name}
              className={cn(
                "flex items-start gap-4 p-5 rounded-xl border",
                repo.status === "planned" && "border-dashed opacity-60"
              )}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm font-medium">{repo.name}</span>
                  {repo.stars !== null && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3" /> {repo.stars}
                    </span>
                  )}
                  {repo.forks !== null && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <GitFork className="h-3 w-3" /> {repo.forks}
                    </span>
                  )}
                  {repo.status === "planned" && (
                    <Badge variant="outline" className="text-xs">Planned</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{repo.description}</p>
                <div className="flex flex-wrap gap-1">
                  {repo.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
