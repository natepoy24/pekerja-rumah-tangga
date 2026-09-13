import type { Metadata } from "next";
import Image from "next/image";
import {
  Baby,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
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
  const setting = await getPageSetting("page_layanan_babysitter");
  const company = await getCompanyIdentity();

  const title =
    setting.meta_title ||
    `Penyalur Baby Sitter & Nanny Terdidik | ${SITE_CONFIG.name}`;
  const description =
    setting.meta_description ||
    "Penyalur suster baby sitter & pengasuh anak terpercaya berizin Disnaker. Sedia suster newborn & balita yang sabar, terdidik, dan bergaransi.";
  const ogImage = setting.og_image || setting.hero_image || SITE_CONFIG.logo;

  return {
    title,
    description,
    keywords: setting.keywords ? setting.keywords.split(",").map((k: string) => k.trim()) : undefined,
    alternates: {
      canonical: `${SITE_CONFIG.url}/layanan/baby-sitter`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, alt: setting.hero_image_alt || title }],
      url: `${SITE_CONFIG.url}/layanan/baby-sitter`,
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

export default async function BabySitterPage() {
  const pageSetting = await getPageSetting("page_layanan_babysitter");
  const company = await getCompanyIdentity();
  const waNumber = company.nomor_whatsapp || SITE_CONFIG.whatsappPrimary;

  const serviceSchema = generateServiceSchema(
    "Baby Sitter & Pengasuh Anak",
    "Penyalur suster baby sitter & pengasuh anak terpercaya berizin Disnaker. Sedia suster newborn & balita yang sabar, terdidik, dan bergaransi.",
    "/layanan/baby-sitter"
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "/" },
    { name: "Layanan", url: "/layanan" },
    { name: "Baby Sitter & Nanny", url: "/layanan/baby-sitter" },
  ]);
  const faqSchema = generateFAQSchema(pageSetting.faqs || []);

  const heroTitle =
    pageSetting.hero_title ||
    "Baby Sitter & Pengasuh Anak Terpercaya";
  const heroSubtitle =
    pageSetting.hero_subtitle ||
    "Penyalur suster newborn & balita profesional. Sabar, paham stimulasi anak, dan bergaransi.";
  const heroImage = pageSetting.hero_image || "/baby sitter.jpeg";
  const heroImageAlt = pageSetting.hero_image_alt || "Baby Sitter";

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
            priority
            sizes="100vw"
            quality={75}
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-offwhite/40 via-brand-offwhite/75 to-brand-offwhite" />
        </div>

        <div className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center">
          <div className="max-w-3xl text-center flex flex-col items-center gap-6">
            <Chip label="LAYANAN RESMI BABY SITTER" />
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
                  <span>Cari Baby Sitter Sesuai Kebutuhan</span>
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
