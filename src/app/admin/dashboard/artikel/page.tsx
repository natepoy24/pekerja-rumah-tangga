import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import DeleteArtikelButton from "@/components/ArtikelApp/DeleteArtikelButton";
import { Edit, Eye, FilePlus, FileText } from "lucide-react";

export const revalidate = 0;

export default async function ArtikelDashboardPage() {
  const supabase = await createClient();

  let totalArtikel = 0;
  let totalDraft = 0;
  let totalViews = 0;
  let articles: any[] = [];

  try {
    const { count: countTotal } = await supabase.from("artikel").select("*", { count: "exact", head: true });
    totalArtikel = countTotal || 0;

    const { count: countDraft } = await supabase.from("artikel").select("*", { count: "exact", head: true }).eq("kategori", false);
    totalDraft = countDraft || 0;

    const { data: viewsData } = await supabase.from("artikel").select("views");
    totalViews = viewsData?.reduce((acc, curr) => acc + (Number(curr.views) || 0), 0) || 0;

    const { data: articleData } = await supabase
      .from("artikel")
      .select("id, judul, slug, gambar_url, kategori, views, published_at, tags, created_at")
      .order("created_at", { ascending: false });
    
    if (articleData) articles = articleData;
  } catch (err) {
    console.error("Fetch artikel error:", err);
  }

  const formatViews = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num.toString();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-[#D5E8D0] shadow-xs">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#14201D] tracking-tight">CMS Artikel & Edukasi</h1>
          <p className="text-sm text-on-surface-variant mt-1">Kelola publikasi edukasi calon majikan dan informasi perizinan.</p>
        </div>
        <Link
          href="/admin/dashboard/artikel/tambah"
          className="bg-[#0B4F42] hover:bg-[#00372d] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95 text-xs sm:text-sm shrink-0"
        >
          <FilePlus className="w-4 h-4" />
          <span>Tulis Artikel Baru</span>
        </Link>
      </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#D5E8D0] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#EBF4E7] flex items-center justify-center text-[#0B4F42] shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant/70">Total Artikel</p>
              <h3 className="font-serif text-2xl font-bold text-[#14201D]">{totalArtikel}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D5E8D0] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 shrink-0">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant/70">Total Tayangan</p>
              <h3 className="font-serif text-2xl font-bold text-[#14201D]">{formatViews(totalViews)}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D5E8D0] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 shrink-0">
              <FileText className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant/70">Draft Tersimpan</p>
              <h3 className="font-serif text-2xl font-bold text-[#14201D]">{totalDraft}</h3>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-[#D5E8D0] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant/20 text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                  <th className="px-6 py-4">Judul Artikel & Tags</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4">Tanggal Terbit</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-sm">
                {articles && articles.length > 0 ? (
                  articles.map((article) => {
                    const tagsArray = article.tags
                      ? article.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
                      : [];

                    return (
                      <tr key={article.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="px-6 py-4 max-w-md">
                          <div className="flex items-center gap-4">
                            <img
                              src={article.gambar_url || "/Image/placeholder.png"}
                              alt={article.judul}
                              className="w-16 h-12 rounded-lg object-cover border border-outline-variant/30 shrink-0"
                            />
                            <div>
                              <h4 className="font-serif font-bold text-[#14201D] line-clamp-1">
                                {article.judul}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-on-surface-variant/70 flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {article.views || 0} views
                                </span>
                                {tagsArray.length > 0 && (
                                  <span className="text-[10px] font-semibold text-[#3E7B28] bg-[#EBF4E7] px-2 py-0.5 rounded-md border border-[#D5E8D0]">
                                    #{tagsArray[0]}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-center">
                          {article.kategori ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#EBF4E7] text-[#3E7B28] border border-[#D5E8D0]">
                              Terbit (Published)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                              Draft
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4 text-xs text-on-surface-variant">
                          {article.published_at
                            ? new Date(article.published_at).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "Belum Diterbitkan"}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-1">
                            {article.kategori && (
                              <Link
                                href={`/artikel/${article.slug}`}
                                target="_blank"
                                className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                                title="Lihat di Web"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                            )}
                            <Link
                              href={`/admin/dashboard/artikel/edit/${article.slug}`}
                              className="p-2 hover:bg-[#EBF4E7] text-[#0B4F42] rounded-lg transition-colors"
                              title="Edit Artikel"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <DeleteArtikelButton id={article.id} gambar_url={article.gambar_url} />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-16 text-on-surface-variant">
                      Belum ada artikel. Klik tombol "Tulis Artikel Baru" untuk mulai menulis.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}
