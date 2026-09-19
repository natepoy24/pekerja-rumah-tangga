"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import ImageZoomModal from "@/components/ui/ImageZoomModal";

interface PekerjaProfilePhotoProps {
  src: string;
  nama: string;
  kategori: string;
}

export default function PekerjaProfilePhoto({ src, nama, kategori }: PekerjaProfilePhotoProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container-low shadow-sm cursor-pointer group"
        title={`Klik untuk Zoom Foto ${nama}`}
      >
        <Image
          src={src}
          alt={`Foto ${nama}`}
          fill
          priority={true}
          fetchPriority="high"
          loading="eager"
          sizes="(max-width: 1024px) 100vw, 450px"
          quality={65}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <span className="absolute top-4 left-4 bg-[#0B4F42]/90 backdrop-blur-md text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm z-10">
          {kategori}
        </span>

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <span className="px-4 py-2 rounded-xl bg-black/60 text-white text-xs font-bold shadow-lg flex items-center gap-2 backdrop-blur-sm">
            <ZoomIn className="w-4 h-4 text-emerald-400" />
            <span>Klik untuk Zoom Foto</span>
          </span>
        </div>
      </div>

      <ImageZoomModal
        src={isOpen ? src : null}
        alt={`Foto ${nama} (${kategori})`}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
