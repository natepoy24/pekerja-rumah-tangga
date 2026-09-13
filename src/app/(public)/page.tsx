import type { Metadata } from "next";
import { getPageSetting, getCompanyIdentity } from "@/lib/settings";
import HomeClient from "./HomeClient";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await getPageSetting("page_home");
  const company = await getCompanyIdentity();

  const title = setting.meta_title || `${company.nama_perusahaan} — Penempatan Pekerja Rumah Tangga Resmi & Terpercaya`;
  const description = setting.meta_description || company.deskripsi;
  const ogImage = setting.og_image || setting.hero_image || "/asisten rumah tangga.jpeg";

  return {
    title,
    description,
    keywords: setting.keywords ? setting.keywords.split(",").map((k) => k.trim()) : undefined,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImage,
          alt: setting.hero_image_alt || title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function HomePage() {
  const pageSetting = await getPageSetting("page_home");
  const company = await getCompanyIdentity();

  return <HomeClient pageSetting={pageSetting} company={company} />;
}
