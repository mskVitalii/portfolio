import { getTranslations } from "next-intl/server";

export const BASE_URL = "https://vitaliipopov.dev";
const LOCALES = ["en", "de", "ru"] as const;

const OG_LOCALES: Record<(typeof LOCALES)[number], string> = {
  en: "en_US",
  de: "de_DE",
  ru: "ru_RU",
};

export function buildAlternates(locale: string, path: string) {
  return {
    canonical: `${BASE_URL}/${locale}${path}`,
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`])),
      // Fallback for languages we don't explicitly serve — Google recommends
      // an x-default entry alongside per-locale hreflang, pointing at the
      // default-locale version.
      "x-default": `${BASE_URL}/en${path}`,
    } as Record<string, string>,
  };
}

export function buildOpenGraphLocale(locale: string) {
  const current = OG_LOCALES[locale as (typeof LOCALES)[number]] ?? OG_LOCALES.en;
  return {
    locale: current,
    alternateLocale: Object.values(OG_LOCALES).filter((l) => l !== current),
  };
}

/** Builds a locale-prefixed URL for the dynamic `/[locale]/og` image route (must match its actual path — an unprefixed `/og` 404s since locales are always prefixed). */
export function buildOgImageUrl(
  locale: string,
  { title, subtitle, metric }: { title: string; subtitle?: string; metric?: string }
) {
  const params = new URLSearchParams({ title });
  if (subtitle) params.set("subtitle", subtitle);
  if (metric) params.set("metric", metric);
  return `/${locale}/og?${params.toString()}`;
}

export async function buildPageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
}) {
  const t = await getTranslations({ locale, namespace: "Common" });
  const siteName = t("siteName");
  const ogImage = buildOgImageUrl(locale, { title });
  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      title,
      description,
      type: "website" as const,
      siteName,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      ...buildOpenGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [ogImage],
    },
  };
}

export type FaqItem = { q: string; a: string };

/**
 * FAQPage schema — not QAPage. QAPage is for forum-style pages with a single
 * question and multiple community-submitted answers (Stack Overflow style);
 * misusing it on an owner-authored FAQ violates Google's structured-data
 * content policy. Only pass items that are actually rendered in the page's
 * default (server-rendered) output, since structured data must match visible
 * content — mode-gated FAQ variants that aren't in the initial DOM don't qualify.
 */
export function buildFaqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function buildBreadcrumbJsonLd(locale: string, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}/${locale}${item.path}`,
    })),
  };
}

/** Breadcrumb for a top-level marketing page reachable directly from Home, using the shared Nav translations. */
export async function buildNavBreadcrumbJsonLd(locale: string, navKey: string, path: string) {
  const t = await getTranslations({ locale, namespace: "Nav" });
  return buildBreadcrumbJsonLd(locale, [
    { name: t("home"), path: "" },
    { name: t(navKey), path },
  ]);
}
