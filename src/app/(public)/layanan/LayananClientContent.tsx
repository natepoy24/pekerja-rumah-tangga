"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Home,
  Baby,
  HeartPulse,
  ArrowRight,
  FileCheck,
  Stethoscope,
  Scale,
  RefreshCw,
  PhoneCall,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  UserCheck,
  Building2,
  Clock,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { PageSetting, CompanyIdentity } from "@/lib/settings";
import { SITE_CONFIG } from "@/lib/siteConfig";
import dynamic from "next/dynamic";

const FaqSection = dynamic(() => import("@/components/common/FaqSection"), {
  loading: () => <div className="h-64 animate-pulse bg-surface-container rounded-2xl" />,
});

interface LayananClientContentProps {
  pageSetting?: PageSetting;
  company?: CompanyIdentity;
}

export function LayananClientContent({ pageSetting, company }: LayananClientContentProps) {
  const waNumber = company?.nomor_whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6285111399962";
  const heroTitle = pageSetting?.hero_title || "Tiga Pilar Pendampingan Rumah Tangga untuk Ketenangan Keluarga Anda.";
  const heroSubtitle =
    pageSetting?.hero_subtitle ||
    "Dari tata kelola hunian yang bersih, pengasuhan balita penuh kasih, hingga pendampingan lansia bermartabat. Seluruh tenaga kerja telah melewati kurasi identitas, skrining medis, dan berpayung hukum resmi sejak 2010.";
  const companyName = company?.nama_perusahaan || SITE_CONFIG.name;
  const heroImage = pageSetting?.hero_image || "/asisten-rumah-tangga.webp";
  const heroImageAlt = pageSetting?.hero_image_alt || `Layanan Penempatan PRT ${companyName}`;

  const waMessage = encodeURIComponent(
    `Halo ${companyName}, saya ingin berkonsultasi mengenai kebutuhan layanan tenaga kerja rumah tangga untuk keluarga kami.`
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const serviceCards = [
    {
      id: "art",
      title: "Asisten Rumah Tangga (ART)",
      icon: Home,
      href: "/layanan/art",
      focus:
        "Kebersihan hunian, mencuci, menyetrika, dan memasak hidangan harian keluarga.",
      placements: [
        { label: "Menginap (Live-in)", type: "emerald" },
        { label: "Pulang-Pergi (Live-out)", type: "neutral" },
      ],
      estimatedCost: "Mulai Rp1,5jt – Rp4jt+/bulan",
      duties: [
        "Tata graha & sanitasi berkala seluruh ruangan",
        "Pencucian, penyetrikaan & pengelolaan linen",
        "Persiapan masakan rumahan harian keluarga",
      ],
      badge: "Tata Graha & Kuliner",
    },
    {
      id: "baby-sitter",
      title: "Baby Sitter & Pengasuh Anak",
      icon: Baby,
      href: "/layanan/baby-sitter",
      focus:
        "Perawatan bayi baru lahir (newborn), stimulasi balita, pendampingan belajar, dan sanitasi ketat.",
      placements: [
        { label: "Suster Menginap", type: "emerald" },
        { label: "Suster Harian Berpengalaman", type: "neutral" },
      ],
      estimatedCost: "Mulai Rp2,5jt – Rp5jt+/bulan",
      duties: [
        "Perawatan medis dasar & nutrisi bayi/balita",
        "Stimulasi kognitif & aktivitas tumbuh kembang",
        "Sterilisasi botol, pakaian & perlengkapan anak",
      ],
      badge: "Pengasuhan Terdidik",
    },
    {
      id: "lansia",
      title: "Perawat & Pendamping Lansia",
      icon: HeartPulse,
      href: "/layanan/perawat-lansia",
      focus:
        "Pengawasan jadwal medis, pendampingan mobilitas/kursus geriatri, serta dukungan emosional lansia.",
      placements: [
        { label: "Caregiver Pendamping Mandiri", type: "emerald" },
        { label: "Tirah Baring (Bedridden)", type: "neutral" },
      ],
      estimatedCost: "Mulai Rp2,5jt – Rp6jt+/bulan",
      duties: [
        "Manajemen vitals, jadwal obat & nutrisi khusus",
        "Dukungan mobilitas, fisioterapi ringan & higiene",
        "Pendampingan emosional & komunikasi empati",
      ],
      badge: "Geriatri & Caregiver",
    },
  ];

  const safetyGuarantees = [
    {
      icon: FileCheck,
      title: "Verifikasi Berkas Disnaker",
      desc: "Pemeriksaan KTP, riwayat keluarga, dan surat domisili asal secara rinci.",
    },
    {
      icon: Stethoscope,
      title: "Skrining Laboratorium Medis",
      desc: "Uji fisik berkala bebas dari penyakit menular (Hepatitis, TB, HIV, dsb).",
    },
    {
      icon: Scale,
      title: "Perjanjian Kerja Berpayung Hukum",
      desc: "Hak dan kewajiban transparan berlandaskan hukum resmi yang melindungi kedua pihak.",
    },
    {
      icon: RefreshCw,
      title: "Garansi Penggantian Fleksibel",
      desc: "Fasilitas pergantian pekerja jika terjadi kendala adaptasi di masa kontrak awal.",
    },
  ];

  const bookingSteps = [
    {
      step: "01",
      title: "Tentukan Profil Kebutuhan",
      desc: "Pilih salah satu dari tiga pilar layanan sesuai prioritas kediaman dan ritme keluarga Anda.",
    },
    {
      step: "02",
      title: "Wawancara Kandidat Terpilih",
      desc: "Temui kandidat yang telah lolos kurasi & skrining medis secara langsung di kantor kami atau via video call.",
    },
    {
      step: "03",
      title: "Penempatan Resmi & Masa Adaptasi",
      desc: `Pekerja mulai bertugas dengan pendampingan operasional dan perlindungan garansi dari tim ${companyName}.`,
    },
  ];

  const comparisonData = [
    {
      param: "Fokus Prioritas",
      art: "Higienitas & tata ruang hunian",
      babySitter: "Keselamatan & tumbuh kembang anak",
      lansia: "Kualitas hidup & kenyamanan orang tua",
    },
    {
      param: "Tugas Utama",
      art: "Masak, cuci, setrika, sanitasi kamar",
      babySitter: "Pola tidur bayi, susu/makan, stimulasi",
      lansia: "Manajemen obat, transfer fisik, teman bicara",
    },
    {
      param: "Keahlian Khusus",
      art: "Manajemen logistik dapur & kerapian",
      babySitter: "Sertifikasi balita / penanganan newborn",
      lansia: "Protokol darurat medis dasar & kesabaran",
    },
    {
      param: "Rentang Biaya",
      art: "Rp2.500.000 – Rp4.000.000",
      babySitter: "Rp2.500.000 – Rp5.000.000",
      lansia: "Rp2.500.000 – Rp6.000.000",
    },
  ];

  return (
    <div className="min-h-screen bg-brand-offwhite text-on-surface">
      {/* 1. HERO BANNER */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-brand-offwhite border-b border-outline-variant/30">
        {/* Background Image Overlay */}
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
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-offwhite/40 via-brand-offwhite/80 to-brand-offwhite" />
        </div>

        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#0b4f42_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-hero-in">
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-sage-tint/80 border border-brand-sage/30 text-brand-pine text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6 shadow-xs">
              <span>LAYANAN RESMI PENEMPATAN TENAGA KERJA DOMESTIK</span>
              <ShieldCheck className="w-4 h-4 text-brand-sage" />
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-brand-pine leading-tight mb-6">
              {heroTitle}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-on-surface-variant font-normal leading-relaxed max-w-3xl mx-auto mb-10">
              {heroSubtitle}
            </p>


            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto shadow-ambient group gap-2 text-base px-7 py-3.5"
                >
                  <PhoneCall className="w-5 h-5 text-white/90 group-hover:rotate-12 transition-transform duration-200" />
                  <span>Konsultasi Kebutuhan Keluarga</span>
                </Button>
              </a>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => scrollToSection("matriks-perbandingan")}
                className="w-full sm:w-auto gap-2 text-base px-7 py-3.5 border-brand-pine/80 hover:bg-brand-pine/5"
              >
                <span>Bandingkan Semua Layanan ↓</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TIGA KARTU LAYANAN TERKURASI */}
      <section className="py-16 md:py-24 bg-surface-bright" id="katalog-layanan">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-brand-sage font-semibold text-xs sm:text-sm tracking-wider uppercase mb-2 block">
              KATALOG SPESIALISASI
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-brand-pine mb-4">
              Pilihan Layanan Domestik Terkurasi
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base">
              Setiap pilar disesuaikan dengan standar operasional ketat untuk memberikan pendampingan yang tepat sasaran bagi keluarga Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {serviceCards.map((card, index) => {
              const IconComp = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex flex-col h-full bg-white/80 backdrop-blur-md rounded-2xl border border-brand-sage/20 p-6 sm:p-8 shadow-glass hover:shadow-ambient hover:-translate-y-1.5 transition-all duration-300 group"
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-block px-3 py-1 rounded-full bg-brand-sage-tint text-brand-sage text-xs font-semibold uppercase tracking-wider">
                      {card.badge}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-brand-sage-tint/80 border border-brand-sage/20 flex items-center justify-center text-brand-pine group-hover:bg-brand-pine group-hover:text-white transition-colors duration-300">
                      <IconComp className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-brand-pine mb-3 group-hover:text-brand-sage transition-colors">
                    {card.title}
                  </h3>

                  {/* Focus */}
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-grow">
                    {card.focus}
                  </p>

                  {/* Placements */}
                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-semibold text-outline uppercase tracking-wider block">
                      Pilihan Penempatan:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {card.placements.map((p, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-surface-container text-on-surface border border-outline-variant/40"
                        >
                          {p.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Estimated Cost */}
                  <div className="p-3.5 rounded-xl bg-brand-offwhite border border-brand-sage/20 mb-6">
                    <span className="text-xs text-outline block font-medium">
                      Estimasi Biaya:
                    </span>
                    <span className="text-sm font-semibold text-brand-pine">
                      {card.estimatedCost}
                    </span>
                  </div>

                  {/* Duties Checklist */}
                  <ul className="space-y-2.5 mb-8 text-xs sm:text-sm text-on-surface-variant">
                    {card.duties.map((duty, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-sage shrink-0 mt-0.5" />
                        <span>{duty}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Deep Link CTA */}
                  <div className="mt-auto pt-4 border-t border-outline-variant/20">
                    <Link
                      href={card.href}
                      className="inline-flex items-center justify-between w-full text-sm font-semibold text-brand-pine group-hover:text-brand-ruby transition-colors"
                    >
                      <span>Eksplorasi Layanan {card.title.split(" ")[0]} Lengkap</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. MATRIKS KOMPARASI CEPAT ANTAR LAYANAN (SEO Power Table) */}
      <section
        id="matriks-perbandingan"
        className="py-16 md:py-24 bg-brand-offwhite border-t border-b border-outline-variant/30 scroll-mt-20"
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-brand-sage font-semibold text-xs sm:text-sm tracking-wider uppercase mb-2 block">
              SEO POWER TABLE & PANDUAN CEPAT
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-brand-pine mb-4">
              Matriks Komparasi Cepat Antar Layanan
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base">
              Tabel ini membantu calon pengguna jasa menentukan jenis tenaga kerja yang paling tepat berdasarkan kebutuhan spesifik hunian Anda.
            </p>
          </div>

          {/* Desktop & Tablet Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-x-auto rounded-2xl border border-brand-sage/30 shadow-glass bg-white"
          >
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-brand-pine text-white">
                  <th className="py-4 px-5 text-sm font-semibold tracking-wide w-1/5 border-b border-brand-pine/80">
                    Parameter Evaluasi
                  </th>
                  <th className="py-4 px-5 text-sm font-semibold tracking-wide w-1/4 border-b border-brand-pine/80">
                    Asisten Rumah Tangga (ART)
                  </th>
                  <th className="py-4 px-5 text-sm font-semibold tracking-wide w-1/4 border-b border-brand-pine/80">
                    Baby Sitter (Pengasuh Anak)
                  </th>
                  <th className="py-4 px-5 text-sm font-semibold tracking-wide w-1/4 border-b border-brand-pine/80">
                    Perawat / Pendamping Lansia
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30 text-sm">
                {comparisonData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={
                      idx % 2 === 0
                        ? "bg-white hover:bg-brand-sage-tint/20 transition-colors"
                        : "bg-surface-container-low/40 hover:bg-brand-sage-tint/20 transition-colors"
                    }
                  >
                    <td className="py-4 px-5 font-semibold text-brand-pine bg-brand-sage-tint/30">
                      {row.param}
                    </td>
                    <td className="py-4 px-5 text-on-surface-variant">
                      {row.art}
                    </td>
                    <td className="py-4 px-5 text-on-surface-variant">
                      {row.babySitter}
                    </td>
                    <td className="py-4 px-5 text-on-surface-variant">
                      {row.lansia}
                    </td>
                  </tr>
                ))}
                {/* Guideline Link Row */}
                <tr className="bg-brand-sage-tint/40">
                  <td className="py-4 px-5 font-semibold text-brand-pine">
                    Halaman Panduan
                  </td>
                  <td className="py-4 px-5">
                    <Link
                      href="/layanan/asisten-rumah-tangga"
                      className="inline-flex items-center gap-1.5 font-semibold text-brand-pine hover:text-brand-ruby transition-colors text-sm"
                    >
                      <span>Detail ART →</span>
                    </Link>
                  </td>
                  <td className="py-4 px-5">
                    <Link
                      href="/layanan/baby-sitter"
                      className="inline-flex items-center gap-1.5 font-semibold text-brand-pine hover:text-brand-ruby transition-colors text-sm"
                    >
                      <span>Detail Baby Sitter →</span>
                    </Link>
                  </td>
                  <td className="py-4 px-5">
                    <Link
                      href="/layanan/perawat-lansia"
                      className="inline-flex items-center gap-1.5 font-semibold text-brand-pine hover:text-brand-ruby transition-colors text-sm"
                    >
                      <span>Detail Perawat Lansia →</span>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* 4. STANDAR PERLINDUNGAN & MUTU SERAGAM (Universal Safety Blanket) */}
      <section className="py-16 md:py-24 bg-surface-bright">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-brand-sage font-semibold text-xs sm:text-sm tracking-wider uppercase mb-2 block">
              UNIVERSAL SAFETY BLANKET
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-brand-pine mb-4">
              Standar Perlindungan & Mutu Seragam
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base">
              Apapun pilihan layanan yang Anda butuhkan, seluruh penempatan tenaga kerja {companyName} dilindungi oleh 4 pilar garansi keselamatan resmi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyGuarantees.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-brand-sage-tint border border-brand-sage/30 hover:border-brand-sage transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-glass"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white border border-brand-sage/30 flex items-center justify-center text-brand-sage mb-5 group-hover:bg-brand-sage group-hover:text-white transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-brand-pine mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-brand-sage/20 flex items-center gap-1.5 text-brand-sage text-xs font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Jaminan {companyName}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. ALUR PEMESANAN 3 LANGKAH PRAKTIS */}
      <section className="py-16 md:py-24 bg-brand-offwhite border-t border-outline-variant/30">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-sage font-semibold text-xs sm:text-sm tracking-wider uppercase mb-2 block">
              TRANSPARANSI PROSES
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-brand-pine mb-4">
              Alur Pemesanan 3 Langkah Praktis
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base">
              Proses mudah dan aman untuk menghadirkan tenaga kerja rumah tangga terlatih ke kediaman Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {bookingSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative bg-white rounded-2xl border border-brand-sage/25 p-6 sm:p-8 shadow-glass flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-brand-sage/40">
                      Langkah {step.step}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-brand-sage-tint text-brand-pine text-xs font-bold flex items-center justify-center border border-brand-sage/30">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-brand-pine mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center text-xs text-brand-pine font-medium gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-sage" />
                  <span>Proses Terverifikasi</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section (CMS Managed) */}
      <FaqSection items={pageSetting?.faqs} whatsappNumber={waNumber} companyName={companyName} />

      {/* 6. BOTTOM CONVERSION CTA BANNER */}
      <section className="py-16 md:py-24 bg-surface-bright">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-brand-pine text-white p-8 sm:p-12 md:p-16 shadow-ambient relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8"
          >
            {/* Background Decorative Pattern */}
            <div className="absolute right-0 bottom-0 pointer-events-none opacity-10 translate-x-10 translate-y-10">
              <Building2 className="w-96 h-96 text-white" />
            </div>

            <div className="relative z-10 max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20">
                KONSULTASI GRATIS & BEBAS KOMITMEN
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight mb-4 text-white">
                Masih Ragu Menentukan Layanan yang Tepat?
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Konsultasikan dinamika hunian, jumlah anggota keluarga, atau kondisi kesehatan orang tua Anda secara gratis bersama konsultan {companyName}.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center gap-4 w-full md:w-auto shrink-0">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <button className="w-full sm:w-auto inline-flex items-center justify-center font-medium transition-all duration-200 rounded-[8px] text-base px-6 py-3.5 bg-brand-ruby text-white hover:bg-brand-ruby/90 shadow-ruby active:scale-[0.98] gap-2.5 cursor-pointer">
                  <PhoneCall className="w-5 h-5" />
                  <span>Konsultasi Kebutuhan via WhatsApp</span>
                </button>
              </a>

              <Link href="/kontak" className="w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto border border-white/40 text-white hover:bg-white/10 text-base px-6 py-3.5"
                >
                  <span>Kunjungi Kantor Operasional Kami</span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
