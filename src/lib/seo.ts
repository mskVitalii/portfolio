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
    languages: Object.fromEntries(
      LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`])
    ) as Record<string, string>,
  };
}

export function buildOpenGraphLocale(locale: string) {
  const current = OG_LOCALES[locale as (typeof LOCALES)[number]] ?? OG_LOCALES.en;
  return {
    locale: current,
    alternateLocale: Object.values(OG_LOCALES).filter((l) => l !== current),
  };
}

export function buildPageMetadata({
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
  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      title,
      description,
      type: "website" as const,
      siteName: "Vitalii Popov",
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
      ...buildOpenGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: ["/og-default.png"],
    },
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
