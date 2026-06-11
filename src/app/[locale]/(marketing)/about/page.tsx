import { setRequestLocale } from "next-intl/server";
import { FileDown, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CareerTimeline } from "@/components/about/CareerTimeline";
import { VideoCv } from "@/components/about/VideoCv";
import { Certificates } from "@/components/about/Certificates";
import { ChessStats } from "@/components/about/ChessStats";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "About",
  description:
    "Full-stack engineer with 5+ years building distributed systems, AI tools, and scalable web products.",
};

const INTERESTS = [
  "Chess",
  "Cycling",
  "Hiking",
  "Skiing",
  "Lindy Hop",
  "HEMA",
  "Writing about tech",
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Bio */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-6">About me</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I&apos;m a full-stack engineer based in{" "}
              <span className="text-foreground font-medium">Berlin, Germany</span>,
              currently working at Infineon Technologies while finishing my
              Master&apos;s in Web Engineering at Chemnitz University of Technology.
            </p>
            <p>
              I started writing code in 2019 and went from building 13 startups at a
              consultancy to backend engineering at enterprise scale — searching{" "}
              <span className="text-foreground font-medium">200M products</span> in under
              5 seconds at OZON Tech, then building systems that save{" "}
              <span className="text-foreground font-medium">€480K/year</span> at Infineon.
            </p>
            <p>
              My current focus is on the intersection of distributed systems and AI —
              building things that are fast, reliable, and actually solve business problems.
              I write occasionally on{" "}
              <a
                href="https://habr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 inline-flex items-center gap-1"
              >
                Habr / Dev / Medium
                <ExternalLink className="h-3 w-3" />
              </a>{" "}
              — the last article got 5K+ views.
            </p>
            <p>
              Outside of engineering: chess, cycling, hiking, Lindy Hop dance, and
              Historical European martial arts. I&apos;ve mentored 4 developers and
              translated the React Redux docs into Russian.
            </p>
          </div>

          <aside className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
                Languages
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>English</span>
                  <span className="text-muted-foreground">Fluent</span>
                </div>
                <div className="flex justify-between">
                  <span>German</span>
                  <span className="text-muted-foreground">B1</span>
                </div>
                <div className="flex justify-between">
                  <span>Russian</span>
                  <span className="text-muted-foreground">Native</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
                Interests
              </h3>
              <div className="flex flex-wrap gap-1">
                {INTERESTS.filter((i) => i !== "Chess").map((interest) => (
                  <Badge key={interest} variant="outline" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
              <ChessStats />
            </div>

            <a
              href="/cv/vitalii-popov-cv.pdf"
              download="Vitalii_Popov_CV.pdf"
              className={cn(buttonVariants({ variant: "default" }), "w-full justify-center")}
            >
              <FileDown className="h-4 w-4 mr-2" />
              Download CV
            </a>
          </aside>
        </div>
      </section>

      {/* Certificates */}
      <Certificates />

      {/* Video CV */}
      <VideoCv />

      {/* Timeline */}
      <section>
        <h2 className="text-2xl font-bold mb-10">Career progression</h2>
        <CareerTimeline />
      </section>
    </main>
  );
}
