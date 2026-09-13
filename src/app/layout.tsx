import type { Metadata } from "next";
import { ebGaramond, geist } from "./fonts";
import "./globals.css";
import { getCompanyIdentity } from "@/lib/settings";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_CONFIG } from "@/lib/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanyIdentity();
  const favicon = company.favicon_url || "/logo.png";
  const siteName = company.nama_perusahaan || SITE_CONFIG.name;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${siteName} — Penempatan Pekerja Rumah Tangga Resmi & Terpercaya`,
      template: `%s | ${siteName}`,
    },
    description: company.deskripsi,
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
    },
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      siteName,
      url: siteUrl,
      locale: "id_ID",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const company = await getCompanyIdentity();
  const favicon = company.favicon_url || "/logo.png";

  return (
    <html lang="id" className={`${ebGaramond.variable} ${geist.variable}`}>
      <head>
        <link rel="icon" href={favicon} />
        <link rel="shortcut icon" href={favicon} />
        <link rel="apple-touch-icon" href={favicon} />
      </head>
      <body className="min-h-screen flex flex-col bg-brand-offwhite text-brand-charcoal antialiased selection:bg-brand-sage-tint selection:text-brand-pine">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
