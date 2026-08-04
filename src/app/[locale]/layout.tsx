import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import { ViewModeProvider } from "@/components/layout/ViewModeProvider";
import { HtmlLangSync } from "@/components/layout/HtmlLangSync";
import { Header } from "@/components/layout/Header";
import { ExploreMore } from "@/components/layout/ExploreMore";
import { Footer } from "@/components/layout/Footer";
import { ModeParamSync } from "@/components/layout/ModeParamSync";
import { AchievementsProvider } from "@/components/achievements/AchievementsProvider";
import { BASE_URL, buildOpenGraphLocale, buildPersonJsonLd } from "@/lib/seo";

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
  const defaultOgImage = `/${locale}/og`;
  return {
    title: {
      template: `%s | ${siteName}`,
      default: siteName,
    },
    openGraph: {
      type: "website",
      siteName,
      images: [{ url: defaultOgImage, width: 1200, height: 630 }],
      ...buildOpenGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      images: [defaultOgImage],
    },
  };
}

async function PersonJsonLd({ locale }: { locale: string }) {
  const jsonLd = await buildPersonJsonLd(locale);

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
      <HtmlLangSync locale={locale} />
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
      <SpeedInsights />
    </NextIntlClientProvider>
  );
}
