import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleRenderer from "@/components/ArtikelApp/ArticleRenderer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 0;

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const supabase = await createClient();

  const { data: article } = await supabase
    .from("artikel")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan | PT Jasa Mandiri",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jasamandiri.com";
  const canonicalUrl = `${siteUrl}/artikel/${article.slug}`;

  const title = article.meta_title ? `${article.meta_title} | PT Jasa Mandiri` : `${article.judul} | PT Jasa Mandiri`;
  const description =
    article.meta_description ||
    "Baca artikel edukasi seputar asisten rumah tangga, baby sitter, dan perawat lansia profesional dari PT Jasa Mandiri.";

  const imageUrl = article.gambar_url?.startsWith("http")
    ? article.gambar_url
    : `${siteUrl}${article.gambar_url || "/Image/placeholder.png"}`;

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
      siteName: "PT Jasa Mandiri",
      locale: "id_ID",
      type: "article",
      publishedTime: article.published_at || article.created_at,
      modifiedTime: article.created_at,
      authors: ["PT Jasa Mandiri"],
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
  const supabase = await createClient();

  const { data: article, error } = await supabase
    .from("artikel")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !article) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jasamandiri.com";
  const canonicalUrl = `${siteUrl}/artikel/${article.slug}`;
  const imageUrl = article.gambar_url?.startsWith("http")
    ? article.gambar_url
    : `${siteUrl}${article.gambar_url || "/Image/placeholder.png"}`;

  // JSON-LD Structured Data for Google & AI Answer Engines (AEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.meta_title || article.judul,
    description: article.meta_description || undefined,
    image: [imageUrl],
    datePublished: article.published_at || article.created_at,
    dateModified: article.created_at,
    author: {
      "@type": "Organization",
      name: "PT Jasa Mandiri",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "PT Jasa Mandiri",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/Image/placeholder.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    keywords: [article.focus_keyword, article.secondary_keyword, article.tags].filter(Boolean).join(", "),
  };

  return (
    <main className="min-h-screen bg-[#FAFAF7] font-sans pb-20 pt-28">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
