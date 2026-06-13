import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ContactLinks } from "@/components/contact/ContactLinks";
import { ContactForm } from "@/components/contact/ContactForm";
import { FAQ } from "@/components/contact/FAQ";
import { Separator } from "@/components/ui/separator";
import { routing } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";

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
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates(locale, "/contact"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Get in touch</h1>
        <p className="mt-3 text-muted-foreground text-lg">
          Open to new opportunities, technical collaboration, and interesting conversations.
        </p>
      </div>

      {/* Social links */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Find me at</h2>
        <ContactLinks />
      </section>

      <Separator className="my-10" />

      {/* Inquiry form */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2">Send a message</h2>
        <p className="text-muted-foreground text-sm mb-6">
          For detailed project inquiries or job offers — I read every message.
        </p>
        <ContactForm />
      </section>

      <Separator className="my-10" />

      {/* FAQ */}
      <section>
        <h2 className="text-xl font-semibold mb-6">Frequently asked questions</h2>
        <FAQ />
      </section>
    </main>
  );
}
