import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Baby,
  Brain,
  MessageCircle,
  PhoneCall,
  ArrowRight,
  ChevronDown,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { getPageSetting, getCompanyIdentity } from "@/lib/settings";
import FaqSection from "@/components/common/FaqSection";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await getPageSetting("page_baby_sitter");
  const company = await getCompanyIdentity();

  const title = setting.meta_title || `Penyalur Baby Sitter & Nanny Terpercaya | ${company.nama_perusahaan}`;
  const description = setting.meta_description || "Penyalur baby sitter newborn dan balita bersertifikasi & bergaransi.";
  const ogImage = setting.og_image || setting.hero_image || "/baby sitter.jpeg";

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

export default async function BabySitterServicePage() {
  const pageSetting = await getPageSetting("page_baby_sitter");
  const company = await getCompanyIdentity();

  const waNumber = company?.nomor_whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6285111399962";
  const heroImage = pageSetting?.hero_image || "/baby sitter.jpeg";
  const heroImageAlt = pageSetting?.hero_image_alt || "Layanan Baby Sitter Premium";
  const heroTitle = pageSetting?.hero_title || "Pengasuhan Penuh Kasih & Rasa Aman untuk Tumbuh Kembang Buah Hati Anda.";
  const heroSubtitle =
    pageSetting?.hero_subtitle ||
    "Layanan baby sitter premium dengan standar operasional ketat, skrining berlapis, dan dedikasi penuh untuk menghadirkan ketenangan pikiran bagi orang tua di rumah.";

  const scopeOfCare = [
    {
      icon: Heart,
      title: "Higienitas & Sanitasi Bayi",
      desc: "Sterilisasi botol susu, persiapan MPASI higienis, mandi bayi dengan suhu tepat, serta menjaga kerapian kamar & pakaian anak.",
    },
    {
      icon: ShieldCheck,
      title: "Keamanan & Pertolongan Pertama",
      desc: "Pengawasan ekstra konstan, pencegahan insiden jatuh, pemahaman pertolongan pertama (First Aid) untuk bayi dan balita.",
    },
    {
      icon: Brain,
      title: "Stimulasi Kognitif & Motorik",
      desc: "Permainan edukatif sesuai tahapan usia, melatih kemampuan sensorik, motorik halus/kasar, serta jadwal tidur teratur.",
    },
    {
      icon: MessageCircle,
      title: "Komunikasi & Laporan Harian",
      desc: "Pencatatan harian jumlah asupan susu/makanan, jam tidur, buang air, serta catatan perkembangan sikap anak.",
    },
  ];

  const specializations = [
    {
      title: "Baby Sitter Bayi Baru Lahir (Newborn)",
      age: "Usia 0 – 12 Bulan",
      features: [
        "Perawatan tali pusat & memandikan newborn",
        "Manajemen pola tidur & jeda menyusui/ASIX",
        "Sterilisasi dot, perlengkapan & baju bayi",
        "Penanganan awal kembung & kolik bayi",
      ],
      badge: "Sertifikasi Medis Bayi",
    },
    {
      title: "Pengasuh Balita (Toddler Care)",
      age: "Usia 1 – 5 Tahun",
      features: [
        "Pemberian makanan padat (MPASI) terjadwal",
        "Aktivitas motorik kasar & melatih toilet training",
        "Mendampingi bermain interaktif bebas gadget",
        "Pengawasan ekstra aktif di dalam & luar rumah",
      ],
      badge: "Pengasuh Aktif",
    },
    {
      title: "Nanny / Governess Anak Sekolah",
      age: "Usia 5+ Tahun",
      features: [
        "Pendampingan jadwal sekolah & les",
        "Melatih kemandirian & tata krama berinteraksi",
        "Pengawasan aktivitas gadget & outdoor",
        "Penyiapan seragam & bekal sehat harian",
      ],
      badge: "Edukasi & Pembiasaan",
    },
  ];

  const salaryTable = [
    {
      category: "Baby Sitter Pemula (Junior)",
      range: "Rp 2.200.000 – Rp 2.800.000",
      req: "Pengalaman 1 tahun / lulusan pelatihan dasar pengasuh",
    },
    {
      category: "Baby Sitter Berpengalaman (Semi-Senior)",
      range: "Rp 2.800.000 – Rp 3.800.000",
      req: "Pengalaman 2+ tahun mengasuh balita aktif & stimulasi",
    },
    {
      category: "Nanny / Governess Profesional",
      range: "Rp 3.500.000 – Rp 5.000.000+",
      req: "Pendidikan diploma keperawatan / kebidanan / bahasa",
    },
  ];

  const faqs = [
    {
      q: "Apakah Baby Sitter sudah mengikuti tes psikologi dan cek kesehatan?",
      a: "Ya. Seluruh Baby Sitter kami melewati tes kesehatan medis (bebas penyakit menular) serta wawancara psikologi dasar untuk memastikan kesabaran dan kestabilan emosi.",
    },
    {
      q: "Apakah Baby Sitter juga bertugas mengerjakan pekerjaan rumah tangga umum?",
      a: "Tugas utama Baby Sitter adalah berfokus 100% pada pengasuhan dan kebutuhan anak. Tugas rumah tangga yang dikerjakan terbatas pada kebersihan kamar anak, baju anak, dan alat makan anak.",
    },
    {
      q: "Bagaimana jika anak kami merasa tidak cocok dengan Baby Sitter?",
      a: "Kami menyediakan garansi penggantian kandidat pengganti secara responsif hingga menemukan pengasuh yang benar-benar menyatu dengan anak Anda.",
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
            <Chip label="LAYANAN RESMI PENGASUHAN ANAK & BAYI" />
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
                  <span>Cari Baby Sitter Sekarang</span>
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
                  <span>Konsultasi Kebutuhan Anak</span>
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
            Fokus Asuhan Menyeluruh
          </h2>
          <p className="font-sans text-base text-on-surface-variant">
            Pendekatan holistik yang memastikan setiap aspek kesejahteraan dan tumbuh kembang anak terpenuhi.
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

      {/* Specializations */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto my-16 md:my-24 space-y-12 border-t border-outline-variant/30 pt-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-pine">
            Pilihan Spesialisasi Pengasuh
          </h2>
          <p className="font-sans text-base text-on-surface-variant">
            Keahlian yang disesuaikan secara khusus dengan tahapan usia perkembangan anak Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specializations.map((spec, i) => (
            <div
              key={i}
              className="glass-surface p-8 rounded-2xl border border-outline-subtle space-y-6 shadow-ambient flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="font-sans text-xs font-bold text-brand-pine bg-brand-sage-tint px-3 py-1 rounded-full uppercase">
                  {spec.badge}
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-pine">{spec.title}</h3>
                <div className="font-sans text-xs font-semibold text-brand-ruby">{spec.age}</div>
                <ul className="space-y-3 pt-2">
                  {spec.features.map((f, j) => (
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
            Panduan Estimasi Gaji Baby Sitter
          </h2>
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl border border-outline-variant/40 shadow-sm p-4 sm:p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-brand-pine/20 font-serif text-brand-pine text-base">
                <th className="py-4 px-4">Kategori Pengasuh</th>
                <th className="py-4 px-4">Estimasi Gaji Bulanan</th>
                <th className="py-4 px-4">Persyaratan & Kualifikasi</th>
              </tr>
            </thead>
            <tbody className="font-sans text-sm divide-y divide-outline-variant/30">
              {salaryTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-brand-pine">{row.category}</td>
                  <td className="py-4 px-4 font-bold text-brand-ruby">{row.range}</td>
                  <td className="py-4 px-4 text-on-surface-variant">{row.req}</td>
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
            Percayakan Tumbuh Kembang Buah Hati Pada Pengasuh Tersertifikasi.
          </h2>
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button variant="compassionate" size="lg" className="gap-2">
              <PhoneCall className="w-4 h-4" />
              <span>Konsultasi WA Pengasuh Anak</span>
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
