"use client";

import { useEffect, useState } from "react";
import { ZoomIn, ZoomOut, X, RefreshCw, Eye } from "lucide-react";

interface ImageZoomModalProps {
  src: string | null;
  alt?: string;
  onClose: () => void;
}

export default function ImageZoomModal({ src, alt = "Pratinjau Gambar", onClose }: ImageZoomModalProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "+" || e.key === "=") {
        setScale((prev) => Math.min(prev + 0.25, 3.5));
      } else if (e.key === "-") {
        setScale((prev) => Math.max(prev - 0.25, 0.5));
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!src) return null;

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.3, 3.5));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.3, 0.5));
  const handleReset = () => setScale(1);

  const toggleZoom = () => {
    setScale((prev) => (prev === 1 ? 1.8 : 1));
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#14201D]/90 backdrop-blur-lg flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200 font-sans"
      onClick={onClose}
    >
      {/* Header bar styled according to DESIGN.md glassmorphism */}
      <div
        className="w-full max-w-5xl flex items-center justify-between z-10 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-[#D5E8D0] shadow-xl text-[#14201D]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 overflow-hidden min-w-0 pr-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3E7B28] bg-[#EBF4E7] px-3 py-1 rounded-full border border-[#D5E8D0] shrink-0 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-[#3E7B28]" />
            Pratinjau Foto
          </span>
          <span className="font-serif font-bold text-sm sm:text-base text-[#14201D] truncate">
            {alt}
          </span>
        </div>

        {/* Control buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={handleZoomOut}
            title="Zoom Out (-)"
            className="p-2 rounded-xl bg-[#FAFAF7] hover:bg-[#EBF4E7] text-[#0B4F42] border border-[#D5E8D0] transition-colors shadow-sm active:scale-95"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-bold px-2.5 py-1.5 bg-[#FAFAF7] rounded-xl border border-[#D5E8D0] text-[#0B4F42] min-w-[50px] text-center select-none shadow-inner">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            title="Zoom In (+)"
            className="p-2 rounded-xl bg-[#FAFAF7] hover:bg-[#EBF4E7] text-[#0B4F42] border border-[#D5E8D0] transition-colors shadow-sm active:scale-95"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-[#D5E8D0] mx-1" />
          <button
            type="button"
            onClick={handleReset}
            title="Reset Zoom"
            className="p-2 rounded-xl bg-[#FAFAF7] hover:bg-[#EBF4E7] text-[#0B4F42] border border-[#D5E8D0] transition-colors shadow-sm active:scale-95 flex items-center gap-1 text-xs font-semibold px-3"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            title="Tutup (Esc)"
            className="p-2.5 rounded-xl bg-[#9E232A] hover:bg-[#7e1b21] text-white transition-colors ml-1.5 shadow-sm active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div
        className="flex-1 w-full flex items-center justify-center overflow-auto p-4 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative max-w-full max-h-full transition-transform duration-200 ease-out cursor-zoom-in"
          style={{
            transform: `scale(${scale})`,
          }}
          onClick={toggleZoom}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-[85vw] max-h-[72vh] object-contain rounded-2xl shadow-2xl border border-[#D5E8D0]/40 bg-white/5"
          />
        </div>
      </div>

      {/* Footer Hint */}
      <div
        className="text-xs font-medium text-[#14201D] font-sans text-center bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#D5E8D0] shadow-lg flex items-center gap-2 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="w-2 h-2 rounded-full bg-[#3E7B28] animate-pulse" />
        <span>Klik gambar untuk toggle zoom 100% / 180% &nbsp;|&nbsp; Tekan <kbd className="bg-[#EBF4E7] text-[#0B4F42] px-1.5 py-0.5 rounded text-[11px] font-mono font-bold border border-[#D5E8D0]">ESC</kbd> untuk menutup</span>
      </div>
    </div>
  );
}
