import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { SkillsExplorer } from "@/components/skills/SkillsExplorer";
import { SkillsKeywordMatcher } from "@/components/skills/SkillsKeywordMatcher";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SkillsPage" });
  return buildPageMetadata({
    locale,
    path: "/skills",
    title: t("title"),
    description: t("metaDescription"),
  });
}

export default async function SkillsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SkillsPage");

  return (
    <main className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          {t("subtitle")}
        </p>
      </div>

      <SkillsExplorer />

      <SkillsKeywordMatcher />
    </main>
  );
}
