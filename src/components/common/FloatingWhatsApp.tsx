"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { SITE_CONFIG } from "@/lib/siteConfig";

interface FloatingWhatsAppProps {
  whatsappNumber?: string;
  message?: string;
  companyName?: string;
}

export default function FloatingWhatsApp({
  whatsappNumber,
  message,
  companyName,
}: FloatingWhatsAppProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  // Only show tooltip on non-mobile screens
  const [isMobile, setIsMobile] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Show tooltip after 2.5s — only on desktop
  useEffect(() => {
    if (isMobile) return;
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, [isMobile]);

  // Do not show on admin routes
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
    return null;
  }

  const effectiveCompanyName = companyName || SITE_CONFIG.name;
  const defaultMessage = `Halo ${effectiveCompanyName}, saya ingin berkonsultasi mengenai kebutuhan pekerja rumah tangga (PRT / Baby Sitter / Perawat Lansia).`;
  const finalMessage = message || defaultMessage;

  const finalNumber =
    whatsappNumber ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    SITE_CONFIG.whatsappPrimary ||
    "6285111399962";

  const waUrl = `https://wa.me/${finalNumber}?text=${encodeURIComponent(finalMessage)}`;

  return (
    <aside
      aria-label="Kontak Cepat WhatsApp"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[999] flex flex-col items-end pointer-events-auto select-none"
    >
      {/* Tooltip — ONLY shown on sm+ screens, never on mobile */}
      {!isMobile && showTooltip && !dismissed && (
        <div className="mb-3 bg-white text-[#14201D] px-4 py-3 rounded-2xl shadow-2xl border border-[#D5E8D0] w-60 text-xs font-sans relative flex items-start gap-2">
          <button
            onClick={() => setDismissed(true)}
            aria-label="Tutup pesan bantuan WhatsApp"
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center transition-colors shadow-sm"
          >
            <X className="w-3 h-3" />
          </button>
          <div>
            <p className="font-bold text-[#0B4F42] mb-0.5">Butuh Pekerja Cepat &amp; Terpercaya?</p>
            <p className="text-gray-600 leading-relaxed">
              Konsultasikan kriteria rumah tangga Anda langsung via WhatsApp sekarang.
            </p>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Hubungi Konsultan ${effectiveCompanyName} melalui WhatsApp`}
        className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1da851] text-white p-3 sm:px-4 sm:py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {/* Pulsing online beacon */}
        <span className="relative flex h-3 w-3 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>

        {/* WhatsApp Icon */}
        <div className="relative w-6 h-6 shrink-0 flex items-center justify-center">
          <Image
            src="/whatsapp-svgrepo-com.svg"
            alt="Logo WhatsApp"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
        </div>

        {/* Desktop Text Label */}
        <span className="hidden sm:inline font-sans font-semibold text-sm tracking-tight pr-1 text-white">
          Konsultasi WhatsApp
        </span>
      </a>
    </aside>
  );
}
