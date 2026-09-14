"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  PhoneCall,
  CheckCircle2,
  RefreshCw,
  ChevronDown,
  Quote,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import type { PageSetting, CompanyIdentity } from "@/lib/settings";
import dynamic from "next/dynamic";

const FaqSection = dynamic(() => import("@/components/common/FaqSection"), {
  loading: () => <div className="h-64 animate-pulse bg-surface-container rounded-2xl" />,
});

interface HomeClientProps {
  pageSetting: PageSetting;
  company: CompanyIdentity;
}

export default function HomeClient({ pageSetting, company }: HomeClientProps) {
  const [activeTab, setActiveTab] = useState<"art" | "baby-sitter" | "elder-care">("art");

  const waNumber = company?.nomor_whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6285111399962";
  const heroTitle = pageSetting?.hero_title || "Kenyamanan & Ketenangan Rumah Dimulai dari Tangan yang Tepat.";
  const heroSubtitle =
    pageSetting?.hero_subtitle ||
    "PT Jasa Mandiri menyalurkan Asisten Rumah Tangga, Baby Sitter, dan Perawat Lansia terpercaya yang telah melewati verifikasi identitas ketat, pemeriksaan kesehatan medis, serta pelatihan etika kerja profesional.";
  const heroImage = pageSetting?.hero_image || "/asisten-rumah-tangga.webp";
  const heroImageAlt = pageSetting?.hero_image_alt || "Penyalur Asisten Rumah Tangga Resmi PT Jasa Mandiri";

  const scrollToSection = (id: "art" | "baby-sitter" | "elder-care") => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const services = [
    {
      id: "art",
      href: "/layanan/art",
      title: "Asisten Rumah Tangga (ART)",
      badge: "Tata Graha & Dapur",
      description:
        "Tenaga ART terlatih yang siap menjaga kebersihan perabot premium (marmer, kayu, kulit), manajemen laundry halus, serta hidangan lezat untuk keluarga Anda.",
      features: [
        "Pembersihan Material Khusus",
        "Penyetrikaan & Laundry Halus",
        "Masakan Rumahan Higienis",
      ],
      image: pageSetting?.service_art_image || "/asisten-rumah-tangga.webp",
    },
    {
      id: "baby-sitter",
      href: "/layanan/baby-sitter",
      title: "Baby Sitter & Nanny",
      badge: "Stimulasi & Nutrisi",
      description:
        "Pengasuh anak profesional yang memahami psikologi perkembangan motorik, kebersihan nutrisi MPASI, dan protokol keselamatan pertolongan pertama (First Aid).",
      features: [
        "Stimulasi Kognitif & Motorik",
        "Penyiapan MPASI Higienis",
        "Sertifikasi Medis Dasar",
      ],
      image: pageSetting?.service_babysitter_image || "/baby-sitter.webp",
    },
    {
      id: "elder-care",
      href: "/layanan/perawat-lansia",
      title: "Perawat Lansia (Elder Care)",
      badge: "Empati & Medis",
      description:
        "Pendamping lansia penuh kasih sayang yang teliti mengelola jadwal medikasi, pemantauan tanda vital, terapi mobilitas fisik, serta dukungan kenyamanan emosional.",
      features: [
        "Manajemen Obat & Vital Signs",
        "Bantuan Mobilitas & Pencegahan Jatuh",
        "Teman Bicara & Empati Tulus",
      ],
      image: pageSetting?.service_perawat_image || "/perawat-lansia.webp",
    },
  ];

  const selectionSteps = [
    {
      no: "01",
      title: "Verifikasi Latar Belakang & Identitas",
      desc: "Pengecekan KTP, KK, SKCK Kepolisian, serta konfirmasi riwayat kerja dari majikan sebelumnya.",
    },
    {
      no: "02",
      title: "Medical Check-Up Lengkap",
      desc: "Pemeriksaan kesehatan bebas penyakit menular (Hepatitis, TBC, HIV, Typhus) di klinik terpercaya.",
    },
    {
      no: "03",
      title: "Uji Keterampilan & Etika Kerja",
      desc: "Evaluasi keahlian praktis, sopan santun, serta tes kesiapan mental sebelum masa tugas.",
    },
    {
      no: "04",
      title: "Garansi Penukaran Pekerja",
      desc: "Perjanjian kontrak legal dengan jaminan penggantian tenaga kerja jika terdapat ketidakcocokan.",
    },
  ];

  const placementProcess = [
    { step: 1, title: "Konsultasi Kebutuhan", desc: "Sampaikan kriteria spesifik rumah tangga Anda via WhatsApp." },
    { step: 2, title: "Kurasi & Wawancara", desc: "Pilih profil kandidat dan lakukan wawancara tatap muka / online." },
    { step: 3, title: "Kontrak Kerja Legal", desc: "Penandatanganan perjanjian resmi bermaterai dengan garansi." },
    { step: 4, title: "Pekerja Mulai Tugas", desc: "Tenaga kerja diantar langsung ke rumah Anda siap bertugas." },
  ];

  const salaryGuide = [
    { service: "Asisten Rumah Tangga", range: "Rp 2,0jt – Rp 4,0jt+", note: "Tergantung pengalaman & beban rumah" },
    { service: "Baby Sitter & Nanny", range: "Rp 2,8jt – Rp 5,5jt+", note: "Tergantung usia anak & sertifikasi" },
    { service: "Perawat Lansia", range: "Rp 3,0jt – Rp 6,5jt+", note: "Tergantung kondisi medis & lansia" },
  ];

  const faqItems = [
    {
      q: "Berapa lama proses penyaluran tenaga kerja memakan waktu?",
      a: "Proses seleksi hingga penempatan umumnya membutuhkan 1-3 hari kerja. Jika Anda memerlukan kandidat spesifik, kami menyediakan sesi wawancara hingga Anda merasa cocok.",
    },
    {
      q: "Bagaimana mekanisme garansi penggantian pekerja?",
      a: "Setiap penempatan dilengkapi garansi penggantian pekerja hingga 3 kali dalam masa kontrak tanpa biaya administrasi tambahan.",
    },
    {
      q: "Apakah melayani penempatan di luar Jabodetabek?",
      a: "Fokus utama kami adalah area Jabodetabek. Namun kami dapat melayani penempatan ke seluruh wilayah Indonesia dengan ketentuan biaya transportasi ditanggung pemesan.",
    },
    {
      q: "Dokumen apa saja yang diperlukan oleh calon majikan?",
      a: "Cukup melampirkan fotokopi KTP dan Kartu Keluarga (KK) penanggung jawab untuk keperluan identitas dalam Perjanjian Kerja Legal.",
    },
  ];

  return (
    <div className="overflow-hidden min-h-screen bg-brand-offwhite">
      {/* Background Decorative Lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-sage-tint/40 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-[500px] -left-40 w-[600px] h-[600px] rounded-full bg-primary-fixed-dim/20 blur-[150px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden pt-8 pb-16 md:py-24">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src={heroImage}
            alt={heroImageAlt}
            fill
            priority={true}
            fetchPriority="high"
            loading="eager"
            sizes="(max-width: 768px) 100vw, 100vw"
            quality={75}
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-offwhite/40 via-brand-offwhite/75 to-brand-offwhite" />
        </div>

        <div className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full"
          >
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left gap-6">
              <motion.div variants={itemVariants}>
                <Chip label={company?.tagline || "Penyalur Resmi Berizin Kemnaker & Disnaker"} />
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-brand-charcoal"
              >
                {heroTitle}
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="font-sans text-lg text-on-surface-variant leading-relaxed max-w-2xl"
              >
                {heroSubtitle}
              </motion.p>

              {/* Quick Interactive Service Tabs */}
              <motion.div variants={itemVariants} className="w-full">
                <div className="glass-surface p-2 rounded-xl flex flex-wrap sm:flex-nowrap gap-2 border border-outline-subtle/50 shadow-sm">
                  <button
                    onClick={() => scrollToSection("art")}
                    className={`flex-1 py-3 px-4 rounded-lg font-sans text-xs sm:text-sm font-semibold transition-all ${activeTab === "art"
                      ? "bg-brand-pine text-white shadow-sm"
                      : "text-brand-charcoal hover:bg-surface-container-low"
                      }`}
                  >
                    Asisten Rumah Tangga
                  </button>
                  <button
                    onClick={() => scrollToSection("baby-sitter")}
                    className={`flex-1 py-3 px-4 rounded-lg font-sans text-xs sm:text-sm font-semibold transition-all ${activeTab === "baby-sitter"
                      ? "bg-brand-pine text-white shadow-sm"
                      : "text-brand-charcoal hover:bg-surface-container-low"
                      }`}
                  >
                    Baby Sitter
                  </button>
                  <button
                    onClick={() => scrollToSection("elder-care")}
                    className={`flex-1 py-3 px-4 rounded-lg font-sans text-xs sm:text-sm font-semibold transition-all ${activeTab === "elder-care"
                      ? "bg-brand-pine text-white shadow-sm"
                      : "text-brand-charcoal hover:bg-surface-container-low"
                      }`}
                  >
                    Perawat Lansia
                  </button>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2"
              >
                <a
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="compassionate" size="lg" className="w-full sm:w-auto gap-2">
                    <PhoneCall className="w-4 h-4" />
                    <span>Konsultasi WA Sekarang</span>
                  </Button>
                </a>
              </motion.div>
            </div>

            {/* Right Column: Hero Floating Trust Card */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-surface p-6 sm:p-8 rounded-2xl space-y-6 shadow-ambient border border-outline-subtle"
              >
                <div className="flex items-start gap-4 pb-5 border-b border-outline-subtle">
                  <div className="p-3 rounded-full bg-brand-sage-tint text-brand-sage shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-brand-pine">
                      Garansi Keamanan 100%
                    </h2>
                    <p className="font-sans text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Identitas KTP, KK, dan riwayat SKCK diverifikasi resmi.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-5 border-b border-outline-subtle">
                  <div className="p-3 rounded-full bg-brand-sage-tint text-brand-sage shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-brand-pine">
                      Medical Check-up Lengkap
                    </h2>
                    <p className="font-sans text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Bebas penyakit menular (TBC, Hepatitis, Typhus) & sehat fisik.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-brand-sage-tint text-brand-sage shrink-0">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-brand-pine">
                      Jaminan Penggantian
                    </h2>
                    <p className="font-sans text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Garansi penggantian hingga 3x jika terjadi ketidakcocokan.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Deep Dive Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <Chip label="Spesialisasi Tenaga Kerja" />
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-pine">
            Layanan Eksklusif Kami
          </h2>
          <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto">
            Didedikasikan untuk memberikan kenyamanan dan kebebasan pikiran keluarga Anda melalui tenaga terdidik.
          </p>
        </div>

        <div className="space-y-16">
          {services.map((service, idx) => (
            <div
              key={service.id}
              id={service.id}
              className={`scroll-mt-28 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center ${idx % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
            >
              <div className={`space-y-6 ${idx % 2 === 1 ? "md:order-2" : "md:order-1"}`}>
                <span className="font-sans text-xs font-semibold text-brand-sage bg-brand-sage-tint px-3 py-1 rounded-full uppercase tracking-wider">
                  {service.badge}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-pine">
                  {service.title}
                </h3>
                <p className="font-sans text-base text-on-surface-variant leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 font-sans text-sm text-brand-charcoal">
                      <CheckCircle2 className="w-5 h-5 text-brand-sage shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2">
                  <Link href={service.href}>
                    <Button variant="secondary" className="gap-2">
                      <span>Detail Layanan {service.title.split(" ")[0]}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className={`${idx % 2 === 1 ? "md:order-1" : "md:order-2"}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-ambient border border-outline-subtle aspect-[4/3]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={75}
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-pine/30 to-transparent opacity-60" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Kurasi Standards Bento Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-container mx-auto">
          <div className="text-center mb-14 space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-pine">
              Bukan Sekadar Menyalurkan, Kami Mengurasi Keamanan Anda.
            </h2>
            <p className="font-sans text-base text-on-surface-variant max-w-2xl mx-auto">
              Setiap tenaga kerja melewati 4 tahapan seleksi berlapis sebelum ditempatkan di kediaman Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {selectionSteps.map((step) => (
              <div
                key={step.no}
                className="relative bg-white rounded-xl p-6 border border-outline-variant/40 shadow-sm hover:border-brand-pine transition-all group"
              >
                <div aria-hidden="true" className="absolute -right-2 -top-4 font-serif text-7xl font-bold text-brand-pine/10 group-hover:text-brand-pine/20 transition-colors select-none">
                  {step.no}
                </div>
                <div className="relative z-10 space-y-3">
                  <h3 className="font-serif text-xl font-bold text-brand-pine">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Timeline */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-container mx-auto">
        <div className="text-center mb-16 space-y-3">
          <Chip label="Sederhana & Legal" />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-pine">
            Alur Penempatan 4 Langkah Mudah
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {placementProcess.map((proc) => (
            <div key={proc.step} className="flex flex-col items-center text-center space-y-4 relative">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-brand-pine text-brand-pine font-serif text-2xl font-bold flex items-center justify-center shadow-sm">
                {proc.step}
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-pine">{proc.title}</h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                {proc.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Salary Transparency */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-outline-variant/30">
        <div className="max-w-container mx-auto">
          <div className="text-center mb-12 space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-pine">
              Transparansi Upah & Kompensasi
            </h2>
            <p className="font-sans text-base text-on-surface-variant">
              Estimasi standar gaji sesuai keahlian, pengalaman, dan sistem kerja.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {salaryGuide.map((sg, i) => (
              <div
                key={i}
                className="glass-surface p-6 sm:p-8 rounded-2xl text-center space-y-3 border border-outline-subtle"
              >
                <h3 className="font-serif text-xl font-bold text-brand-pine">{sg.service}</h3>
                <div className="font-serif text-3xl font-bold text-brand-ruby">{sg.range}</div>
                <p className="font-sans text-xs text-on-surface-variant">{sg.note}</p>
              </div>
            ))}
          </div>
          <p className="text-center font-sans text-xs text-on-surface-variant italic">
            *Estimasi belum termasuk bonus hari raya (THR), fasilitas makan, serta uang pengganti cuti harian.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-container mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-pine">
              Suara Kepercayaan Keluarga Klien
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-outline-variant/30 shadow-sm relative">
              <Quote className="w-10 h-10 text-brand-pine/10 absolute top-6 left-6" />
              <p className="font-serif text-lg text-brand-charcoal italic mb-6 relative z-10 pt-4 leading-relaxed">
                "Ketenangan luar biasa bisa fokus bekerja karena tahu anak diasuh oleh Baby Sitter yang paham medis dasar dan gizi MPASI. Latar belakangnya terverifikasi dan sangat sopan."
              </p>
              <div className="font-sans text-sm font-bold text-brand-pine">
                — Ibu Vania S. (Menteng, Jakarta Pusat)
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-outline-variant/30 shadow-sm relative">
              <Quote className="w-10 h-10 text-brand-pine/10 absolute top-6 left-6" />
              <p className="font-serif text-lg text-brand-charcoal italic mb-6 relative z-10 pt-4 leading-relaxed">
                "Merawat orang tua pasca stroke butuh kesabaran dan keahlian khusus. Perawat lansia dari PT Jasa Mandiri sangat sigap mengukur tensi, medikasi, dan telaten menemani."
              </p>
              <div className="font-sans text-sm font-bold text-brand-pine">
                — Bpk. Hendra K. (Pondok Indah, Jakarta Selatan)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (CMS Driven) */}
      <FaqSection items={pageSetting?.faqs} whatsappNumber={waNumber} />

      {/* Final Call to Action */}
      <section className="bg-brand-pine py-16 md:py-20 px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Temukan Tenaga Kerja Terpercaya yang Memahami Kebutuhan Rumah Anda.
          </h2>
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button variant="compassionate" size="lg" className="gap-2 text-base px-8 py-4">
              <PhoneCall className="w-5 h-5" />
              <span>Konsultasi via WhatsApp Sekarang</span>
            </Button>
          </a>
          <p className="font-sans text-xs text-white/80">
            Respon cepat saat jam kerja • Bebas konsultasi awal • Berizin resmi Kemnaker RI
          </p>
        </div>
      </section>
    </div>
  );
}
