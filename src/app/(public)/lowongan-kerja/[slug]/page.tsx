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
import JsonLd from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo/schemaGenerator";
import { SITE_CONFIG } from "@/lib/siteConfig";
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
      title: `Lowongan Tidak Ditemukan | ${SITE_CONFIG.name}`,
    };
  }

  const title =
    job.meta_title || `${job.title} | Lowongan Kerja Resmi ${SITE_CONFIG.name}`;
  const description =
    job.meta_description ||
    `${job.description.slice(0, 150)}... Gaji ${job.salary_display}, asrama & makan gratis, tanpa potongan calo.`;
  const ogImage = SITE_CONFIG.logo;

  return {
    title,
    description,
    keywords: [
      job.title,
      `lowongan ${job.category}`,
      "kerja pembantu resmi disnaker",
      "lowongan prt gaji utuh",
      SITE_CONFIG.name,
    ],
    alternates: {
      canonical: `${SITE_CONFIG.url}/lowongan-kerja/${job.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/lowongan-kerja/${job.slug}`,
      siteName: company.nama_perusahaan || SITE_CONFIG.name,
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
  const companyName = SITE_CONFIG.name;
  const recruiterWa =
    process.env.NEXT_PUBLIC_RECRUITER_WHATSAPP_NUMBER ||
    company?.nomor_whatsapp ||
    SITE_CONFIG.whatsappPrimary;

  const waApplyUrl = `https://wa.me/${recruiterWa}?text=${encodeURIComponent(
    `Halo ${companyName}, saya ingin melamar posisi: ${job.title}. Mohon informasi alur pendaftaran selanjutnya.`
  )}`;

  const jobSchemaInput: JobSchemaInput = {
    title: job.title,
    description: job.description,
    datePosted: job.created_at,
    validityDays: 30,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      name: SITE_CONFIG.name,
      sameAs: SITE_CONFIG.url,
      logo: SITE_CONFIG.logo,
    },
    jobLocation: {
      streetAddress: SITE_CONFIG.address.streetAddress,
      addressLocality: SITE_CONFIG.address.addressLocality,
      addressRegion: SITE_CONFIG.address.addressRegion,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.addressCountry,
    },
    baseSalary: {
      minValue: job.salary_min,
      maxValue: job.salary_max,
      currency: "IDR",
      unitText: "MONTH",
    },
    directApply: true,
    applyUrl: `${SITE_CONFIG.url}/lowongan-kerja/${job.slug}`,
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "/" },
    { name: "Lowongan Kerja", url: "/lowongan-kerja" },
    { name: job.title, url: `/lowongan-kerja/${job.slug}` },
  ]);

  return (
    <div className="overflow-hidden min-h-screen bg-[#FAFAF7] font-sans pt-28 pb-32">
      <EvergreenJobJsonLd job={jobSchemaInput} />
      <JsonLd schema={breadcrumbSchema} />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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

            <Button
              href={waApplyUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="compassionate"
              size="lg"
              className="shrink-0 gap-2 shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Lamar Posisi Ini (WA)</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#FAFAF7] p-4 rounded-2xl border border-outline-variant/30 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-[#0B4F42]" /> Gaji Utuh Bulanan
              </div>
              <div className="font-serif text-xl font-bold text-[#0B4F42]">
                {job.salary_display}
              </div>
            </div>
            <div className="bg-[#FAFAF7] p-4 rounded-2xl border border-outline-variant/30 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#0B4F42]" /> Penempatan Alamat
              </div>
              <div className="font-serif text-sm font-bold text-[#0B4F42]">
                {SITE_CONFIG.address.streetAddress}, {SITE_CONFIG.address.addressLocality}
              </div>
            </div>
            <div className="bg-[#FAFAF7] p-4 rounded-2xl border border-outline-variant/30 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#0B4F42]" /> Sistem Penempatan
              </div>
              <div className="font-serif text-sm font-bold text-[#0B4F42]">
                Live-In (Menginap & Asrama)
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="font-serif text-xl font-bold text-[#0B4F42]">Deskripsi & Kualifikasi Lowongan</h2>
            <div className="prose text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">
              {job.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
