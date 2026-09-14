import { createPublicClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleRenderer from "@/components/ArtikelApp/ArticleRenderer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo/schemaGenerator";
import { SITE_CONFIG } from "@/lib/siteConfig";

export const revalidate = 3600;

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const supabase = createPublicClient();

  const { data: article } = await supabase
    .from("artikel")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!article) {
    return {
      title: `Artikel Tidak Ditemukan | ${SITE_CONFIG.name}`,
    };
  }

  const siteUrl = SITE_CONFIG.url;
  const canonicalUrl = `${siteUrl}/artikel/${article.slug}`;

  const title = article.meta_title ? `${article.meta_title} | ${SITE_CONFIG.name}` : `${article.judul} | ${SITE_CONFIG.name}`;
  const description =
    article.meta_description ||
    `Baca artikel edukasi seputar ${article.judul} dari ${SITE_CONFIG.name}.`;

  const imageUrl = article.gambar_url?.startsWith("http")
    ? article.gambar_url
    : `${siteUrl}${article.gambar_url || "/asisten-rumah-tangga.webp"}`;

  const imageAlt = article.alt_gambar || article.judul;

  const keywords = [
    article.focus_keyword,
    ...(article.secondary_keyword ? article.secondary_keyword.split(",").map((s: string) => s.trim()) : []),
    ...(article.tags ? article.tags.split(",").map((t: string) => t.trim()) : []),
  ].filter(Boolean);

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.meta_title || article.judul,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: "id_ID",
      type: "article",
      publishedTime: article.published_at || article.created_at,
      modifiedTime: article.created_at,
      authors: [SITE_CONFIG.name],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.meta_title || article.judul,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ArtikelDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const supabase = createPublicClient();

  const { data: article, error } = await supabase
    .from("artikel")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !article) {
    notFound();
  }

  const articleSchema = generateArticleSchema(article);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "/" },
    { name: "Artikel", url: "/artikel" },
    { name: article.judul, url: `/artikel/${article.slug}` },
  ]);

  return (
    <main className="min-h-screen bg-[#FAFAF7] font-sans pb-20 pt-28">
      <JsonLd schema={[articleSchema, breadcrumbSchema]} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-6">
        <Link
          href="/artikel"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B4F42] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Artikel</span>
        </Link>
      </div>

      <ArticleRenderer article={article} />
    </main>
  );
}

