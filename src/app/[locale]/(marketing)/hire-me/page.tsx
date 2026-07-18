import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { HireMeLinks } from "@/components/hire-me/HireMeLinks";
import { FAQ } from "@/components/hire-me/FAQ";
import { Separator } from "@/components/ui/separator";
import { routing } from "@/i18n/routing";
import { buildPageMetadata, buildNavBreadcrumbJsonLd, buildFaqPageJsonLd, buildWebPageJsonLd, type FaqItem } from "@/lib/seo";
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
  const t = await getTranslations({ locale, namespace: "HireMe" });
  return buildPageMetadata({
    locale,
    path: "/hire-me",
    title: t("title"),
    description: t("metaDescription"),
  });
}

export default async function HireMePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("HireMe");
  const breadcrumbJsonLd = await buildNavBreadcrumbJsonLd(locale, "hireMe", "/hire-me");
  const webPageJsonLd = buildWebPageJsonLd({
    locale,
    path: "/hire-me",
    name: t("title"),
    description: t("metaDescription"),
  });
  // All three FAQ sections render unconditionally now (no mode-gating), so the
  // schema can safely cover every question instead of just one lens.
  const faqJsonLd = buildFaqPageJsonLd([
    ...(t.raw("faqHr") as FaqItem[]),
    ...(t.raw("faqBusiness") as FaqItem[]),
    ...(t.raw("faqTech") as FaqItem[]),
  ]);

  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={faqJsonLd} />
      <div className="mb-10">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
        <p className="mt-3 text-muted-foreground text-lg">
          {t("subtitle")}
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">{t("findMe")}</h2>
        <HireMeLinks />
      </section>

      <Separator className="my-10" />

      <section>
        <h2 className="text-xl font-semibold mb-6">{t("faq")}</h2>
        <FAQ />
      </section>
    </main>
  );
}
