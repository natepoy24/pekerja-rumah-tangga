import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  FileText,
  BadgePercent,
  MapPin,
  Clock,
  Wallet,
  ChevronRight,
  Home,
  UserCheck,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { getCompanyIdentity } from "@/lib/settings";
import { getJobBySlug } from "@/lib/jobs";
import EvergreenJobJsonLd from "@/components/seo/EvergreenJobJsonLd";
import type { JobSchemaInput } from "@/types/job-schema";

export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  const company = await getCompanyIdentity();

  if (!job || job.is_active === false) {
    return {
      title: "Lowongan Tidak Ditemukan | PT Jasa Mandiri",
    };
  }

  const title =
    job.meta_title || `${job.title} | Lowongan Kerja Resmi ${company.nama_perusahaan}`;
  const description =
    job.meta_description ||
    `${job.description.slice(0, 150)}... Gaji ${job.salary_display}, asrama & makan gratis, tanpa potongan calo.`;
  const ogImage = "/asisten rumah tangga.jpeg";

  return {
    title,
    description,
    keywords: [
      job.title,
      `lowongan ${job.category}`,
      "kerja pembantu resmi disnaker",
      "lowongan prt gaji utuh",
      company.nama_perusahaan,
    ],
    alternates: {
      canonical: `/lowongan-kerja/${job.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://pekerjarumahtangga.com/lowongan-kerja/${job.slug}`,
      type: "website",
      locale: "id_ID",
      images: [{ url: ogImage, alt: title }],
    },
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job || job.is_active === false) {
    notFound();
  }

  const company = await getCompanyIdentity();
  const companyName = company?.nama_perusahaan || "PT Jasa Mandiri";
  const recruiterWa =
    process.env.NEXT_PUBLIC_RECRUITER_WHATSAPP_NUMBER ||
    company?.nomor_whatsapp ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    "6285111399962";

  const waApplyUrl = `https://wa.me/${recruiterWa}?text=${encodeURIComponent(
    `Halo ${companyName}, saya ingin melamar posisi: ${job.title}. Mohon informasi alur pendaftaran selanjutnya.`
  )}`;

  // Single Job Schema input for Evergreen Component
  const jobSchemaInput: JobSchemaInput = {
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
  };

  return (
    <div className="overflow-hidden min-h-screen bg-[#FAFAF7] font-sans pt-28 pb-32">
      {/* Evergreen Schema.org JobPosting Markup */}
      <EvergreenJobJsonLd job={jobSchemaInput} />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
          <Link href="/" className="hover:text-[#0B4F42] transition-colors">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-40" />
          <Link href="/lowongan-kerja" className="hover:text-[#0B4F42] transition-colors">
            Lowongan Kerja
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-40" />
          <span className="text-[#0B4F42] font-semibold truncate max-w-[200px] sm:max-w-none">
            {job.title}
          </span>
        </nav>

        {/* Header Header Box */}
        <div className="bg-white/80 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-[#D5E8D0] shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant/20 pb-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Chip label={`POSISI: ${job.category.toUpperCase()}`} />
                {job.badge && (
                  <span className="px-3 py-1 rounded-full bg-[#EBF4E7] text-[#3E7B28] text-xs font-bold uppercase tracking-wider">
                    {job.badge}
                  </span>
                )}
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B4F42] leading-tight">
                {job.title}
              </h1>
            </div>

            <a href={waApplyUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
              <Button variant="compassionate" size="lg" className="gap-2 shadow-md">
                <PhoneCall className="w-4 h-4" />
                <span>Lamar Posisi Ini (WA)</span>
              </Button>
            </a>
          </div>

          {/* Salary & Specs Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#FAFAF7] p-4 rounded-2xl border border-outline-variant/30 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-[#0B4F42]" /> Gaji Utuh Bulanan
              </div>
              <div className="font-serif text-xl font-bold text-[#0B4F42]">
                {job.salary_display}
              </div>
              <div className="text-[11px] text-[#3E7B28] font-medium">Tanpa Potongan Biaya</div>
            </div>

            <div className="bg-[#FAFAF7] p-4 rounded-2xl border border-outline-variant/30 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#0B4F42]" /> Sistem Kerja
              </div>
              <div className="font-sans text-sm font-bold text-[#0B4F42]">{job.system}</div>
              <div className="text-[11px] text-on-surface-variant">Libur Kerja Teratur / Infal</div>
            </div>

            <div className="bg-[#FAFAF7] p-4 rounded-2xl border border-outline-variant/30 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#0B4F42]" /> Penempatan Kerja
              </div>
              <div className="font-sans text-sm font-bold text-[#0B4F42]">Jabodetabek & Sekitarnya</div>
              <div className="text-[11px] text-on-surface-variant">Majikan Terverifikasi Resmi</div>
            </div>
          </div>
        </div>

        {/* Content Body: Grid 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Details (Left 8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Description */}
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#D5E8D0] shadow-sm space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#0B4F42] flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#3E7B28]" />
                <span>Deskripsi Pekerjaan</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* Duties & Responsibilities */}
            {job.duties && job.duties.length > 0 && (
              <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#D5E8D0] shadow-sm space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#0B4F42] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#3E7B28]" />
                  <span>Tugas & Tanggung Jawab Harian</span>
                </h2>
                <ul className="space-y-3 font-sans text-sm text-on-surface-variant">
                  {job.duties.map((duty, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-[#FAFAF7] p-3.5 rounded-xl border border-outline-variant/20">
                      <CheckCircle2 className="w-5 h-5 text-[#3E7B28] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{duty}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements & Documents */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#D5E8D0] shadow-sm space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#0B4F42] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#3E7B28]" />
                  <span>Persyaratan Calon Pekerja & Dokumen</span>
                </h2>
                <ul className="space-y-3 font-sans text-sm text-on-surface-variant">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-[#FAFAF7] p-3.5 rounded-xl border border-outline-variant/20">
                      <div className="w-5 h-5 rounded-full bg-[#EBF4E7] text-[#3E7B28] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Facilities & Benefits */}
            {job.facilities && job.facilities.length > 0 && (
              <div className="bg-[#0B4F42] text-white p-6 sm:p-8 rounded-3xl shadow-md space-y-4">
                <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                  <BadgePercent className="w-5 h-5 text-[#EBF4E7]" />
                  <span>Fasilitas & Jaminan Hak Pekerja</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {job.facilities.map((fac, idx) => (
                    <div key={idx} className="bg-white/10 p-3.5 rounded-xl border border-white/10 flex items-start gap-2.5 text-xs text-white/90">
                      <ShieldCheck className="w-4 h-4 text-[#EBF4E7] shrink-0 mt-0.5" />
                      <span>{fac}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Summary Card */}
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-[#D5E8D0] shadow-sm space-y-5">
              <h3 className="font-serif text-lg font-bold text-[#0B4F42] border-b border-outline-variant/20 pb-3">
                Ringkasan Pendaftaran
              </h3>
              <ul className="space-y-3 text-xs text-on-surface-variant">
                <li className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-[#3E7B28] shrink-0" />
                  <span>Asrama & Makan 3x Sehari Gratis</span>
                </li>
                <li className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#3E7B28] shrink-0" />
                  <span>Pemeriksaan Medis (MCU) Disediakan</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#3E7B28] shrink-0" />
                  <span>Izin KEMNAKER & DISNAKER Resmi</span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgePercent className="w-4 h-4 text-[#3E7B28] shrink-0" />
                  <span>Gaji Utuh Tanpa Potongan Liar</span>
                </li>
              </ul>

              <a href={waApplyUrl} target="_blank" rel="noopener noreferrer" className="block w-full pt-2">
                <Button variant="compassionate" className="w-full justify-center gap-2">
                  <PhoneCall className="w-4 h-4" />
                  <span>Daftar via WhatsApp Sekarang</span>
                </Button>
              </a>
            </div>

            {/* Back Navigation */}
            <Link
              href="/lowongan-kerja"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0B4F42] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Semua Lowongan Kerja</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Sticky Bottom Bar for Mobile Apply */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#D5E8D0] p-4 shadow-xl sm:hidden">
        <div className="flex items-center justify-between gap-3 max-w-container mx-auto">
          <div>
            <div className="text-[10px] uppercase font-bold text-on-surface-variant">Gaji Utuh:</div>
            <div className="font-serif text-sm font-bold text-[#0B4F42]">{job.salary_display}</div>
          </div>
          <a href={waApplyUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
            <Button variant="compassionate" size="sm" className="gap-2 text-xs">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Daftar WhatsApp</span>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
