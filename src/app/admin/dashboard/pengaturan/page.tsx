import Link from "next/link";
import { getAllSettingsFromDb } from "@/lib/settings";
import SettingsEditor from "./SettingsEditor";
import { Settings, Sparkles, ExternalLink } from "lucide-react";

export const revalidate = 0;

export default async function PengaturanAdminPage() {
  const initialSettings = await getAllSettingsFromDb();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-[#D5E8D0] shadow-xs">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#14201D] tracking-tight flex items-center gap-2.5">
            <Settings className="w-7 h-7 text-[#0B4F42]" />
            <span>CMS Pengaturan Global & SEO</span>
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Ubah identitas PT, logo, nomor WhatsApp, gambar hero, foto layanan, dan meta SEO di semua halaman secara terpusat.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 rounded-xl border border-[#0B4F42] text-[#0B4F42] text-xs font-semibold hover:bg-[#EBF4E7] transition-colors inline-flex items-center gap-1.5"
          >
            <span>Lihat Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Editor Tabs & Forms */}
      <SettingsEditor initialSettings={initialSettings} />
    </div>
  );
}
