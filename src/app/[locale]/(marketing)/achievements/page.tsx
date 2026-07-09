import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildPageMetadata, buildNavBreadcrumbJsonLd } from "@/lib/seo";
import { AchievementsGallery } from "@/components/achievements/AchievementsGallery";
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
  const t = await getTranslations({ locale, namespace: "AchievementsPage" });
  return buildPageMetadata({
    locale,
    path: "/achievements",
    title: t("title"),
    description: t("metaDescription"),
  });
}

export default async function AchievementsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AchievementsPage");
  const breadcrumbJsonLd = await buildNavBreadcrumbJsonLd(locale, "achievements", "/achievements");

  return (
    <main className="container mx-auto max-w-4xl px-4 py-16">
      <JsonLd data={breadcrumbJsonLd} />
      <div className="mb-10">
        <h1 className="mb-4 text-4xl font-bold">{t("title")}</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">{t("subtitle")}</p>
      </div>

      <AchievementsGallery />
    </main>
  );
}
