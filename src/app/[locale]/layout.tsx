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
import { Footer } from "@/components/layout/Footer";
import { ModeParamSync } from "@/components/layout/ModeParamSync";
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
  return {
    openGraph: {
      type: "website",
      siteName: "Vitalii Popov",
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
      ...buildOpenGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      images: ["/og-default.png"],
    },
  };
}

async function PersonJsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Hero" });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vitalii Popov",
    url: `${BASE_URL}/${locale}`,
    image: `${BASE_URL}/og-default.png`,
    jobTitle: t("role"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chemnitz",
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
        <Footer />
      </ViewModeProvider>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
      <Analytics />
    </NextIntlClientProvider>
  );
}
