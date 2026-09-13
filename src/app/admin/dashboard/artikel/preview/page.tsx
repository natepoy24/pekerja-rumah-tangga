"use client";

import { useEffect, useState } from "react";
import ArticleRenderer from "@/components/ArtikelApp/ArticleRenderer";

export default function ArticlePreviewPage() {
  const [previewArticle, setPreviewArticle] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("articlePreview");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setPreviewArticle({
          id: "preview",
          judul: parsed.judul,
          konten: parsed.konten,
          gambar_url: parsed.gambarUrl,
          slug: "preview-slug",
          published_at: new Date().toISOString(),
          views: 1,
          tags: "Pratinjau Draft",
        });
      } catch (err) {
        console.error("Gagal membaca preview artikel:", err);
      }
    }
  }, []);

  if (!previewArticle) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans text-on-surface-variant bg-[#FAFAF7]">
        Memuat Pratinjau Artikel...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] font-sans pb-16 pt-28">
      <div className="bg-amber-50 border-b border-amber-200 py-3 text-center text-xs font-semibold text-amber-800 sticky top-20 z-40">
        Mode Pratinjau Draft Artikel — Konten ini belum secara resmi dipublikasikan di database.
      </div>
      <ArticleRenderer article={previewArticle} />
    </div>
  );
}
