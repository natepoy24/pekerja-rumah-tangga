import type { Metadata } from "next";
import Link from "next/link";
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

export async function generateMetadata(): Promise<Metadata> {
  const setting = await getPageSetting("page_tentang_kami");
  const company = await getCompanyIdentity();

  const title = setting.meta_title || `Tentang Kami — Profil & Legalitas Resmi | ${company.nama_perusahaan}`;
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
    },
  };
}

export default async function AboutPage() {
  const pageSetting = await getPageSetting("page_tentang_kami");
  const company = await getCompanyIdentity();

  const waNumber = company?.nomor_whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6285111399962";
  const heroImage = pageSetting?.hero_image || "/asisten rumah tangga.jpeg";
  const heroImageAlt = pageSetting?.hero_image_alt || `Tentang ${company.nama_perusahaan}`;
  const heroTitle = pageSetting?.hero_title || "Membangun Ketenangan Rumah Tangga Sejak 2010 Melalui Penempatan Kerja Berizin Resmi.";
  const heroSubtitle =
    pageSetting?.hero_subtitle ||
    `Lebih dari 15 tahun ${company.nama_perusahaan} menjembatani keluarga Indonesia dengan Asisten Rumah Tangga, Baby Sitter, dan Perawat Lansia yang kompeten, beretika, dan terverifikasi penuh oleh Dinas Tenaga Kerja serta Kementerian Ketenagakerjaan RI.`;

  const legalPillars = [
    {
      title: "Izin Kemnaker & Disnaker Resmi",
      desc: `Beroperasi secara legal di bawah payung hukum izin P3RT resmi dari Kementerian Ketenagakerjaan RI (${company.izin_kemnaker}).`,
      icon: Building2,
    },
    {
      title: "Registrasi Tenaga Kerja Terdata",
      desc: "Seluruh pekerja terverifikasi identitas resmi (KTP, KK, SKCK) dan terdaftar di dinas ketenagakerjaan.",
      icon: FileCheck,
    },
    {
      title: "Perjanjian Kerja Berpayung Hukum",
      desc: "Kontrak kerja tertulis bermaterai yang melindungi hak dan kewajiban majikan serta pekerja.",
      icon: Lock,
    },
    {
      title: "Pengawasan & Pendampingan Kontrak",
      desc: `Tim layanan pelanggan ${company.nama_perusahaan} siap membantu mediasi dan penukaran pekerja jika dibutuhkan.`,
      icon: ShieldCheck,
    },
  ];

  const screeningSteps = [
    {
      no: "01",
      title: "Verifikasi Identitas & Riwayat",
      desc: "Validasi dokumen KTP, KK, SKCK, serta pengecekan rekam jejak pada pengguna jasa sebelumnya.",
    },
    {
      no: "02",
      title: "Uji Kesehatan Fisik & Medis",
      desc: "Pemeriksaan kesehatan menyeluruh untuk memastikan kandidat bebas dari penyakit menular.",
    },
    {
      no: "03",
      title: "Uji Kompetensi & Kesiapan Mental",
      desc: "Evaluasi keterampilan praktis, tata krama, etika kerja, serta orientasi mental sebelum bertugas.",
    },
    {
      no: "04",
      title: "Penandatanganan Perjanjian Resmi",
      desc: "Pengikatan komitmen kerja dan jaminan hak pekerja serta keamanan majikan secara tertulis.",
    },
  ];

  return (
    <div className="overflow-hidden min-h-screen bg-brand-offwhite">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Chip label={`TENTANG ${company.nama_perusahaan.toUpperCase()}`} />
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-pine leading-tight">
              {heroTitle}
            </h1>
            <p className="font-sans text-base sm:text-lg text-on-surface-variant leading-relaxed">
              {heroSubtitle}
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-outline-variant/30">
              <div>
                <div className="font-serif text-3xl font-bold text-brand-pine">2010</div>
                <div className="font-sans text-xs text-on-surface-variant uppercase tracking-wider mt-1">
                  Tahun Berdiri
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-brand-pine">15+ Thn</div>
                <div className="font-sans text-xs text-on-surface-variant uppercase tracking-wider mt-1">
                  Pengalaman
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-brand-pine">100% Legal</div>
                <div className="font-sans text-xs text-on-surface-variant uppercase tracking-wider mt-1">
                  Izin Kemnaker
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-ambient border border-outline-subtle aspect-[4/3]">
              <img
                src={heroImage}
                alt={heroImageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-pine/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-4 sm:-left-6 glass-surface p-4 rounded-xl flex items-center gap-3 shadow-ambient border border-outline-subtle">
              <ShieldCheck className="w-8 h-8 text-brand-pine shrink-0" />
              <div>
                <p className="font-sans text-xs font-bold text-brand-pine">Badan Usaha Resmi</p>
                <p className="font-sans text-[11px] text-brand-sage flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi DISNAKER
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Banner Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto my-12">
        <div className="bg-brand-pine rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-ambient">
          <div className="space-y-4 mb-10">
            <Chip label="Payung Hukum Legal" className="bg-white/10 text-white" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Standar Hukum Jelas, Keamanan Keluarga Terjamin.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {legalPillars.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <div key={idx} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 space-y-3">
                  <IconComp className="w-8 h-8 text-brand-sage-tint" />
                  <h3 className="font-serif text-lg font-bold text-white">{p.title}</h3>
                  <p className="font-sans text-xs text-white/80 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4-Stage Screening Bento Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto my-16 md:my-24 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-pine">
            Standar Seleksi 4 Tahap
          </h2>
          <p className="font-sans text-base text-on-surface-variant">
            Proses kurasi berlapis kami memastikan hanya kandidat terbaik yang memasuki ruang privat keluarga Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {screeningSteps.map((step) => (
            <div
              key={step.no}
              className="glass-surface p-6 rounded-xl border border-outline-subtle flex flex-col justify-between hover:border-brand-pine transition-all group"
            >
              <div className="space-y-4">
                <span className="font-serif text-4xl font-bold text-brand-pine/30 group-hover:text-brand-pine transition-colors">
                  {step.no}
                </span>
                <h3 className="font-serif text-lg font-bold text-brand-pine">{step.title}</h3>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Specialized Services Links */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto my-16 md:my-24 space-y-10">
        <div className="border-b border-outline-variant/30 pb-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-pine">
            Layanan Spesialisasi Kami
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/layanan/art" className="group">
            <div className="relative h-64 rounded-xl overflow-hidden mb-4 shadow-sm border border-outline-subtle">
              <img
                src="/asisten%20rumah%20tangga.jpeg"
                alt="Asisten Rumah Tangga"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="font-serif text-xl font-bold text-brand-pine flex items-center justify-between group-hover:text-brand-ruby transition-colors">
              <span>Asisten Rumah Tangga (ART)</span>
              <ArrowRight className="w-5 h-5" />
            </h3>
            <p className="font-sans text-xs text-on-surface-variant mt-1 leading-relaxed">
              Fokus pada kebersihan harian, kerapian material khusus, dan tata kelola dapur rumah tangga.
            </p>
          </Link>

          <Link href="/layanan/baby-sitter" className="group">
            <div className="relative h-64 rounded-xl overflow-hidden mb-4 shadow-sm border border-outline-subtle">
              <img
                src="/baby%20sitter.jpeg"
                alt="Baby Sitter"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="font-serif text-xl font-bold text-brand-pine flex items-center justify-between group-hover:text-brand-ruby transition-colors">
              <span>Baby Sitter & Nanny</span>
              <ArrowRight className="w-5 h-5" />
            </h3>
            <p className="font-sans text-xs text-on-surface-variant mt-1 leading-relaxed">
              Tenaga terlatih yang berfokus pada pengasuhan anak, stimulasi tumbuh kembang, dan nutrisi.
            </p>
          </Link>

          <Link href="/layanan/perawat-lansia" className="group">
            <div className="relative h-64 rounded-xl overflow-hidden mb-4 shadow-sm border border-outline-subtle">
              <img
                src="/perawat%20lansia.jpeg"
                alt="Perawat Lansia"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="font-serif text-xl font-bold text-brand-pine flex items-center justify-between group-hover:text-brand-ruby transition-colors">
              <span>Perawat Lansia (Elder Care)</span>
              <ArrowRight className="w-5 h-5" />
            </h3>
            <p className="font-sans text-xs text-on-surface-variant mt-1 leading-relaxed">
              Pendampingan khusus mengutamakan manajemen pengobatan, mobilitas, dan kenyamanan lansia.
            </p>
          </Link>
        </div>
      </section>

      {/* FAQ Section (CMS Driven) */}
      <FaqSection items={pageSetting?.faqs} whatsappNumber={waNumber} />

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto my-12">
        <div className="bg-brand-pine text-white rounded-2xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold max-w-2xl mx-auto leading-tight">
            Dapatkan Tenaga Kerja Terpercaya yang Sesuai Kebutuhan Keluarga Anda.
          </h2>
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button variant="compassionate" size="lg" className="gap-2">
              <PhoneCall className="w-4 h-4" />
              <span>Konsultasi WA Sekarang</span>
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
