import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import { SITE } from "@/lib/config/site";
import { SITE_URL } from "@/lib/config/features";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.nomCommercial} — Fromagerie artisanale itinérante en Bretagne`,
    template: `%s — ${SITE.nomCommercial}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE.nomCommercial,
    title: `${SITE.nomCommercial} — Fromagerie artisanale itinérante en Bretagne`,
    description: SITE.description,
    url: SITE_URL,
    images: [{ url: "/logo_NFTUF.jpg", alt: SITE.nomCommercial }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.nomCommercial} — Fromagerie itinérante`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "google-site-verification": process.env.GOOGLE_SITE_VERIFICATION ?? "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-creme-clair text-texte font-sans">
        <LayoutShell>{children}</LayoutShell>
        <Analytics />
      </body>
    </html>
  );
}
