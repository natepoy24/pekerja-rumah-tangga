import type { Metadata } from "next";
import { LayananClientContent } from "./LayananClientContent";
import { getPageSetting, getCompanyIdentity } from "@/lib/settings";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/lib/siteConfig";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [setting, company] = await Promise.all([
    getPageSetting("page_layanan"),
    getCompanyIdentity(),
  ]);

  const title = setting.meta_title || `Layanan Penempatan PRT, Baby Sitter & Perawat Lansia Resmi | ${SITE_CONFIG.name}`;
  const description = setting.meta_description || company.deskripsi;
  const ogImage = setting.og_image || setting.hero_image || "/asisten-rumah-tangga.webp";
  const canonicalUrl = `${SITE_CONFIG.url}/layanan`;

  return {
    title,
    description,
    keywords: setting.keywords ? setting.keywords.split(",").map((k) => k.trim()) : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, alt: setting.hero_image_alt || title }],
      url: canonicalUrl,
      siteName: company.nama_perusahaan || SITE_CONFIG.name,
      locale: "id_ID",
      type: "website",
    },
  };
}

export default async function LayananPage() {
  const [pageSetting, company] = await Promise.all([
    getPageSetting("page_layanan"),
    getCompanyIdentity(),
  ]);

  const companyName = company.nama_perusahaan || SITE_CONFIG.name;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Beranda",
            "item": SITE_CONFIG.url,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Layanan",
            "item": `${SITE_CONFIG.url}/layanan`,
          },
        ],
      },
      {
        "@type": "ItemList",
        "name": `Katalog Layanan ${companyName}`,
        "description": "Layanan resmi penempatan Asisten Rumah Tangga, Baby Sitter, dan Perawat Lansia.",
        "itemListElement": [
          {
            "@type": "Service",
            "position": 1,
            "name": "Asisten Rumah Tangga (ART)",
            "description": "Penyalur ART resmi berizin Disnaker. Sedia asisten rumah tangga menginap & pulang-pergi yang terlatih, lolos uji medis, identitas jelas, dan bergaransi.",
            "provider": {
              "@type": "Organization",
              "name": companyName,
            },
            "url": `${SITE_CONFIG.url}/layanan/art`,
          },
          {
            "@type": "Service",
            "position": 2,
            "name": "Baby Sitter & Pengasuh Anak",
            "description": "Penyalur baby sitter & suster balita resmi berizin Disnaker. Pengasuh sabar, teruji medis, memahami stimulasi tumbuh kembang anak, serta bergaransi.",
            "provider": {
              "@type": "Organization",
              "name": companyName,
            },
            "url": `${SITE_CONFIG.url}/layanan/baby-sitter`,
          },
          {
            "@type": "Service",
            "position": 3,
            "name": "Perawat & Pendamping Lansia",
            "description": "Penyalur perawat dan pendamping lansia resmi berizin Disnaker. Sabar, teliti mengawal jadwal obat, membantu mobilitas fisik, dan bergaransi kontrak.",
            "provider": {
              "@type": "Organization",
              "name": companyName,
            },
            "url": `${SITE_CONFIG.url}/layanan/perawat-lansia`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <LayananClientContent pageSetting={pageSetting} company={company} />
    </>
  );
}


