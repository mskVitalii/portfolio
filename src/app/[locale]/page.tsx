import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildPageMetadata, buildWebPageJsonLd, buildProfilePageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
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
  const meta = await buildPageMetadata({
    locale,
    path: "",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
  return { ...meta, title: { absolute: t("metaTitle") } };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "HomePage" });
  const webPageJsonLd = buildWebPageJsonLd({
    locale,
    path: "",
    name: t("metaTitle"),
    description: t("metaDescription"),
  });
  const profilePageJsonLd = await buildProfilePageJsonLd(locale);

  return (
    <main>
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={profilePageJsonLd} />
      <Hero />
      <ImpactDashboard />
      <BrandCloud />
      <GeoMap />
      <AudienceFilter />
      <HomePageCta />
    </main>
  );
}
