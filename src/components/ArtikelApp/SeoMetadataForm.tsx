"use client";

import { useState, useEffect } from "react";
import slugify from "slugify";
import {
  Globe,
  Search,
  Share2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  KeyRound,
  ExternalLink,
  Image as ImageIcon,
  Wand2,
  RotateCcw,
} from "lucide-react";

export interface SeoData {
  slug?: string;
  alt_gambar?: string;
  meta_title?: string;
  meta_description?: string;
  focus_keyword?: string;
  secondary_keyword?: string;
}

interface SeoMetadataFormProps {
  initialData?: SeoData;
  titleValue?: string;
  coverImageSrc?: string | null;
  getContent?: () => string;
}

const INDONESIAN_STOPWORDS = new Set([
  "dan", "yang", "di", "ke", "dari", "ini", "itu", "untuk", "pada", "adalah",
  "sebagai", "dengan", "oleh", "dalam", "bisa", "akan", "juga", "atau", "karena",
  "lebih", "agar", "saya", "anda", "kami", "kita", "mereka", "dia", "tak", "tidak",
  "ada", "sudah", "belum", "serta", "saat", "bila", "jika", "bagi", "secara", "tentang",
  "hal", "cara", "sangat", "harus", "dapat", "seperti", "yaitu", "yakni", "mana", "apa"
]);

function extractPlainText(jsonOrStr: string): string {
  if (!jsonOrStr) return "";
  try {
    const parsed = JSON.parse(jsonOrStr);
    let textResult = "";

    function traverse(node: any) {
      if (!node) return;
      if (node.text && typeof node.text === "string") {
        textResult += node.text + " ";
      }
      if (Array.isArray(node.children)) {
        for (const child of node.children) {
          traverse(child);
        }
      }
    }

    if (parsed.root) {
      traverse(parsed.root);
    } else {
      traverse(parsed);
    }

    return textResult.replace(/\s+/g, " ").trim();
  } catch {
    return jsonOrStr
      .replace(/<[^>]*>?/gm, "")
      .replace(/[{}[\]"\\]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
}

export default function SeoMetadataForm({
  initialData,
  titleValue = "",
  coverImageSrc,
  getContent,
}: SeoMetadataFormProps) {
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(Boolean(initialData?.slug));
  const [altGambar, setAltGambar] = useState(initialData?.alt_gambar || "");
  const [metaTitle, setMetaTitle] = useState(initialData?.meta_title || "");
  const [metaDescription, setMetaDescription] = useState(initialData?.meta_description || "");
  const [focusKeyword, setFocusKeyword] = useState(initialData?.focus_keyword || "");
  const [secondaryKeyword, setSecondaryKeyword] = useState(initialData?.secondary_keyword || "");
  const [previewTab, setPreviewTab] = useState<"google" | "social">("google");
  const [generateSuccessNotice, setGenerateSuccessNotice] = useState(false);

  // Auto-sync slug from title if user hasn't typed custom slug
  useEffect(() => {
    if (!isSlugManuallyEdited && titleValue) {
      setSlug(slugify(titleValue, { lower: true, strict: true }));
    }
  }, [titleValue, isSlugManuallyEdited]);

  // Length indicators
  const metaTitleLength = metaTitle.length;
  const metaDescLength = metaDescription.length;

  const getTitleStatus = () => {
    if (metaTitleLength === 0) return { text: "Kosong (menggunakan judul utama)", color: "text-slate-400" };
    if (metaTitleLength < 40) return { text: `${metaTitleLength}/60 karakter (terlalu pendek)`, color: "text-amber-600" };
    if (metaTitleLength <= 65) return { text: `${metaTitleLength}/60 karakter (panjang ideal)`, color: "text-emerald-600" };
    return { text: `${metaTitleLength}/60 karakter (terlalu panjang, mungkin terpotong)`, color: "text-rose-600" };
  };

  const getDescStatus = () => {
    if (metaDescLength === 0) return { text: "Kosong (cuplikan otomatis dari konten)", color: "text-slate-400" };
    if (metaDescLength < 120) return { text: `${metaDescLength}/160 karakter (terlalu pendek)`, color: "text-amber-600" };
    if (metaDescLength <= 165) return { text: `${metaDescLength}/160 karakter (panjang ideal)`, color: "text-emerald-600" };
    return { text: `${metaDescLength}/160 karakter (terlalu panjang, mungkin terpotong)`, color: "text-rose-600" };
  };

  const currentEffectiveTitle = metaTitle || titleValue || "Judul Artikel Edukasi PT Jasa Mandiri";
  const currentEffectiveDesc =
    metaDescription ||
    "Panduan komprehensif dari PT Jasa Mandiri mengenai layanan penyaluran tenaga kerja rumah tangga resmi dan bergaransi.";
  const effectiveSlug = slug || "judul-artikel";

  // Pure Client-Side Auto Generator (No External API / No AI)
  const handleAutoGenerate = () => {
    const rawContent = getContent ? getContent() : "";
    const cleanText = extractPlainText(rawContent);

    // 1. Slug
    if (titleValue) {
      setSlug(slugify(titleValue, { lower: true, strict: true }));
      setIsSlugManuallyEdited(true);
    }

    // 2. Meta Title
    if (titleValue) {
      if (titleValue.length <= 48) {
        setMetaTitle(`${titleValue} | Jasa Mandiri`);
      } else {
        setMetaTitle(titleValue.slice(0, 60).trim());
      }
    }

    // 3. Meta Description (from content text or title fallback)
    if (cleanText && cleanText.length > 30) {
      let desc = cleanText;
      if (desc.length > 155) {
        const cutoff = desc.slice(0, 155);
        const lastSpace = cutoff.lastIndexOf(" ");
        desc = (lastSpace > 100 ? cutoff.slice(0, lastSpace) : cutoff).trim() + "...";
      }
      setMetaDescription(desc);
    } else if (titleValue) {
      setMetaDescription(
        `Pelajari panduan lengkap mengenai ${titleValue.toLowerCase()} dari PT Jasa Mandiri, penyalur resmi tenaga kerja rumah tangga bergaransi.`
      );
    }

    // 4. Alt Text Gambar
    if (titleValue) {
      setAltGambar(`Ilustrasi ${titleValue.toLowerCase()}`);
    }

    // 5. Focus Keyword & Secondary Keywords from Title & Content
    const words = (titleValue + " " + cleanText.slice(0, 300))
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !INDONESIAN_STOPWORDS.has(w));

    // Word frequency count
    const wordFreq: Record<string, number> = {};
    for (const w of words) {
      wordFreq[w] = (wordFreq[w] || 0) + 1;
    }

    const sortedWords = Object.keys(wordFreq).sort((a, b) => wordFreq[b] - wordFreq[a]);

    // Construct focus keyword (top 2 words or main title phrase)
    if (sortedWords.length >= 2) {
      setFocusKeyword(`${sortedWords[0]} ${sortedWords[1]}`);
    } else if (sortedWords.length === 1) {
      setFocusKeyword(sortedWords[0]);
    } else if (titleValue) {
      setFocusKeyword(titleValue.toLowerCase().slice(0, 30));
    }

    // Secondary keywords (next 3-4 frequent words/phrases)
    if (sortedWords.length > 2) {
      const secondaryList = sortedWords.slice(2, 6);
      setSecondaryKeyword(secondaryList.join(", "));
    }

    // Feedback notification
    setGenerateSuccessNotice(true);
    setTimeout(() => setGenerateSuccessNotice(false), 3500);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D5E8D0] shadow-sm space-y-8 font-sans">
      {/* Header with Title & Auto-Generate Button */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-outline-variant/20 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF4E7] flex items-center justify-center text-[#3E7B28] shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#14201D]">
              Pengaturan SEO & OpenGraph Metadata
            </h3>
            <p className="text-xs text-on-surface-variant">
              Kustomisasi tampilan artikel di Google Search, WhatsApp, dan Media Sosial.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* AUTO-GENERATE BUTTON (100% Client-Side, No API / AI needed) */}
          <button
            type="button"
            onClick={handleAutoGenerate}
            className="px-4 py-2.5 rounded-xl bg-[#EBF4E7] hover:bg-[#D5E8D0] text-[#0B4F42] border border-[#D5E8D0] text-xs font-bold transition-all shadow-xs flex items-center gap-2 active:scale-95 cursor-pointer"
            title="Ekstrak dan buat otomatis slug, meta title, deskripsi, alt gambar, dan keyword dari judul & isi artikel"
          >
            <Wand2 className="w-4 h-4 text-[#3E7B28]" />
            <span>Generate Otomatis dari Konten</span>
          </button>

          {/* Preview switcher */}
          <div className="flex items-center bg-surface-container-low p-1 rounded-xl border border-outline-variant/30 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setPreviewTab("google")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                previewTab === "google"
                  ? "bg-white text-[#0B4F42] shadow-xs font-bold"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Google SERP</span>
            </button>
            <button
              type="button"
              onClick={() => setPreviewTab("social")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                previewTab === "social"
                  ? "bg-white text-[#0B4F42] shadow-xs font-bold"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Social / WA</span>
            </button>
          </div>
        </div>
      </div>

      {/* GENERATE SUCCESS TOAST NOTICE */}
      {generateSuccessNotice && (
        <div className="bg-[#EBF4E7] border border-[#3E7B28]/40 text-[#0B4F42] px-4 py-3 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#3E7B28] shrink-0" />
          <span>
            Metadata SEO berhasil di-generate otomatis dari judul dan isi artikel! Anda tetap dapat mengedit atau menyesuaikan setiap kolom di bawah ini.
          </span>
        </div>
      )}

      {/* LIVE PREVIEW BOX */}
      <div className="bg-[#F8F9FA] p-5 rounded-2xl border border-slate-200/80">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#3E7B28]" />
            Pratinjau Hasil Realtime ({previewTab === "google" ? "Google Search Result" : "OpenGraph Card"})
          </span>
          <span className="text-[11px] text-slate-400">Live Preview</span>
        </div>

        {previewTab === "google" ? (
          /* Google SERP Snippet Preview */
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs max-w-2xl space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div className="w-5 h-5 rounded-full bg-[#0B4F42] text-white flex items-center justify-center text-[10px] font-bold">
                JM
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800 text-xs leading-none">
                  PT Jasa Mandiri
                </span>
                <span className="text-[11px] text-slate-500 truncate max-w-sm sm:max-w-md">
                  https://jasamandiri.com › artikel › {effectiveSlug}
                </span>
              </div>
            </div>
            <h4 className="text-base sm:text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug truncate">
              {currentEffectiveTitle}
            </h4>
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {currentEffectiveDesc}
            </p>
          </div>
        ) : (
          /* Social Media / OpenGraph Preview Card */
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs max-w-md">
            <div className="relative w-full aspect-[1.91/1] bg-slate-100 flex items-center justify-center overflow-hidden">
              {coverImageSrc ? (
                <img
                  src={coverImageSrc}
                  alt={altGambar || "Cover Artikel"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-slate-400 gap-1">
                  <ImageIcon className="w-8 h-8 stroke-[1.5]" />
                  <span className="text-xs">Gambar Cover Artikel (1200 x 630)</span>
                </div>
              )}
            </div>
            <div className="p-3.5 space-y-1 bg-slate-50 border-t border-slate-100">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                jasamandiri.com
              </span>
              <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                {currentEffectiveTitle}
              </h4>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {currentEffectiveDesc}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* INPUT FORM FIELDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SLUG-URL INPUT */}
        <div className="md:col-span-2 space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Slug URL / Permalink *
            </label>
            {!isSlugManuallyEdited && titleValue && (
              <span className="text-[11px] text-[#3E7B28] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Otomatis sinkron dari judul
              </span>
            )}
          </div>
          <div className="flex items-center rounded-xl bg-surface-container-low border border-outline-variant/50 focus-within:ring-2 focus-within:ring-[#0B4F42]/20 overflow-hidden">
            <span className="px-3 text-xs text-slate-400 font-mono select-none bg-slate-100 py-3 border-r border-outline-variant/30 shrink-0">
              /artikel/
            </span>
            <input
              type="text"
              name="slug"
              value={slug}
              onChange={(e) => {
                setIsSlugManuallyEdited(true);
                setSlug(slugify(e.target.value, { lower: true, strict: true }));
              }}
              placeholder="contoh: tips-memilih-asisten-rumah-tangga"
              className="w-full bg-transparent px-3 py-2.5 text-xs sm:text-sm font-mono text-on-surface focus:outline-none"
            />
            {isSlugManuallyEdited && (
              <button
                type="button"
                onClick={() => {
                  setIsSlugManuallyEdited(false);
                  if (titleValue) setSlug(slugify(titleValue, { lower: true, strict: true }));
                }}
                className="text-[11px] text-[#0B4F42] hover:underline font-semibold px-3 shrink-0"
              >
                Reset
              </button>
            )}
          </div>
          <p className="text-[11px] text-on-surface-variant/70">
            Gunakan huruf kecil dan tanda hubung (-). Contoh: <code className="bg-slate-100 px-1 rounded text-slate-700">gaji-art-2026</code>
          </p>
        </div>

        {/* ALT GAMBAR COVER */}
        <div className="md:col-span-2 space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Alt Text Gambar Cover (Image Alt Text)
            </label>
            <span className="text-[11px] text-slate-400">Penting untuk Google Image SEO</span>
          </div>
          <div className="relative">
            <input
              type="text"
              name="alt_gambar"
              value={altGambar}
              onChange={(e) => setAltGambar(e.target.value)}
              placeholder="Deskripsikan gambar cover secara spesifik, contoh: Pekerja rumah tangga profesional membersihkan dapur modern"
              className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 font-medium"
            />
          </div>
          <p className="text-[11px] text-on-surface-variant/70">
            Membantu Google memahami konteks gambar dan memudahkan pembaca tunanetra via screen reader.
          </p>
        </div>

        {/* FOCUS KEYWORD */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-[#0B4F42]" />
            Focus Keyword (Kata Kunci Utama)
          </label>
          <input
            type="text"
            name="focus_keyword"
            value={focusKeyword}
            onChange={(e) => setFocusKeyword(e.target.value)}
            placeholder="Contoh: penyalur asisten rumah tangga resmi"
            className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 font-medium"
          />
          <p className="text-[11px] text-on-surface-variant/70">
            Kata kunci target yang ingin Anda menangkan di halaman 1 pencarian Google.
          </p>
        </div>

        {/* SECONDARY KEYWORDS */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            Secondary Keywords (Kata Kunci Turunan / LSI)
          </label>
          <input
            type="text"
            name="secondary_keyword"
            value={secondaryKeyword}
            onChange={(e) => setSecondaryKeyword(e.target.value)}
            placeholder="Pisahkan dengan koma: tarif art harian, gaji prt menginap, yayasan art terpercaya"
            className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 font-medium"
          />
          <p className="text-[11px] text-on-surface-variant/70">
            Kata kunci pendukung yang relevan untuk memperkuat relevansi topik artikel (AEO & semantic SEO).
          </p>
        </div>

        {/* META TITLE */}
        <div className="md:col-span-2 space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Meta Title (Judul Cuplikan Pencarian)
            </label>
            <span className={`text-[11px] font-semibold ${getTitleStatus().color}`}>
              {getTitleStatus().text}
            </span>
          </div>
          <div className="relative">
            <input
              type="text"
              name="meta_title"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder={titleValue || "Masukkan meta title yang memikat klik pembaca..."}
              maxLength={75}
              className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 font-medium"
            />
          </div>
          <p className="text-[11px] text-on-surface-variant/70">
            Kosongkan jika ingin menggunakan judul artikel asli secara otomatis.
          </p>
        </div>

        {/* META DESCRIPTION */}
        <div className="md:col-span-2 space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Meta Description (Deskripsi Cuplikan SERP)
            </label>
            <span className={`text-[11px] font-semibold ${getDescStatus().color}`}>
              {getDescStatus().text}
            </span>
          </div>
          <textarea
            name="meta_description"
            rows={3}
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            placeholder="Tuliskan ringkasan singkat 1-2 kalimat yang menarik, mengandung kata kunci utama, dan memiliki ajakan bertindak (CTA)..."
            maxLength={200}
            className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl p-3.5 text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 font-medium resize-none leading-relaxed"
          ></textarea>
          <p className="text-[11px] text-on-surface-variant/70">
            Cuplikan ini akan muncul di hasil pencarian Google di bawah judul serta saat dibagikan ke WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}
