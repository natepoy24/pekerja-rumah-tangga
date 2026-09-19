import type { Metadata } from "next";
import Image from "next/image";
import {
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  HeartPulse,
  Activity,
  Sparkles,
  Footprints,
  MessageSquareHeart,
  FileCheck2,
  RefreshCw,
  Heart,
  Info,
  Check,
  Building2,
  Stethoscope,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
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
  loading: () => (
    <div className="h-64 animate-pulse bg-surface-container rounded-2xl" />
  ),
});

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [setting, company] = await Promise.all([
    getPageSetting("page_perawat_lansia"),
    getCompanyIdentity(),
  ]);

  const companyName = company.nama_perusahaan || SITE_CONFIG.name;
  const title =
    setting.meta_title ||
    `Penyalur Perawat & Pendamping Lansia Resmi | ${companyName}`;
  const description =
    setting.meta_description ||
    "Penyalur perawat lansia dan caregiver profesional berizin Disnaker. Perawatan sabar, pengawasan jadwal obat, pendampingan mobilitas, dan garansi resmi.";
  const ogImage = setting.og_image || setting.hero_image || "/perawat-lansia.webp";

  const defaultKeywords = [
    "penyalur perawat lansia resmi",
    "jasa caregiver lansia",
    "perawat orang tua menginap Jakarta",
    "pendamping lansia terpercaya",
    "yayasan perawat lansia",
  ];

  const keywords = setting.keywords
    ? setting.keywords.split(",").map((k: string) => k.trim())
    : defaultKeywords;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${SITE_CONFIG.url}/layanan/perawat-lansia`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, alt: setting.hero_image_alt || title }],
      url: `${SITE_CONFIG.url}/layanan/perawat-lansia`,
      siteName: companyName,
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
    getPageSetting("page_perawat_lansia"),
    getCompanyIdentity(),
  ]);

  const companyName = company.nama_perusahaan || SITE_CONFIG.name;
  const waNumber = company.nomor_whatsapp || SITE_CONFIG.whatsappPrimary;

  const waHeroConsultUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Halo ${companyName}, saya ingin konsultasi mengenai layanan perawat & pendamping lansia untuk orang tua kami.`
  )}`;

  const waHeroOrderUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Halo ${companyName}, saya ingin mencari perawat lansia terseleksi.`
  )}`;

  const waBottomConsultUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Halo ${companyName}, saya ingin konsultasi kebutuhan perawatan orang tua via WhatsApp.`
  )}`;

  const serviceSchema = generateServiceSchema(
    "Perawat & Pendamping Lansia",
    pageSetting.meta_description ||
    "Penyalur perawat lansia dan caregiver profesional berizin Disnaker. Perawatan sabar, pengawasan jadwal obat, pendampingan mobilitas, dan garansi resmi.",
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
    "Pendampingan Penuh Empati, Martabat, dan Perhatian Tulus untuk Orang Tua Tercinta.";
  const heroSubtitle =
    pageSetting.hero_subtitle ||
    "Dapatkan caregiver dan perawat lansia terseleksi yang sabar, teliti mengawal kebutuhan medis harian, serta hadir sebagai teman bicara yang memberikan kenyamanan emosional di rumah.";
  const heroImage = pageSetting.hero_image || "/perawat-lansia.webp";
  const heroImageAlt =
    pageSetting.hero_image_alt ||
    "Perawat berseragam bersih mendampingi lansia dengan penuh perhatian dan kehangatan";

  // Section 2: Lingkup Perawatan & Pendampingan Harian
  const scopeOfCare = [
    {
      icon: Sparkles,
      title: "Higienitas & Kebutuhan Dasar",
      points: [
        "Membantu lansia mandi, berpakaian, menyisir rambut, dan merawat kebersihan diri.",
        "Membantu pemenuhan nutrisi harian dan menyiapkan menu makanan/minuman ramah lansia.",
        "Menjaga kebersihan tempat tidur, ventilasi, dan area kamar lansia agar higienis.",
      ],
    },
    {
      icon: HeartPulse,
      title: "Manajemen Obat & Pemeriksaan Kesehatan",
      points: [
        "Mengingatkan dan mendampingi jadwal minum obat rutin sesuai resep dokter.",
        "Mendampingi kunjungan kontrol kesehatan berkala ke dokter atau rumah sakit.",
        "Memantau perubahan fisik harian (tekanan darah, pola makan, jam tidur) dan melapor ke keluarga.",
      ],
    },
    {
      icon: Footprints,
      title: "Mobilitas Fisik & Olahraga Ringan",
      points: [
        "Membantu pergerakan fisik: bangun dari ranjang, berpindah ke kursi roda, atau berjalan.",
        "Menemani olahraga ringan, senam lansia, atau jalan santai di pagi hari sesuai kapasitas fisik.",
        "Menjaga keselamatan fisik lansia dari risiko terpeleset atau jatuh (fall prevention).",
      ],
    },
    {
      icon: MessageSquareHeart,
      title: "Dukungan Emosional & Teman Bicara",
      points: [
        "Hadir sebagai pendengar yang sabar, teman bercerita, dan teman beraktivitas harian.",
        "Mencegah rasa kesepian dan isolasi emosional pada usia senja.",
        "Menghormati privasi, kebiasaan, serta martabat pribadi orang tua yang dirawat.",
      ],
    },
  ];

  // Section 3: Tingkatan Perawatan Berdasarkan Kebutuhan Lansia
  const careLevels = [
    {
      badge: "Aktivitas Ringan",
      name: "Pendamping Lansia Mandiri",
      subName: "Care Companion",
      focus:
        "Lansia masih mampu beraktivitas secara umum, membutuhkan teman mengobrol, pengawasan rutinitas obat, dan bantuan operasional ringan.",
      features: [
        "Teman ngobrol & aktivitas kognitif harian",
        "Pengingat jadwal obat & jadwal makan",
        "Bantuan operasional ringan & kerapian kamar",
        "Menemani jalan santai & senam ringan",
      ],
      isPopular: false,
    },
    {
      badge: "Paling Banyak Dipilih",
      name: "Caregiver Lansia Semi-Bedridden",
      subName: "Assisted Living",
      focus:
        "Lansia membutuhkan bantuan penuh untuk berpindah tempat, penggunaan kursi roda, bantuan mandi, pemakaian popok dewasa (diaper care), dan bantuan makan.",
      features: [
        "Bantuan mandi di ranjang / kamar mandi",
        "Pemakaian & penggantian diapers teratur",
        "Transfer mobilitas aman & kursi roda",
        "Pencegahan dekubitus & monitoring posisi tubuh",
      ],
      isPopular: true,
    },
    {
      badge: "Kebutuhan Medis Khusus",
      name: "Perawat Khusus / Lansia Kondisi Tertentu",
      subName: "Specialized Care",
      focus:
        "Pendampingan lansia pasca-stroke, demensia/alzheimer, atau lansia dengan kebutuhan selang makan (NGT) dan kateter dasar.",
      features: [
        "Pendampingan pasien pasca-stroke / demensia",
        "Perawatan & monitoring selang NGT / kateter dasar",
        "Pencatatan vital sign (tensi, saturasi, suhu)",
        "Latihan fisioterapi ringan sesuai arahan dokter",
      ],
      isPopular: false,
    },
  ];

  // Section 4: Panduan Estimasi Gaji & Standar Kesejahteraan
  const salaryTable = [
    {
      category: "Pendamping Lansia Pulang-Pergi (Live-out)",
      range: "Rp2.500.000 – Rp4.000.000 / bulan",
      spec: "Jam kerja harian terstruktur (8–9 jam per hari)",
    },
    {
      category: "Pendamping Lansia Menginap (Live-in Standar)",
      range: "Rp3.500.000 – Rp6.000.000 / bulan",
      spec: "Siaga harian, akomodasi, makan, dan kamar tersendiri",
    },
    {
      category: "Perawat Lansia Berpengalaman / Sertifikasi",
      range: "Rp4.000.000 – Rp7.000.000+ / bulan",
      spec: "Pengalaman 5+ tahun / sertifikasi keperawatan geriatri",
    },
    {
      category: "Lansia Kondisi Khusus / Kebutuhan Mobilitas Total",
      range: "Menyesuaikan tingkat kesulitan",
      spec: "Memerlukan tenaga fisik ekstra dan penanganan intensif",
    },
  ];

  // Section 5: 4 Standar Kualifikasi PT Jasa Mandiri
  const qualifications = [
    {
      icon: Stethoscope,
      title: "Skrining Kesehatan & Bebas Penyakit Menular",
      desc: "Uji laboratorium medis dasar sebelum penempatan untuk memastikan keamanan interaksi langsung dengan lansia yang rentan.",
    },
    {
      icon: Heart,
      title: "Uji Kesabaran & Sikap Hormat",
      desc: "Evaluasi stabilitas emosi, tata krama, dan pemahaman etika dalam menghargai privasi orang tua.",
    },
    {
      icon: FileCheck2,
      title: "Verifikasi Identitas & Domisili Legal",
      desc: "Terdaftar resmi pada Dinas Ketenagakerjaan dengan kelengkapan berkas kependudukan yang sah.",
    },
    {
      icon: RefreshCw,
      title: "Garansi Penggantian Tanpa Kendala",
      desc: "Garansi pergantian perawat jika lansia merasa kurang nyaman atau tidak cocok dalam masa adaptasi kontrak.",
    },
  ];

  return (
    <div className="bg-[#FAFAF7] text-brand-charcoal selection:bg-[#EBF4E7] selection:text-[#0B4F42]">
      <JsonLd schema={[serviceSchema, breadcrumbSchema]} />
      {faqSchema && <JsonLd schema={faqSchema} />}

      {/* 1. HERO BANNER: Split-screen elegan */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-outline-variant/30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4E7] border border-[#0B4F42]/15 text-[#0B4F42] text-xs sm:text-[13px] font-semibold tracking-wide">
                <span>LAYANAN RESMI PENDAMPING & PERAWAT LANSIA</span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] font-semibold text-[#0B4F42] leading-[1.18] tracking-[-0.015em]">
                {heroTitle}
              </h1>

              {/* Subheadline */}
              <p className="font-sans text-base sm:text-lg text-on-surface-variant leading-[1.65] max-w-2xl">
                {heroSubtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Button
                  href={waHeroOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                  className="bg-[#0B4F42] hover:bg-[#00372d] text-white shadow-ambient gap-2 justify-center"
                >
                  <span>Cari Perawat Lansia Sekarang</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Button>

                <Button
                  href={waHeroConsultUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="lg"
                  className="border-[#0B4F42] text-[#0B4F42] hover:bg-[#EBF4E7]/60 gap-2 justify-center"
                >
                  <PhoneCall className="w-4 h-4 shrink-0" />
                  <span>Konsultasi Kondisi Orang Tua</span>
                </Button>
              </div>

              {/* Trust Indicators underneath CTA */}
              <div className="pt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-on-surface-variant">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0B4F42]" />
                  <span>Penyalur Resmi Berizin Disnaker</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0B4F42]" />
                  <span>Skrining Medis Lengkap</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0B4F42]" />
                  <span>Garansi Penggantian Resmi</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background decorative tone glow */}
                <div
                  className="absolute -inset-2 bg-[#0B4F42]/10 rounded-3xl blur-xl -z-10"
                  aria-hidden="true"
                />

                {/* Main Visual Image Card */}
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-[#0B4F42]/15 shadow-xl bg-white aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5]">
                  <Image
                    src={heroImage}
                    alt={heroImageAlt}
                    fill
                    priority={true}
                    fetchPriority="high"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 520px"
                    quality={85}
                    className="object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle inner gradient shadow at bottom to improve badge contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Badge 1 - Top Left */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="backdrop-blur-md bg-white/95 border border-[#0B4F42]/15 shadow-lg px-3.5 py-2 rounded-xl flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#EBF4E7] text-[#0B4F42] flex items-center justify-center font-bold text-xs shrink-0">
                        ✓
                      </div>
                      <span className="font-sans text-xs sm:text-[13px] font-semibold text-[#14201D]">
                        Terlatih Protokol Lansia & Medis Dasar
                      </span>
                    </div>
                  </div>

                  {/* Floating Badge 2 - Bottom Right */}
                  <div className="absolute bottom-4 right-4 z-10 max-w-[90%]">
                    <div className="backdrop-blur-md bg-white/95 border border-[#0B4F42]/15 shadow-lg px-3.5 py-2 rounded-xl flex items-center gap-2">
                      <span className="font-sans text-xs sm:text-[13px] font-semibold text-[#14201D]">
                        Pendampingan Berizin Resmi & Bergaransi
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LINGKUP PERAWATAN & PENDAMPINGAN HARIAN (Scope of Care) */}
      <section className="py-16 md:py-24 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF4E7] text-[#0B4F42] text-xs font-semibold uppercase tracking-wider">
            Lingkup Pendampingan
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0B4F42] tracking-tight">
            Lingkup Perawatan & Pendampingan Harian
          </h2>
          <p className="font-sans text-base text-on-surface-variant leading-relaxed">
            Perawatan komprehensif yang dirancang untuk menjaga higienitas, stabilitas medis, mobilitas fisik, serta kenyamanan emosional lansia di rumah.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {scopeOfCare.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-outline-variant/40 p-6 shadow-sm hover:shadow-md hover:border-[#0B4F42]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Monoline Icon container */}
                  <div className="w-12 h-12 rounded-xl bg-[#EBF4E7] text-[#0B4F42] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-[#0B4F42] leading-snug">
                    {item.title}
                  </h3>

                  <ul className="space-y-2.5 pt-1">
                    {item.points.map((point, pIdx) => (
                      <li
                        key={pIdx}
                        className="font-sans text-sm text-on-surface-variant leading-relaxed flex items-start gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0B4F42] mt-2 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. TINGKATAN PERAWATAN BERDASARKAN KEBUTUHAN LANSIA */}
      <section className="py-16 md:py-24 bg-surface-container-low/60 border-y border-outline-variant/30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF4E7] text-[#0B4F42] text-xs font-semibold uppercase tracking-wider">
              Kategori Kebutuhan
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0B4F42] tracking-tight">
              Tingkatan Perawatan Berdasarkan Kebutuhan Lansia
            </h2>
            <p className="font-sans text-base text-on-surface-variant leading-relaxed">
              Tiga tingkatan profil tenaga pendamping yang disesuaikan secara transparan dengan tingkat kemandirian fisik orang tua Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {careLevels.map((lvl, idx) => (
              <div
                key={idx}
                className={`rounded-2xl flex flex-col justify-between transition-all duration-300 ${lvl.isPopular
                  ? "bg-white border-2 border-[#0B4F42] shadow-ambient relative ring-1 ring-[#0B4F42]/20"
                  : "bg-white border border-outline-variant/40 shadow-sm hover:border-[#0B4F42]/30"
                  } p-7 md:p-8`}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-sans text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${lvl.isPopular
                        ? "bg-[#0B4F42] text-white"
                        : "bg-[#EBF4E7] text-[#0B4F42]"
                        }`}
                    >
                      {lvl.badge}
                    </span>
                    <span className="font-serif text-sm italic text-on-surface-variant">
                      {lvl.subName}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-[#0B4F42] leading-snug">
                      {lvl.name}
                    </h3>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
                    <p className="font-sans text-xs text-brand-charcoal uppercase tracking-wider font-bold mb-1">
                      Fokus Utama:
                    </p>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      {lvl.focus}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <p className="font-sans text-xs font-semibold text-brand-charcoal uppercase tracking-wider">
                      Cakupan Aktivitas:
                    </p>
                    <ul className="space-y-2.5">
                      {lvl.features.map((feat, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-start gap-2.5 font-sans text-sm text-brand-charcoal"
                        >
                          <Check className="w-4 h-4 text-[#0B4F42] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <Button
                    href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                      `Halo ${companyName}, saya tertarik konsultasi untuk profil: ${lvl.name} (${lvl.subName}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant={lvl.isPopular ? "primary" : "secondary"}
                    size="md"
                    className={`w-full justify-center gap-2 ${lvl.isPopular
                      ? "bg-[#0B4F42] hover:bg-[#00372d] text-white"
                      : "border-[#0B4F42] text-[#0B4F42] hover:bg-[#EBF4E7]"
                      }`}
                  >
                    <span>Pilih Kategori Ini</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PANDUAN ESTIMASI GAJI & STANDAR KESEJAHTERAAN (SEO Knowledge Center) */}
      <section className="py-16 md:py-24 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF4E7] text-[#0B4F42] text-xs font-semibold uppercase tracking-wider">
            SEO Knowledge Center
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0B4F42] tracking-tight">
            Panduan Estimasi Gaji & Standar Kesejahteraan
          </h2>
          <p className="font-sans text-base sm:text-lg italic text-on-surface-variant leading-relaxed">
            &ldquo;Perawatan orang tua membutuhkan dedikasi fisik dan emosional tingkat tinggi. Transparansi standar imbal jasa memastikan terciptanya komitmen kerja yang penuh kesabaran dan tanggung jawab.&rdquo;
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-[#0B4F42] text-white font-serif text-base border-b border-[#0B4F42]">
                  <th className="py-4 px-6 font-medium">Kategori Tenaga Pendamping</th>
                  <th className="py-4 px-6 font-medium">Estimasi Kisaran Gaji (Jabodetabek)</th>
                  <th className="py-4 px-6 font-medium">Spesifikasi & Ketentuan</th>
                </tr>
              </thead>
              <tbody className="font-sans text-sm divide-y divide-outline-variant/30">
                {salaryTable.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-surface-container-low/60 transition-colors"
                  >
                    <td className="py-4.5 px-6 font-semibold text-[#0B4F42]">
                      {row.category}
                    </td>
                    <td className="py-4.5 px-6 font-bold text-[#9E232A]">
                      {row.range}
                    </td>
                    <td className="py-4.5 px-6 text-on-surface-variant">
                      {row.spec}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Catatan Tambahan Callout */}
        <div className="rounded-xl bg-[#EBF4E7] border border-[#0B4F42]/15 p-4 sm:p-5 flex items-start gap-3.5 text-sm text-brand-charcoal">
          <Info className="w-5 h-5 text-[#0B4F42] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#0B4F42]">Catatan Tambahan: </span>
            <span className="text-on-surface-variant leading-relaxed">
              Besaran gaji dipengaruhi oleh tingkat kemandirian fisik lansia, bobot tubuh (terkait transfer mobilitas), riwayat penyakit, serta kesepakatan hari libur/THR resmi.
            </span>
          </div>
        </div>
      </section>

      {/* 5. 4 STANDAR KUALIFIKASI PT JASA MANDIRI */}
      <section className="py-16 md:py-24 bg-surface-container-low/60 border-y border-outline-variant/30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF4E7] text-[#0B4F42] text-xs font-semibold uppercase tracking-wider">
              Jaminan Kualitas
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0B4F42] tracking-tight">
              4 Standar Kualifikasi {companyName}
            </h2>
            <p className="font-sans text-base text-on-surface-variant leading-relaxed">
              Setiap kandidat perawat lansia melewati proses seleksi ketat untuk memastikan integritas, dedikasi emosional, dan keamanan medis keluarga Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualifications.map((q, idx) => {
              const IconComp = q.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-outline-variant/40 p-6 shadow-sm hover:shadow-md hover:border-[#0B4F42]/40 transition-all duration-300 space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#EBF4E7] text-[#0B4F42] flex items-center justify-center">
                    <IconComp className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#0B4F42] leading-snug">
                    {q.title}
                  </h3>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    {q.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. TANYA JAWAB SEPUTAR LAYANAN PERAWAT LANSIA (FAQ Accordion) */}
      <section className="py-12 md:py-20">
        <FaqSection
          items={pageSetting?.faqs}
          whatsappNumber={waNumber}
          companyName={companyName}
        />
      </section>

      {/* 7. BOTTOM CALL-TO-ACTION BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="relative overflow-hidden bg-[#0B4F42] text-white rounded-3xl p-8 sm:p-12 md:p-16 text-center shadow-2xl border border-[#0B4F42]/20">
          {/* Subtle decorative circles for depth */}
          <div
            className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none blur-2xl"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none blur-2xl"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.2] text-white">
              Berikan Perawatan dan Kualitas Hidup Terbaik untuk Orang Tua Anda.
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#83bfaf] leading-relaxed max-w-2xl mx-auto">
              Konsultasikan kondisi kesehatan fisik, rutinitas harian, dan kriteria perawat lansia bersama tim penempatan {companyName}.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                href={waBottomConsultUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="compassionate"
                size="lg"
                className="w-full sm:w-auto bg-[#9E232A] hover:bg-[#8c151f] text-white shadow-ruby gap-2 justify-center"
              >
                <PhoneCall className="w-4 h-4 shrink-0" />
                <span>Konsultasi Kebutuhan Lansia via WhatsApp</span>
              </Button>
              <Button
                href="/tentang-kami"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto border-white/60 text-white hover:bg-white/10 hover:border-white gap-2 justify-center"
              >
                <span>Pelajari Standar Kontrak Resmi</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
