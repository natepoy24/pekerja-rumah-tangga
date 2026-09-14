"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { incrementViews } from "@/app/actions";
import { Calendar, Eye, Tag, ZoomIn } from "lucide-react";
import ImageZoomModal from "@/components/ui/ImageZoomModal";

const LexicalEditor = dynamic(() => import("./LexicalEditor"), {
  ssr: false,
  loading: () => (
    <div className="prose lg:prose-lg mx-auto pt-8 text-center text-on-surface-variant font-sans">
      Memuat artikel...
    </div>
  ),
});

interface Artikel {
  id: string | number;
  judul: string;
  konten: string | object;
  gambar_url?: string;
  alt_gambar?: string;
  slug: string;
  published_at?: string;
  created_at?: string;
  views?: number;
  tags?: string;
}

export default function ArticleRenderer({ article }: { article: Artikel }) {
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    incrementViews(article.slug).catch(console.error);
  }, [article.slug]);

  const initialContent =
    typeof article.konten === "object" ? JSON.stringify(article.konten) : article.konten;

  const tagsArray = article.tags
    ? article.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
    : [];

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG") {
      const img = target as HTMLImageElement;
      setZoomImage({
        src: img.src,
        alt: img.alt || article.judul,
      });
    }
  };

  const coverSrc = article.gambar_url || "/asisten-rumah-tangga.webp";

  return (
    <div className="bg-transparent pb-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <article className="bg-white p-6 md:p-12 rounded-3xl border border-[#D5E8D0] shadow-sm">
          <header className="mb-8 text-center">
            {/* TAGS */}
            {tagsArray.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {tagsArray.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1 bg-[#EBF4E7] text-[#3E7B28] text-xs font-semibold rounded-full border border-[#D5E8D0] uppercase tracking-wider flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3 text-[#3E7B28]" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#14201D] leading-tight mb-6">
              {article.judul}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-sans">
              <span className="inline-flex items-center gap-1.5 bg-surface-container-low border border-outline-variant/30 text-on-surface-variant px-4 py-2 rounded-full font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#0B4F42]" />
                {new Date(article.published_at || article.created_at || new Date()).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>

              <span className="inline-flex items-center gap-1.5 bg-[#EBF4E7] border border-[#D5E8D0] text-[#3E7B28] px-4 py-2 rounded-full font-semibold">
                <Eye className="w-3.5 h-3.5 text-[#3E7B28]" />
                {article.views || 0} Kali Dibaca
              </span>
            </div>
          </header>

          {/* Cover image */}
          <div
            onClick={() => setZoomImage({ src: coverSrc, alt: article.alt_gambar || `Cover ${article.judul}` })}
            className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10 bg-surface-container-low border border-outline-variant/20 shadow-sm cursor-pointer group"
            title="Klik untuk Zoom Cover"
          >
            <Image
              src={coverSrc}
              alt={article.alt_gambar || `Cover ${article.judul}`}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="px-4 py-2 rounded-xl bg-black/60 text-white text-xs font-bold shadow-lg flex items-center gap-2 backdrop-blur-sm">
                <ZoomIn className="w-4 h-4 text-emerald-400" />
                <span>Klik untuk Zoom Gambar</span>
              </span>
            </div>
          </div>

          {/* Content Lexical */}
          <div
            onClick={handleContentClick}
            className="prose prose-[#0B4F42] max-w-none font-sans text-on-surface leading-relaxed cursor-pointer"
          >
            <LexicalEditor initialContent={initialContent} editable={false} />
          </div>
        </article>
      </div>

      <ImageZoomModal
        src={zoomImage?.src || null}
        alt={zoomImage?.alt}
        onClose={() => setZoomImage(null)}
      />
    </div>
  );
}

