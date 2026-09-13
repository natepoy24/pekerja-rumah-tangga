import type { Metadata } from "next";
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
import FaqSection from "@/components/common/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import {
  generateAboutPageSchema,
  generateEmploymentAgencySchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo/schemaGenerator";
import { SITE_CONFIG } from "@/lib/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await getPageSetting("page_tentang_kami");
  const company = await getCompanyIdentity();

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
  const pageSetting = await getPageSetting("page_tentang_kami");
  const company = await getCompanyIdentity();
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
  const heroImage = pageSetting.hero_image || "/asisten rumah tangga.jpeg";
  const heroImageAlt = pageSetting.hero_image_alt || "Tentang Kami";

  return (
    <div className="space-y-16 pb-20">
      <JsonLd schema={[aboutSchema, agencySchema, breadcrumbSchema]} />
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

      <FaqSection items={pageSetting?.faqs} whatsappNumber={waNumber} />
    </div>
  );
}
