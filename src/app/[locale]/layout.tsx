import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ViewModeProvider } from "@/components/layout/ViewModeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vitaliipopov.dev"),
  title: {
    default: "Vitalii Popov — Full-Stack Engineer",
    template: "%s | Vitalii Popov",
  },
  description:
    "Full-stack engineer focused on building systems that create measurable business value. 5+ years across distributed systems, AI, and e-commerce at Infineon, OZON Tech, and beyond.",
  keywords: [
    "Full-Stack Engineer",
    "Go developer",
    "TypeScript",
    "React",
    "Distributed Systems",
    "AI engineer",
    "Berlin",
    "Vitalii Popov",
  ],
  authors: [{ name: "Vitalii Popov" }],
  creator: "Vitalii Popov",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vitaliipopov.dev",
    siteName: "Vitalii Popov",
    title: "Vitalii Popov — Full-Stack Engineer",
    description:
      "Full-stack engineer focused on building systems that create measurable business value.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitalii Popov — Full-Stack Engineer",
    description:
      "Full-stack engineer focused on building systems that create measurable business value.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <ViewModeProvider>
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </ViewModeProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
