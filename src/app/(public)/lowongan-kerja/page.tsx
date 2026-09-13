import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  ShieldCheck,
  Home,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  UserCheck,
  FileText,
  BadgePercent,
  MapPin,
  Clock,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { getPageSetting, getCompanyIdentity } from "@/lib/settings";
import { getJobs } from "@/lib/jobs";
import FaqSection from "@/components/common/FaqSection";
import EvergreenJobJsonLd from "@/components/seo/EvergreenJobJsonLd";
import type { JobSchemaInput } from "@/types/job-schema";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const setting = await getPageSetting("page_lowongan_kerja");
  const company = await getCompanyIdentity();

  const title = setting.meta_title || `Lowongan Kerja PRT, Baby Sitter & Perawat Lansia Resmi | ${company.nama_perusahaan}`;
  const description =
    setting.meta_description ||
    "Lowongan kerja resmi penempatan dalam negeri: ART, Baby Sitter, dan Perawat Lansia. Gaji utuh tepat waktu, asrama & makan gratis, tanpa potongan liar. Berizin Kemnaker.";
  const ogImage = setting.og_image || setting.hero_image || "/asisten rumah tangga.jpeg";

  return {
    title,
    description,
    keywords: setting.keywords ? setting.keywords.split(",").map((k) => k.trim()) : undefined,
    alternates: {
      canonical: "/lowongan-kerja",
    },
    openGraph: {
      title,
      description,
      url: "https://pekerjarumahtangga.com/lowongan-kerja",
      siteName: company.nama_perusahaan || "PT Jasa Mandiri Agency",
      type: "website",
      locale: "id_ID",
      images: [{ url: ogImage, alt: setting.hero_image_alt || title }],
    },
  };
}

export default async function LowonganKerjaHubPage() {
  const jobs = await getJobs();
  const pageSetting = await getPageSetting("page_lowongan_kerja");
  const company = await getCompanyIdentity();

  const companyName = company?.nama_perusahaan || "PT Jasa Mandiri";
  const recruiterWa =
    process.env.NEXT_PUBLIC_RECRUITER_WHATSAPP_NUMBER ||
    company?.nomor_whatsapp ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    "6285111399962";

  const heroTitle =
    pageSetting?.hero_title || "Bekerja Nyaman, Gaji Utuh, dan Dilindungi Lembaga Resmi Berizin.";
  const heroSubtitle =
    pageSetting?.hero_subtitle ||
    `Bergabunglah bersama ${companyName} (beroperasi resmi sejak 2010). Kami membuka lowongan penempatan kerja untuk posisi Asisten Rumah Tangga, Baby Sitter, dan Perawat Lansia dengan majikan terverifikasi di wilayah Jabodetabek dan sekitarnya.`;
  const address =
    company?.alamat_lengkap ||
    "Jl. Gunung Balong III No.78, RT.11/RW.4, Lb. Bulus, Kec. Cilandak, Kota Jakarta Selatan, DKI Jakarta 12440";
  const hours = company?.jam_operasional || "Senin - Sabtu (08.00 – 17.00 WIB)";

  // Format jobs array into JobSchemaInput for Evergreen Schema component
  const jobSchemaInputs: JobSchemaInput[] = jobs.map((job) => ({
    title: job.title,
    description: job.description,
    datePosted: job.created_at,
    validityDays: 30,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      name: companyName,
      sameAs: "https://pekerjarumahtangga.com",
      logo: `https://pekerjarumahtangga.com${company?.logo_url || "/logo.png"}`,
    },
    jobLocation: {
      addressLocality: "Jakarta",
      addressRegion: "DKI Jakarta",
      addressCountry: "ID",
    },
    baseSalary: {
      minValue: job.salary_min,
      maxValue: job.salary_max,
      currency: "IDR",
      unitText: "MONTH",
    },
    directApply: true,
    applyUrl: `https://pekerjarumahtangga.com/lowongan-kerja/${job.slug}`,
  }));

  const candidateBenefits = [
    {
      icon: BadgePercent,
      title: "Tanpa Potongan Gaji Memberatkan",
      desc: "Gaji Anda diterima utuh sesuai kesepakatan surat kontrak kerja. Tidak ada biaya tersembunyi yang merugikan pekerja.",
    },
    {
      icon: Home,
      title: "Asrama Nyaman & Makan Gratis",
      desc: "Disediakan fasilitas tempat tinggal layak, makan 3x sehari gratis, dan lingkungan aman selama masa tunggu penempatan.",
    },
    {
      icon: ShieldCheck,
      title: "Kontrak Resmi Berpayung Hukum",
      desc: "Hak libur, tunjangan, dan jam istirahat diatur tertulis melalui izin resmi Kemenaker dan perlindungan hukum jelas.",
    },
    {
      icon: UserCheck,
      title: "Mediasi & Perlindungan Kerja",
      desc: `${companyName} siap mendampingi dan menjembatani komunikasi jika Anda mengalami kendala di tempat kerja.`,
    },
  ];

  return (
    <div className="overflow-hidden min-h-screen bg-[#FAFAF7] font-sans pt-28 pb-20">
      {/* Dynamic Evergreen Google Jobs Schema */}
      <EvergreenJobJsonLd jobs={jobSchemaInputs} />

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Chip label="PUSAT LOWONGAN KERJA RESMI DISNAKER" />
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B4F42] leading-tight">
              {heroTitle}
            </h1>
            <p className="font-sans text-base sm:text-lg text-on-surface-variant leading-relaxed">
              {heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                href={`https://wa.me/${recruiterWa}?text=${encodeURIComponent(
                  `Halo ${companyName}, saya ingin mendaftar lowongan kerja.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="compassionate"
                size="lg"
                className="gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Daftar via WhatsApp Sekarang</span>
              </Button>
              <Button href="#daftar-posisi" variant="secondary" size="lg">
                Lihat Semua Posisi Lowongan ↓
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-sans text-on-surface-variant">
              <span className="flex items-center gap-1.5 text-[#3E7B28] font-medium">
                <CheckCircle2 className="w-4 h-4" /> Asrama & Makan Gratis
              </span>
              <span className="flex items-center gap-1.5 text-[#3E7B28] font-medium">
                <CheckCircle2 className="w-4 h-4" /> Tanpa Calo & Tanpa Tipu-Tipu
              </span>
              <span className="flex items-center gap-1.5 text-[#3E7B28] font-medium">
                <CheckCircle2 className="w-4 h-4" /> Uji Medis Disediakan
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-[#D5E8D0] shadow-sm space-y-5">
              <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-4">
                <Briefcase className="w-6 h-6 text-[#0B4F42]" />
                <h2 className="font-serif text-xl font-bold text-[#0B4F42]">
                  Penerimaan Tenaga Kerja Aktif
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Kami menerima calon pekerja dari pulau Jawa, Lampung, dan daerah lainnya dengan syarat identitas lengkap serta niat kerja sungguh-sungguh.
              </p>
              <div className="bg-[#EBF4E7] p-4 rounded-xl space-y-2 border border-[#3E7B28]/20">
                <div className="text-xs font-bold text-[#0B4F42] uppercase tracking-wider">
                  Alamat Kantor & Asrama Resmi:
                </div>
                <p className="text-xs text-on-surface-variant flex items-start gap-1.5 leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#0B4F42] shrink-0 mt-0.5" />
                  <span>Kantor Operasional Penempatan {companyName}, {address}.</span>
                </p>
                <div className="text-[11px] text-[#0B4F42]/80 pt-1 font-medium">
                  Buka: {hours}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keuntungan Bergabung */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto my-12">
        <div className="border border-[#D5E8D0] rounded-2xl p-8 sm:p-12 bg-white/80 backdrop-blur-md space-y-8 shadow-sm">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#3E7B28] font-bold font-sans">
              Hak & Keamanan Anda Terjamin
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B4F42]">
              Mengapa Memilih Bekerja Melalui {companyName}?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {candidateBenefits.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAFAF7] p-6 rounded-xl border border-outline-variant/30 space-y-3"
                >
                  <Icon className="w-8 h-8 text-[#0B4F42]" />
                  <h3 className="font-serif font-bold text-[#0B4F42] text-lg">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic Jobs Grid */}
      <section
        id="daftar-posisi"
        className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto my-16 space-y-10"
      >
        <div className="border-b border-outline-variant/30 pb-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B4F42]">
            Posisi Lowongan Kerja yang Sedang Dibuka
          </h2>
          <p className="font-sans text-sm text-on-surface-variant mt-1">
            Pilih bidang pekerjaan yang paling sesuai dengan keahlian dan minat Anda:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div
              key={job.slug}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-[#D5E8D0] flex flex-col justify-between hover:border-[#0B4F42] transition-all group shadow-sm hover:shadow-md"
            >
              <div className="space-y-4">
                {job.badge && (
                  <div className="inline-block px-3 py-1 rounded-full bg-[#EBF4E7] text-[#3E7B28] text-[11px] font-bold uppercase tracking-wider">
                    {job.badge}
                  </div>
                )}
                <h3 className="font-serif text-2xl font-bold text-[#0B4F42] group-hover:text-[#9E232A] transition-colors">
                  {job.title}
                </h3>

                <div className="bg-[#FAFAF7] p-3.5 rounded-xl space-y-1.5 border border-outline-variant/20">
                  <div className="text-[11px] uppercase tracking-wider text-on-surface-variant font-medium flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5 text-[#0B4F42]" /> Estimasi Gaji Bersih:
                  </div>
                  <div className="font-serif text-lg font-bold text-[#0B4F42]">
                    {job.salary_display}
                  </div>
                  <div className="text-[11px] text-on-surface-variant flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {job.system}
                  </div>
                </div>

                {job.duties && job.duties.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold text-[#0B4F42]">Ruang Lingkup Tugas:</div>
                    <ul className="space-y-1.5">
                      {job.duties.slice(0, 3).map((duty, dIdx) => (
                        <li
                          key={dIdx}
                          className="text-xs text-on-surface-variant flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#3E7B28] shrink-0 mt-0.5" />
                          <span>{duty}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-outline-variant/30">
                <Link
                  href={`/lowongan-kerja/${job.slug}`}
                  className="inline-flex items-center justify-between w-full text-sm font-bold text-[#0B4F42] group-hover:text-[#9E232A] transition-colors"
                >
                  <span>Lihat Syarat & Detail Lamar</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Syarat Pendaftaran & Alur Melamar */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto my-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Syarat Dokumen */}
          <div className="lg:col-span-5 bg-[#0B4F42] text-white rounded-2xl p-8 space-y-6 shadow-md">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EBF4E7]">
                Syarat Dokumen
              </span>
              <h2 className="font-serif text-2xl font-bold leading-tight">
                Berkas yang Perlu Disiapkan
              </h2>
            </div>
            <ul className="space-y-3 font-sans text-xs sm:text-sm text-white/90">
              <li className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-[#EBF4E7] shrink-0" />
                <span>e-KTP Asli & Fotokopi yang masih berlaku</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-[#EBF4E7] shrink-0" />
                <span>Kartu Keluarga (KK) Asli / Fotokopi</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-[#EBF4E7] shrink-0" />
                <span>Surat Izin Suami / Orang Tua / Keluarga</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-[#EBF4E7] shrink-0" />
                <span>Ijazah terakhir & SKCK (Jika ada)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-[#EBF4E7] shrink-0" />
                <span>Pakaian ganti secukupnya untuk menginap di asrama</span>
              </li>
            </ul>
            <div className="p-4 bg-white/10 rounded-xl text-xs text-white/80 leading-relaxed border border-white/10">
              💡 <em>Bagi calon pekerja yang dokumennya belum lengkap, silakan konsultasikan terlebih dahulu via WhatsApp agar dapat kami pandu.</em>
            </div>
          </div>

          {/* Kolom Alur Pendaftaran */}
          <div className="lg:col-span-7 bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-[#D5E8D0] shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3E7B28]">
                Alur Perekrutan
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#0B4F42]">
                4 Tahap Praktis Mulai Bekerja
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <span aria-hidden="true" className="font-serif text-2xl font-bold text-[#0B4F42]">01</span>
                <div>
                  <h3 className="font-serif font-bold text-[#0B4F42] text-base">Hubungi Tim HRD via WhatsApp</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">Kirimkan nama, asal daerah, dan posisi yang diinginkan.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span aria-hidden="true" className="font-serif text-2xl font-bold text-[#0B4F42]">02</span>
                <div>
                  <h3 className="font-serif font-bold text-[#0B4F42] text-base">Datang ke Asrama Resmi</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">Tiba di kantor operasional untuk verifikasi berkas dan penempatan kamar istirahat.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span aria-hidden="true" className="font-serif text-2xl font-bold text-[#0B4F42]">03</span>
                <div>
                  <h3 className="font-serif font-bold text-[#0B4F42] text-base">Pemeriksaan Medis & Pengarahan</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">Pemeriksaan kesehatan gratis serta pembekalan tata krama dan etika sopan santun.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span aria-hidden="true" className="font-serif text-2xl font-bold text-[#0B4F42]">04</span>
                <div>
                  <h3 className="font-serif font-bold text-[#0B4F42] text-base">Tanda Tangan Kontrak & Berangkat</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">Wawancara dengan majikan, penandatanganan kontrak legal, dan mulai bekerja.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Calon Pekerja (CMS Driven) */}
      <FaqSection items={pageSetting?.faqs} whatsappNumber={recruiterWa} />

      {/* Bottom CTA Recruitment Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto my-12">
        <div className="bg-[#0B4F42] text-white rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-lg">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold max-w-2xl mx-auto leading-tight">
            Siap Memulai Pekerjaan Baru dengan Penghasilan Pasti?
          </h2>
          <p className="font-sans text-sm text-white/80 max-w-xl mx-auto leading-relaxed">
            Daftarkan diri Anda hari ini. Konsultasikan persyaratan dan jadwal keberangkatan bersama tim rekrutmen {companyName}.
          </p>
          <Button
            href={`https://wa.me/${recruiterWa}?text=${encodeURIComponent(
              `Halo Admin Rekrutmen ${companyName}, saya mau mendaftar kerja.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="compassionate"
            size="lg"
            className="gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Hubungi Tim Rekrutmen (WhatsApp)</span>
          </Button>
        </div>
      </section>
    </div>
  );
}
