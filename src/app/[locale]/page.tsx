import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { ImpactDashboard } from "@/components/home/ImpactDashboard";
import { GeoMap } from "@/components/home/GeoMap";

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
      <ImpactDashboard />
      <GeoMap />
    </main>
  );
}
