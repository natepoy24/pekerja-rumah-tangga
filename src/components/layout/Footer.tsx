import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";
import type { CompanyIdentity } from "@/lib/settings";

interface FooterProps {
  company?: CompanyIdentity;
}

export function Footer({ company }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const waNumber = company?.nomor_whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6285111399962";
  const phone = company?.nomor_telepon || "+62 851-1139-9962";
  const email = company?.email || "info@pekerjarumahtangga.com";
  const companyName = company?.nama_perusahaan || "PT Jasa Mandiri";
  const logoUrl = company?.logo_url || "/logo.png";
  const address =
    company?.alamat_lengkap ||
    "Jl. Gunung Balong III No.78, RT.11/RW.4, Lb. Bulus, Kec. Cilandak, Kota Jakarta Selatan, DKI Jakarta 12440";
  const description =
    company?.deskripsi ||
    "Penyalur resmi Asisten Rumah Tangga, Baby Sitter, dan Perawat Lansia berizin resmi Disnaker & Kemnaker sejak 2010. Mengutamakan kebersihan, etika, dan keamanan keluarga Anda.";
  const izinKemnaker = company?.izin_kemnaker || "LPK No. 410/2010";
  const izinDisnaker = company?.izin_disnaker || "Terdaftar DISNAKER & PJTKI";

  return (
    <footer className="bg-[#14201D] text-white border-t border-[#0B4F42]/20 mt-auto font-sans">
      <div className="max-w-container mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image
                src={logoUrl}
                alt={`Logo ${companyName}`}
                width={48}
                height={48}
                className="w-12 h-12 object-contain bg-white rounded-full p-0.5 shadow-sm"
              />
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                {companyName}
              </span>
            </div>
            <p className="text-sm text-surface-dim/80 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-col gap-1.5 pt-2">
              <span className="text-xs text-[#82c467] bg-[#155100]/30 py-1.5 px-3.5 rounded-full border border-[#3E7B28]/40 self-start flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Izin KEMNAKER RI {izinKemnaker}
              </span>
              <span className="text-xs text-[#82c467] bg-[#155100]/30 py-1.5 px-3.5 rounded-full border border-[#3E7B28]/40 self-start flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {izinDisnaker}
              </span>
            </div>
          </div>

          {/* Services Link */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs tracking-[0.2em] uppercase font-bold text-[#83bfaf]">
              Layanan Utama
            </h4>
            <div className="flex flex-col gap-2.5">
              <Link href="/layanan" className="text-sm font-semibold text-[#82c467] hover:text-white transition-colors">
                ✦ Semua Layanan & Paket
              </Link>
              <Link href="/layanan/art" className="text-sm text-surface-dim/80 hover:text-white transition-colors">
                Asisten Rumah Tangga (ART)
              </Link>
              <Link href="/layanan/baby-sitter" className="text-sm text-surface-dim/80 hover:text-white transition-colors">
                Baby Sitter & Nanny
              </Link>
              <Link href="/layanan/perawat-lansia" className="text-sm text-surface-dim/80 hover:text-white transition-colors">
                Perawat Lansia (Elder Care)
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs tracking-[0.2em] uppercase font-bold text-[#83bfaf]">
              Navigasi Utama
            </h4>
            <div className="flex flex-col gap-2.5">
              <Link href="/" className="text-sm text-surface-dim/80 hover:text-white transition-colors">
                Beranda Utama
              </Link>
              <Link href="/pekerja" className="text-sm text-surface-dim/80 hover:text-white transition-colors">
                Katalog Pekerja
              </Link>
              <Link href="/artikel" className="text-sm text-surface-dim/80 hover:text-white transition-colors">
                Artikel & Edukasi
              </Link>
              <Link href="/lowongan-kerja" className="text-sm text-surface-dim/80 hover:text-white transition-colors">
                Lowongan Kerja
              </Link>
              <Link href="/tentang-kami" className="text-sm text-surface-dim/80 hover:text-white transition-colors">
                Tentang Kami
              </Link>
              <Link href="/kontak" className="text-sm text-surface-dim/80 hover:text-white transition-colors">
                Hubungi Kami (Kontak)
              </Link>
              <Link href="/admin/dashboard" className="text-sm text-surface-dim/80 hover:text-white transition-colors font-medium">
                Portal Admin Dashboard
              </Link>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs tracking-[0.2em] uppercase font-bold text-[#83bfaf]">
              Hubungi Kami
            </h4>
            <div className="flex flex-col gap-3 text-sm text-surface-dim/80">
              <div className="flex gap-2.5">
                <MapPin className="w-5 h-5 shrink-0 text-[#82c467] mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <Phone className="w-5 h-5 shrink-0 text-[#82c467]" />
                <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-medium">
                  {phone}
                </a>
              </div>
              <div className="flex gap-2.5 items-center">
                <Mail className="w-5 h-5 shrink-0 text-[#82c467]" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-surface-dim/60">
          <p>© {currentYear} {companyName}. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex gap-6">
            <Link href="/tentang-kami" className="hover:text-white transition-colors">Tentang Kami</Link>
            <Link href="/kontak" className="hover:text-white transition-colors">Kontak</Link>
            <Link href="/layanan" className="hover:text-white transition-colors">Layanan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
