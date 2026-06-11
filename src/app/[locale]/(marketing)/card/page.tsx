import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { BusinessCard } from "@/components/card/BusinessCard";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Business Card",
  description: "Printable business card for Vitalii Popov — scan the QR code to visit the portfolio.",
};

export default async function CardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BusinessCard />;
}
