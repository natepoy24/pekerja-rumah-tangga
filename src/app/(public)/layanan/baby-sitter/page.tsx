import type { Metadata } from "next";
import Image from "next/image";
import {
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  Baby,
  Activity,
  Sparkles,
  MessageSquareHeart,
  FileCheck2,
  RefreshCw,
  Heart,
  Info,
  Check,
  Bath,
  Brain,
  ShieldAlert,
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
    getPageSetting("page_baby_sitter"),
    getCompanyIdentity(),
  ]);

  const companyName = company.nama_perusahaan || SITE_CONFIG.name;
  const title =
    setting.meta_title ||
    `Penyalur Baby Sitter Resmi & Terlatih | ${companyName}`;
  const description =
    setting.meta_description ||
    "Penyalur baby sitter dan suster anak resmi berizin Disnaker. Pengasuh sabar, teruji medis, beretika, siap menginap atau pulang-pergi dengan garansi.";
  const ogImage = setting.og_image || setting.hero_image || "/baby-sitter.webp";

  const defaultKeywords = [
    "yayasan babysitter resmi",
    "penyalur baby sitter terpercaya",
    "jasa perawat bayi Jakarta",
    "gaji baby sitter menginap",
    "suster bayi baru lahir",
  ];

  const keywords = setting.keywords
    ? setting.keywords.split(",").map((k: string) => k.trim())
    : defaultKeywords;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${SITE_CONFIG.url}/layanan/baby-sitter`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, alt: setting.hero_image_alt || title }],
      url: `${SITE_CONFIG.url}/layanan/baby-sitter`,
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

export default async function BabySitterLayananPage() {
  const [pageSetting, company] = await Promise.all([
    getPageSetting("page_baby_sitter"),
    getCompanyIdentity(),
  ]);

  const companyName = company.nama_perusahaan || SITE_CONFIG.name;
  const waNumber = company.nomor_whatsapp || SITE_CONFIG.whatsappPrimary;

  const waHeroConsultUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Halo ${companyName}, saya ingin konsultasi mengenai layanan pengasuhan anak & bayi.`
  )}`;

  const waHeroOrderUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Halo ${companyName}, saya ingin mencari baby sitter yang terseleksi.`
  )}`;

  const waBottomConsultUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Halo ${companyName}, saya ingin konsultasi kriteria baby sitter idaman via WhatsApp.`
  )}`;

  const serviceSchema = generateServiceSchema(
    "Baby Sitter & Pengasuh Anak",
    pageSetting.meta_description ||
    "Penyalur baby sitter dan suster anak resmi berizin Disnaker. Pengasuh sabar, teruji medis, beretika, siap menginap atau pulang-pergi dengan garansi.",
    "/layanan/baby-sitter"
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "/" },
    { name: "Layanan", url: "/layanan" },
    { name: "Baby Sitter", url: "/layanan/baby-sitter" },
  ]);

  const faqSchema = generateFAQSchema(pageSetting.faqs || []);

  const heroTitle =
    pageSetting.hero_title ||
    "Pengasuhan Penuh Kasih dan Rasa Aman untuk Tumbuh Kembang Buah Hati Anda.";
  const heroSubtitle =
    pageSetting.hero_subtitle ||
    "Dapatkan baby sitter terseleksi ketat yang sabar, terlatih, dan terverifikasi medis—memberikan perhatian optimal saat Anda bekerja dan beraktivitas.";
  const heroImage = pageSetting.hero_image || "/baby-sitter.webp";
  const heroImageAlt =
    pageSetting.hero_image_alt ||
    "Interaksi hangat dan sabar antara pengasuh dengan balita di ruang keluarga";

  // Section 2: Lingkup Tanggung Jawab & Perhatian
  const scopeOfCare = [
    {
      icon: Bath,
      title: "Higienitas & Kebutuhan Fisik",
      points: [
        "Memandikan anak dengan standar keselamatan dan kebersihan tinggi.",
        "Menyiapkan dan menyajikan menu makanan serta susu sesuai instruksi orang tua.",
        "Sanitasi perlengkapan makan, botol susu, dan pakaian anak.",
      ],
    },
    {
      icon: ShieldAlert,
      title: "Keselamatan & Ketenangan Tidur",
      points: [
        "Pengawasan aktif dan pencegahan bahaya di area bermain.",
        "Menemani waktu tidur serta memastikan jam istirahat anak terpenuhi teratur.",
        "Menciptakan suasana kamar yang tenang dan nyaman bagi anak.",
      ],
    },
    {
      icon: Brain,
      title: "Stimulasi & Tumbuh Kembang",
      points: [
        "Mendampingi anak belajar dasar motorik, kognitif, dan bermain edukatif.",
        "Menyiapkan mainan dan perlengkapan aktivitas harian sesuai usia.",
        "Membantu mengantar atau menjemput anak saat sekolah/kursus sesuai arahan.",
      ],
    },
    {
      icon: MessageSquareHeart,
      title: "Komunikasi & Catatan Rutin",
      points: [
        "Melaporkan catatan harian pola makan, jam tidur, dan mood anak secara berkala.",
        "Kesiapsiagaan tanggap darurat dan koordinasi cepat dengan orang tua.",
      ],
    },
  ];

  // Section 3: Tingkatan Spesialisasi Pengasuh Anak
  const careLevels = [
    {
      badge: "Usia 1-5 Tahun",
      name: "Pengasuh Balita",
      subName: "Toddler Nanny",
      focus:
        "Pendampingan aktivitas aktif, penanaman kebiasaan mandiri, stimulasi motorik, dan kesabaran menghadapi fase temper tantrum.",
      features: [
        "Mendampingi aktivitas bermain & belajar",
        "Penanaman kemandirian harian (toilet training)",
        "Pengelolaan emosi & temper tantrum anak",
        "Penyiapan MPASI dan jadwal makan balita",
      ],
      isPopular: true,
    },
    {
      badge: "Usia 0-12 Bulan",
      name: "Suster Bayi Baru Lahir",
      subName: "Newborn Sitter",
      focus:
        "Penanganan tali pusar, sanitasi ekstra ketat, teknik memandikan bayi baru lahir, pengaturan jam tidur bayi, dan pemantauan ASI/sufor.",
      features: [
        "Perawatan kebersihan bayi baru lahir (newborn)",
        "Pengelolaan siklus tidur dan menyusui",
        "Pemberian ASIP & sterilisasi botol ketat",
        "Kesiagaan ekstra & pemantauan malam hari",
      ],
      isPopular: false,
    },
    {
      badge: "Tingkat Mahir",
      name: "Suster Berpengalaman",
      subName: "Sertifikasi Khusus",
      focus:
        "Penanganan anak kembar, anak berkebutuhan khusus (special needs), atau pengasuh berpengalaman kerja di atas 5 tahun.",
      features: [
        "Pengasuhan balita/bayi kembar sekaligus",
        "Pendampingan khusus (special needs)",
        "Pengalaman panjang lebih dari 5 tahun",
        "Penguasaan tata laksana asuh tingkat lanjut",
      ],
      isPopular: false,
    },
  ];

  // Section 4: Panduan Estimasi Gaji & Standar Kesejahteraan
  const salaryTable = [
    {
      category: "Baby Sitter Pulang-Pergi (Live-out)",
      range: "Rp2.500.000 – Rp4.000.000 / bulan",
      spec: "Jam kerja harian terstruktur (8–9 jam)",
    },
    {
      category: "Baby Sitter Menginap (Live-in Standar)",
      range: "Rp3.500.000 – Rp5.000.000 / bulan",
      spec: "Akomodasi, makan, dan kamar khusus di rumah majikan",
    },
    {
      category: "Baby Sitter Senior / Bersertifikat",
      range: "Rp4.000.000 – Rp7.000.000+ / bulan",
      spec: "Pengalaman 5+ tahun / sertifikasi keperawatan balita",
    },
    {
      category: "Penanganan Newborn / Khusus",
      range: "Menyesuaikan kompleksitas tugas",
      spec: "Memerlukan keahlian teknis dan kesiagaan malam hari",
    },
  ];

  // Section 5: Standar Keamanan & Perlindungan
  const qualifications = [
    {
      icon: ShieldCheck,
      title: "Skrining Kesehatan Menyeluruh",
      desc: "Seluruh calon baby sitter melalui tes kesehatan fisik bebas penyakit menular sebelum ditempatkan.",
    },
    {
      icon: FileCheck2,
      title: "Verifikasi Identitas & Rekam Jejak",
      desc: "Latar belakang domisili, KTP, dan surat keterangan resmi terdaftar pada dinas terkait.",
    },
    {
      icon: Heart,
      title: "Uji Karakter & Kesabaran",
      desc: "Wawancara mendalam untuk memastikan calon pengasuh memiliki kestabilan emosi dan kasih sayang murni terhadap anak.",
    },
    {
      icon: RefreshCw,
      title: "Jaminan Garansi",
      desc: "Fasilitas penukaran tenaga kerja jika terdapat ketidaksesuaian cara kerja pada masa adaptasi kontrak.",
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fce9ea] border border-[#9E232A]/15 text-[#9E232A] text-xs sm:text-[13px] font-semibold tracking-wide">
                <span>LAYANAN RESMI PENGASUHAN ANAK & BAYI</span>
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
                  <span>Cari Baby Sitter Sekarang</span>
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
                  <span>Konsultasi Kebutuhan Anak</span>
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
                  <span>Skrining Medis & Perilaku</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0B4F42]" />
                  <span>Garansi Penggantian Resmi</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-5 relative overflow-hidden">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background decorative tone glow — clipped by overflow-hidden parent */}
                <div
                  className="absolute -inset-2 bg-[#9E232A]/10 rounded-3xl blur-xl -z-10"
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
                      <div className="w-5 h-5 rounded-full bg-[#fce9ea] text-[#9E232A] flex items-center justify-center font-bold text-xs shrink-0">
                        ✓
                      </div>
                      <span className="font-sans text-xs sm:text-[13px] font-semibold text-[#14201D]">
                        Uji Psikologis & Skrining Riwayat
                      </span>
                    </div>
                  </div>

                  {/* Floating Badge 2 - Bottom Right */}
                  <div className="absolute bottom-4 right-4 z-10 max-w-[90%]">
                    <div className="backdrop-blur-md bg-white/95 border border-[#0B4F42]/15 shadow-lg px-3.5 py-2 rounded-xl flex items-center gap-2">
                      <span className="font-sans text-xs sm:text-[13px] font-semibold text-[#14201D]">
                        Pendampingan & Garansi Penggantian
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LINGKUP TANGGUNG JAWAB & PERHATIAN (Scope of Care) */}
      <section className="py-16 md:py-24 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce9ea] text-[#9E232A] text-xs font-semibold uppercase tracking-wider">
            Lingkup Tanggung Jawab
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0B4F42] tracking-tight">
            Lingkup Tanggung Jawab & Perhatian
          </h2>
          <p className="font-sans text-base text-on-surface-variant leading-relaxed">
            Standar pelayanan yang berfokus pada kebersihan, kesehatan, stimulasi positif, serta ketenangan emosional balita Anda.
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

      {/* 3. TINGKATAN SPESIALISASI PENGASUH ANAK */}
      <section className="py-16 md:py-24 bg-surface-container-low/60 border-y border-outline-variant/30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce9ea] text-[#9E232A] text-xs font-semibold uppercase tracking-wider">
              Kategori Pengasuh
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0B4F42] tracking-tight">
              Tingkatan Spesialisasi Pengasuh Anak
            </h2>
            <p className="font-sans text-base text-on-surface-variant leading-relaxed">
              Memilih kualifikasi pengasuh yang tepat sesuai dengan rentang usia buah hati dan tingkat kompleksitas pekerjaan asuh.
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
            &ldquo;Kesejahteraan pengasuh adalah fondasi utama terciptanya lingkungan asuh yang penuh cinta, stabil, dan berdedikasi tinggi.&rdquo;
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-[#0B4F42] text-white font-serif text-base border-b border-[#0B4F42]">
                  <th className="py-4 px-6 font-medium">Kategori Pengasuh</th>
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
              Besaran gaji dipengaruhi oleh domisili kerja, usia anak, jumlah anak yang diasuh, serta jam kerja lembur/hari libur yang disepakati secara tertulis.
            </span>
          </div>
        </div>
      </section>

      {/* 5. STANDAR KEAMANAN & PERLINDUNGAN PT JASA MANDIRI */}
      <section className="py-16 md:py-24 bg-surface-container-low/60 border-y border-outline-variant/30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce9ea] text-[#9E232A] text-xs font-semibold uppercase tracking-wider">
              Jaminan Keamanan
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0B4F42] tracking-tight">
              Standar Keamanan & Perlindungan {companyName}
            </h2>
            <p className="font-sans text-base text-on-surface-variant leading-relaxed">
              Kami menetapkan protokol skrining berlapis untuk memastikan setiap kandidat dapat diandalkan menjadi figur terdekat buah hati Anda.
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

      {/* 6. TANYA JAWAB SEPUTAR LAYANAN BABY SITTER (FAQ Accordion) */}
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
              Berikan Pengasuhan Terbaik dan Teraman untuk Buah Hati Tercinta.
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#83bfaf] leading-relaxed max-w-2xl mx-auto">
              Konsultasikan usia anak dan kriteria baby sitter idaman Anda bersama tim seleksi {companyName} hari ini.
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
                <span>Cari Baby Sitter via WhatsApp</span>
              </Button>
              <Button
                href="/tentang-kami"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto border-white/60 text-white hover:bg-white/10 hover:border-white gap-2 justify-center"
              >
                <span>Pelajari Alur Penempatan Resmi</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
