import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Failure Stories",
  description: "Engineering mistakes, what went wrong, and what I learned. Real post-mortems.",
};

const FAILURES = [
  {
    title: "The Microservice That Became a Monolith",
    problem: "Split a perfectly fine service into 6 microservices because 'that's how Netflix does it'.",
    mistake: "Applied enterprise patterns to a system with 3 users and no scaling requirements.",
    consequence: "Doubled deployment complexity, increased latency by 40ms per request, and took 3x longer to add features.",
    fix: "Merged all 6 back into 2 services with clear domain boundaries. Much simpler, just as fast.",
    lesson: "Microservices solve an organizational scaling problem, not a technical one. At small scale they're almost always a net negative.",
    tags: ["Architecture", "Distributed Systems"],
    severity: "medium" as const,
  },
  {
    title: "ElasticSearch Index Design Mistake",
    problem: "Designed an ES index without thinking about update patterns — built it optimised for reads.",
    mistake: "Didn't account for partial document updates. Every update required re-indexing the full document including nested arrays.",
    consequence: "Index update rate hit ES write throughput limits during catalog bulk updates. 15-minute indexing lag appeared.",
    fix: "Denormalized the nested data into separate indices. Introduced a Kafka topic as a buffer to smooth out write spikes.",
    lesson: "Design indices for your update patterns first, query patterns second. Measure write amplification before going live.",
    tags: ["ElasticSearch", "Search", "Performance"],
    severity: "high" as const,
  },
  {
    title: "Wrong Scaling Decision: Vertical Instead of Horizontal",
    problem: "PostgreSQL queries getting slow. Added more RAM and CPU to the instance.",
    mistake: "The real problem was missing indices and an N+1 query from the ORM. Vertical scaling masked it.",
    consequence: "Spent budget on hardware, queries got marginally faster, N+1 came back 2 months later at higher scale.",
    fix: "Profiled queries with pg_stat_statements, added composite indices, rewrote the hot ORM paths to use raw SQL joins.",
    lesson: "Profile before scaling. Hardware masks problems; it doesn't solve them.",
    tags: ["PostgreSQL", "Performance", "Backend"],
    severity: "medium" as const,
  },
  {
    title: "Shipping a Feature Nobody Used",
    problem: "Spent 3 weeks building a complex filtering system for a dashboard.",
    mistake: "Never talked to users. Assumed the feature was needed based on a single offhand comment.",
    consequence: "Feature went live, zero users clicked it in 4 weeks. The PM eventually removed it.",
    fix: "Introduced a \"question before ticket\" rule: every feature needs a user interview or analytics data to justify it.",
    lesson: "The most expensive code is code nobody uses. Time spent on discovery is always worth it.",
    tags: ["Product", "Process"],
    severity: "low" as const,
  },
];

const SEVERITY_CONFIG = {
  low: { label: "Low impact", variant: "secondary" as const },
  medium: { label: "Medium impact", variant: "default" as const },
  high: { label: "High impact", variant: "destructive" as const },
};

export default async function FailuresPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-8 w-8 text-amber-500" />
          <h1 className="text-4xl font-bold">Failure Stories</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Real engineering mistakes, their consequences, and what I learned.
          I write these because the engineers I trust most are the ones who can
          talk honestly about what went wrong.
        </p>
      </div>

      <div className="space-y-8">
        {FAILURES.map((failure) => (
          <article key={failure.title} className="rounded-xl border p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h2 className="font-semibold text-lg">{failure.title}</h2>
              <Badge variant={SEVERITY_CONFIG[failure.severity].variant} className="text-xs shrink-0">
                {SEVERITY_CONFIG[failure.severity].label}
              </Badge>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground uppercase tracking-wider text-xs">Problem</span>
                <p className="mt-1">{failure.problem}</p>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 shrink-0 text-destructive mt-0.5" />
                <div>
                  <span className="font-medium text-muted-foreground uppercase tracking-wider text-xs">Mistake</span>
                  <p className="mt-1">{failure.mistake}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                <div>
                  <span className="font-medium text-muted-foreground uppercase tracking-wider text-xs">Consequence</span>
                  <p className="mt-1">{failure.consequence}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                <div>
                  <span className="font-medium text-muted-foreground uppercase tracking-wider text-xs">Fix</span>
                  <p className="mt-1">{failure.fix}</p>
                </div>
              </div>
              <div className="mt-4 p-4 rounded-lg bg-muted/50 border-l-2 border-primary">
                <span className="font-semibold text-xs uppercase tracking-wider">Lesson</span>
                <p className="mt-1 font-medium">{failure.lesson}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mt-4">
              {failure.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
