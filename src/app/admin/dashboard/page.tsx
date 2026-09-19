import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_JOBS } from "@/lib/jobs";
import {
  Users,
  UserPlus,
  FileText,
  FilePlus,
  ShieldCheck,
  Activity,
  Settings,
  ArrowRight,
  ExternalLink,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  Edit,
  History,
  Layers,
  Briefcase,
} from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  let totalPekerja = 0;
  let totalTersedia = 0;
  let totalLowongan = 0;
  let totalArtikel = 0;
  let totalViews = 0;
  let recentWorkers: any[] = [];
  let recentJobs: any[] = [];
  let recentArticles: any[] = [];
  let cmsLogs: any[] = [];

  try {
    // 1. Stats
    const { count: countWorkers } = await supabase.from("pekerja").select("*", { count: "exact", head: true });
    totalPekerja = countWorkers || 0;

    const { count: countAvailable } = await supabase
      .from("pekerja")
      .select("*", { count: "exact", head: true })
      .eq("status", "Tersedia");
    totalTersedia = countAvailable || 0;

    const { count: countJobs } = await supabase
      .from("jobs")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true);

    const { count: countArticles } = await supabase.from("artikel").select("*", { count: "exact", head: true });
    totalArtikel = countArticles || 0;

    const { data: viewsData } = await supabase.from("artikel").select("views");
    totalViews = viewsData?.reduce((acc, curr) => acc + (Number(curr.views) || 0), 0) || 0;

    // 2. 5 Pekerja Terakhir
    const { data: workersData } = await supabase
      .from("pekerja")
      .select("id, nama, slug, kategori, status, gaji, foto_url, created_at")
      .order("created_at", { ascending: false })
      .limit(5);
    if (workersData) recentWorkers = workersData;

    // 3. 3 Lowongan Terakhir (Lowongan Kerja Aktif)
    const { data: jobsData } = await supabase
      .from("jobs")
      .select("id, title, slug, category, system, salary_display, is_active, created_at")
      .order("created_at", { ascending: false })
      .limit(3);

    if (jobsData && jobsData.length > 0) {
      recentJobs = jobsData;
      totalLowongan = countJobs ?? jobsData.filter((j) => j.is_active !== false).length;
    } else {
      recentJobs = DEFAULT_JOBS.slice(0, 3);
      totalLowongan = DEFAULT_JOBS.filter((j) => j.is_active !== false).length;
    }

    // 4. 3 Artikel Terakhir
    const { data: articlesData } = await supabase
      .from("artikel")
      .select("id, judul, slug, kategori, views, published_at, gambar_url, created_at")
      .order("created_at", { ascending: false })
      .limit(3);
    if (articlesData) recentArticles = articlesData;

    // 5. Log CMS
    const { data: settingsData } = await supabase
      .from("site_settings")
      .select("id, name, updated_at")
      .order("updated_at", { ascending: false })
      .limit(5);

    const logs: any[] = [];
    if (settingsData) {
      settingsData.forEach((s) => {
        logs.push({
          type: "settings",
          title: `Pengaturan CMS ${s.name || s.id}`,
          desc: `Pembaruan data konfigurasi pada sektor ${s.id}`,
          time: s.updated_at,
          icon: Settings,
          badge: "CMS Web",
        });
      });
    }

    if (workersData && workersData.length > 0) {
      workersData.slice(0, 2).forEach((w) => {
        logs.push({
          type: "pekerja",
          title: `Pekerja: ${w.nama}`,
          desc: `Kategori ${w.kategori} status ${w.status}`,
          time: w.created_at,
          icon: Users,
          badge: "Pekerja",
        });
      });
    }

    if (recentJobs && recentJobs.length > 0) {
      recentJobs.slice(0, 2).forEach((j) => {
        logs.push({
          type: "lowongan",
          title: `Lowongan: ${j.title}`,
          desc: `Posisi ${j.category?.toUpperCase() || "Umum"} - ${j.system || "Aktif"}`,
          time: j.created_at || new Date().toISOString(),
          icon: Briefcase,
          badge: "Lowongan",
        });
      });
    }

    if (articlesData && articlesData.length > 0) {
      articlesData.slice(0, 2).forEach((a) => {
        logs.push({
          type: "artikel",
          title: `Artikel: ${a.judul}`,
          desc: `Diterbitkan dengan ${a.views || 0} pembaca`,
          time: a.published_at || a.created_at,
          icon: FileText,
          badge: "Artikel",
        });
      });
    }

    logs.sort((a, b) => new Date(b.time || 0).getTime() - new Date(a.time || 0).getTime());
    cmsLogs = logs.slice(0, 6);
  } catch (err) {
    console.error("Dashboard data fetch warning:", err);
    recentJobs = DEFAULT_JOBS.slice(0, 3);
    totalLowongan = DEFAULT_JOBS.filter((j) => j.is_active !== false).length;
  }

  const formatRupiah = (val: any) => {
    if (!val) return "Rp -";
    if (typeof val === "string" && val.startsWith("Rp")) return val;
    const num = Number(val);
    if (isNaN(num)) return String(val);
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Quick Actions Bar */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D5E8D0] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF4E7] border border-[#D5E8D0] text-[#0B4F42] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Dashboard Eksekutif Portal CMS</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#14201D] tracking-tight">
            Ringkasan Operasional & Manajemen Konten
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-2xl">
            Pantau ringkasan kandidat pekerja aktif, lowongan kerja, artikel edukasi, pembaruan log CMS, serta pintasan cepat ke seluruh fitur pengelolaan.
          </p>
        </div>

        {/* Shortcuts Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            href="/admin/dashboard/pekerja/tambah"
            className="px-4 py-2.5 rounded-xl bg-[#0B4F42] hover:bg-[#00372d] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Pekerja</span>
          </Link>
          <Link
            href="/admin/dashboard/lowongan/tambah"
            className="px-4 py-2.5 rounded-xl bg-[#0B4F42] hover:bg-[#00372d] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            <Briefcase className="w-4 h-4" />
            <span>+ Lowongan</span>
          </Link>
          <Link
            href="/admin/dashboard/artikel/tambah"
            className="px-4 py-2.5 rounded-xl bg-[#155100] hover:bg-[#0e3600] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            <FilePlus className="w-4 h-4" />
            <span>+ Artikel</span>
          </Link>
          <Link
            href="/admin/dashboard/pengaturan"
            className="px-4 py-2.5 rounded-xl bg-[#EBF4E7] hover:bg-[#D5E8D0] text-[#0B4F42] border border-[#D5E8D0] text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Settings className="w-4 h-4" />
            <span>Pengaturan Web</span>
          </Link>
        </div>
      </div>

      {/* Bento Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#D5E8D0] shadow-sm flex items-center gap-3.5 hover:border-[#0B4F42]/40 transition-colors">
          <div className="w-11 h-11 rounded-2xl bg-[#EBF4E7] flex items-center justify-center text-[#0B4F42] shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Total Pekerja</p>
            <h3 className="font-serif text-xl font-bold text-[#14201D]">{totalPekerja}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#D5E8D0] shadow-sm flex items-center gap-3.5 hover:border-[#0B4F42]/40 transition-colors">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#3E7B28] shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Kandidat Tersedia</p>
            <h3 className="font-serif text-xl font-bold text-[#3E7B28]">{totalTersedia}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#D5E8D0] shadow-sm flex items-center gap-3.5 hover:border-[#0B4F42]/40 transition-colors">
          <div className="w-11 h-11 rounded-2xl bg-[#EBF4E7] flex items-center justify-center text-[#0B4F42] shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Lowongan Aktif</p>
            <h3 className="font-serif text-xl font-bold text-[#0B4F42]">{totalLowongan}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#D5E8D0] shadow-sm flex items-center gap-3.5 hover:border-[#0B4F42]/40 transition-colors">
          <div className="w-11 h-11 rounded-2xl bg-[#EBF4E7] flex items-center justify-center text-[#0B4F42] shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Total Artikel</p>
            <h3 className="font-serif text-xl font-bold text-[#14201D]">{totalArtikel}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#D5E8D0] shadow-sm flex items-center gap-3.5 hover:border-[#0B4F42]/40 transition-colors">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Total Pembaca</p>
            <h3 className="font-serif text-xl font-bold text-[#14201D]">{totalViews.toLocaleString("id-ID")}</h3>
          </div>
        </div>
      </div>

      {/* Main Grid: Content (2/3) + Sidebar Feeds (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): 5 Pekerja Terakhir & 3 Artikel Terakhir */}
        <div className="lg:col-span-8 space-y-8">
          {/* 5 Pekerja Terakhir */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#D5E8D0] shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#EBF4E7] text-[#0B4F42] flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#14201D]">5 Pekerja Terakhir</h2>
                  <p className="text-xs text-on-surface-variant">Kandidat terbaru yang masuk ke database.</p>
                </div>
              </div>

              <Link
                href="/admin/dashboard/pekerja"
                className="text-xs font-bold text-[#0B4F42] hover:text-[#9E232A] transition-colors flex items-center gap-1"
              >
                <span>Kelola Semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentWorkers.length === 0 ? (
              <p className="text-xs text-on-surface-variant py-6 text-center">Belum ada data pekerja terdaftar.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/20 text-on-surface-variant/70 font-semibold uppercase tracking-wider text-[10px]">
                      <th className="pb-3 pl-2">Kandidat</th>
                      <th className="pb-3">Kategori</th>
                      <th className="pb-3">Gaji</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right pr-2">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/15">
                    {recentWorkers.map((w) => {
                      const isAvailable = w.status === "Tersedia";
                      const fotoSrc = w.foto_url || "/asisten-rumah-tangga.webp";
                      return (
                        <tr key={w.id} className="hover:bg-[#FAFAF7] transition-colors">
                          <td className="py-3 pl-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#FAFAF7] border relative shrink-0">
                                <Image src={fotoSrc} alt={w.nama} fill sizes="40px" className="object-cover" />
                              </div>
                              <div>
                                <p className="font-bold text-[#14201D] text-xs">{w.nama}</p>
                                <p className="text-[10px] text-on-surface-variant">ID: #{w.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className="bg-[#EBF4E7] text-[#0B4F42] font-semibold px-2 py-0.5 rounded-md text-[10px] border border-[#D5E8D0]">
                              {w.kategori}
                            </span>
                          </td>
                          <td className="py-3 font-semibold text-[#14201D]">{formatRupiah(w.gaji)}</td>
                          <td className="py-3">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${isAvailable
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : "bg-amber-50 text-amber-800 border-amber-200"
                                }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-emerald-500" : "bg-amber-500"}`}
                              />
                              {w.status}
                            </span>
                          </td>
                          <td className="py-3 text-right pr-2">
                            <div className="flex items-center justify-end gap-1.5">
                              <Link
                                href={`/admin/dashboard/pekerja/edit/${w.id}`}
                                className="p-1.5 rounded-lg text-[#0B4F42] hover:bg-[#EBF4E7] transition-colors"
                                title="Edit Pekerja"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </Link>
                              {w.slug && (
                                <Link
                                  href={`/pekerja/${encodeURIComponent(w.kategori || "umum")}/${w.slug}`}
                                  target="_blank"
                                  className="p-1.5 rounded-lg text-on-surface-variant hover:bg-[#EBF4E7] transition-colors"
                                  title="Lihat Profil Publik"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </Link>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* 3 Lowongan Kerja Terakhir (Aktif) */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#D5E8D0] shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#EBF4E7] text-[#0B4F42] flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#14201D]">3 Lowongan Kerja Terakhir</h2>
                  <p className="text-xs text-on-surface-variant">Lowongan kerja aktif yang dapat dilamar calon pekerja.</p>
                </div>
              </div>

              <Link
                href="/admin/dashboard/lowongan"
                className="text-xs font-bold text-[#0B4F42] hover:text-[#9E232A] transition-colors flex items-center gap-1"
              >
                <span>Kelola Semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentJobs.length === 0 ? (
              <p className="text-xs text-on-surface-variant py-6 text-center">Belum ada data lowongan kerja.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recentJobs.map((j) => {
                  const isActive = j.is_active !== false;
                  return (
                    <div
                      key={j.id || j.slug}
                      className="group border border-[#D5E8D0] rounded-2xl p-4 bg-[#FAFAF7] hover:bg-white transition-all hover:shadow-sm flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF4E7] text-[#0B4F42] border border-[#D5E8D0] uppercase tracking-wider">
                            {j.category || "Umum"}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${isActive
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : "bg-gray-100 text-gray-700 border-gray-200"
                              }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-gray-400"}`} />
                            {isActive ? "Aktif" : "Nonaktif"}
                          </span>
                        </div>
                        <h4 className="font-serif text-sm font-bold text-[#14201D] line-clamp-2 leading-snug group-hover:text-[#0B4F42]">
                          {j.title}
                        </h4>
                        <p className="text-xs font-semibold text-[#0B4F42]">
                          {j.salary_display || "Sesuai Kesepakatan"}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-2 border-t border-outline-variant/15">
                        <span className="truncate max-w-[110px]" title={j.system}>
                          {j.system || "Live-In"}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <Link
                            href={`/admin/dashboard/lowongan/edit/${j.id || j.slug}`}
                            className="min-h-[44px] min-w-[44px] px-3 py-2 rounded-lg font-bold text-[#0B4F42] hover:bg-[#EBF4E7] transition-colors inline-flex items-center justify-center gap-1"
                          >
                            <span>Edit</span>
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          {j.slug && (
                            <Link
                              href={`/lowongan-kerja/${j.slug}`}
                              target="_blank"
                              className="min-h-[44px] min-w-[44px] p-2 rounded-lg text-on-surface-variant hover:text-[#0B4F42] hover:bg-slate-100 transition-colors inline-flex items-center justify-center"
                              title="Lihat Halaman Publik"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3 Artikel Terakhir */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#D5E8D0] shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#EBF4E7] text-[#0B4F42] flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#14201D]">3 Artikel Terakhir</h2>
                  <p className="text-xs text-on-surface-variant">Artikel edukasi dan panduan terbaru.</p>
                </div>
              </div>

              <Link
                href="/admin/dashboard/artikel"
                className="text-xs font-bold text-[#0B4F42] hover:text-[#9E232A] transition-colors flex items-center gap-1"
              >
                <span>Kelola Semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentArticles.length === 0 ? (
              <p className="text-xs text-on-surface-variant py-6 text-center">Belum ada artikel dipublikasikan.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recentArticles.map((a) => {
                  const coverSrc = a.gambar_url || "/asisten-rumah-tangga.webp";
                  return (
                    <div
                      key={a.id}
                      className="group border border-[#D5E8D0] rounded-2xl p-4 bg-[#FAFAF7] hover:bg-white transition-all hover:shadow-sm flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2.5">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white border">
                          <Image src={coverSrc} alt={a.judul} fill sizes="250px" className="object-cover" />
                        </div>
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {a.kategori ? "Terbit" : "Draft"}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-[#14201D] line-clamp-2 leading-snug group-hover:text-[#0B4F42]">
                          {a.judul}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-2 border-t border-outline-variant/15">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-[#0B4F42]" />
                          <span>{a.views || 0} views</span>
                        </span>
                        <Link
                          href={`/admin/dashboard/artikel/edit/${a.id}`}
                          className="font-bold text-[#0B4F42] hover:underline flex items-center gap-1"
                        >
                          <span>Edit</span>
                          <Edit className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Log Aktivitas CMS & Pintasan Konfigurasi */}
        <div className="lg:col-span-4 space-y-8">
          {/* Log Aktivitas CMS */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#D5E8D0] shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-[#0B4F42]" />
                <h3 className="font-serif text-lg font-bold text-[#14201D]">Log Aktivitas CMS</h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Live Feed
              </span>
            </div>

            <div className="space-y-3.5">
              {cmsLogs.map((log, idx) => {
                const IconComp = log.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAFAF7] border border-[#D5E8D0]/60">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#D5E8D0] text-[#0B4F42] flex items-center justify-center shrink-0 mt-0.5">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-bold text-[#14201D] truncate">{log.title}</p>
                        <span className="text-[9px] font-semibold text-on-surface-variant/70 shrink-0">
                          {formatDate(log.time)}
                        </span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant truncate mt-0.5">{log.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pintasan Konfigurasi Situs */}
          <div className="bg-gradient-to-br from-[#0B4F42] to-[#155100] text-white p-6 sm:p-7 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-emerald-300" />
              <h3 className="font-serif text-lg font-bold text-white">Pusat Pengaturan Web</h3>
            </div>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Ubah logo PT, favicon browser, hero background, dan kata kunci SEO untuk semua halaman website langsung tanpa kode.
            </p>
            <div className="pt-2">
              <Link
                href="/admin/dashboard/pengaturan"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-[#0B4F42] text-xs font-bold shadow-md hover:bg-emerald-50 transition-all"
              >
                <span>Buka CMS Pengaturan & SEO</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
