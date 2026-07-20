import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Roboto, Nunito_Sans, Roboto_Slab } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { routing } from "@/i18n/routing";
import "./globals.css";

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

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const nunitoSans = Nunito_Sans({
  weight: ["300", "400", "600", "700", "800", "900"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-nunito",
});

const robotoSlab = Roboto_Slab({
  weight: ["400", "700", "900"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-roboto-slab",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vitalii-popov.dev"),
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
    url: "https://vitalii-popov.dev",
    siteName: "Vitalii Popov",
    title: "Vitalii Popov — Full-Stack Engineer",
    description:
      "Full-stack engineer focused on building systems that create measurable business value.",
    images: [{ url: "/en/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitalii Popov — Full-Stack Engineer",
    description:
      "Full-stack engineer focused on building systems that create measurable business value.",
    images: ["/en/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={routing.defaultLocale}
      suppressHydrationWarning
      data-view-mode="hr"
      className={`${inter.variable} ${jetbrainsMono.variable} ${roboto.variable} ${nunitoSans.variable} ${robotoSlab.variable}`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
