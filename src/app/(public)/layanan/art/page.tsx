import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  Home,
  Shirt,
  Utensils,
  ShieldCheck,
  ChevronDown,
  PhoneCall,
  ArrowRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { getPageSetting, getCompanyIdentity } from "@/lib/settings";
import FaqSection from "@/components/common/FaqSection";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await getPageSetting("page_art");
  const company = await getCompanyIdentity();

  const title = setting.meta_title || `Penyalur Asisten Rumah Tangga (ART) Resmi & Bergaransi | ${company.nama_perusahaan}`;
  const description = setting.meta_description || "Penyalur resmi Asisten Rumah Tangga (ART) terdidik berizin Disnaker & Kemnaker.";
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

export default async function ARTServicePage() {
  const pageSetting = await getPageSetting("page_art");
  const company = await getCompanyIdentity();

  const waNumber = company?.nomor_whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6285111399962";
  const heroImage = pageSetting?.hero_image || "/asisten rumah tangga.jpeg";
  const heroImageAlt = pageSetting?.hero_image_alt || "Layanan Asisten Rumah Tangga";
  const heroTitle = pageSetting?.hero_title || "Asisten Rumah Tangga Terlatih untuk Rumah yang Rapi, Bersih, dan Terawat.";
  const heroSubtitle =
    pageSetting?.hero_subtitle ||
    "Dapatkan tenaga ART terverifikasi dengan latar belakang bersih, uji kesehatan lengkap, serta etika kerja profesional untuk mendukung kelancaran aktivitas harian keluarga Anda.";

  const scopeOfDuties = [
    {
      icon: Home,
      title: "Tata Graha & Kebersihan Hunian",
      desc: "Menyapu, mengepel, sanitasi kamar mandi & dapur, pembersihan debu perabot halus, dan kerapian berkala.",
    },
    {
      icon: Shirt,
      title: "Tata Kelola Pakaian & Linen",
      desc: "Pencucian pakaian sesuai panduan bahan, penjemuran, penyetrikaan rapi, menata lemari, serta pergantian sprei.",
    },
    {
      icon: Utensils,
      title: "Pengelolaan Dapur & Masakan",
      desc: "Persiapan bahan masakan rumahan harian, memasak sesuai selera keluarga, serta higienitas peralatan makan.",
    },
  ];

  const placementOptions = [
    {
      type: "Live-In (Menginap)",
      desc: "ART tinggal di kediaman Anda, siap sedia menjaga kelancaran dan kerapian rumah sepanjang hari.",
      features: [
        "Ketersediaan waktu lebih fleksibel",
        "Ideal untuk keluarga sibuk / rumah luas",
        "Fasilitas kamar & makan disediakan majikan",
      ],
      badge: "Rekomendasi Utama",
    },
    {
      type: "Live-Out (Pulang-Pergi)",
      desc: "ART datang sesuai jam kerja harian yang disepakati dan pulang setelah tugas selesai.",
      features: [
        "Jam kerja pasti (misal: 08:00 - 17:00 WIB)",
        "Privasi keluarga di malam hari terjaga penuh",
        "Tidak membutuhkan fasilitas kamar tidur",
      ],
      badge: "Privasi Maksimal",
    },
  ];

  const salaryTable = [
    {
      category: "ART Pemula / Junior",
      experience: "0 – 2 Tahun",
      range: "Rp 2.000.000 – Rp 2.700.000",
      duties: "Pembersihan standar, cuci setrika dasar, masakan rumahan sederhana.",
    },
    {
      category: "ART Berpengalaman",
      experience: "2 – 5 Tahun",
      range: "Rp 2.500.000 – Rp 3.500.000",
      duties: "Manajemen mandiri seluruh rumah tangga, memasak variatif, merawat material sensitif.",
    },
    {
      category: "Senior / Kepala Rumah Tangga",
      experience: "5+ Tahun",
      range: "Rp 3.500.000 – Rp 4.500.000+",
      duties: "Manajemen rumah tangga luas, kepemimpinan tim ART, keahlian memasak tinggi.",
    },
  ];

  const artFaqs = [
    {
      q: "Apakah ART PT Jasa Mandiri sudah siap kerja tanpa perlu diajari dari awal?",
      a: "Setiap calon ART telah mengikuti pelatihan dasar tata graha, etika kerja, serta standar kebersihan rumah tangga di pusat pelatihan kami sebelum ditempatkan.",
    },
    {
      q: "Bagaimana jika ART yang diantar tidak cocok dengan kriteria rumah kami?",
      a: "Anda berhak melakukan permintaan penggantian tenaga kerja (garansi hingga 3 kali penukaran) selama masa kontrak berlaku tanpa biaya administrasi tambahan.",
    },
    {
      q: "Apakah biaya di atas sudah termasuk biaya admin penyalur?",
      a: "Tabel di atas merupakan estimasi gaji bersih bulanan untuk pekerja. Biaya administrasi penyaluran resmi akan dijelaskan secara transparan saat konsultasi awal.",
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
            <Chip label="LAYANAN RESMI ASISTEN RUMAH TANGGA" />
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
                  <span>Cari ART Sesuai Kriteria</span>
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
                  <span>Konsultasi Gaji & Kebutuhan</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Scope of Duties */}
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

      {/* Placement Options */}
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

      {/* Salary Guide Table */}
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

      {/* FAQ Section (CMS Driven) */}
      <FaqSection items={pageSetting?.faqs} whatsappNumber={waNumber} />

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto my-12">
        <div className="bg-brand-pine text-white rounded-2xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold max-w-2xl mx-auto leading-tight">
            Pesan Asisten Rumah Tangga Terpercaya untuk Kediaman Anda Sekarang.
          </h2>
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button variant="compassionate" size="lg" className="gap-2">
              <PhoneCall className="w-4 h-4" />
              <span>Hubungi WA Tim Penyalur</span>
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
