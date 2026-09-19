import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, ChevronRight, MessageSquare, ShieldCheck, CheckCircle2, PhoneCall } from "lucide-react";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { getCompanyIdentity, getPageSetting } from "@/lib/settings";
import FaqSection from "@/components/common/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo/schemaGenerator";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanyIdentity();
  const companyName = company?.nama_perusahaan || SITE_CONFIG.name;
  const canonicalUrl = `${SITE_CONFIG.url}/faq`;

  return {
    title: `FAQ - Pertanyaan Umum Penyaluran Pekerja | ${companyName}`,
    description: `Pertanyaan yang sering diajukan seputar biaya admin, garansi penggantian pekerja, verifikasi identitas, dan syarat pemesanan PRT, Baby Sitter & Perawat di ${companyName}.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `FAQ - Pertanyaan Seputar Layanan | ${companyName}`,
      description: `Jawaban lengkap seputar legalitas, garansi penggantian pekerja, dan alur pemesanan di ${companyName}.`,
      url: canonicalUrl,
      siteName: companyName,
      locale: "id_ID",
      type: "website",
      images: [{ url: SITE_CONFIG.logo, alt: `FAQ ${companyName}` }],
    },
  };
}

function getFaqItems(companyName: string) {
  return [
    {
      question: `Apakah ${companyName} lembaga penyalur resmi dan berizin pemerintah?`,
      answer:
        `Ya, ${companyName} merupakan Lembaga Penempatan Pekerja Rumah Tangga (P3RT) dan LPK resmi yang telah memiliki izin resmi dari Dinas Tenaga Kerja (DISNAKER) dan Kementerian Ketenagakerjaan (KEMNAKER RI) LPK No. 410/2010 sejak tahun 2010. Seluruh operasional kami tunduk pada regulasi ketenagakerjaan Republik Indonesia.`,
    },
    {
      question: "Bagaimana proses dan alur pemesanan pekerja hingga tiba di rumah?",
      answer:
        "Prosesnya sangat mudah: 1) Konsultasikan kebutuhan Anda via WhatsApp atau telepon; 2) Tim kami akan mengirimkan kurasi profil kandidat yang sesuai; 3) Anda dapat melakukan sesi wawancara via Video Call; 4) Setelah cocok, penandatanganan kontrak kerja bermaterai; 5) Pekerja siap diantar langsung ke rumah Anda atau dijemput di kantor kami.",
    },
    {
      question: "Berapa lama masa garansi penempatan dan bagaimana ketentuan penggantian pekerja?",
      answer:
        "Kami memberikan masa garansi penggantian pekerja selama 3 bulan hingga 1 tahun (tergantung paket yang dipilih). Jika selama masa garansi terjadi ketidakcocokan atau pekerja mengundurkan diri secara sepihak, Anda berhak mendapatkan penggantian pekerja baru tanpa biaya administrasi tambahan selama kuota paket masih tersedia.",
    },
    {
      question: "Bagaimana verifikasi latar belakang dan pemeriksaan kesehatan pekerja?",
      answer:
        "Setiap kandidat pekerja wajib melalui seleksi verifikasi dokumen fisik asli (KTP, Kartu Keluarga, dan SKCK Kepolisian), penjaminan keluarga, serta tes kesehatan (skrining penyakit menular seperti hepatitis, TBC, dan tes kehamilan). Dokumen asli pekerja diarsipkan di kantor agensi kami demi keamanan majikan.",
    },
    {
      question: "Apakah saya bisa mewawancarai calon pekerja terlebih dahulu?",
      answer:
        "Tentu saja. Kami sangat menganjurkan sesi wawancara terlebih dahulu agar majikan dan calon pekerja dapat saling mengenal kriteria, beban tugas harian, serta kecocokan kepribadian sebelum mengambil keputusan penempatan.",
    },
    {
      question: "Berapa kisaran gaji standar untuk PRT, Baby Sitter, dan Perawat Lansia?",
      answer:
        "Kisaran gaji bervariasi bergantung pada jenis profesi, tingkat keahlian, dan pengalaman: ART berkisar antara Rp 2.200.000 – Rp 2.800.000/bulan; Baby Sitter/Nanny berkisar antara Rp 2.800.000 – Rp 3.800.000/bulan; sedangkan Perawat Lansia berkisar antara Rp 3.500.000 – Rp 5.000.000/bulan (untuk kondisi lansia bedridden/medis khusus).",
    },
    {
      question: "Bagaimana sistem pembayaran biaya administrasi resmi?",
      answer:
        `Pembayaran biaya administrasi hanya sah jika ditransfer ke rekening bank resmi atas nama ${companyName} atau dibayarkan secara tunai/debit di kantor resmi kami dengan bukti kwitansi bermaterai. Kami tidak pernah meminta transfer ke rekening pribadi perorangan.`,
    },
    {
      question: `Apakah ${companyName} melayani penempatan di luar Jabodetabek?`,
      answer:
        "Ya, selain wilayah Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi), kami juga melayani penempatan pekerja ke seluruh wilayah Pulau Jawa dan kota-kota besar di luar pulau Jawa dengan biaya akomodasi perjalanan yang disepakati bersama.",
    },
  ];
}

export default async function FaqPage() {
  const company = await getCompanyIdentity();
  const companyName = company?.nama_perusahaan || SITE_CONFIG.name;
  const waNumber = company?.nomor_whatsapp || SITE_CONFIG.whatsappPrimary;
  const faqItems = getFaqItems(companyName);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "/" },
    { name: "FAQ", url: "/faq" },
  ]);

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      <JsonLd data={breadcrumbSchema} />

      {/* Header / Hero Section */}
      <section className="bg-[#14201D] text-white pt-12 pb-16 px-6 md:px-8 border-b border-[#0B4F42]/30">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">FAQ</span>
          </nav>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B4F42]/60 border border-[#82c467]/30 text-xs font-medium text-[#82c467]">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Pusat Informasi & Transparansi Layanan</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h1>
            <p className="text-sm md:text-base text-white/70 max-w-2xl leading-relaxed">
              Temukan informasi lengkap mengenai standar operasional penempatan, proses garansi kontrak, verifikasi dokumen pekerja, dan sistem pembayaran resmi di {companyName}.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <main className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16 space-y-12">
        <div className="bg-white rounded-2xl p-6 md:p-10 border border-[#D5E8D0] shadow-sm">
          <FaqSection
            items={faqItems}
            title="Tanya Jawab Seputar Penyaluran Pekerja"
            subtitle="Klik pertanyaan di bawah untuk melihat rincian penjelasan resmi dari manajemen kami."
            whatsappNumber={waNumber}
            companyName={companyName}
          />
        </div>

        {/* Still Have Questions CTA */}
        <div className="bg-[#EBF4E7] rounded-2xl p-8 border border-[#3E7B28]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#0B4F42]">
              Punya Pertanyaan Lain yang Belum Terjawab?
            </h2>
            <p className="text-xs md:text-sm text-[#404945]">
              Konsultan penempatan kami siap memberikan jawaban dan panduan konsultasi gratis secara langsung.
            </p>
          </div>
          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Halo ${companyName}, saya ingin bertanya lebih lanjut seputar kebutuhan pekerja rumah tangga.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0B4F42] hover:bg-[#14201D] text-white font-medium text-sm transition-colors shrink-0 shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Tanya Konsultan via WhatsApp</span>
          </a>
        </div>
      </main>
    </div>
  );
}
