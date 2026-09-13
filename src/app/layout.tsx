import type { Metadata } from "next";
import { ebGaramond, geist } from "./fonts";
import "./globals.css";
import { getCompanyIdentity } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanyIdentity();
  const favicon = company.favicon_url || "/logo.png";
  return {
    title: {
      default: `${company.nama_perusahaan} — Penempatan Pekerja Rumah Tangga Resmi & Terpercaya`,
      template: `%s | ${company.nama_perusahaan}`,
    },
    description: company.deskripsi,
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
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
      </body>
    </html>
  );
}


