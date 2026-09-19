"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Wallet,
  Clock,
  Sparkles,
  FileText,
} from "lucide-react";
import { createJobAction, updateJobAction } from "@/app/actions";
import type { Job } from "@/lib/jobs";
import NotificationModal from "@/components/ui/NotificationModal";

interface JobFormClientProps {
  initialJob?: Job;
  isEdit?: boolean;
}

export default function JobFormClient({ initialJob, isEdit = false }: JobFormClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      let res;
      if (isEdit && initialJob?.id) {
        res = await updateJobAction(initialJob.id, formData);
      } else {
        res = await createJobAction(formData);
      }

      if (res?.error) {
        setStatusMessage({ type: "error", text: res.error });
      } else {
        setNotificationMessage(
          `Lowongan kerja "${formData.get("title") || ""}" berhasil ${isEdit ? "diperbarui" : "ditambahkan"}!`
        );
        setShowNotificationModal(true);
      }
    });
  };

  const handleNotificationClose = () => {
    setShowNotificationModal(false);
    router.push("/admin/dashboard/lowongan");
    router.refresh();
  };


  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin/dashboard/lowongan"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0B4F42] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Lowongan</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B4F42] to-[#155100] text-white p-6 rounded-3xl shadow-sm flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              {isEdit ? "Edit Lowongan Kerja" : "Tambah Lowongan Baru"}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-white">
            {isEdit ? `Edit: ${initialJob?.title}` : "Buat Lowongan Pekerja Baru"}
          </h1>
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

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-[#D5E8D0] shadow-sm space-y-8">
        {/* Section 1: Data Utama */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B4F42] flex items-center gap-2 border-b border-outline-variant/20 pb-3">
            <Briefcase className="w-4 h-4 text-[#0B4F42]" />
            <span>1. Informasi Utama Posisi Lowongan</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                Judul Lowongan Kerja *
              </label>
              <input
                type="text"
                name="title"
                defaultValue={initialJob?.title || ""}
                required
                placeholder="Contoh: Asisten Rumah Tangga (ART) Menginap"
                className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                Slug URL (Opsional / Otomatis)
              </label>
              <input
                type="text"
                name="slug"
                defaultValue={initialJob?.slug || ""}
                placeholder="asisten-rumah-tangga"
                className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans font-mono"
              />
              <p className="text-[11px] text-on-surface-variant mt-1">Kosongkan jika ingin dibuat otomatis dari judul.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                Kategori Pekerjaan *
              </label>
              <select
                name="category"
                defaultValue={initialJob?.category || "art"}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans bg-white cursor-pointer"
              >
                <option value="art">ART (Asisten Rumah Tangga)</option>
                <option value="baby-sitter">Baby Sitter & Nanny</option>
                <option value="lansia">Perawat Lansia / Caregiver</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                Badge Promosi (Opsional)
              </label>
              <input
                type="text"
                name="badge"
                defaultValue={initialJob?.badge || ""}
                placeholder="Paling Banyak Dibutuhkan"
                className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                Status Tayang
              </label>
              <div className="flex items-center gap-3 pt-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_active"
                    defaultChecked={initialJob ? initialJob.is_active : true}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B4F42]"></div>
                  <span className="ml-3 text-xs font-bold text-[#14201D]">
                    Tayang Publik (Aktif)
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
              Deskripsi Singkat Lowongan *
            </label>
            <textarea
              name="description"
              rows={3}
              defaultValue={initialJob?.description || ""}
              required
              placeholder="Jelaskan ringkasan posisi pekerjaan..."
              className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
            />
          </div>
        </div>

        {/* Section 2: Gaji & Sistem */}
        <div className="space-y-6 pt-4 border-t border-outline-variant/20">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B4F42] flex items-center gap-2">
            <Wallet className="w-4 h-4 text-[#0B4F42]" />
            <span>2. Pengaturan Gaji & Sistem Kerja</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                Tampilan Gaji Halaman (Salary Display) *
              </label>
              <input
                type="text"
                name="salary_display"
                defaultValue={initialJob?.salary_display || "Rp2.000.000 – Rp4.000.000 / bln"}
                required
                placeholder="Rp2.000.000 – Rp4.000.000 / bln"
                className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans font-bold text-[#0B4F42]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                Gaji Minimal (Angka Anggaran) *
              </label>
              <input
                type="number"
                name="salary_min"
                defaultValue={initialJob?.salary_min || 2000000}
                required
                className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                Gaji Maksimal (Angka Anggaran) *
              </label>
              <input
                type="number"
                name="salary_max"
                defaultValue={initialJob?.salary_max || 4000000}
                required
                className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
              Sistem / Akomodasi Kerja *
            </label>
            <input
              type="text"
              name="system"
              defaultValue={initialJob?.system || "Menginap (Live-in) / Pulang-Pergi"}
              required
              placeholder="Menginap (Live-in) / Pulang-Pergi"
              className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
            />
          </div>
        </div>

        {/* Section 3: Lists (Duties, Requirements, Facilities) */}
        <div className="space-y-6 pt-4 border-t border-outline-variant/20">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B4F42] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#0B4F42]" />
            <span>3. Detail Tugas, Syarat, dan Fasilitas (1 Baris Per Poin)</span>
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
              Tugas & Tanggung Jawab (Duties)
            </label>
            <textarea
              name="duties"
              rows={4}
              defaultValue={initialJob?.duties?.join("\n") || ""}
              placeholder="Menyapu dan mengepel rumah&#10;Mencuci dan menyetrika pakaian&#10;Memasak hidangan keluarga"
              className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-xs font-sans font-mono"
            />
            <p className="text-[11px] text-on-surface-variant mt-1">Gunakan baris baru (Enter) untuk setiap poin tugas.</p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
              Syarat & Berkas Persyaratan (Requirements)
            </label>
            <textarea
              name="requirements"
              rows={4}
              defaultValue={initialJob?.requirements?.join("\n") || ""}
              placeholder="Wanita usia 18 - 45 tahun&#10;e-KTP Asli & KK&#10;Sehat jasmani & rohani"
              className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-xs font-sans font-mono"
            />
            <p className="text-[11px] text-on-surface-variant mt-1">Gunakan baris baru (Enter) untuk setiap poin syarat.</p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
              Fasilitas & Jaminan Pekerja (Facilities)
            </label>
            <textarea
              name="facilities"
              rows={4}
              defaultValue={initialJob?.facilities?.join("\n") || ""}
              placeholder="Gaji utuh tanpa potongan&#10;Asrama & Makan 3x gratis&#10;Kontrak resmi Kemnaker"
              className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-xs font-sans font-mono"
            />
            <p className="text-[11px] text-on-surface-variant mt-1">Gunakan baris baru (Enter) untuk setiap poin fasilitas.</p>
          </div>
        </div>

        {/* Section 4: SEO Metadata */}
        <div className="space-y-6 pt-4 border-t border-outline-variant/20">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B4F42] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#0B4F42]" />
            <span>4. Pengaturan SEO Custom Halaman Ini</span>
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
              Meta Title Custom
            </label>
            <input
              type="text"
              name="meta_title"
              defaultValue={initialJob?.meta_title || ""}
              placeholder="Lowongan Kerja Asisten Rumah Tangga (ART) Resmi Gaji Utuh"
              className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
              Meta Description Custom
            </label>
            <textarea
              name="meta_description"
              rows={2}
              defaultValue={initialJob?.meta_description || ""}
              placeholder="Lowongan kerja ART resmi penempatan Jabodetabek. Gaji utuh Rp2-4 juta/bulan..."
              className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-outline-variant/20">
          <button
            type="submit"
            disabled={isPending}
            className="px-8 py-3.5 rounded-2xl bg-[#0B4F42] hover:bg-[#00372d] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>{isPending ? "Sedang Menyimpan..." : isEdit ? "Simpan Perubahan Lowongan" : "Publikasikan Lowongan Ini"}</span>
          </button>
        </div>
      </form>

      <NotificationModal
        isOpen={showNotificationModal}
        title={isEdit ? "Lowongan Kerja Berhasil Diperbarui!" : "Lowongan Kerja Berhasil Ditambahkan!"}
        message={notificationMessage}
        autoCloseMs={1500}
        onClose={handleNotificationClose}
      />
    </div>
  );
}
