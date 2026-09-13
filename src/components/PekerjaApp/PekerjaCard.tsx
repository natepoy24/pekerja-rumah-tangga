"use client";

import Image from "next/image";
import Link from "next/link";
import { Briefcase, MapPin, ShieldCheck, Star } from "lucide-react";
import slugify from "slugify";
import { useRouter } from "next/navigation";

export type PekerjaProps = {
  id: number;
  nama: string;
  slug: string;
  kategori:
    | "Baby Sitter"
    | "Perawat Lansia"
    | "Asisten Rumah Tangga"
    | "Supir"
    | "Tukang Kebun"
    | string;
  status: "Tersedia" | "Akan Tersedia" | string;
  fotoUrl?: string;
  foto_url?: string;
  pengalaman: number;
  lokasi?: string;
  deskripsi?: string;
  gaji?: number;
  keterampilan?: string;
  umur?: number;
  suku?: string;
  kekurangan?: string;
  bisa_bawa_motor?: boolean;
  takut_anjing?: boolean;
  status_perkawinan?: string;
  keahlian_khusus?: string;
  agama?: string;
  bahasa_asing?: string[];
  bisa_masak_babi?: boolean;
  masakan_khusus?: string;
  pendidikan_terakhir?: string;
  tinggi_badan?: number;
  berat_badan?: number;
};

const formatRupiah = (angka: number | null | undefined) => {
  if (!angka || angka === 0) return "Sesuai Kesepakatan";
  return `Rp ${angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

export default function PekerjaCard({ pekerja }: { pekerja: PekerjaProps }) {
  const router = useRouter();

  if (!pekerja.slug || !pekerja.kategori) {
    return null;
  }

  const kategoriSlug = slugify(pekerja.kategori, {
    lower: true,
    strict: true,
  });

  const displayFoto = pekerja.fotoUrl || pekerja.foto_url || "/Image/placeholder.png";

  const getStatusClass = () => {
    switch (pekerja.status) {
      case "Tersedia":
        return "bg-[#EBF4E7] text-[#3E7B28] border-[#D5E8D0]";
      case "Akan Tersedia":
        return "bg-amber-50 text-amber-800 border-amber-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a, button")) return;
    router.push(`/pekerja/${kategoriSlug}/${pekerja.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-[#D5E8D0] shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Image container */}
      <div className="relative w-full aspect-[4/3] bg-surface-container-low overflow-hidden">
        <Image
          src={displayFoto}
          alt={`Foto ${pekerja.nama}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
            pekerja.status === "Akan Tersedia" ? "grayscale opacity-80" : ""
          }`}
        />
        {/* Category & Status Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="bg-[#0B4F42]/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {pekerja.kategori}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border shadow-sm ${getStatusClass()}`}>
            {pekerja.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-serif text-xl font-bold text-[#14201D] group-hover:text-[#0B4F42] transition-colors">
              {pekerja.nama}
            </h3>
            {pekerja.umur && (
              <span className="text-xs text-on-surface-variant font-medium bg-surface-container-high px-2 py-0.5 rounded-md">
                {pekerja.umur} Thn
              </span>
            )}
          </div>

          <p className="text-xs font-sans text-on-surface-variant/80 flex items-center gap-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#0B4F42]" />
            <span>{pekerja.lokasi || "Jakarta & Sekitarnya"}</span>
          </p>

          <div className="flex flex-wrap gap-2 text-xs font-sans text-[#14201D]/80 mb-4">
            <span className="bg-surface-container-low px-2.5 py-1 rounded-md flex items-center gap-1 border border-outline-variant/30">
              <Briefcase className="w-3.5 h-3.5 text-[#0B4F42]" />
              Pengalaman {pekerja.pengalaman} Thn
            </span>
            <span className="bg-[#EBF4E7] text-[#3E7B28] px-2.5 py-1 rounded-md flex items-center gap-1 border border-[#D5E8D0]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3E7B28]" />
              Terverifikasi
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant/70 block">
              Ekspektasi Gaji
            </span>
            <span className="font-sans text-sm font-bold text-[#0B4F42]">
              {formatRupiah(pekerja.gaji)}
            </span>
          </div>
          <Link
            href={`/pekerja/${kategoriSlug}/${pekerja.slug}`}
            className="text-xs font-semibold text-[#0B4F42] hover:text-[#9E232A] transition-colors border-b border-[#0B4F42]/30 hover:border-[#9E232A]"
          >
            Detail Profil &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
