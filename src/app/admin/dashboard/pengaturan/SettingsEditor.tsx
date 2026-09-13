"use client";

import { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import { updateSiteSetting, seedDefaultSiteSettings } from "@/app/actions";
import {
  Building2,
  Home,
  HeartHandshake,
  Baby,
  HeartPulse,
  Info,
  PhoneCall,
  Users,
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Save,
  Layers,
  Sparkles,
  HelpCircle,
  Plus,
  Trash2,
  Briefcase,
} from "lucide-react";
import { FaqItem, DEFAULT_PAGE_SETTINGS } from "@/lib/settings-data";

interface SettingsEditorProps {
  initialSettings: Record<string, any>;
}

export default function SettingsEditor({ initialSettings }: SettingsEditorProps) {
  const [activeTab, setActiveTab] = useState<string>("company_identity");
  const [settings, setSettings] = useState<Record<string, any>>(initialSettings);
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [previews, setPreviews] = useState<Record<string, string>>({});

  // Managed FAQ items state for the currently active tab
  const [faqsList, setFaqsList] = useState<FaqItem[]>([]);

  // Update faqsList when activeTab or settings change
  useEffect(() => {
    if (activeTab !== "company_identity") {
      const currentFaqs =
        settings[activeTab]?.faqs || DEFAULT_PAGE_SETTINGS[activeTab]?.faqs || [];
      setFaqsList(currentFaqs);
    }
  }, [activeTab, settings]);

  const handleFaqChange = (index: number, field: "question" | "answer", value: string) => {
    setFaqsList((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddFaq = () => {
    setFaqsList((prev) => [...prev, { question: "", answer: "" }]);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqsList((prev) => prev.filter((_, i) => i !== index));
  };

  const tabs = [
    { id: "company_identity", label: "Identitas PT & Kontak", icon: Building2 },
    { id: "page_home", label: "Beranda (Home)", icon: Home },
    { id: "page_layanan", label: "Induk Layanan", icon: Layers },
    { id: "page_art", label: "Layanan: ART", icon: HeartHandshake },
    { id: "page_baby_sitter", label: "Layanan: Baby Sitter", icon: Baby },
    { id: "page_perawat_lansia", label: "Layanan: Perawat Lansia", icon: HeartPulse },
    { id: "page_tentang_kami", label: "Tentang Kami", icon: Info },
    { id: "page_kontak", label: "Kontak", icon: PhoneCall },
    { id: "page_pekerja", label: "Katalog Pekerja", icon: Users },
    { id: "page_artikel", label: "Artikel & Edukasi", icon: FileText },
    { id: "page_lowongan_kerja", label: "Lowongan Kerja", icon: Briefcase },
  ];

  const handleFileChange = (fieldKey: string, file: File | null) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviews((prev) => ({ ...prev, [fieldKey]: previewUrl }));
    }
  };

  const handleSaveTab = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const res = await updateSiteSetting(activeTab, formData);
      if (res?.error) {
        setStatusMessage({ type: "error", text: res.error });
      } else {
        setStatusMessage({ type: "success", text: "Pengaturan berhasil disimpan & diperbarui secara live!" });
        // Update local settings representation
        const updatedEntries: Record<string, any> = { ...(settings[activeTab] || {}) };
        for (const [k, v] of formData.entries()) {
          if (typeof v === "string" && !k.endsWith("_file")) {
            updatedEntries[k] = v;
          }
        }
        if (activeTab !== "company_identity") {
          updatedEntries.faqs = faqsList;
        }
        setSettings((prev) => ({ ...prev, [activeTab]: updatedEntries }));
      }
    });
  };

  const handleSeedDefaults = () => {
    if (!confirm("Apakah Anda yakin ingin menyinkronkan seluruh data default website ke database Supabase? Data yang ada di tabel site_settings akan diperbarui.")) {
      return;
    }
    setStatusMessage(null);
    startTransition(async () => {
      const res = await seedDefaultSiteSettings();
      if (res?.error) {
        setStatusMessage({ type: "error", text: res.error });
      } else {
        setStatusMessage({ type: "success", text: "Semua data default website berhasil disinkronkan ke Supabase!" });
      }
    });
  };

  const currentData = settings[activeTab] || {};

  return (
    <div className="space-y-8">
      {/* Top Banner / Sync Trigger */}
      <div className="bg-gradient-to-r from-[#0B4F42] to-[#155100] text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              CMS Konten Global & SEO
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-white">
            Pusat Pengaturan Metadata & Gambar Halaman
          </h2>
          <p className="text-xs md:text-sm text-emerald-100/90 mt-1 max-w-2xl">
            Kelola identitas perusahaan, logo, favicon, hero image, foto layanan, serta Meta Title, Meta Description, dan OpenGraph di semua halaman website tanpa perlu ubah kode.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSeedDefaults}
          disabled={isPending}
          className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center gap-2 transition-all shrink-0 hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isPending ? "animate-spin" : ""}`} />
          <span>Sinkronkan Default ke Database</span>
        </button>
      </div>

      {/* Alert Status */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border text-sm font-medium flex items-center gap-3 animate-in fade-in duration-200 ${statusMessage.type === "success"
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

      {/* Main Grid: Tabs + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="bg-white p-3 rounded-3xl border border-[#D5E8D0] shadow-sm space-y-1.5 h-fit">
          <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/70 px-4 py-2">
            Pilih Halaman / Sektor
          </p>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setStatusMessage(null);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-xs font-semibold transition-all ${isActive
                    ? "bg-[#0B4F42] text-white shadow-md shadow-[#0B4F42]/15 scale-[1.02]"
                    : "text-[#14201D] hover:bg-[#EBF4E7] text-[#14201D]/80"
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-emerald-300" : "text-[#0B4F42]"}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Form Editor */}
        <div className="lg:col-span-3">
          <form
            key={activeTab}
            onSubmit={handleSaveTab}
            className="bg-white p-8 rounded-3xl border border-[#D5E8D0] shadow-sm space-y-8"
          >
            {/* Form Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-outline-variant/20">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#14201D]">
                  {tabs.find((t) => t.id === activeTab)?.label}
                </h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  ID Database: <code className="font-mono bg-[#EBF4E7] px-2 py-0.5 rounded text-[#0B4F42] font-semibold">{activeTab}</code>
                </p>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="px-6 py-3 rounded-2xl bg-[#0B4F42] hover:bg-[#00372d] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50 active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>{isPending ? "Menyimpan..." : "Simpan Perubahan"}</span>
              </button>
            </div>

            {/* TAB 1: IDENTITAS PERUSAHAAN */}
            {activeTab === "company_identity" ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                      Nama Perusahaan / Brand
                    </label>
                    <input
                      type="text"
                      name="nama_perusahaan"
                      defaultValue={currentData.nama_perusahaan || ""}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                      Subtagline / Kategori Brand
                    </label>
                    <input
                      type="text"
                      name="subtagline"
                      defaultValue={currentData.subtagline || ""}
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                    Tagline Resmi
                  </label>
                  <input
                    type="text"
                    name="tagline"
                    defaultValue={currentData.tagline || ""}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
                  />
                </div>

                {/* Logo & Favicon Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Logo */}
                  <div className="p-5 rounded-2xl bg-[#FAFAF7] border border-[#D5E8D0] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F42]">
                        Logo Perusahaan
                      </span>
                      <span className="text-[11px] text-on-surface-variant">PNG / JPG / WEBP</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white border border-[#D5E8D0] p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                        <Image
                          src={previews.logo_file || currentData.logo_url || "/logo.png"}
                          alt="Logo Preview"
                          width={64}
                          height={64}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#0B4F42] text-[#0B4F42] text-xs font-semibold hover:bg-[#EBF4E7] transition-colors">
                          <UploadCloud className="w-4 h-4" />
                          <span>Ganti Logo</span>
                          <input
                            type="file"
                            name="logo_file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange("logo_file", e.target.files?.[0] || null)}
                          />
                        </label>
                        <input type="hidden" name="logo_url" value={currentData.logo_url || ""} />
                        <p className="text-[11px] text-on-surface-variant truncate mt-1">
                          {currentData.logo_url || "/logo.png"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Favicon */}
                  <div className="p-5 rounded-2xl bg-[#FAFAF7] border border-[#D5E8D0] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F42]">
                        Favicon Website
                      </span>
                      <span className="text-[11px] text-on-surface-variant">Ikon Tab Browser</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white border border-[#D5E8D0] p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                        <Image
                          src={previews.favicon_file || currentData.favicon_url || "/logo.png"}
                          alt="Favicon Preview"
                          width={64}
                          height={64}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#0B4F42] text-[#0B4F42] text-xs font-semibold hover:bg-[#EBF4E7] transition-colors">
                          <UploadCloud className="w-4 h-4" />
                          <span>Ganti Favicon</span>
                          <input
                            type="file"
                            name="favicon_file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange("favicon_file", e.target.files?.[0] || null)}
                          />
                        </label>
                        <input type="hidden" name="favicon_url" value={currentData.favicon_url || ""} />
                        <p className="text-[11px] text-on-surface-variant truncate mt-1">
                          {currentData.favicon_url || "/logo.png"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Kontak & WhatsApp */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                      Nomor WhatsApp (API/Chat)
                    </label>
                    <input
                      type="text"
                      name="nomor_whatsapp"
                      defaultValue={currentData.nomor_whatsapp || ""}
                      placeholder="Contoh: 6285111399962"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
                    />
                    <p className="text-[11px] text-on-surface-variant mt-1">Gunakan kode negara (62...), tanpa tanda + atau spasi.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                      Nomor Telepon Kantor (Tampilan)
                    </label>
                    <input
                      type="text"
                      name="nomor_telepon"
                      defaultValue={currentData.nomor_telepon || ""}
                      placeholder="+62 851-1139-9962"
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                      Email Resmi
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={currentData.email || ""}
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
                    />
                  </div>
                </div>

                {/* Izin Resmi */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                      Izin KEMNAKER RI
                    </label>
                    <input
                      type="text"
                      name="izin_kemnaker"
                      defaultValue={currentData.izin_kemnaker || ""}
                      placeholder="LPK No. 410/2010"
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                      Izin DISNAKER
                    </label>
                    <input
                      type="text"
                      name="izin_disnaker"
                      defaultValue={currentData.izin_disnaker || ""}
                      placeholder="Terdaftar DISNAKER & PJTKI"
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
                    />
                  </div>
                </div>

                {/* Alamat & Maps */}
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                      Alamat Kantor Lengkap
                    </label>
                    <textarea
                      name="alamat_lengkap"
                      rows={2}
                      defaultValue={currentData.alamat_lengkap || ""}
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                        URL Google Maps
                      </label>
                      <input
                        type="url"
                        name="google_maps_url"
                        defaultValue={currentData.google_maps_url || ""}
                        placeholder="https://maps.app.goo.gl/..."
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                        Jam Operasional
                      </label>
                      <input
                        type="text"
                        name="jam_operasional"
                        defaultValue={currentData.jam_operasional || ""}
                        placeholder="Senin - Minggu: 08:00 - 21:00 WIB"
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                      Deskripsi Profil Perusahaan (Footer & Metadata Fallback)
                    </label>
                    <textarea
                      name="deskripsi"
                      rows={3}
                      defaultValue={currentData.deskripsi || ""}
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* TAB 2..N: PAGE SETTINGS (METADATA + HERO + SERVICE IMAGES) */
              <div className="space-y-8">
                {/* 1. SECTION HERO & CONTENT */}
                <div className="space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B4F42] flex items-center gap-2">
                    <span>1. Pengaturan Gambar Hero & Judul Halaman</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                        Judul Utama (Hero Title)
                      </label>
                      <input
                        type="text"
                        name="hero_title"
                        defaultValue={currentData.hero_title || ""}
                        placeholder="Judul banner halaman..."
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                        Alt Teks Gambar Hero (SEO Image)
                      </label>
                      <input
                        type="text"
                        name="hero_image_alt"
                        defaultValue={currentData.hero_image_alt || ""}
                        placeholder="Deskripsi gambar untuk Google..."
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                      Subjudul (Hero Subtitle)
                    </label>
                    <textarea
                      name="hero_subtitle"
                      rows={2}
                      defaultValue={currentData.hero_subtitle || ""}
                      placeholder="Subjudul atau penjelasan singkat..."
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
                    />
                  </div>

                  {/* Hero Image Box */}
                  <div className="p-6 rounded-2xl bg-[#FAFAF7] border border-[#D5E8D0] space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#0B4F42]">
                          Gambar Latar Hero (Full-Width Header)
                        </p>
                        <p className="text-[11px] text-on-surface-variant">
                          Format landscape disarankan (1920x1080 atau sebanding).
                        </p>
                      </div>
                    </div>

                    <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden bg-white border border-[#D5E8D0] group">
                      <Image
                        src={previews.hero_image_file || currentData.hero_image || "/asisten rumah tangga.jpeg"}
                        alt="Hero Preview"
                        fill
                        sizes="(max-width: 1024px) 100vw, 800px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#0B4F42] text-xs font-bold shadow-lg hover:scale-105 transition-all">
                          <UploadCloud className="w-4 h-4" />
                          <span>Pilih Foto Hero Baru</span>
                          <input
                            type="file"
                            name="hero_image_file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange("hero_image_file", e.target.files?.[0] || null)}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1">
                      <span className="truncate">URL: {currentData.hero_image || "-"}</span>
                      <input type="hidden" name="hero_image" value={currentData.hero_image || ""} />
                      <label className="cursor-pointer font-semibold text-[#0B4F42] hover:underline">
                        Upload Dari Komputer
                        <input
                          type="file"
                          name="hero_image_file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileChange("hero_image_file", e.target.files?.[0] || null)}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* KHUSUS BERANDA: FOTO-FOTO KARTU LAYANAN DI BERANDA */}
                {activeTab === "page_home" && (
                  <div className="space-y-6 pt-4 border-t border-outline-variant/20">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B4F42]">
                        2. Foto Kartu Layanan di Halaman Depan
                      </h4>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Ubah foto representasi 3 layanan utama di bagian section "Layanan Utama Kami" beranda.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Layanan ART */}
                      <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#D5E8D0] space-y-3">
                        <p className="text-xs font-bold text-[#14201D]">Layanan ART (Depan)</p>
                        <div className="relative w-full h-32 rounded-xl overflow-hidden bg-white border">
                          <Image
                            src={previews.service_art_image_file || currentData.service_art_image || "/asisten rumah tangga.jpeg"}
                            alt="ART Card"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                        <input type="hidden" name="service_art_image" value={currentData.service_art_image || ""} />
                        <label className="w-full cursor-pointer py-2 rounded-lg bg-white border border-[#0B4F42] text-[#0B4F42] text-[11px] font-semibold flex items-center justify-center gap-1.5 hover:bg-[#EBF4E7] transition-colors">
                          <UploadCloud className="w-3.5 h-3.5" />
                          <span>Ganti Foto ART</span>
                          <input
                            type="file"
                            name="service_art_image_file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange("service_art_image_file", e.target.files?.[0] || null)}
                          />
                        </label>
                      </div>

                      {/* Layanan Baby Sitter */}
                      <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#D5E8D0] space-y-3">
                        <p className="text-xs font-bold text-[#14201D]">Layanan Baby Sitter (Depan)</p>
                        <div className="relative w-full h-32 rounded-xl overflow-hidden bg-white border">
                          <Image
                            src={previews.service_babysitter_image_file || currentData.service_babysitter_image || "/baby sitter.jpeg"}
                            alt="Baby Sitter Card"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                        <input type="hidden" name="service_babysitter_image" value={currentData.service_babysitter_image || ""} />
                        <label className="w-full cursor-pointer py-2 rounded-lg bg-white border border-[#0B4F42] text-[#0B4F42] text-[11px] font-semibold flex items-center justify-center gap-1.5 hover:bg-[#EBF4E7] transition-colors">
                          <UploadCloud className="w-3.5 h-3.5" />
                          <span>Ganti Foto Baby Sitter</span>
                          <input
                            type="file"
                            name="service_babysitter_image_file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange("service_babysitter_image_file", e.target.files?.[0] || null)}
                          />
                        </label>
                      </div>

                      {/* Layanan Perawat Lansia */}
                      <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#D5E8D0] space-y-3">
                        <p className="text-xs font-bold text-[#14201D]">Layanan Perawat Lansia (Depan)</p>
                        <div className="relative w-full h-32 rounded-xl overflow-hidden bg-white border">
                          <Image
                            src={previews.service_perawat_image_file || currentData.service_perawat_image || "/perawat lansia.jpeg"}
                            alt="Perawat Lansia Card"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                        <input type="hidden" name="service_perawat_image" value={currentData.service_perawat_image || ""} />
                        <label className="w-full cursor-pointer py-2 rounded-lg bg-white border border-[#0B4F42] text-[#0B4F42] text-[11px] font-semibold flex items-center justify-center gap-1.5 hover:bg-[#EBF4E7] transition-colors">
                          <UploadCloud className="w-3.5 h-3.5" />
                          <span>Ganti Foto Lansia</span>
                          <input
                            type="file"

                            name="service_perawat_image_file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange("service_perawat_image_file", e.target.files?.[0] || null)}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. SECTION SEO & OPEN GRAPH */}
                <div className="space-y-6 pt-4 border-t border-outline-variant/20">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B4F42]">
                    {activeTab === "page_home" ? "3." : "2."} Pengaturan SEO & OpenGraph Metadata (Google & Sosmed)
                  </h4>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#14201D]">
                        Meta Title (Judul Tab & Hasil Pencarian Google)
                      </label>
                      <span className="text-[11px] text-on-surface-variant">Rekomendasi 50 - 65 karakter</span>
                    </div>
                    <input
                      type="text"
                      name="meta_title"
                      defaultValue={currentData.meta_title || ""}
                      required
                      placeholder="Judul SEO..."
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#14201D]">
                        Meta Description (Deskripsi Cuplikan Snippet Google)
                      </label>
                      <span className="text-[11px] text-on-surface-variant">Rekomendasi 120 - 160 karakter</span>
                    </div>
                    <textarea
                      name="meta_description"
                      rows={3}
                      defaultValue={currentData.meta_description || ""}
                      required
                      placeholder="Deskripsi pencarian..."
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14201D] mb-1.5">
                      Keywords / Kata Kunci Pencarian (Pisahkan dengan koma)
                    </label>
                    <input
                      type="text"
                      name="keywords"
                      defaultValue={currentData.keywords || ""}
                      placeholder="penyalur art, yayasan baby sitter, perawat lansia"
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-sm font-sans"
                    />
                  </div>

                  {/* OpenGraph Image */}
                  <div className="p-5 rounded-2xl bg-[#FAFAF7] border border-[#D5E8D0] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F42]">
                        Gambar Cuplikan Sosial Media (OpenGraph / WhatsApp / Facebook / Twitter Share)
                      </span>
                      <span className="text-[11px] text-on-surface-variant">1200x630 disarankan</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-24 h-14 rounded-xl bg-white border border-[#D5E8D0] relative overflow-hidden shrink-0">
                        <Image
                          src={previews.og_image_file || currentData.og_image || currentData.hero_image || "/asisten rumah tangga.jpeg"}
                          alt="OG Preview"
                          fill
                          sizes="120px"
                          className="object-cover"
                        />

                      </div>
                      <div className="flex-1 min-w-0">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#0B4F42] text-[#0B4F42] text-xs font-semibold hover:bg-[#EBF4E7] transition-colors">
                          <UploadCloud className="w-4 h-4" />
                          <span>Ganti Gambar Share (OG)</span>
                          <input
                            type="file"
                            name="og_image_file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange("og_image_file", e.target.files?.[0] || null)}
                          />
                        </label>
                        <input type="hidden" name="og_image" value={currentData.og_image || ""} />
                        <p className="text-[11px] text-on-surface-variant truncate mt-1">
                          {currentData.og_image || currentData.hero_image || "/asisten rumah tangga.jpeg"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. SECTION MANAGED FAQ LIST */}
                <div className="space-y-6 pt-6 border-t border-outline-variant/20">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B4F42] flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-[#0B4F42]" />
                        <span>{activeTab === "page_home" ? "4." : "3."} Editor FAQ (Pertanyaan yang Sering Diajukan)</span>
                      </h4>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Tambah, edit, atau hapus item pertanyaan & jawaban FAQ untuk halaman ini.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddFaq}
                      className="px-4 py-2 rounded-xl bg-[#EBF4E7] hover:bg-[#D5E8D0] text-[#0B4F42] text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah FAQ Baru</span>
                    </button>
                  </div>

                  <input type="hidden" name="faqs_json" value={JSON.stringify(faqsList)} />

                  <div className="space-y-4">
                    {faqsList.map((faq, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-[#FAFAF7] border border-[#D5E8D0] space-y-3 relative group">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F42]">
                            Pertanyaan #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFaq(idx)}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                            title="Hapus Pertanyaan Ini"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-[#14201D] mb-1">
                            Pertanyaan (Question)
                          </label>
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                            placeholder="Contoh: Bagaimana prosedur garansi penempatan?"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/50 bg-white focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-xs font-sans"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-[#14201D] mb-1">
                            Jawaban (Answer)
                          </label>
                          <textarea
                            rows={2}
                            value={faq.answer}
                            onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                            placeholder="Masukkan penjelasannya..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/50 bg-white focus:border-[#0B4F42] focus:ring-1 focus:ring-[#0B4F42] outline-none text-xs font-sans"
                          />
                        </div>
                      </div>
                    ))}

                    {faqsList.length === 0 && (
                      <p className="text-xs text-on-surface-variant italic text-center py-4 bg-[#FAFAF7] rounded-2xl border border-dashed border-[#D5E8D0]">
                        Belum ada pertanyaan FAQ untuk halaman ini. Klik "Tambah FAQ Baru" untuk membuat.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Form Footer Save Button */}
            <div className="flex justify-end pt-6 border-t border-outline-variant/20">
              <button
                type="submit"
                disabled={isPending}
                className="px-8 py-3.5 rounded-2xl bg-[#0B4F42] hover:bg-[#00372d] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50 active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>{isPending ? "Sedang Menyimpan..." : "Simpan Perubahan Halaman Ini"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
