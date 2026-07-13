import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ContactLinks } from "@/components/contact/ContactLinks";
import { FAQ } from "@/components/contact/FAQ";
import { Separator } from "@/components/ui/separator";
import { routing } from "@/i18n/routing";
import { buildPageMetadata, buildNavBreadcrumbJsonLd, buildFaqPageJsonLd, type FaqItem } from "@/lib/seo";
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
  const t = await getTranslations({ locale, namespace: "Contact" });
  return buildPageMetadata({
    locale,
    path: "/contact",
    title: t("title"),
    description: t("metaDescription"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");
  const breadcrumbJsonLd = await buildNavBreadcrumbJsonLd(locale, "contact", "/contact");
  // FAQ defaults to "hr" mode on first render (matches the view-mode store's
  // default and the server-rendered HTML a crawler actually sees).
  const faqJsonLd = buildFaqPageJsonLd(t.raw("faqHr") as FaqItem[]);

  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <div className="mb-10">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
        <p className="mt-3 text-muted-foreground text-lg">
          {t("subtitle")}
        </p>
      </div>

      {/* Social links */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">{t("findMe")}</h2>
        <ContactLinks />
      </section>

      <Separator className="my-10" />

      {/* FAQ */}
      <section>
        <h2 className="text-xl font-semibold mb-6">{t("faq")}</h2>
        <FAQ />
      </section>
    </main>
  );
}
