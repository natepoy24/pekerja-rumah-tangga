import type { Metadata } from "next";
import Image from "next/image";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  Shirt,
  Utensils,
  Home as HomeIcon,
} from "lucide-react";
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
    getPageSetting("page_layanan_art"),
    getCompanyIdentity(),
  ]);

  const title =
    setting.meta_title ||
    `Jasa Asisten Rumah Tangga (ART) Resmi | ${SITE_CONFIG.name}`;
  const description =
    setting.meta_description ||
    "Penyalur ART resmi berizin Disnaker. Sedia asisten rumah tangga menginap & pulang-pergi yang terlatih, lolos uji medis, identitas jelas, dan bergaransi.";
  const ogImage = setting.og_image || setting.hero_image || SITE_CONFIG.logo;

  return {
    title,
    description,
    keywords: setting.keywords ? setting.keywords.split(",").map((k: string) => k.trim()) : undefined,
    alternates: {
      canonical: `${SITE_CONFIG.url}/layanan/art`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, alt: setting.hero_image_alt || title }],
      url: `${SITE_CONFIG.url}/layanan/art`,
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

export default async function ArtLayananPage() {
  const [pageSetting, company] = await Promise.all([
    getPageSetting("page_layanan_art"),
    getCompanyIdentity(),
  ]);
  const waNumber = company.nomor_whatsapp || SITE_CONFIG.whatsappPrimary;

  const serviceSchema = generateServiceSchema(
    "Asisten Rumah Tangga (ART)",
    "Penyalur ART resmi berizin Disnaker. Sedia asisten rumah tangga menginap & pulang-pergi yang terlatih, lolos uji medis, identitas jelas, dan bergaransi.",
    "/layanan/art"
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "/" },
    { name: "Layanan", url: "/layanan" },
    { name: "ART", url: "/layanan/art" },
  ]);
  const faqSchema = generateFAQSchema(pageSetting.faqs || []);

  const heroTitle =
    pageSetting.hero_title ||
    "Jasa Asisten Rumah Tangga (ART) Resmi";
  const heroSubtitle =
    pageSetting.hero_subtitle ||
    "Penyalur ART terpercaya dengan masa garansi penukaran. Rumah bersih, rapi, dan keluarga tenang.";
  const heroImage = pageSetting.hero_image || "/asisten-rumah-tangga.webp";
  const heroImageAlt = pageSetting.hero_image_alt || "Asisten Rumah Tangga";

  const scopeOfDuties = [
    {
      icon: HomeIcon,
      title: "Tata Graha & Kebersihan",
      desc: "Membersihkan seluruh area rumah, memastikan hunian rapi, higienis, dan nyaman.",
    },
    {
      icon: Shirt,
      title: "Penunjang Cuci & Setrika",
      desc: "Mencuci, menyetrika, mengatur pakaian keluarga dengan rapi dan higienis.",
    },
    {
      icon: Utensils,
      title: "Penyediaan Makanan Harian",
      desc: "Memasak menu harian keluarga sesuai selera dan standar kesehatan rumah tangga.",
    },
  ];

  const placementOptions = [
    {
      type: "ART Menginap (Live-In)",
      badge: "Paling Diminati",
      desc: "ART tinggal di rumah anda, siap membantu kebutuhan rumah tangga sepanjang hari.",
      features: ["Jam kerja fleksibel", "Bantuan harian penuh", "Fasilitas menginap di rumah"],
    },
    {
      type: "ART Pulang-Pergi",
      badge: "Keluarga Modern",
      desc: "ART datang pagi dan pulang sore/malam sesuai keperluan.",
      features: ["Cocok untuk rumah minimalis", "Tidak butuh kamar menginap", "Jam kerja terstruktur"],
    },
  ];

  const salaryTable = [
    {
      category: "ART Pemula",
      experience: "0-1 Tahun",
      range: "Rp 2.500.000 - Rp 3.000.000",
      duties: "Kebersihan, mencuci, menyetrika",
    },
    {
      category: "ART Berpengalaman",
      experience: "2-5 Tahun",
      range: "Rp 3.000.000 - Rp 3.500.000",
      duties: "Kebersihan, memasak, mencuci, menyetrika",
    },
    {
      category: "ART Khusus / Masak",
      experience: "> 5 Tahun",
      range: "Rp 3.500.000 - Rp 4.500.000",
      duties: "Keahlian memasak variatif, manajemen rumah",
    },
  ];

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
            <Chip label="LAYANAN RESMI ASISTEN RUMAH TANGGA" />
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
                <span>Cari ART Sesuai Kriteria</span>
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
                <span>Konsultasi Gaji & Kebutuhan</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto my-16 md:my-24 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-pine">
            Cakupan Kerja Profesional
          </h2>
          <p className="font-sans text-base text-on-surface-variant">
            Standar pelayanan komprehensif untuk kenyamanan dan kebersihan optimal hunian Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {scopeOfDuties.map((duty, idx) => {
            const IconC = duty.icon;
            return (
              <div
                key={idx}
                className="glass-surface p-8 rounded-2xl border border-outline-subtle space-y-4 shadow-sm hover:border-brand-pine transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-brand-sage-tint text-brand-sage flex items-center justify-center">
                  <IconC className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-pine">{duty.title}</h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  {duty.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto my-16 md:my-24 space-y-12 border-t border-outline-variant/30 pt-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-pine">
            Opsi Sistem Penempatan ART
          </h2>
          <p className="font-sans text-base text-on-surface-variant">
            Pilih sistem kerja yang paling sesuai dengan pola aktivitas rumah tangga Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {placementOptions.map((opt, i) => (
            <div
              key={i}
              className="glass-surface p-8 rounded-2xl border-t-4 border-t-brand-pine border-outline-subtle space-y-6 shadow-ambient flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="font-sans text-xs font-bold text-brand-pine bg-brand-sage-tint px-3 py-1 rounded-full uppercase">
                  {opt.badge}
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-pine">{opt.type}</h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  {opt.desc}
                </p>
                <ul className="space-y-3 pt-2">
                  {opt.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 font-sans text-sm text-brand-charcoal">
                      <CheckCircle2 className="w-4 h-4 text-brand-pine shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto my-16 md:my-24 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-pine">
            Panduan Estimasi Gaji ART
          </h2>
          <p className="font-sans text-base text-on-surface-variant">
            Transparansi kompensasi berdasarkan tingkat pengalaman dan keahlian kerja.
          </p>
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl border border-outline-variant/40 shadow-sm p-4 sm:p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-brand-pine/20 font-serif text-brand-pine text-base">
                <th className="py-4 px-4">Kategori ART</th>
                <th className="py-4 px-4">Pengalaman</th>
                <th className="py-4 px-4">Estimasi Gaji Bulanan</th>
                <th className="py-4 px-4">Cakupan Keterampilan</th>
              </tr>
            </thead>
            <tbody className="font-sans text-sm divide-y divide-outline-variant/30">
              {salaryTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-brand-pine">{row.category}</td>
                  <td className="py-4 px-4 text-on-surface-variant">{row.experience}</td>
                  <td className="py-4 px-4 font-bold text-brand-ruby">{row.range}</td>
                  <td className="py-4 px-4 text-on-surface-variant">{row.duties}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <FaqSection items={pageSetting?.faqs} whatsappNumber={waNumber} />

      <section className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto my-12">
        <div className="bg-brand-pine text-white rounded-2xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold max-w-2xl mx-auto leading-tight">
            Pesan Asisten Rumah Tangga Terpercaya untuk Kediaman Anda Sekarang.
          </h2>
          <Button
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="compassionate"
            size="lg"
            className="gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Hubungi WA Tim Penyalur</span>
          </Button>
        </div>
      </section>
    </div>
  );
}

