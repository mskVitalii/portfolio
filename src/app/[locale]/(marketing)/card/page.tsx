import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildPageMetadata, buildNavBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo";
import { BusinessCard } from "@/components/card/BusinessCard";
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
  const t = await getTranslations({ locale, namespace: "CardPage" });
  return buildPageMetadata({
    locale,
    path: "/card",
    title: t("title"),
    description: t("metaDescription"),
  });
}

export default async function CardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CardPage");
  const breadcrumbJsonLd = await buildNavBreadcrumbJsonLd(locale, "card", "/card");
  const webPageJsonLd = buildWebPageJsonLd({
    locale,
    path: "/card",
    name: t("title"),
    description: t("metaDescription"),
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <h1 className="sr-only">{t("title")}</h1>
      <BusinessCard />
    </>
  );
}
