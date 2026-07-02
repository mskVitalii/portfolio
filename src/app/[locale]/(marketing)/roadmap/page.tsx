import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code2, Target, Lightbulb } from "lucide-react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RoadmapPage" });
  return buildPageMetadata({
    locale,
    path: "/roadmap",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

const LEARNING_NOW = [
  {
    topic: "Advanced AI Systems & Agent Architectures",
    context: "Master's thesis focus + personal experiments with LLM orchestration",
    resources: ["Building production RAG pipelines", "Studying multi-agent coordination patterns"],
  },
  {
    topic: "Distributed Systems Design",
    context: "Going deeper beyond implementation — formal models, consensus algorithms",
    resources: ["DDIA (Kleppmann) re-read", "MIT 6.824 lecture series"],
  },
  {
    topic: "Rust",
    context: "Exploring for systems programming and WASM targets",
    resources: ["The Rust Book", "Building CLI tools as practice"],
  },
];

const BUILDING_NOW = [
  {
    title: "Master's Thesis",
    description: "Building and evaluating an AI-powered system. Topic intersects distributed computing and LLM tooling. Defense scheduled: Sep 2025.",
    status: "in-progress",
  },
  {
    title: "This website",
    description: "Iteratively building out the portfolio itself — each section is a mini project with real engineering decisions.",
    status: "in-progress",
  },
  {
    title: "Open-source tooling",
    description: "Small CLI utilities and libraries from internal tooling I've built at work, being extracted and open-sourced.",
    status: "planned",
  },
];

const GOALS_2025 = [
  "Defend Master's thesis (Sep 2025)",
  "Ship 2 open-source tools with real users",
  "Write 4 technical deep-dive articles",
  "Contribute meaningfully to a Go or Rust project",
  "Land a role focused on distributed systems or AI infrastructure",
];

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Public Roadmap</h1>
        <p className="text-muted-foreground text-lg">
          What I'm working on, learning, and planning. Updated periodically.
        </p>
      </div>

      {/* Learning Now */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Currently learning</h2>
        </div>
        <div className="space-y-5">
          {LEARNING_NOW.map((item) => (
            <div key={item.topic} className="rounded-xl border p-5">
              <h3 className="font-semibold mb-1">{item.topic}</h3>
              <p className="text-sm text-muted-foreground mb-3">{item.context}</p>
              <ul className="space-y-1">
                {item.resources.map((r) => (
                  <li key={r} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">→</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Building Now */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-6">
          <Code2 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Currently building</h2>
        </div>
        <div className="space-y-4">
          {BUILDING_NOW.map((item) => (
            <div key={item.title} className="flex items-start gap-4 rounded-xl border p-5">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <Badge
                    variant={item.status === "in-progress" ? "default" : "outline"}
                    className="text-xs"
                  >
                    {item.status === "in-progress" ? "In progress" : "Planned"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Goals */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-6">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">2025 goals</h2>
        </div>
        <ul className="space-y-3">
          {GOALS_2025.map((goal) => (
            <li key={goal} className="flex items-start gap-3 text-sm">
              <span className="h-5 w-5 rounded-full border-2 border-border shrink-0 mt-0.5" />
              {goal}
            </li>
          ))}
        </ul>
      </section>

      {/* Growth mindset note */}
      <div className="rounded-xl bg-muted/50 border p-5 flex gap-3">
        <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          This roadmap is public because showing growth mindset matters more than
          pretending to know everything. The best engineers I know are always learning.
        </p>
      </div>
    </main>
  );
}
