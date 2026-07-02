import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { EDUCATION_PROJECTS } from "@/data/projects";
import { EducationStack } from "@/components/education/EducationStack";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "EducationPage" });
  return buildPageMetadata({
    locale,
    path: "/education",
    title: t("title"),
    description: t("metaDescription"),
  });
}

export default async function EducationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <EducationStack projects={EDUCATION_PROJECTS} />
    </main>
  );
}
