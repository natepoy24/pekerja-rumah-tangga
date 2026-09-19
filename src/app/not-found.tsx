import Link from "next/link";
import { Home, Users, ArrowLeft, MessageSquare, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/siteConfig";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 py-16 bg-[#FAF9F5]">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Visual Badge */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-[#EBF4E7] flex items-center justify-center text-[#0B4F42] shadow-inner">
            <Compass className="w-12 h-12 stroke-[1.5] animate-spin" style={{ animationDuration: "12s" }} />
          </div>
          <span className="absolute -top-1 -right-1 bg-[#14201D] text-[#82c467] text-xs font-bold px-2 py-0.5 rounded-full border border-[#3E7B28]/40">
            404
          </span>
        </div>

        {/* Heading & Details */}
        <div className="space-y-2">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#0B4F42] tracking-tight">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Maaf, tautan yang Anda tuju mungkin telah dipindahkan, berganti alamat, atau tidak lagi tersedia.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button href="/" variant="primary" className="w-full sm:w-auto gap-2">
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Button>
          <Button href="/pekerja" variant="secondary" className="w-full sm:w-auto gap-2">
            <Users className="w-4 h-4" />
            <span>Katalog Pekerja</span>
          </Button>
        </div>

        {/* Quick WhatsApp Support */}
        <div className="pt-6 border-t border-[#D5E8D0]">
          <p className="text-xs text-gray-500 mb-2">
            Butuh bantuan menemukan kandidat pekerja atau informasi layanan?
          </p>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappPrimary}?text=${encodeURIComponent(`Halo ${SITE_CONFIG.name}, saya mencari informasi pekerja rumah tangga.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B4F42] hover:text-[#3E7B28] transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Hubungi Konsultan Kami via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
