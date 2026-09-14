import type { Metadata } from "next";
import { createPublicClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, Tag, BookOpen, ArrowRight } from "lucide-react";
import { getPageSetting, getCompanyIdentity } from "@/lib/settings";
import dynamic from "next/dynamic";
import JsonLd from "@/components/seo/JsonLd";
import { generateCollectionPageSchema, generateBreadcrumbSchema } from "@/lib/seo/schemaGenerator";
import { SITE_CONFIG } from "@/lib/siteConfig";

const FaqSection = dynamic(() => import("@/components/common/FaqSection"), {
  loading: () => <div className="h-64 animate-pulse bg-surface-container rounded-2xl" />,
});

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [setting, company] = await Promise.all([
    getPageSetting("page_artikel"),
    getCompanyIdentity(),
  ]);

  const title = setting.meta_title || `Artikel & Edukasi Rumah Tangga | ${company.nama_perusahaan || SITE_CONFIG.name}`;
  const description = setting.meta_description || "Panduan memilih ART, tips pengasuhan anak balita, dan edukasi perawatan lansia.";
  const ogImage = setting.og_image || "/asisten-rumah-tangga.webp";
  const canonicalUrl = `${SITE_CONFIG.url}/artikel`;

  return {
    title,
    description,
    keywords: setting.keywords ? setting.keywords.split(",").map((k) => k.trim()) : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: company.nama_perusahaan || SITE_CONFIG.name,
      locale: "id_ID",
      type: "website",
      images: [{ url: ogImage, alt: title }],
    },
  };
}

export default async function ArtikelPublicPage() {
  const supabase = createPublicClient();
  const [pageSetting, company, articlesRes] = await Promise.all([
    getPageSetting("page_artikel"),
    getCompanyIdentity(),
    supabase
      .from("artikel")
      .select("*")
      .eq("kategori", true)
      .order("created_at", { ascending: false }),
  ]);

  const articles = articlesRes.data || [];

  const featuredArticle = articles[0];
  const regularArticles = articles.slice(1);

  const collectionSchema = generateCollectionPageSchema(
    "Pusat Edukasi & Informasi Rumah Tangga",
    "Artikel terpercaya mengenai tips memilih ART, perawatan lansia, tumbuh kembang anak, dan aturan hak-kewajiban ketenagakerjaan.",
    "/artikel"
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "/" },
    { name: "Artikel", url: "/artikel" },
  ]);

  return (
    <main className="min-h-screen bg-[#FAFAF7] font-sans pb-20 pt-28">
      <JsonLd schema={[collectionSchema, breadcrumbSchema]} />
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#3E7B28] bg-[#EBF4E7] px-4 py-1.5 rounded-full border border-[#D5E8D0] inline-block">
            Pusat Edukasi & Informasi
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#14201D] leading-tight">
            {pageSetting.hero_title || "Panduan Mengelola Rumah Tangga & Asisten Profesional"}
          </h1>
          <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed">
            {pageSetting.hero_subtitle || "Artikel terpercaya mengenai tips memilih ART, perawatan lansia, tumbuh kembang anak, dan aturan hak-kewajiban ketenagakerjaan."}
          </p>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="bg-white rounded-3xl border border-[#D5E8D0] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 hover:shadow-md transition-shadow">
            <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-surface-container-low">
              <Image
                src={featuredArticle.gambar_url || "/Image/placeholder.png"}
                alt={featuredArticle.judul}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 bg-[#EBF4E7] text-[#3E7B28] text-xs font-semibold px-3.5 py-1 rounded-full border border-[#D5E8D0]">
                  <BookOpen className="w-3.5 h-3.5" />
                  Artikel Utama Terpopuler
                </span>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14201D] leading-snug hover:text-[#0B4F42] transition-colors">
                  <Link href={`/artikel/${featuredArticle.slug}`}>{featuredArticle.judul}</Link>
                </h2>

                <div className="flex items-center gap-4 text-xs text-on-surface-variant/80">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#0B4F42]" />
                    {new Date(featuredArticle.published_at || featuredArticle.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-[#0B4F42]" />
                    {featuredArticle.views || 0} dibaca
                  </span>
                </div>
              </div>

              <Link
                href={`/artikel/${featuredArticle.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B4F42] hover:text-[#9E232A] transition-colors group"
              >
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        {regularArticles.length > 0 ? (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#14201D]">Artikel Edukasi Lainnya</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-2xl border border-[#D5E8D0] shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="relative w-full aspect-[16/10] bg-surface-container-low overflow-hidden">
                    <Image
                      src={article.gambar_url || "/Image/placeholder.png"}
                      alt={article.judul}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-on-surface-variant/80 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#0B4F42]" />
                          {new Date(article.published_at || article.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-[#0B4F42]" />
                          {article.views || 0} views
                        </span>
                      </div>

                      <h4 className="font-serif text-xl font-bold text-[#14201D] group-hover:text-[#0B4F42] transition-colors line-clamp-2">
                        <Link href={`/artikel/${article.slug}`}>{article.judul}</Link>
                      </h4>
                    </div>

                    <Link
                      href={`/artikel/${article.slug}`}
                      className="text-xs font-semibold text-[#0B4F42] hover:text-[#9E232A] transition-colors inline-flex items-center gap-1"
                    >
                      <span>Baca Artikel</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : !featuredArticle ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#D5E8D0] shadow-sm space-y-3">
            <h3 className="font-serif text-2xl font-bold text-[#14201D]">Belum Ada Artikel Diterbitkan</h3>
            <p className="text-sm text-on-surface-variant max-w-md mx-auto">
              Artikel edukasi dan panduan terbaru akan segera diunggah oleh tim kami. Silakan kembali lagi nanti.
            </p>
          </div>
        ) : null}

        {/* FAQ Section (CMS Driven) */}
        <FaqSection items={pageSetting?.faqs} whatsappNumber={company.nomor_whatsapp} />
      </div>
    </main>
  );
}
