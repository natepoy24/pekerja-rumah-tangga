"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle, Sparkles } from "lucide-react";
import { FaqItem } from "@/lib/settings";

interface FaqSectionProps {
  items?: FaqItem[];
  title?: string;
  subtitle?: string;
  whatsappNumber?: string;
}

export default function FaqSection({
  items = [],
  title = "Pertanyaan yang Sering Diajukan (FAQ)",
  subtitle = "Temukan jawaban cepat untuk pertanyaan umum mengenai kejelasan legalitas, prosedur garansi penempatan, dan standar seleksi pekerja di PT Jasa Mandiri.",
  whatsappNumber = "6285111399962",
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Structured Data (JSON-LD) for SEO / AEO Answer Surfaces
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Halo PT Jasa Mandiri, saya memiliki pertanyaan seputar penyaluran pekerja rumah tangga."
  )}`;

  return (
    <section className="py-16 md:py-24 bg-[#FAFAF7] relative overflow-hidden font-sans border-t border-outline-variant/20">
      {/* JSON-LD for SEO/AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Decorative background blobs */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-[#EBF4E7]/60 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4E7] border border-[#D5E8D0] text-[#0B4F42] text-xs font-bold uppercase tracking-widest shadow-xs">
            <HelpCircle className="w-4 h-4 text-[#0B4F42]" />
            <span>Pusat Bantuan & Edukasi</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-4xl font-bold text-[#14201D] tracking-tight">
            {title}
          </h2>

          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white border-[#0B4F42]/30 shadow-md shadow-[#0B4F42]/5 ring-1 ring-[#0B4F42]/20"
                    : "bg-white/80 hover:bg-white border-[#D5E8D0] shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-[#14201D] focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3 text-base sm:text-lg font-serif">
                    <span className="w-7 h-7 rounded-xl bg-[#EBF4E7] text-[#0B4F42] text-xs font-bold flex items-center justify-center shrink-0 border border-[#D5E8D0]">
                      0{idx + 1}
                    </span>
                    <span className="text-[#14201D] font-bold leading-snug">
                      {item.question}
                    </span>
                  </span>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-[#0B4F42] text-white rotate-180"
                        : "bg-[#EBF4E7] text-[#0B4F42]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-on-surface-variant/90 leading-relaxed border-t border-outline-variant/10 pt-4 animate-in fade-in duration-200">
                    <p className="whitespace-pre-line pl-10 border-l-2 border-[#0B4F42]/30">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Callout / WhatsApp CTA */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B4F42] to-[#155100] text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                Layanan Konsultasi Bebas Biaya
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Masih Memiliki Pertanyaan Lain?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
              Tim Customer Service PT Jasa Mandiri siap membantu Anda menjelaskan prosedur, pilihan kandidat, dan rincian garansi secara ramah.
            </p>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-[#00221a] font-bold text-xs sm:text-sm inline-flex items-center gap-2.5 transition-all shadow-md hover:scale-105 active:scale-95 shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-[#00221a]" />
            <span>Tanya Tim via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
