import { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Building2,
  ExternalLink,
  ChevronDown,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Award,
} from "lucide-react";
import dynamic from "next/dynamic";
import { ContactFormClient } from "./ContactFormClient";
import LazyGoogleMap from "@/components/common/LazyGoogleMap";
import { getPageSetting, getCompanyIdentity } from "@/lib/settings";
import JsonLd from "@/components/seo/JsonLd";
import {
  generateContactPageSchema,
  generateEmploymentAgencySchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/schemaGenerator";
import { SITE_CONFIG } from "@/lib/siteConfig";

const FaqSection = dynamic(() => import("@/components/common/FaqSection"), {
  loading: () => <div className="h-64 animate-pulse bg-surface-container rounded-2xl" />,
});


export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [setting, company] = await Promise.all([
    getPageSetting("page_kontak"),
    getCompanyIdentity(),
  ]);

  const title = setting.meta_title || `Hubungi ${company.nama_perusahaan} | Kantor Penyalur PRT, Baby Sitter & Perawat Lansia`;
  const description = setting.meta_description || "Konsultasikan kebutuhan PRT, baby sitter, dan perawat lansia bersama kami.";
  const ogImage = setting.og_image || setting.hero_image || "/asisten-rumah-tangga.webp";
  const canonicalUrl = `${SITE_CONFIG.url}/kontak`;

  return {
    title,
    description,
    keywords: setting.keywords ? setting.keywords.split(",").map((k) => k.trim()) : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: company.nama_perusahaan || SITE_CONFIG.name,
      locale: "id_ID",
      type: "website",
      images: [{ url: ogImage, alt: setting.hero_image_alt || title }],
    },
  };
}

export default async function ContactPage() {
  const [pageSetting, company] = await Promise.all([
    getPageSetting("page_kontak"),
    getCompanyIdentity(),
  ]);

  const waNumber = company?.nomor_whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6285111399962";
  const phone = company?.nomor_telepon || "+62 851-1139-9962";
  const email = company?.email || "info@pekerjarumahtangga.com";
  const address =
    company?.alamat_lengkap ||
    "Jl. Gunung Balong III No.78, RT.11/RW.4, Lb. Bulus, Kec. Cilandak, Kota Jakarta Selatan, DKI Jakarta 12440";
  const mapsUrl = company?.google_maps_url || "https://maps.app.goo.gl/z5f5F93TwLPZJA7n7";
  const hours = company?.jam_operasional || "Senin - Minggu: 08:00 - 21:00 WIB";

  const defaultWaUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Halo ${company.nama_perusahaan}, saya ingin berkonsultasi mengenai kebutuhan tenaga kerja rumah tangga.`
  )}`;
  const aftercareWaUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Halo Divisi Aftercare & Compliance ${company.nama_perusahaan}, saya majikan terdaftar dan ingin mengajukan konsultasi purna jual / klaim garansi / perpanjangan kontrak.`
  )}`;


  const contactSchema = generateContactPageSchema();
  const agencySchema = generateEmploymentAgencySchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "/" },
    { name: "Kontak", url: "/kontak" },
  ]);

  const coverageAreas = [
    {
      region: "DKI Jakarta",
      cities: [
        "Jakarta Selatan",
        "Jakarta Pusat",
        "Jakarta Barat",
        "Jakarta Timur",
        "Jakarta Utara",
      ],
    },
    {
      region: "Tangerang & Banten",
      cities: [
        "Tangerang Kota",
        "BSD City",
        "Serpong",
        "Gading Serpong",
        "Bintaro",
        "Karawaci",
      ],
    },
    {
      region: "Jawa Barat",
      cities: [
        "Depok",
        "Bekasi Kota",
        "Bogor Kota",
        "Cibubur",
        "Cikarang",
      ],
    },
    {
      region: "Luar Jabodetabek",
      cities: [
        "Layanan penempatan luar kota / luar pulau menggunakan sistem kontrak resmi sesuai kesepakatan.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF7] font-sans text-[#14201D]">
      <JsonLd schema={[contactSchema, agencySchema, breadcrumbSchema]} />


      {/* SECTION 1: HERO BANNER (Split Grid Warm Off-White) */}
      <section className="bg-[#FAFAF7] border-b border-[#D5E8D0]/60 relative overflow-hidden py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Direct Fast Channels */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF4E7] border border-[#3E7B28]/30 text-xs font-semibold text-[#0B4F42]">
                  <Sparkles className="w-3.5 h-3.5 text-[#3E7B28]" />
                  <span>Respon Cepat & Garansi Legalitas Fizik</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] text-[#14201D]">
                  Hadirkan Ketenangan di Kediaman Anda Hari Ini.
                </h1>
                <p className="font-sans text-base sm:text-lg text-[#404945] leading-relaxed max-w-2xl">
                  Tim konsultan {company.nama_perusahaan} siap mendampingi Anda memetakan kriteria pekerja rumah tangga, pengasuh anak, hingga perawat lansia yang tepat dan siap kerja.
                </p>
              </div>

              {/* Glassmorphism Quick Contact Cards */}
              <div className="space-y-4">
                {/* WhatsApp Priority Line (Ruby Wine #9E232A) */}
                <div className="glass-surface p-5 rounded-2xl border border-[#D5E8D0] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-md">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#3E7B28] animate-pulse" />
                      <h2 className="font-serif text-lg font-bold text-[#14201D]">
                        WhatsApp Priority Line
                      </h2>
                    </div>
                    <p className="font-sans text-xs text-[#404945]">
                      Respon rata-rata &lt; 15 menit pada jam operasional.
                    </p>
                  </div>
                  <a
                    href={defaultWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] min-w-[44px] bg-[#9E232A] hover:bg-[#8c151f] text-white font-sans text-sm font-semibold rounded-xl shadow-md transition-all shrink-0"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Konsultasi Kebutuhan via WhatsApp</span>
                  </a>
                </div>

                {/* Hotline Telepon Kantor & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Telephone Hotline */}
                  <div className="glass-surface p-5 rounded-2xl border border-[#D5E8D0] bg-white/80 backdrop-blur-md space-y-2">
                    <div className="flex items-center gap-2 text-[#0B4F42]">
                      <Phone className="w-4 h-4" />
                      <span className="font-sans text-xs uppercase font-bold tracking-wider">
                        Hotline Telepon Kantor
                      </span>
                    </div>
                    <div className="font-serif text-lg font-bold text-[#14201D]">
                      {phone}
                    </div>
                    <p className="font-sans text-xs text-[#404945]">
                      Telepon kantor tetap PSTN untuk verifikasi fisik entitas resmi.
                    </p>
                  </div>

                  {/* Email Resmi Administrasi */}
                  <div className="glass-surface p-5 rounded-2xl border border-[#D5E8D0] bg-white/80 backdrop-blur-md space-y-2">
                    <div className="flex items-center gap-2 text-[#0B4F42]">
                      <Mail className="w-4 h-4" />
                      <span className="font-sans text-xs uppercase font-bold tracking-wider">
                        Email Administrasi
                      </span>
                    </div>
                    <a
                      href={`mailto:${email}`}
                      className="font-serif text-base font-bold text-[#14201D] hover:text-[#0B4F42] transition-colors block truncate"
                    >
                      {email}
                    </a>
                    <p className="font-sans text-xs text-[#404945]">
                      Khusus urusan kontrak korporat atau pengaduan formal.
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* Right Column: Needs Curation Form */}
            <div className="lg:col-span-5">
              <ContactFormClient waNumber={waNumber} companyName={company.nama_perusahaan} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LEGALITAS FISIK & PETA KANTOR OPERASIONAL (The Local SEO Anchor) */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-container mx-auto">
        <div className="text-center mb-12 space-y-3">
          <span className="inline-block text-xs font-semibold text-[#0B4F42] bg-[#EBF4E7] px-3 py-1 rounded-full uppercase tracking-wider">
            Akuntabilitas Fisik & Operasional
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B4F42]">
            Kantor Operasional & Legalitas Resmi
          </h2>
          <p className="font-sans text-base text-[#404945] max-w-2xl mx-auto">
            Menjawab kekhawatiran calon majikan terhadap penyalur fiktif. Kami mengundang Anda mengunjungi kantor fisik resmi kami di Jakarta Selatan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* NAP Detail Card */}
          <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-[#D5E8D0] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#D5E8D0]/60 space-y-2">
                <div className="flex items-center gap-2 text-[#3E7B28] text-xs font-semibold uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Izin LPTKS Resmi Kemnaker & Disnaker</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0B4F42]">
                  {company.nama_perusahaan}
                </h3>
                <p className="font-sans text-xs text-[#404945]">
                  PJTKI & Yayasan Penyalur Tenaga Kerja Terdaftar Sejak 2010
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0B4F42] shrink-0 mt-1" />
                <div className="space-y-1">
                  <span className="font-sans text-xs uppercase font-bold text-[#404945]">
                    Alamat Fisik Kantor:
                  </span>
                  <p className="font-sans text-sm text-[#14201D] leading-relaxed">
                    Jl. Gunung Balong III No.78, RT.11/RW.4, Lb. Bulus, Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12440
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#0B4F42] shrink-0 mt-1" />
                <div className="space-y-1">
                  <span className="font-sans text-xs uppercase font-bold text-[#404945]">
                    Jam Operasional Tatap Muka:
                  </span>
                  <p className="font-sans text-sm font-semibold text-[#14201D]">
                    Senin – Minggu : 08.00 – 21.00 WIB
                  </p>
                </div>
              </div>

              {/* Facility note */}
              <div className="p-4 rounded-xl bg-[#FAFAF7] border border-[#D5E8D0] space-y-1">
                <span className="font-serif text-sm font-bold text-[#0B4F42] block">
                  Fasilitas Kunjungan Langsung
                </span>
                <p className="font-sans text-xs text-[#404945] leading-relaxed">
                  Kantor operasional kami memfasilitasi sesi wawancara tatap muka langsung antara calon majikan dan kandidat pekerja dalam suasana yang nyaman dan profesional.
                </p>
              </div>
            </div>

            {/* External Google Maps Button */}
            <a
              href="https://maps.app.goo.gl/z5f5F93TwLPZJA7n7"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 min-h-[44px] min-w-[44px] bg-[#0B4F42] hover:bg-[#00372d] text-white font-sans text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>Buka di Google Maps (Jasa ART)</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Map Embed Frame with Lazy-load Interactive Placeholder */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <LazyGoogleMap
              embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3134.3387853597533!2d106.78843769999999!3d-6.304753400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69efd022e06d2b%3A0xfc3df798e49f58fb!2sJasa%20ART!5e1!3m2!1sid!2sid!4v1788849970996!5m2!1sid!2sid"
              staticImageSrc="/maps-placeholder.webp"
              locationName={`Peta Lokasi Kantor ${company.nama_perusahaan} Lebak Bulus Jakarta Selatan`}
              address={address}
              className="w-full h-full min-h-[380px] lg:min-h-[460px]"
            />
          </div>
        </div>
      </section>

      {/* SECTION 3: CAKUPAN WILAYAH PENEMPATAN (SEO Keyword Matrix) */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#D5E8D0]/60">
        <div className="max-w-container mx-auto">
          <div className="text-center mb-12 space-y-3">
            <span className="inline-block text-xs font-semibold text-[#0B4F42] bg-[#EBF4E7] px-3 py-1 rounded-full uppercase tracking-wider">
              Jangkauan Layanan Penempatan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B4F42]">
              Cakupan Wilayah Jabodetabek & Nasional
            </h2>
            <p className="font-sans text-base text-[#404945] max-w-2xl mx-auto">
              Layanan pengantaran dan penempatan tenaga kerja resmi {company.nama_perusahaan} mencakup area perumahan dan komersial utama.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coverageAreas.map((col, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FAFAF7] border border-[#D5E8D0] space-y-4 hover:border-[#0B4F42] transition-colors"
              >
                <div className="flex items-center gap-2 pb-3 border-b border-[#D5E8D0]/60">
                  <Building2 className="w-5 h-5 text-[#0B4F42]" />
                  <h3 className="font-serif text-lg font-bold text-[#0B4F42]">
                    {col.region}
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {col.cities.map((city, cIdx) => (
                    <li
                      key={cIdx}
                      className="font-sans text-xs text-[#404945] flex items-start gap-2 leading-relaxed"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3E7B28] shrink-0 mt-0.5" />
                      <span>{city}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: KANAL KHUSUS: LAYANAN PURNA JUAL & KLAIM GARANSI (Aftercare Support) */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-container mx-auto">
        <div className="bg-[#EBF4E7] rounded-3xl p-8 sm:p-12 border border-[#3E7B28]/30 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-bold text-[#3E7B28] border border-[#3E7B28]/30">
              <ShieldCheck className="w-4 h-4" />
              <span>Aftercare & Compliance Division</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B4F42] leading-tight">
              Sudah Menggunakan Layanan {company.nama_perusahaan}?
            </h2>
            <p className="font-sans text-base text-[#14201D] leading-relaxed">
              Untuk perpanjangan kontrak kerja, mediasi penyesuaian kerja, atau klaim garansi penggantian pekerja, hubungi divisi Aftercare & Compliance kami melalui nomor khusus purna jual.
            </p>
            <div>
              <a
                href={aftercareWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 min-h-[44px] min-w-[44px] bg-[#0B4F42] hover:bg-[#00372d] text-white font-sans text-sm font-semibold rounded-xl shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[#82c467]" />
                <span>Hubungi Hotline Garansi & Mediasi</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQ SEBELUM BERKUNJUNG ATAU KONSULTASI (CMS Driven) */}
      <FaqSection items={pageSetting?.faqs} whatsappNumber={waNumber} companyName={company.nama_perusahaan} />
    </div>
  );
}
