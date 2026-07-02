import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPage" });
  return buildPageMetadata({
    locale,
    path: "/blog",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

const PUBLISHED_ELSEWHERE = [
  {
    title: "Как мы реализовали семантический поиск для 200 млн товаров",
    platform: "Habr",
    url: "https://habr.com",
    views: "5,000+",
    tags: ["ElasticSearch", "Go", "Search"],
    lang: "RU",
  },
];

const COMING_SOON = [
  {
    title: "Building a Parking Guidance System: From Embedded C to React Dashboard",
    tags: ["Computer Vision", "Python", "React", "Architecture"],
  },
  {
    title: "Go vs. C# for High-Throughput Microservices: A Practical Comparison",
    tags: ["Go", "C#", "Performance"],
  },
  {
    title: "A/B Testing at Scale: Why We Moved Flag Assignment Server-Side",
    tags: ["Experimentation", "Rails", "Frontend"],
  },
  {
    title: "The Cache Invalidation Problem I Didn't Solve Until It Was Too Late",
    tags: ["Redis", "Kafka", "Lessons Learned"],
  },
];

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground text-lg">
          Technical deep-dives, case studies, and engineering lessons. Not tutorials —
          stories from real systems.
        </p>
      </div>

      {/* Published elsewhere */}
      {PUBLISHED_ELSEWHERE.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4 text-muted-foreground uppercase tracking-wider text-sm">
            Published elsewhere
          </h2>
          <div className="space-y-4">
            {PUBLISHED_ELSEWHERE.map((post) => (
              <a
                key={post.title}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start justify-between gap-4 p-5 rounded-xl border hover:border-primary/50 hover:bg-muted/30 transition-all group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase">{post.platform}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{post.views} views</span>
                    <Badge variant="outline" className="text-xs">{post.lang}</Badge>
                  </div>
                  <p className="font-medium group-hover:text-primary transition-colors">{post.title}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Coming soon */}
      <section>
        <h2 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
          In the pipeline
        </h2>
        <div className="space-y-3">
          {COMING_SOON.map((post) => (
            <div
              key={post.title}
              className="flex items-start gap-4 p-5 rounded-xl border border-dashed opacity-60"
            >
              <div className="flex-1">
                <p className="font-medium">{post.title}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
              <Badge variant="secondary" className="text-xs shrink-0">Draft</Badge>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
