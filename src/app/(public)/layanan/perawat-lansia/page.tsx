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
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { getPageSetting, getCompanyIdentity } from "@/lib/settings";
import FaqSection from "@/components/common/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import {
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo/schemaGenerator";
import { SITE_CONFIG } from "@/lib/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await getPageSetting("page_layanan_perawat_lansia");
  const company = await getCompanyIdentity();

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
  const pageSetting = await getPageSetting("page_layanan_perawat_lansia");
  const company = await getCompanyIdentity();
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
  const heroImage = pageSetting.hero_image || "/perawat lansia.jpeg";
  const heroImageAlt = pageSetting.hero_image_alt || "Perawat Lansia";

  return (
    <div className="space-y-16 pb-20">
      <JsonLd schema={[serviceSchema, breadcrumbSchema]} />
      {faqSchema && <JsonLd schema={faqSchema} />}

      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-surface-bright">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={heroImage}
            alt={heroImageAlt}
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-offwhite/40 via-brand-offwhite/75 to-brand-offwhite" />
        </div>

        <div className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center">
          <div className="max-w-3xl text-center flex flex-col items-center gap-6">
            <Chip label="LAYANAN RESMI PERAWAT LANSIA" />
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
                  <span>Cari Perawat Lansia Sesuai Kebutuhan</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2">
                  <PhoneCall className="w-4 h-4" />
                  <span>Konsultasi Gaji & Sistem Kerja</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={pageSetting?.faqs} whatsappNumber={waNumber} />
    </div>
  );
}
