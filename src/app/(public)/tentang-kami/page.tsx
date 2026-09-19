import type { Metadata } from "next";
import Image from "next/image";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Building2,
  FileCheck,
  Users,
  ArrowRight,
  PhoneCall,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { getPageSetting, getCompanyIdentity } from "@/lib/settings";
import dynamic from "next/dynamic";
import JsonLd from "@/components/seo/JsonLd";
import {
  generateAboutPageSchema,
  generateEmploymentAgencySchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo/schemaGenerator";
import { SITE_CONFIG } from "@/lib/siteConfig";

const FaqSection = dynamic(() => import("@/components/common/FaqSection"), {
  loading: () => <div className="h-64 animate-pulse bg-surface-container rounded-2xl" />,
});

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [setting, company] = await Promise.all([
    getPageSetting("page_tentang_kami"),
    getCompanyIdentity(),
  ]);

  const title =
    setting.meta_title ||
    `Tentang Kami - Penyalur PRT, Baby Sitter & Perawat Lansia | ${SITE_CONFIG.name}`;
  const description =
    setting.meta_description ||
    `${SITE_CONFIG.name} adalah perusahaan penempatan PRT, Baby Sitter, dan Perawat Lansia resmi berizin Disnaker sejak 2010.`;
  const ogImage = setting.og_image || setting.hero_image || SITE_CONFIG.logo;

  return {
    title,
    description,
    keywords: setting.keywords ? setting.keywords.split(",").map((k: string) => k.trim()) : undefined,
    alternates: {
      canonical: `${SITE_CONFIG.url}/tentang-kami`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, alt: setting.hero_image_alt || title }],
      url: `${SITE_CONFIG.url}/tentang-kami`,
      siteName: SITE_CONFIG.name,
      locale: "id_ID",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TentangKamiPage() {
  const [pageSetting, company] = await Promise.all([
    getPageSetting("page_tentang_kami"),
    getCompanyIdentity(),
  ]);
  const waNumber = company.nomor_whatsapp || SITE_CONFIG.whatsappPrimary;

  const aboutSchema = generateAboutPageSchema();
  const agencySchema = generateEmploymentAgencySchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "/" },
    { name: "Tentang Kami", url: "/tentang-kami" },
  ]);
  const faqSchema = generateFAQSchema(pageSetting.faqs || []);

  const heroTitle =
    pageSetting.hero_title ||
    "Penyedia Tenaga Kerja Domestik Profesional";
  const heroSubtitle =
    pageSetting.hero_subtitle ||
    `${SITE_CONFIG.name} adalah perusahaan penempatan PRT, Baby Sitter, dan Perawat Lansia resmi berizin Disnaker sejak 2010.`;
  const heroImage = pageSetting.hero_image || "/asisten-rumah-tangga.webp";
  const heroImageAlt = pageSetting.hero_image_alt || "Tentang Kami";

  return (
    <div className="space-y-16 pb-20">
      <JsonLd schema={[aboutSchema, agencySchema, breadcrumbSchema]} />
      {faqSchema && <JsonLd schema={faqSchema} />}

      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-surface-bright">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src={heroImage}
            alt={heroImageAlt}
            fill
            priority={true}
            fetchPriority="high"
            loading="eager"
            sizes="100vw"
            quality={55}
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-offwhite/40 via-brand-offwhite/75 to-brand-offwhite" />
        </div>

        <div className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center">
          <div className="max-w-3xl text-center flex flex-col items-center gap-6 animate-hero-in">
            <Chip label="PROFIL & LEGALITAS RESMI" />
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-pine leading-tight">
              {heroTitle}
            </h1>
            <p className="font-sans text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
              {heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2">
                  <span>Konsultasi Legalitas & Kebutuhan</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Standar Seleksi Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-container mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Chip label="STANDAR SELEKSI BERLAPIS" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-pine">
              4 Tahapan Kurasi Penyaluran Pekerja Rumah Tangga
            </h2>
            <p className="font-sans text-base text-on-surface-variant max-w-2xl mx-auto">
              Setiap tenaga kerja melewati verifikasi identitas, tes medis laboratorium, evaluasi etika, serta perlindungan garansi resmi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-surface p-6 rounded-2xl border border-outline-subtle space-y-4 hover:border-brand-pine transition-all group bg-white shadow-xs">
              <div className="space-y-4">
                <span aria-hidden="true" className="font-serif text-4xl font-bold text-brand-pine group-hover:text-brand-pine block">
                  01
                </span>
                <h2 className="font-serif text-xl font-bold text-brand-pine">
                  Verifikasi Latar Belakang & Identitas
                </h2>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  Pengecekan KTP, KK, SKCK Kepolisian, serta konfirmasi riwayat kerja dari majikan sebelumnya.
                </p>
              </div>
            </div>

            <div className="glass-surface p-6 rounded-2xl border border-outline-subtle space-y-4 hover:border-brand-pine transition-all group bg-white shadow-xs">
              <div className="space-y-4">
                <span aria-hidden="true" className="font-serif text-4xl font-bold text-brand-pine group-hover:text-brand-pine block">
                  02
                </span>
                <h2 className="font-serif text-xl font-bold text-brand-pine">
                  Medical Check-Up Lengkap
                </h2>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  Pemeriksaan kesehatan bebas penyakit menular (Hepatitis, TBC, HIV, Typhus) di klinik terpercaya.
                </p>
              </div>
            </div>

            <div className="glass-surface p-6 rounded-2xl border border-outline-subtle space-y-4 hover:border-brand-pine transition-all group bg-white shadow-xs">
              <div className="space-y-4">
                <span aria-hidden="true" className="font-serif text-4xl font-bold text-brand-pine group-hover:text-brand-pine block">
                  03
                </span>
                <h2 className="font-serif text-xl font-bold text-brand-pine">
                  Uji Keterampilan & Etika Kerja
                </h2>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  Evaluasi keahlian praktis, sopan santun, serta tes kesiapan mental sebelum masa tugas.
                </p>
              </div>
            </div>

            <div className="glass-surface p-6 rounded-2xl border border-outline-subtle space-y-4 hover:border-brand-pine transition-all group bg-white shadow-xs">
              <div className="space-y-4">
                <span aria-hidden="true" className="font-serif text-4xl font-bold text-brand-pine group-hover:text-brand-pine block">
                  04
                </span>
                <h2 className="font-serif text-xl font-bold text-brand-pine">
                  Garansi Penukaran Pekerja
                </h2>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  Perjanjian kontrak legal dengan jaminan penggantian tenaga kerja jika terdapat ketidakcocokan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={pageSetting?.faqs} whatsappNumber={waNumber} companyName={company.nama_perusahaan} />
    </div>
  );
}
