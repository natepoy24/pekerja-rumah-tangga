"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Briefcase,
  ExternalLink,
  Search,
  Wallet,
  Clock,
  AlertCircle,
} from "lucide-react";
import { toggleJobActiveAction, deleteJobAction } from "@/app/actions";
import type { Job } from "@/lib/jobs";

interface JobAdminListClientProps {
  initialJobs: Job[];
}

export default function JobAdminListClient({ initialJobs }: JobAdminListClientProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const filteredJobs = jobs.filter((j) => {
    const matchSearch =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.system.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = categoryFilter === "all" || j.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const totalActive = jobs.filter((j) => j.is_active).length;
  const totalInactive = jobs.length - totalActive;

  const handleToggleActive = (id: string, currentActive: boolean) => {
    setStatusMessage(null);
    startTransition(async () => {
      const res = await toggleJobActiveAction(id, currentActive);
      if (res?.error) {
        setStatusMessage({ type: "error", text: res.error });
      } else {
        setJobs((prev) =>
          prev.map((j) => (j.id === id ? { ...j, is_active: !currentActive } : j))
        );
        setStatusMessage({
          type: "success",
          text: `Status lowongan berhasil diubah menjadi ${!currentActive ? "Aktif" : "Non-Aktif"}.`,
        });
      }
    });
  };

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus lowongan "${title}" secara permanen?`)) {
      return;
    }
    setStatusMessage(null);
    startTransition(async () => {
      const res = await deleteJobAction(id);
      if (res?.error) {
        setStatusMessage({ type: "error", text: res.error });
      } else {
        setJobs((prev) => prev.filter((j) => j.id !== id));
        setStatusMessage({ type: "success", text: `Lowongan "${title}" berhasil dihapus.` });
      }
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#D5E8D0] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="w-5 h-5 text-[#0B4F42]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#3E7B28]">
              CMS Lowongan Kerja
            </span>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#14201D]">
            Kelola Lowongan Kerja
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant mt-1">
            Tambah, edit, aktifkan/nonaktifkan lowongan kerja penempatan domestic yang tayang di situs publik.
          </p>
        </div>

        <Link
          href="/admin/dashboard/lowongan/tambah"
          className="px-5 py-3 rounded-2xl bg-[#0B4F42] hover:bg-[#00372d] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Lowongan Baru</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#D5E8D0] shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
            Total Lowongan
          </span>
          <p className="font-serif text-3xl font-bold text-[#0B4F42]">{jobs.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#D5E8D0] shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#3E7B28]">
            Status Aktif (Tayang)
          </span>
          <p className="font-serif text-3xl font-bold text-[#3E7B28]">{totalActive}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#D5E8D0] shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
            Draft / Non-Aktif
          </span>
          <p className="font-serif text-3xl font-bold text-amber-700">{totalInactive}</p>
        </div>
      </div>

      {/* Alert Status */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-3 animate-in fade-in duration-200 ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-900 border-emerald-200"
              : "bg-red-50 text-red-900 border-red-200"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#D5E8D0] shadow-xs flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-on-surface-variant/60 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari posisi, slug, atau sistem..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] outline-none text-xs font-sans"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-[#14201D] shrink-0">Kategori:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] outline-none text-xs font-semibold bg-white cursor-pointer"
          >
            <option value="all">Semua Kategori</option>
            <option value="art">ART (Asisten Rumah Tangga)</option>
            <option value="baby-sitter">Baby Sitter & Nanny</option>
            <option value="lansia">Perawat Lansia / Caregiver</option>
          </select>
        </div>
      </div>

      {/* Jobs Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id || job.slug}
            className={`bg-white rounded-3xl p-6 border shadow-xs flex flex-col justify-between space-y-4 transition-all ${
              job.is_active ? "border-[#D5E8D0]" : "border-amber-200 bg-amber-50/20"
            }`}
          >
            <div className="space-y-3">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-[#EBF4E7] text-[#0B4F42] text-[11px] font-bold uppercase tracking-wider">
                  {job.category}
                </span>

                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => job.id && handleToggleActive(job.id, !!job.is_active)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
                    job.is_active
                      ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                      : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                  }`}
                  title="Klik untuk mengubah status aktif"
                >
                  {job.is_active ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Aktif</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Draft</span>
                    </>
                  )}
                </button>
              </div>

              {/* Title & Badge */}
              <div>
                <h3 className="font-serif text-xl font-bold text-[#14201D] leading-snug">
                  {job.title}
                </h3>
                <p className="text-[11px] font-mono text-on-surface-variant/70 mt-1">
                  slug: /lowongan-kerja/{job.slug}
                </p>
              </div>

              {/* Specs */}
              <div className="bg-[#FAFAF7] p-3 rounded-xl space-y-1 text-xs border border-outline-variant/20">
                <div className="font-bold text-[#0B4F42] flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5" />
                  <span>{job.salary_display}</span>
                </div>
                <div className="text-on-surface-variant flex items-center gap-1.5 text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{job.system}</span>
                </div>
              </div>

              {job.badge && (
                <span className="inline-block text-[11px] text-[#3E7B28] font-bold bg-[#EBF4E7] px-2.5 py-0.5 rounded-md">
                  ★ {job.badge}
                </span>
              )}
            </div>

            {/* Actions Footer */}
            <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Link
                  href={`/lowongan-kerja/${job.slug}`}
                  target="_blank"
                  className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Pratinjau Halaman Publik"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>

                <Link
                  href={`/admin/dashboard/lowongan/edit/${job.id}`}
                  className="min-h-[44px] min-w-[44px] px-3.5 py-2.5 rounded-xl bg-[#EBF4E7] hover:bg-[#D5E8D0] text-[#0B4F42] text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </Link>
              </div>

              {job.id && (
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleDelete(job.id!, job.title)}
                  className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                  title="Hapus Lowongan Ini"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="col-span-full bg-white p-12 rounded-3xl border border-dashed border-[#D5E8D0] text-center space-y-3">
            <Briefcase className="w-10 h-10 text-on-surface-variant/40 mx-auto" />
            <p className="font-serif text-lg font-bold text-[#14201D]">
              Tidak Ada Lowongan Ditemukan
            </p>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
              Belum ada lowongan kerja yang sesuai dengan kata kunci pencarian atau kategori ini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
