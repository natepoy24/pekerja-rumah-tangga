import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  Activity,
  UserCheck,
  PhoneCall,
  ArrowRight,
  ChevronDown,
  Pill,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { getPageSetting, getCompanyIdentity } from "@/lib/settings";
import FaqSection from "@/components/common/FaqSection";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await getPageSetting("page_perawat_lansia");
  const company = await getCompanyIdentity();

  const title = setting.meta_title || `Penyalur Perawat & Caregiver Lansia Resmi | ${company.nama_perusahaan}`;
  const description = setting.meta_description || "Penyalur perawat lansia dan caregiver profesional bersertifikasi medis & sabar.";
  const ogImage = setting.og_image || setting.hero_image || "/perawat lansia.jpeg";

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

export default async function ElderCareServicePage() {
  const pageSetting = await getPageSetting("page_perawat_lansia");
  const company = await getCompanyIdentity();

  const waNumber = company?.nomor_whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6285111399962";
  const heroImage = pageSetting?.hero_image || "/perawat lansia.jpeg";
  const heroImageAlt = pageSetting?.hero_image_alt || "Layanan Perawat Lansia";
  const heroTitle = pageSetting?.hero_title || "Pendampingan Penuh Empati, Martabat, & Perhatian Tulus untuk Orang Tua Tercinta.";
  const heroSubtitle =
    pageSetting?.hero_subtitle ||
    "Dapatkan caregiver dan perawat lansia terseleksi yang sabar, teliti mengawal kebutuhan medis harian, serta hadir sebagai teman bicara yang memberikan kenyamanan emosional di rumah.";

  const scopeOfCare = [
    {
      icon: Heart,
      title: "Higienitas & Kebutuhan Fisik Dasar",
      desc: "Membantu mandi (bathing), grooming, kebersihan tempat tidur, memotong kuku, serta asupan nutrisi harian lansia.",
    },
    {
      icon: Pill,
      title: "Manajemen Obat & Pemantauan Vital Signs",
      desc: "Kepatuhan jadwal medikasi dokter, pengukuhan tekanan darah (tensi), gula darah, serta pencatatan kondisi harian.",
    },
    {
      icon: Activity,
      title: "Mobilitas Fisik & Pencegahan Jatuh",
      desc: "Bantuan alih baring (mencegah dekubitus), pendampingan berjalan, penggunaan kursi roda, serta senam/terapi fisik ringan.",
    },
    {
      icon: UserCheck,
      title: "Dukungan Emosional & Teman Bicara",
      desc: "Mendengarkan dengan sabar, mengajak berinteraksi positif, merawat martabat lansia, dan memberikan ketenangan emosional.",
    },
  ];

  const careLevels = [
    {
      title: "Pendamping Lansia Mandiri (Care Companion)",
      desc: "Untuk lansia yang masih dapat beraktivitas fisik namun membutuhkan teman bicara, pendampingan jalan, dan pengawasan obat.",
      condition: "Kondisi Sehat / Demensia Ringan",
      features: [
        "Teman bicara & pendamping aktivitas harian",
        "Pengawasan jadwal minum obat tepat waktu",
        "Pendampingan saat bepergian / check-up dokter",
      ],
      badge: "Kategori Mandiri",
    },
    {
      title: "Perawat Lansia Semi-Bedridden (Assisted Living)",
      desc: "Untuk lansia yang membutuhkan bantuan mobilitas fisik, penggunaan kursi roda, memandikan di tempat tidur, atau diapers.",
      condition: "Pasca Operasi / Stroke Ringan / Kursi Roda",
      features: [
        "Bantuan penuh aktivitas harian (ADL)",
        "Pergantian diapers & pembersihan tubuh telaten",
        "Terapi gerakan mobilitas ringan harian",
      ],
      badge: "Kategori Semi-Bantuan",
    },
    {
      title: "Perawat Medis Lansia (Total Care / ICU Home)",
      desc: "Perawat berlatar belakang pendidikan keperawatan untuk lansia tirah baring penuh dengan peralatan medis.",
      condition: "Bedridden Penuh / Selang NGT / Kateter / Oksigen",
      features: [
        "Perawatan luka tekan (dekubitus) & steril",
        "Manajemen selang makan NGT & kateter urin",
        "Pemantauan alat medis & tanda vital intensif",
      ],
      badge: "Kategori Medis Intensif",
    },
  ];

  const salaryTable = [
    {
      level: "Pendamping Lansia (Care Companion)",
      range: "Rp 3.000.000 – Rp 4.000.000",
      notes: "Untuk lansia jalan / mandiri",
    },
    {
      level: "Perawat Lansia (Assisted / Stroke)",
      range: "Rp 3.800.000 – Rp 5.000.000",
      notes: "Bantuan kursi roda / diapers / pasca operasi",
    },
    {
      level: "Perawat Medis Lansia (Total Care)",
      range: "Rp 4.500.000 – Rp 6.500.000+",
      notes: "Latar belakang D3/S1 Keperawatan, alat medis (NGT/Kateter)",
    },
  ];


  const faqs = [
    {
      q: "Apakah perawat lansia di PT Jasa Mandiri sabar dalam menghadapi lansia demensia/pikun?",
      a: "Ya. Setiap pendamping lansia kami dibekali pelatihan empati, kesabaran mental, dan pemahaman perilaku emosional lansia untuk menjaga martabat orang tua Anda.",
    },
    {
      q: "Apakah tersedia perawat pria dan perawat wanita?",
      a: "Kami menyediakan tenaga perawat lansia pria maupun wanita sesuai kenyamanan orang tua dan kebutuhan keluarga Anda.",
    },
    {
      q: "Bagaimana jika kondisi lansia memburuk secara mendadak?",
      a: "Perawat kami dilatih melakukan tindakan tanggap darurat awal, menghubungi anggota keluarga terdekat, serta memandu proses rujukan ke rumah sakit.",
    },
  ];

  return (
    <div className="overflow-hidden min-h-screen bg-brand-offwhite pt-6 pb-20">
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden py-16 md:py-24">
        {/* Background Image Overlay */}
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
            <Chip label="LAYANAN RESMI PENDAMPING & PERAWAT LANSIA" />
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
                  <span>Cari Perawat Lansia Sekarang</span>
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
                  <span>Konsultasi Kondisi Orang Tua</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Scope of Care */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto my-16 md:my-24 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-pine">
            Lingkup Perawatan & Pendampingan Harian
          </h2>
          <p className="font-sans text-base text-on-surface-variant">
            Pendekatan holistik memastikan kebutuhan fisik dan emosional lansia terpenuhi dengan menghormati martabat mereka.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {scopeOfCare.map((soc, idx) => {
            const IconComp = soc.icon;
            return (
              <div
                key={idx}
                className="glass-surface p-6 rounded-2xl border border-outline-subtle space-y-4 shadow-sm hover:border-brand-pine transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-brand-sage-tint text-brand-sage flex items-center justify-center">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-pine">{soc.title}</h3>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  {soc.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Care Levels */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto my-16 md:my-24 space-y-12 border-t border-outline-variant/30 pt-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-pine">
            Tingkatan Perawatan Lansia
          </h2>
          <p className="font-sans text-base text-on-surface-variant">
            Kualifikasi perawat disesuaikan secara presisi dengan kondisi fisik dan medis lansia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {careLevels.map((lvl, i) => (
            <div
              key={i}
              className="glass-surface p-8 rounded-2xl border border-outline-subtle space-y-6 shadow-ambient flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="font-sans text-xs font-bold text-brand-pine bg-brand-sage-tint px-3 py-1 rounded-full uppercase">
                  {lvl.badge}
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-pine">{lvl.title}</h3>
                <div className="font-sans text-xs font-semibold text-brand-ruby">{lvl.condition}</div>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  {lvl.desc}
                </p>
                <ul className="space-y-3 pt-2">
                  {lvl.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 font-sans text-xs text-brand-charcoal">
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

      {/* Salary Table */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto my-16 md:my-24 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-pine">
            Panduan Estimasi Gaji Perawat Lansia
          </h2>
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl border border-outline-variant/40 shadow-sm p-4 sm:p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-brand-pine/20 font-serif text-brand-pine text-base">
                <th className="py-4 px-4">Tingkatan Pendampingan</th>
                <th className="py-4 px-4">Estimasi Gaji Bulanan</th>
                <th className="py-4 px-4">Kondisi Lansia & Kualifikasi</th>
              </tr>
            </thead>
            <tbody className="font-sans text-sm divide-y divide-outline-variant/30">
              {salaryTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-brand-pine">{row.level}</td>
                  <td className="py-4 px-4 font-bold text-brand-ruby">{row.range}</td>
                  <td className="py-4 px-4 text-on-surface-variant">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section (CMS Driven) */}
      <FaqSection items={pageSetting?.faqs} whatsappNumber={waNumber} />

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto my-12">
        <div className="bg-brand-pine text-white rounded-2xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold max-w-2xl mx-auto leading-tight">
            Berikan Pendampingan Terbaik dan Penuh Kasih Sayang Untuk Orang Tua Anda.
          </h2>
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button variant="compassionate" size="lg" className="gap-2">
              <PhoneCall className="w-4 h-4" />
              <span>Konsultasi WA Perawat Lansia</span>
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
