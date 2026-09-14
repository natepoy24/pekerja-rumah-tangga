import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { getJobs } from "@/lib/jobs";
import { createPublicClient } from "@/lib/supabase/server";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/layanan`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/layanan/art`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/layanan/baby-sitter`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/layanan/perawat-lansia`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lowongan-kerja`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pekerja`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/artikel`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tentang-kami`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic jobs
  let jobRoutes: MetadataRoute.Sitemap = [];
  try {
    const jobs = await getJobs();
    jobRoutes = jobs.map((job) => ({
      url: `${baseUrl}/lowongan-kerja/${job.slug}`,
      lastModified: job.created_at ? new Date(job.created_at) : now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (e) {
    console.error("Sitemap job fetch error:", e);
  }

  // Dynamic articles & workers from Supabase
  let articleRoutes: MetadataRoute.Sitemap = [];
  let workerRoutes: MetadataRoute.Sitemap = [];

  try {
    const supabase = createPublicClient();
    const [articlesRes, workersRes] = await Promise.all([
      supabase.from("artikel").select("slug, created_at, published_at").eq("kategori", true),
      supabase.from("pekerja").select("slug, kategori, created_at"),
    ]);

    if (articlesRes.data) {
      articleRoutes = articlesRes.data.map((art) => ({
        url: `${baseUrl}/artikel/${art.slug}`,
        lastModified: art.published_at || art.created_at ? new Date(art.published_at || art.created_at) : now,
        changeFrequency: "weekly",
        priority: 0.7,
      }));
    }

    if (workersRes.data) {
      workerRoutes = workersRes.data.map((w) => {
        const catSlug = (w.kategori || "art").toLowerCase().replace(/\s+/g, "-");
        return {
          url: `${baseUrl}/pekerja/${encodeURIComponent(catSlug)}/${w.slug}`,
          lastModified: w.created_at ? new Date(w.created_at) : now,
          changeFrequency: "daily",
          priority: 0.8,
        };
      });
    }
  } catch (e) {
    console.error("Sitemap Supabase fetch error:", e);
  }

  return [...staticRoutes, ...jobRoutes, ...workerRoutes, ...articleRoutes];
}
