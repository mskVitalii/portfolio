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
  const ogTitle = `${title} | ${siteName}`;
  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      title: ogTitle,
      description,
      type: "website" as const,
      siteName,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      ...buildOpenGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image" as const,
      title: ogTitle,
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

const KNOWS_ABOUT = [
  "Go", "Python", "C#", "Node.js", "Ruby on Rails", "React", "TypeScript", "Next.js",
  "Tailwind CSS", "Docker", "Kubernetes", "Kafka", "Redis", "PostgreSQL", "ElasticSearch",
  "Helm", "GitHub Actions", "Docker Registry", "Computer Vision", "LLM Integration", "RAG",
  "Qdrant", "Embedding Models", "LangChain", "Ollama", "MCP Server", "Context Engineering",
  "Hugging Face", "Claude Code", "GitHub Copilot", "C",
];

const HAS_CREDENTIAL = [
  { name: "Claude API & SDK Fundamentals", url: "https://verify.skilljar.com/c/arhv5wtraues" },
  { name: "Anthropic API Essentials", url: "https://verify.skilljar.com/c/zxjoevsgqx84" },
  { name: "Claude Code Practitioner", url: "https://verify.skilljar.com/c/7msxhy7wnwq3" },
].map(({ name, url }) => ({
  "@type": "EducationalOccupationalCredential",
  name,
  credentialCategory: "certification",
  recognizedBy: { "@type": "Organization", name: "Anthropic" },
  url,
}));

/** Canonical Person description — shared by the site-wide Person JSON-LD (every page)
 * and the homepage's ProfilePage `mainEntity`, so the two never drift apart. */
export async function buildPersonJsonLd(locale: string) {
  const t = await getTranslations({ locale, namespace: "Hero" });
  const description = `${t("tagline")} ${t("taglineHighlight")}${t("taglineEnd")} ${t("experience")}`;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vitalii Popov",
    givenName: "Vitalii",
    familyName: "Popov",
    url: `${BASE_URL}/${locale}`,
    image: `${BASE_URL}/images/about/avatar/vitalii.jpg`,
    jobTitle: t("role"),
    description,
    email: "mailto:msk.vitaly@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Berlin",
      addressCountry: "DE",
    },
    areaServed: {
      "@type": "Country",
      name: "Germany",
    },
    knowsLanguage: ["en", "de", "ru"],
    sameAs: [
      "https://linkedin.com/in/mskvitalii",
      "https://github.com/mskvitalii",
      "https://t.me/mskvitalii",
      "https://medium.com/@msk.vitalii",
      "https://habr.com/ru/users/mskVitalii/",
    ],
    worksFor: [
      { "@type": "Organization", name: "Infineon Technologies AG" },
      { "@type": "Organization", name: "OZON Tech" },
    ],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Chemnitz University of Technology" },
      { "@type": "CollegeOrUniversity", name: "Higher School of Economics" },
    ],
    knowsAbout: KNOWS_ABOUT,
    hasCredential: HAS_CREDENTIAL,
  };
}

/** ProfilePage schema for the homepage — Google's recommended wrapper for personal-profile
 * pages, pointing `mainEntity` at the same Person emitted site-wide by `buildPersonJsonLd`. */
export async function buildProfilePageJsonLd(locale: string) {
  const person = await buildPersonJsonLd(locale);
  const { "@context": _context, ...personEntity } = person;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: personEntity,
  };
}

/** WebPage schema for a single page — pair with a page's `generateMetadata` title/description
 * so the two stay in sync instead of drifting into separate copy. */
export function buildWebPageJsonLd({
  locale,
  path,
  name,
  description,
}: {
  locale: string;
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${BASE_URL}/${locale}${path}`,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: "Vitalii Popov",
      url: `${BASE_URL}/${locale}`,
    },
  };
}

type ProjectLinkLike = { labelKey: string; url: string };

// Every `Project.links[].labelKey` in use today (see messages/*.json → Projects.linkLabels),
// split by what the URL actually is. Keys outside both sets (eventPage, competition,
// demoVideo) are intentionally left out of structured data — they describe context around
// a project, not the software itself, so mapping them to schema.org properties would
// overstate what they are.
const SOFTWARE_ACCESS_LABEL_KEYS = new Set([
  "demo", "store", "liveDemo", "liveDemoAdmin", "liveSite", "adminPanel",
  "demoStore", "demoLanding", "originalHackathonDemo", "firebaseExtension", "liveTranslation",
]);
const REPOSITORY_LABEL_KEYS = new Set([
  "github", "githubBackend", "githubFrontend", "githubAdmin", "githubEmbedder",
  "githubReranker", "originalHackathonGithub", "githubStore", "githubLanding",
]);

/**
 * Splits a project's real `links` into a primary access URL (the live app/demo — becomes
 * `SoftwareApplication.url`) and secondary identity URLs (repos, plus any other access
 * points — become `sameAs`), for `buildProjectJsonLd` below.
 */
export function classifyProjectLinks(links: ProjectLinkLike[] = []) {
  const accessLinks = links.filter((l) => SOFTWARE_ACCESS_LABEL_KEYS.has(l.labelKey));
  const repoLinks = links.filter((l) => REPOSITORY_LABEL_KEYS.has(l.labelKey));
  const [primary, ...secondaryAccess] = accessLinks;
  const relatedUrls = [...secondaryAccess, ...repoLinks].map((l) => l.url);
  return { demoUrl: primary?.url, relatedUrls };
}

/**
 * Describes one portfolio project as a SoftwareApplication when it has a real deployed
 * demo or public repo link, otherwise as a CreativeWork — avoids implying every project
 * (e.g. an internal, non-public engagement) is an installable/visitable app when it isn't.
 * `demoUrl`/`relatedUrls` must come from `classifyProjectLinks` — never fabricated.
 */
export function buildProjectJsonLd({
  locale,
  path,
  name,
  description,
  image,
  keywords,
  demoUrl,
  relatedUrls,
}: {
  locale: string;
  path: string;
  name: string;
  description: string;
  image?: string;
  keywords?: string[];
  demoUrl?: string;
  relatedUrls?: string[];
}) {
  const pageUrl = `${BASE_URL}/${locale}${path}`;
  const isSoftware = Boolean(demoUrl || (relatedUrls && relatedUrls.length > 0));

  return {
    "@context": "https://schema.org",
    "@type": isSoftware ? "SoftwareApplication" : "CreativeWork",
    name,
    description,
    mainEntityOfPage: pageUrl,
    url: demoUrl ?? pageUrl,
    inLanguage: locale,
    ...(image && { image }),
    ...(keywords && keywords.length > 0 && { keywords: keywords.join(", ") }),
    ...(relatedUrls && relatedUrls.length > 0 && { sameAs: relatedUrls }),
    ...(isSoftware && { applicationCategory: "DeveloperApplication" }),
    author: { "@type": "Person", name: "Vitalii Popov", url: `${BASE_URL}/${locale}` },
  };
}
