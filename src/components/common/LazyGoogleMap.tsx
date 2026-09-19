"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, MousePointerClick } from "lucide-react";

interface LazyGoogleMapProps {
  embedUrl: string;
  staticImageSrc?: string;
  locationName?: string;
  className?: string;
  priority?: boolean;
  address?: string;
}

export default function LazyGoogleMap({
  embedUrl,
  staticImageSrc = "/maps-placeholder.webp",
  locationName = "Lokasi Kantor PT Jasa Mandiri",
  className = "w-full h-full min-h-[380px] lg:min-h-[460px]",
  priority = true,
  address = "Jl. Gunung Balong III No.78, RT.11/RW.4, Lb. Bulus, Kec. Cilandak, Kota Jakarta Selatan, DKI Jakarta 12440",
}: LazyGoogleMapProps) {
  const [isInteractive, setIsInteractive] = useState(false);

  if (isInteractive) {
    return (
      <div className={`relative rounded-2xl overflow-hidden border border-[#D5E8D0] shadow-sm bg-[#FAFAF7] ${className}`}>
        <iframe
          src={embedUrl}
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={locationName}
          className="absolute inset-0 w-full h-full border-0 filter saturate-[0.85] contrast-[1.05]"
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsInteractive(true)}
      className={`relative rounded-2xl overflow-hidden border border-[#D5E8D0] shadow-sm cursor-pointer group bg-[#FAFAF7] select-none ${className}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsInteractive(true);
        }
      }}
      aria-label={`Buka peta interaktif ${locationName}`}
    >
      {/* Gambar Statis Placeholder */}
      <Image
        src={staticImageSrc}
        alt={`Peta statis ${locationName}`}
        fill
        priority={priority}
        loading="eager"
        fetchPriority="high"
        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        sizes="(max-width: 768px) 100vw, 800px"
        quality={60}
      />

      {/* Overlay Gelap Halus dengan Tonal Pine Blend */}
      <div className="absolute inset-0 bg-[#0B4F42]/15 group-hover:bg-[#0B4F42]/25 transition-colors duration-300" />

      {/* Badge Informasi Lokasi & Alamat Lengkap (Pojok Kiri Atas) */}
      <div className="absolute top-4 left-4 right-4 sm:right-auto z-10 flex flex-col items-start gap-1.5 max-w-md pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D5E8D0] text-[#0B4F42] text-xs font-semibold shadow-xs">
          <MapPin className="w-3.5 h-3.5 text-[#9E232A] shrink-0" />
          <span>Kantor Operasional Jakarta Selatan</span>
        </span>
        <div className="bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#D5E8D0] shadow-xs text-left">
          <p className="font-sans text-[11px] sm:text-xs text-[#404945] leading-relaxed">
            {address}
          </p>
        </div>
      </div>

      {/* Tombol Aksi di Tengah dengan Glassmorphism sesuai DESIGN.md */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-60 text-center z-10">
        <div className="glass-surface px-6 py-3.5 rounded-2xl border border-[#D5E8D0] shadow-ambient flex items-center gap-3 text-[#0B4F42] group-hover:scale-105 group-active:scale-95 transition-all duration-300 bg-white/85 backdrop-blur-md">
          <div className="w-8 h-8 rounded-full bg-[#EBF4E7] flex items-center justify-center text-[#9E232A] shrink-0 border border-[#D5E8D0]">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="font-sans text-xs sm:text-sm font-bold text-[#0B4F42] block">
              Klik untuk Memuat Peta Interaktif
            </span>
          </div>
          <MousePointerClick className="w-4 h-4 text-[#3E7B28] ml-1 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}
