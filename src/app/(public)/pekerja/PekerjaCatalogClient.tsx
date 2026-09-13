"use client";

import { useState, useMemo } from "react";
import PekerjaCard, { type PekerjaProps } from "@/components/PekerjaApp/PekerjaCard";
import { Search, Filter, RefreshCw } from "lucide-react";

const CATEGORIES = [
  "Semua",
  "Asisten Rumah Tangga",
  "Baby Sitter",
  "Perawat Lansia",
  "Supir",
  "Tukang Kebun",
];

export default function PekerjaCatalogClient({
  initialWorkers,
  initialCategory,
  initialSearch,
}: {
  initialWorkers: PekerjaProps[];
  initialCategory: string;
  initialSearch: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedStatus, setSelectedStatus] = useState("Semua");

  const filteredWorkers = useMemo(() => {
    return initialWorkers.filter((worker) => {
      // Filter Category
      if (selectedCategory !== "Semua") {
        const matchesCategory =
          worker.kategori?.toLowerCase() === selectedCategory.toLowerCase() ||
          (selectedCategory === "Baby Sitter" && worker.kategori?.toLowerCase().includes("baby")) ||
          (selectedCategory === "Perawat Lansia" && worker.kategori?.toLowerCase().includes("lansia")) ||
          (selectedCategory === "Asisten Rumah Tangga" && worker.kategori?.toLowerCase().includes("asisten"));
        if (!matchesCategory) return false;
      }

      // Filter Status
      if (selectedStatus !== "Semua") {
        if (worker.status !== selectedStatus) return false;
      }

      // Filter Search Query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = worker.nama?.toLowerCase().includes(query);
        const matchesSkill = worker.keahlian_khusus?.toLowerCase().includes(query);
        const matchesLocation = worker.lokasi?.toLowerCase().includes(query);
        if (!matchesName && !matchesSkill && !matchesLocation) return false;
      }

      return true;
    });
  }, [initialWorkers, selectedCategory, selectedStatus, searchQuery]);

  return (
    <div className="space-y-8 font-sans">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                isActive
                  ? "bg-[#0B4F42] text-white shadow-sm"
                  : "bg-white text-on-surface-variant hover:bg-[#EBF4E7] hover:text-[#0B4F42] border border-[#D5E8D0]"
              }`}
            >
              {cat === "Baby Sitter" ? "Baby Sitter & Nanny" : cat}
            </button>
          );
        })}
      </div>

      {/* Filter bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#D5E8D0] shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan nama, keahlian, atau lokasi..."
            className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl py-2.5 pl-10 pr-4 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 transition-all"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label htmlFor="statusKetersediaan" className="text-xs font-semibold text-[#14201D] whitespace-nowrap">
            Status:
          </label>
          <select
            id="statusKetersediaan"
            aria-label="Filter Status Ketersediaan Pekerja"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 cursor-pointer w-full md:w-auto"
          >
            <option value="Semua">Semua Status Ketersediaan</option>
            <option value="Tersedia">Tersedia Siap Kerja</option>
            <option value="Akan Tersedia">Akan Tersedia (Inden)</option>
          </select>

          {(searchQuery || selectedCategory !== "Semua" || selectedStatus !== "Semua") && (
            <button
              onClick={() => {
                setSelectedCategory("Semua");
                setSelectedStatus("Semua");
                setSearchQuery("");
              }}
              className="p-2 text-[#0B4F42] hover:bg-[#EBF4E7] rounded-xl transition-colors shrink-0"
              title="Reset Filter"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Grid Workers */}
      {filteredWorkers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map((worker) => (
            <PekerjaCard key={worker.id} pekerja={worker} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#D5E8D0] shadow-sm space-y-3">
          <h2 className="font-serif text-2xl font-bold text-[#14201D]">Kandidat Tidak Ditemukan</h2>
          <p className="text-sm text-on-surface-variant max-w-md mx-auto">
            Maaf, tidak ada kandidat pekerja yang sesuai dengan kriteria filter saat ini. Coba sesuaikan kata kunci pencarian Anda.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("Semua");
              setSelectedStatus("Semua");
              setSearchQuery("");
            }}
            className="px-6 py-2.5 rounded-xl bg-[#0B4F42] text-white text-xs font-semibold hover:bg-[#00372d] transition-colors mt-2"
          >
            Tampilkan Semua Kandidat
          </button>
        </div>
      )}
    </div>
  );
}
