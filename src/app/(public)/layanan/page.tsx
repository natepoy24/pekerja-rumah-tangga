import type { Metadata } from "next";
import { LayananClientContent } from "./LayananClientContent";
import { getPageSetting, getCompanyIdentity } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await getPageSetting("page_layanan");
  const company = await getCompanyIdentity();

  const title = setting.meta_title || "Layanan Penempatan PRT, Baby Sitter & Perawat Lansia Resmi | PT Jasa Mandiri";
  const description = setting.meta_description || company.deskripsi;
  const ogImage = setting.og_image || setting.hero_image || "/asisten rumah tangga.jpeg";

  return {
    title,
    description,
    keywords: setting.keywords ? setting.keywords.split(",").map((k) => k.trim()) : undefined,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, alt: setting.hero_image_alt || title }],
      url: "https://pekerjarumahtangga.com/layanan",
      siteName: company.nama_perusahaan,
      locale: "id_ID",
      type: "website",
    },
    alternates: {
      canonical: "/layanan",
    },
  };
}

export default async function LayananPage() {
  const pageSetting = await getPageSetting("page_layanan");
  const company = await getCompanyIdentity();

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
            "item": "https://pekerjarumahtangga.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Layanan",
            "item": "https://pekerjarumahtangga.com/layanan"
          }
        ]
      },
      {
        "@type": "ItemList",
        "name": `Katalog Layanan ${company.nama_perusahaan}`,
        "description": "Layanan resmi penempatan Asisten Rumah Tangga, Baby Sitter, dan Perawat Lansia.",
        "itemListElement": [
          {
            "@type": "Service",
            "position": 1,
            "name": "Asisten Rumah Tangga (ART)",
            "description": "Penyalur ART resmi berizin Disnaker. Sedia asisten rumah tangga menginap & pulang-pergi yang terlatih, lolos uji medis, identitas jelas, dan bergaransi.",
            "provider": {
              "@type": "Organization",
              "name": company.nama_perusahaan
            },
            "url": "https://pekerjarumahtangga.com/layanan/art"
          },
          {
            "@type": "Service",
            "position": 2,
            "name": "Baby Sitter & Pengasuh Anak",
            "description": "Penyalur baby sitter & suster balita resmi berizin Disnaker. Pengasuh sabar, teruji medis, memahami stimulasi tumbuh kembang anak, serta bergaransi.",
            "provider": {
              "@type": "Organization",
              "name": company.nama_perusahaan
            },
            "url": "https://pekerjarumahtangga.com/layanan/baby-sitter"
          },
          {
            "@type": "Service",
            "position": 3,
            "name": "Perawat & Pendamping Lansia",
            "description": "Penyalur perawat dan pendamping lansia resmi berizin Disnaker. Sabar, teliti mengawal jadwal obat, membantu mobilitas fisik, dan bergaransi kontrak",
            "provider": {
              "@type": "Organization",
              "name": company.nama_perusahaan
            },
            "url": "https://pekerjarumahtangga.com/layanan/perawat-lansia"
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LayananClientContent pageSetting={pageSetting} company={company} />
    </>
  );
}

