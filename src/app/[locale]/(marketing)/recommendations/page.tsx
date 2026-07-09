import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildPageMetadata, buildNavBreadcrumbJsonLd } from "@/lib/seo";
import { ExternalLink } from "lucide-react";
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
  const t = await getTranslations({ locale, namespace: "RecommendationsPage" });
  return buildPageMetadata({
    locale,
    path: "/recommendations",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function RecommendationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const breadcrumbJsonLd = await buildNavBreadcrumbJsonLd(locale, "recommendations", "/recommendations");

  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <JsonLd data={breadcrumbJsonLd} />
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Recommendations</h1>
        <p className="text-muted-foreground text-lg">
          What colleagues, managers, and collaborators say about working with me.
        </p>
      </div>

      <div className="rounded-xl border border-dashed p-10 text-center">
        <p className="font-medium mb-2">Collecting recommendations</p>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          I'm reaching out to former colleagues and managers. This section will be
          updated with verified testimonials shortly.
        </p>
        <a
          href="https://linkedin.com/in/mskvitalii"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-6 text-sm text-primary hover:underline"
        >
          See LinkedIn recommendations
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </main>
  );
}
