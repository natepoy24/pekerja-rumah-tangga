import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Home, Users, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { getCompanyIdentity } from "@/lib/settings";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanyIdentity();
  const companyName = company?.nama_perusahaan || SITE_CONFIG.name;

  return {
    title: `Terima Kasih | ${companyName}`,
    description: `Permintaan konsultasi Anda telah berhasil kami terima. Tim konsultan ${companyName} akan segera menghubungi Anda.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function TerimaKasihPage() {
  const company = await getCompanyIdentity();
  const companyName = company?.nama_perusahaan || SITE_CONFIG.name;
  const waNumber = company?.nomor_whatsapp || SITE_CONFIG.whatsappPrimary;

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 py-16 bg-[#FAF9F5]">
      <div className="max-w-lg w-full text-center space-y-6 bg-white rounded-3xl p-8 md:p-12 border border-[#D5E8D0] shadow-sm">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-[#EBF4E7] mx-auto flex items-center justify-center text-[#3E7B28] shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* Headings */}
        <div className="space-y-2">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#0B4F42]">
            Permintaan Berhasil Diterima!
          </h1>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Terima kasih telah mempercayakan kebutuhan rumah tangga Anda kepada <strong>{companyName}</strong>.
          </p>
        </div>

        {/* Next Steps Box */}
        <div className="bg-[#FAF9F5] rounded-2xl p-5 border border-[#D5E8D0] text-left space-y-3 text-xs md:text-sm text-gray-700">
          <p className="font-bold text-[#0B4F42] uppercase tracking-wider text-[11px]">
            Langkah Selanjutnya:
          </p>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#0B4F42] text-white flex items-center justify-center text-xs shrink-0 font-bold">1</span>
            <span>Konsultan kami akan menghubungi Anda via WhatsApp dalam waktu 15–30 menit.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#0B4F42] text-white flex items-center justify-center text-xs shrink-0 font-bold">2</span>
            <span>Kami akan mengirimkan kurasi 2–3 profil kandidat terbaik sesuai kriteria Anda.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#0B4F42] text-white flex items-center justify-center text-xs shrink-0 font-bold">3</span>
            <span>Jadwalkan sesi wawancara online gratis via Video Call sebelum memutuskan penempatan.</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Halo ${companyName}, saya baru saja mengirimkan formulir konsultasi dan ingin konfirmasi ketersediaan kandidat.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium text-sm transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat WhatsApp Sekarang</span>
          </a>
          <Button href="/pekerja" variant="secondary" className="w-full sm:w-auto gap-2">
            <Users className="w-4 h-4" />
            <span>Lihat Katalog Pekerja</span>
          </Button>
        </div>

        <div>
          <Link href="/" className="text-xs text-gray-500 hover:text-[#0B4F42] transition-colors inline-flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda Utama</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
