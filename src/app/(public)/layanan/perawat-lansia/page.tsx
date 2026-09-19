import type { Metadata } from "next";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  HeartPulse,
  Activity,
  Armchair,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { getPageSetting, getCompanyIdentity } from "@/lib/settings";
import dynamic from "next/dynamic";
import JsonLd from "@/components/seo/JsonLd";
import {
  generateServiceSchema,
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
    getPageSetting("page_layanan_perawat_lansia"),
    getCompanyIdentity(),
  ]);

  const title =
    setting.meta_title ||
    `Jasa Perawat & Pendamping Lansia Resmi | ${SITE_CONFIG.name}`;
  const description =
    setting.meta_description ||
    "Penyalur perawat dan pendamping lansia resmi berizin Disnaker. Sabar, teliti mengawal jadwal obat, membantu mobilitas fisik, dan bergaransi kontrak.";
  const ogImage = setting.og_image || setting.hero_image || SITE_CONFIG.logo;

  return {
    title,
    description,
    keywords: setting.keywords ? setting.keywords.split(",").map((k: string) => k.trim()) : undefined,
    alternates: {
      canonical: `${SITE_CONFIG.url}/layanan/perawat-lansia`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, alt: setting.hero_image_alt || title }],
      url: `${SITE_CONFIG.url}/layanan/perawat-lansia`,
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

export default async function PerawatLansiaLayananPage() {
  const [pageSetting, company] = await Promise.all([
    getPageSetting("page_layanan_perawat_lansia"),
    getCompanyIdentity(),
  ]);
  const waNumber = company.nomor_whatsapp || SITE_CONFIG.whatsappPrimary;

  const serviceSchema = generateServiceSchema(
    "Perawat & Pendamping Lansia",
    "Penyalur perawat dan pendamping lansia resmi berizin Disnaker. Sabar, teliti mengawal jadwal obat, membantu mobilitas fisik, dan bergaransi kontrak.",
    "/layanan/perawat-lansia"
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "/" },
    { name: "Layanan", url: "/layanan" },
    { name: "Perawat Lansia", url: "/layanan/perawat-lansia" },
  ]);
  const faqSchema = generateFAQSchema(pageSetting.faqs || []);

  const heroTitle =
    pageSetting.hero_title ||
    "Jasa Perawat & Pendamping Lansia Resmi";
  const heroSubtitle =
    pageSetting.hero_subtitle ||
    "Penyalur perawat lansia medis & non-medis terpercaya. Sabar, teliti, dan bergaransi kontrak.";
  const heroImage = pageSetting.hero_image || "/perawat-lansia.webp";
  const heroImageAlt = pageSetting.hero_image_alt || "Perawat Lansia";

  return (
    <div className="space-y-16 pb-20">
      <JsonLd schema={[serviceSchema, breadcrumbSchema]} />
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
            <Chip label="LAYANAN RESMI PERAWAT LANSIA" />
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-pine leading-tight">
              {heroTitle}
            </h1>
            <p className="font-sans text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
              {heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto gap-2"
              >
                <span>Cari Perawat Lansia Sesuai Kebutuhan</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Konsultasi Gaji & Sistem Kerja</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={pageSetting?.faqs} whatsappNumber={waNumber} />
    </div>
  );
}
