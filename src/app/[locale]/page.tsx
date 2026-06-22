import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { ImpactDashboard } from "@/components/home/ImpactDashboard";
import { GeoMap } from "@/components/home/GeoMap";
import { BrandCloud } from "@/components/home/BrandCloud";
import { HomePageCta } from "@/components/home/HomePageCta";
import { AudienceFilter } from "@/components/home/AudienceFilter";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates(locale, ""),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <AudienceFilter />
      <BrandCloud />
      <ImpactDashboard />
      <GeoMap />
      <HomePageCta />
    </main>
  );
}
