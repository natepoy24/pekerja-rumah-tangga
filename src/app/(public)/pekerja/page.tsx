import type { Metadata } from "next";
import { createPublicClient } from "@/lib/supabase/server";
import PekerjaCatalogClient from "./PekerjaCatalogClient";
import { getPageSetting, getCompanyIdentity } from "@/lib/settings";
import dynamic from "next/dynamic";
import JsonLd from "@/components/seo/JsonLd";
import { generateCollectionPageSchema, generateBreadcrumbSchema } from "@/lib/seo/schemaGenerator";
import { SITE_CONFIG } from "@/lib/siteConfig";

const FaqSection = dynamic(() => import("@/components/common/FaqSection"), {
  loading: () => <div className="h-64 animate-pulse bg-surface-container rounded-2xl" />,
});

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [setting, company] = await Promise.all([
    getPageSetting("page_pekerja"),
    getCompanyIdentity(),
  ]);

  const title = setting.meta_title || `Katalog Pekerja Rumah Tangga Resmi & Terverifikasi | ${company.nama_perusahaan || SITE_CONFIG.name}`;
  const description = setting.meta_description || "Cari dan pilih profil Asisten Rumah Tangga, Baby Sitter, dan Perawat Lansia siap kerja.";
  const ogImage = setting.og_image || "/asisten-rumah-tangga.webp";
  const canonicalUrl = `${SITE_CONFIG.url}/pekerja`;

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
      url: canonicalUrl,
      siteName: company.nama_perusahaan || SITE_CONFIG.name,
      locale: "id_ID",
      type: "website",
      images: [{ url: ogImage, alt: title }],
    },
  };
}

export default async function PekerjaPublicPage(props: {
  searchParams: Promise<{ kategori?: string; q?: string }>;
}) {
  const { kategori, q } = await props.searchParams;
  const supabase = createPublicClient();
  const [pageSetting, company, workersRes] = await Promise.all([
    getPageSetting("page_pekerja"),
    getCompanyIdentity(),
    supabase.from("pekerja").select("*").order("created_at", { ascending: false }),
  ]);

  const workers = workersRes.data || [];

  const collectionSchema = generateCollectionPageSchema(
    "Katalog Pekerja Rumah Tangga Terverifikasi",
    "Penyalur resmi berizin Disnaker. Seluruh kandidat telah terverifikasi KTP, latar belakang, serta cek kesehatan berkala.",
    "/pekerja"
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "/" },
    { name: "Pekerja", url: "/pekerja" },
  ]);

  return (
    <main className="min-h-screen bg-[#FAFAF7] font-sans pb-20 pt-28">
      <JsonLd schema={[collectionSchema, breadcrumbSchema]} />
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Hero */}
        <div className="text-[#14201D] text-center max-w-3xl mx-auto space-y-4 pt-4 animate-hero-in">
          <span className="text-xs font-bold uppercase tracking-widest text-[#3E7B28] bg-[#EBF4E7] px-4 py-1.5 rounded-full border border-[#D5E8D0] inline-block">
            Katalog Pekerja Terverifikasi
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#14201D] leading-tight">
            {pageSetting.hero_title || "Temukan Asisten Rumah Tangga & Perawat Profesional"}
          </h1>
          <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed">
            {pageSetting.hero_subtitle || "Penyalur resmi berizin Disnaker. Seluruh kandidat telah terverifikasi KTP, latar belakang, serta cek kesehatan berkala."}
          </p>
        </div>

        {/* Client Interactive Filter & Grid */}
        <PekerjaCatalogClient initialWorkers={workers} initialCategory={kategori || "Semua"} initialSearch={q || ""} />

        {/* FAQ Section (CMS Driven) */}
        <FaqSection items={pageSetting?.faqs} whatsappNumber={company.nomor_whatsapp} companyName={company.nama_perusahaan} />
      </div>
    </main>
  );
}

