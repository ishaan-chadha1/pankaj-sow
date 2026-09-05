import type { Metadata, Viewport } from "next";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { DOC } from "@/lib/proposal";

const display = Newsreader({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const sans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});
const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/* Read before any CSS exists, so it cannot be a var(). Matches --paper. */
export const viewport: Viewport = { themeColor: "#f1f2ef" };

export const metadata: Metadata = {
  title: `${DOC.kind} — ${DOC.client}`,
  description: DOC.lede,
  robots: { index: false, follow: false }, // a client proposal has no business in search results
  openGraph: {
    title: `${DOC.kind} — ${DOC.client}`,
    description: DOC.lede,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
