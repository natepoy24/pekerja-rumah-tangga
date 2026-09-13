"use client";

import PekerjaCard, { type PekerjaProps } from "./PekerjaCard";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FeaturedWorkers({ workers = [] }: { workers: PekerjaProps[] }) {
  if (!workers || workers.length === 0) return null;

  return (
    <section className="py-16 bg-surface-container-low/60 border-y border-outline-variant/20 font-sans">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4E7] text-[#3E7B28] text-xs font-semibold mb-3 border border-[#D5E8D0]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kandidat Unggulan Terverifikasi</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#14201D] tracking-tight">
              Pekerja Siap Penempatan Hari Ini
            </h2>
            <p className="text-on-surface-variant text-sm mt-2 max-w-2xl">
              Seluruh kandidat telah melewati verifikasi identitas resmi, cek kesehatan berkala, dan pelatihan standar profesi.
            </p>
          </div>

          <Link
            href="/pekerja"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B4F42] hover:text-[#9E232A] transition-colors group"
          >
            <span>Lihat Semua Katalog Kandidat</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workers.slice(0, 4).map((worker) => (
            <PekerjaCard key={worker.id} pekerja={worker} />
          ))}
        </div>
      </div>
    </section>
  );
}
