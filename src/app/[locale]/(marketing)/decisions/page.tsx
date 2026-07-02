import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Scale } from "lucide-react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DecisionsPage" });
  return buildPageMetadata({
    locale,
    path: "/decisions",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

const DECISIONS = [
  {
    id: "ADR-001",
    title: "Go for warehouse search service, not Java",
    context: "OZON needed a high-concurrency search microservice for 200M warehouse items. Java/Spring was the team default.",
    options: ["Go", "Java/Spring Boot", "Python/FastAPI"],
    decision: "Go",
    reasoning:
      "Go's goroutine model handles 10K concurrent connections with ~50MB RAM vs. Java's thread-per-request model needing ~2GB. Single binary deployment eliminates JVM overhead. The team already knew Go.",
    tradeoffs: "Fewer libraries than Java ecosystem. String manipulation is more verbose. No generics at the time (pre-Go 1.18).",
    outcome: "Service runs on a single 2-core instance serving 500 RPS at P95 < 80ms. Java equivalent would have needed 4x the hardware.",
    tags: ["Go", "Performance", "Architecture"],
    status: "accepted",
  },
  {
    id: "ADR-002",
    title: "ElasticSearch over PostgreSQL full-text for search",
    context: "PostgreSQL FTS was hitting 8-10s at 200M documents. A search engine was clearly needed.",
    options: ["ElasticSearch", "PostgreSQL full-text", "Typesense", "Meilisearch"],
    decision: "ElasticSearch",
    reasoning:
      "ES supports custom analyzers for Russian transliteration (a hard requirement). Fuzzy matching and phonetic analysis work out of the box. Horizontal sharding is transparent. Team had prior experience.",
    tradeoffs: "Operational complexity vs. Postgres (separate cluster, JVM memory). Eventual consistency between Postgres (source of truth) and ES (search replica). Complex upgrade path.",
    outcome: "Search latency dropped from 8-10s to <500ms P99. Custom analyzer solved transliteration with ~2% false positive rate.",
    tags: ["ElasticSearch", "Search", "Database"],
    status: "accepted",
  },
  {
    id: "ADR-003",
    title: "Kafka for search index updates, not polling",
    context: "ES index needs to stay current with the product catalog. Options: poll DB, use CDC, or event stream.",
    options: ["DB polling", "PostgreSQL CDC (Debezium)", "Kafka events from catalog service"],
    decision: "Kafka events from catalog service",
    reasoning:
      "Catalog service already published events to Kafka. Consuming them is simpler than setting up Debezium CDC. Kafka's consumer group semantics allow replay on failure. Sub-2s lag is acceptable.",
    tradeoffs: "Depends on catalog service publishing correct events (coupling). Requires handling out-of-order events. CDC would be more robust for high-volume bulk updates.",
    outcome: "Works well for normal traffic. Exposed a gap during bulk catalog updates where event ordering caused temporary stale data.",
    tags: ["Kafka", "Architecture", "ElasticSearch"],
    status: "accepted",
  },
  {
    id: "ADR-004",
    title: "MQTT over HTTP for camera-to-backend communication",
    context: "Parking cameras need to push occupancy events to the backend. Cameras are on a campus LAN.",
    options: ["HTTP polling", "HTTP webhooks from cameras", "MQTT pub/sub", "WebSockets"],
    decision: "MQTT",
    reasoning:
      "Cameras are resource-constrained (embedded C, limited RAM). MQTT is designed for IoT — small payload overhead, persistent connections, QoS levels for at-least-once delivery. Single broker handles hundreds of cameras.",
    tradeoffs: "Adds MQTT broker as infrastructure dependency. Topic schema needs discipline or becomes chaotic. Harder to debug than REST.",
    outcome: "Event latency <200ms from camera to dashboard. Broker handles 200 cameras with <5% CPU on a modest VM.",
    tags: ["MQTT", "IoT", "Architecture", "Embedded"],
    status: "accepted",
  },
];

const STATUS_CONFIG = {
  accepted: { label: "Accepted", variant: "default" as const },
  superseded: { label: "Superseded", variant: "secondary" as const },
  deprecated: { label: "Deprecated", variant: "destructive" as const },
  proposed: { label: "Proposed", variant: "outline" as const },
};

export default async function DecisionsPage({
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
          <Scale className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Engineering Decisions</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          A public ADR (Architecture Decision Record) database. Every significant technical
          decision I've made — context, options, reasoning, tradeoffs, and outcome.
        </p>
      </div>

      <div className="space-y-8">
        {DECISIONS.map((adr) => (
          <article key={adr.id} className="rounded-xl border p-6">
            <div className="flex items-start justify-between gap-4 mb-1">
              <div>
                <span className="text-xs font-mono text-muted-foreground">{adr.id}</span>
                <h2 className="font-semibold text-lg mt-0.5">{adr.title}</h2>
              </div>
              <Badge variant={STATUS_CONFIG[adr.status as keyof typeof STATUS_CONFIG].variant} className="text-xs shrink-0">
                {STATUS_CONFIG[adr.status as keyof typeof STATUS_CONFIG].label}
              </Badge>
            </div>

            <div className="space-y-4 mt-4 text-sm">
              <div>
                <span className="font-medium text-xs uppercase tracking-wider text-muted-foreground">Context</span>
                <p className="mt-1 text-muted-foreground">{adr.context}</p>
              </div>

              <div>
                <span className="font-medium text-xs uppercase tracking-wider text-muted-foreground">Options considered</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {adr.options.map((opt) => (
                    <Badge
                      key={opt}
                      variant={opt === adr.decision ? "default" : "outline"}
                      className="text-xs"
                    >
                      {opt === adr.decision && "✓ "}{opt}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-medium text-xs uppercase tracking-wider text-muted-foreground">Reasoning</span>
                <p className="mt-1">{adr.reasoning}</p>
              </div>

              <div>
                <span className="font-medium text-xs uppercase tracking-wider text-muted-foreground">Tradeoffs</span>
                <p className="mt-1 text-muted-foreground">{adr.tradeoffs}</p>
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border-l-2 border-green-500">
                <span className="font-semibold text-xs uppercase tracking-wider">Outcome</span>
                <p className="mt-1">{adr.outcome}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mt-4">
              {adr.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
