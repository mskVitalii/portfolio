import { Inter, JetBrains_Mono, Roboto, Nunito_Sans, Roboto_Slab } from "next/font/google";

// Shared by the locale layout and the root not-found page — the two places
// that render <html>.
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

export const fontVariables = `${inter.variable} ${jetbrainsMono.variable} ${roboto.variable} ${nunitoSans.variable} ${robotoSlab.variable}`;
