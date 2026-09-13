"use client";

import { Search } from "lucide-react";

type FilterControlsProps = {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  kategoriFilter: string;
  setKategoriFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
};

export default function FilterControls({
  searchQuery,
  setSearchQuery,
  kategoriFilter,
  setKategoriFilter,
  statusFilter,
  setStatusFilter,
}: FilterControlsProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#D5E8D0] shadow-sm space-y-4 font-sans">
      <div className="flex flex-wrap gap-4">
        {/* Search */}
        <div className="flex-1 min-w-[240px]">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
            Cari Nama Kandidat
          </label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berdasarkan nama..."
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl py-2.5 pl-10 pr-4 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 transition-all"
            />
          </div>
        </div>

        {/* Kategori */}
        <div className="w-full md:w-56">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
            Kategori Layanan
          </label>
          <select
            value={kategoriFilter}
            onChange={(e) => setKategoriFilter(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl py-2.5 px-4 text-sm font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 cursor-pointer"
          >
            <option value="Semua Kategori">Semua Kategori</option>
            <option value="Asisten Rumah Tangga">Asisten Rumah Tangga</option>
            <option value="Baby Sitter">Baby Sitter & Nanny</option>
            <option value="Perawat Lansia">Perawat Lansia</option>
            <option value="Supir">Supir Pribadi</option>
            <option value="Tukang Kebun">Tukang Kebun</option>
          </select>
        </div>

        {/* Status */}
        <div className="w-full md:w-56">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
            Status Pekerja
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl py-2.5 px-4 text-sm font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 cursor-pointer"
          >
            <option value="Semua Status">Semua Status</option>
            <option value="Tersedia">Tersedia Siap Kerja</option>
            <option value="Akan Tersedia">Akan Tersedia (Inden)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
