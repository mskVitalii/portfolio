import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import { ViewModeProvider } from "@/components/layout/ViewModeProvider";
import { Header } from "@/components/layout/Header";
import { ExploreMore } from "@/components/layout/ExploreMore";
import { Footer } from "@/components/layout/Footer";
import { ModeParamSync } from "@/components/layout/ModeParamSync";
import { AchievementsProvider } from "@/components/achievements/AchievementsProvider";
import { BASE_URL, buildOpenGraphLocale } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Common" });
  const siteName = t("siteName");
  return {
    title: {
      template: `%s | ${siteName}`,
      default: siteName,
    },
    openGraph: {
      type: "website",
      siteName,
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
      ...buildOpenGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      images: ["/og-default.png"],
    },
  };
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

async function PersonJsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Hero" });
  const description = `${t("tagline")} ${t("taglineHighlight")}${t("taglineEnd")} ${t("experience")}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vitalii Popov",
    givenName: "Vitalii",
    familyName: "Popov",
    url: `${BASE_URL}/${locale}`,
    image: `${BASE_URL}/og-default.png`,
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function WebsiteJsonLd({ locale }: { locale: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vitalii Popov",
    url: `${BASE_URL}/${locale}`,
    inLanguage: locale,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <PersonJsonLd locale={locale} />
      <WebsiteJsonLd locale={locale} />
      <ViewModeProvider>
        <Suspense>
          <ModeParamSync />
        </Suspense>
        <Header />
        <div className="flex-1">{children}</div>
        <ExploreMore />
        <Footer />
        <AchievementsProvider />
      </ViewModeProvider>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
      <Analytics />
    </NextIntlClientProvider>
  );
}
