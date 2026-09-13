"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import DeleteButton from "@/components/PekerjaApp/DeleteButton";
import slugify from "slugify";
import { UserPlus, Eye, Edit, Search } from "lucide-react";

interface Pekerja {
  id: number;
  nama: string;
  slug: string;
  kategori: string;
  status: string;
  pengalaman: number;
  gaji: string | number;
  fotoUrl?: string;
  foto_url?: string;
}

export default function DaftarPekerjaAdminPage() {
  const supabase = createClient();

  const [allWorkers, setAllWorkers] = useState<Pekerja[]>([]);
  const [filteredWorkers, setFilteredWorkers] = useState<Pekerja[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tableMissing, setTableMissing] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("Semua Kategori");
  const [statusFilter, setStatusFilter] = useState("Semua Status");

  useEffect(() => {
    const fetchWorkers = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("pekerja")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Fetch pekerja error:", error.message);
        if (error.code === "PGRST205" || error.message.includes("schema cache")) {
          setTableMissing(true);
        }
      } else if (data) {
        setAllWorkers(data);
        setFilteredWorkers(data);
      }
      setIsLoading(false);
    };

    fetchWorkers();
  }, []);

  useEffect(() => {
    let result = allWorkers;

    if (searchQuery.trim() !== "") {
      result = result.filter((w) =>
        w.nama.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (kategoriFilter !== "Semua Kategori") {
      result = result.filter((w) => w.kategori === kategoriFilter);
    }

    if (statusFilter !== "Semua Status") {
      result = result.filter((w) => w.status === statusFilter);
    }

    setFilteredWorkers(result);
  }, [searchQuery, kategoriFilter, statusFilter, allWorkers]);

  const getStatusStyle = (status: string) => {
    if (status === "Tersedia") return "text-[#3E7B28] bg-[#EBF4E7] border-[#D5E8D0]";
    if (status === "Akan Tersedia") return "text-amber-800 bg-amber-50 border-amber-200";
    return "text-slate-700 bg-slate-50 border-slate-200";
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-[#D5E8D0] shadow-xs">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#14201D] tracking-tight">Manajemen Pekerja</h1>
          <p className="text-sm text-on-surface-variant mt-1">Kelola profil kandidat, foto, status ketersediaan, dan detail keahlian.</p>
        </div>
        <Link
          href="/admin/dashboard/pekerja/tambah"
          className="bg-[#0B4F42] hover:bg-[#00372d] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95 text-xs sm:text-sm shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Tambah Pekerja Baru</span>
        </Link>
      </div>

        {tableMissing && (
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
            <h3 className="font-serif text-lg font-bold text-amber-950 flex items-center gap-2">
              <span>⚠️ Perhatian: Tabel 'pekerja' Belum Terdeteksi di Supabase</span>
            </h3>
            <p className="text-xs text-amber-800 leading-relaxed">
              Tabel database <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono font-bold">pekerja</code>, <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono font-bold">artikel</code>, dan <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono font-bold">master_keahlian</code> belum dibuat pada proyek Supabase Anda.
              <br />
              Silakan buka <strong>Supabase Dashboard &gt; SQL Editor</strong>, salin isi file <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono font-bold">supabase/create_tables.sql</code> dan klik <strong>Run</strong> untuk mengaktifkan seluruh tabel &amp; data awal.
            </p>
          </div>
        )}

        {/* Filter Controls */}
        <div className="bg-white p-6 rounded-2xl border border-[#D5E8D0] shadow-sm space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[240px]">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                Cari Nama Pekerja
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ketik nama pekerja..."
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl py-2.5 pl-10 pr-4 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20"
                />
              </div>
            </div>

            <div className="w-full md:w-56">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                Kategori
              </label>
              <select
                value={kategoriFilter}
                onChange={(e) => setKategoriFilter(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl py-2.5 px-4 text-sm font-medium text-on-surface cursor-pointer"
              >
                <option value="Semua Kategori">Semua Kategori</option>
                <option value="Asisten Rumah Tangga">Asisten Rumah Tangga</option>
                <option value="Baby Sitter">Baby Sitter & Nanny</option>
                <option value="Perawat Lansia">Perawat Lansia</option>
                <option value="Supir">Supir Pribadi</option>
                <option value="Tukang Kebun">Tukang Kebun</option>
              </select>
            </div>

            <div className="w-full md:w-56">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl py-2.5 px-4 text-sm font-medium text-on-surface cursor-pointer"
              >
                <option value="Semua Status">Semua Status</option>
                <option value="Tersedia">Tersedia Siap Kerja</option>
                <option value="Akan Tersedia">Akan Tersedia (Inden)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-[#D5E8D0] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant/20 text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                  <th className="px-6 py-4">Nama Pekerja</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Gaji</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-sm">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-on-surface-variant">Memuat data pekerja...</td>
                  </tr>
                ) : filteredWorkers.length > 0 ? (
                  filteredWorkers.map((worker) => {
                    const catSlug = slugify(worker.kategori || "art", { lower: true, strict: true });
                    const foto = worker.fotoUrl || worker.foto_url || "/Image/placeholder.png";

                    return (
                      <tr key={worker.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="px-6 py-4 min-w-[240px]">
                          <div className="flex items-center gap-4">
                            <img src={foto} alt={worker.nama} className="w-12 h-12 rounded-xl object-cover border border-outline-variant/30 shrink-0" />
                            <div>
                              <p className="font-bold text-[#14201D] font-serif">{worker.nama}</p>
                              <p className="text-xs text-on-surface-variant/70">ID: #{worker.id.toString().padStart(4, "0")}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-[#EBF4E7] text-[#3E7B28] px-3 py-1 rounded-full text-xs font-semibold border border-[#D5E8D0]">
                            {worker.kategori}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(worker.status)}`}>
                            {worker.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-[#0B4F42]">
                          Rp {Number(worker.gaji || 0).toLocaleString("id-ID")}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-1">
                            <Link href={`/admin/dashboard/pekerja/edit/${worker.id}`} className="p-2 hover:bg-[#EBF4E7] text-[#0B4F42] rounded-lg transition-colors" title="Edit Profil">
                              <Edit className="w-4 h-4" />
                            </Link>
                            <Link href={`/pekerja/${catSlug}/${worker.slug}`} target="_blank" className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors" title="Lihat Profil Publik">
                              <Eye className="w-4 h-4" />
                            </Link>
                            <DeleteButton id={worker.id} fotoUrl={foto} />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-on-surface-variant">
                      Belum ada kandidat pekerja ditemukan.
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
