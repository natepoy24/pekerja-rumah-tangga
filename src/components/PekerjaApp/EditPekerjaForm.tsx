"use client";

import { useActionState, useEffect, useState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { updatePekerja } from "@/app/actions";
import { useRouter } from "next/navigation";
import SukuInput from "./SukuInput";
import KeterampilanSelector from "./KeterampilanSelector";
import ImageCropModal from "./ImageCropModal";
import Link from "next/link";
import { type PekerjaProps } from "./PekerjaCard";
import Image from "next/image";
import { User, ArrowLeft, Upload, Save, CheckCircle2, AlertTriangle, ArrowRight, Languages, Utensils } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-8 py-3.5 rounded-xl bg-[#0B4F42] hover:bg-[#00372d] text-white font-sans font-semibold shadow-md hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
    >
      <Save className="w-4 h-4" />
      <span>{pending ? "Memperbarui Profil..." : "Simpan Perubahan"}</span>
    </button>
  );
}

const BAHASA_OPTIONS = ["Inggris", "Kanton", "Mandarin", "Arab", "Korea"];

export default function EditPekerjaForm({ pekerja }: { pekerja: PekerjaProps }) {
  const router = useRouter();
  const initialState = { success: undefined, message: undefined, error: undefined };
  const [state, formAction] = useActionState(updatePekerja, initialState as any);

  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initial languages logic
  const initialBahasaArray = Array.isArray(pekerja.bahasa_asing) ? pekerja.bahasa_asing : [];
  const knownBahasa = initialBahasaArray.filter((b) => BAHASA_OPTIONS.includes(b));
  const otherBahasa = initialBahasaArray.filter((b) => !BAHASA_OPTIONS.includes(b));

  const [selectedBahasa, setSelectedBahasa] = useState<string[]>(knownBahasa);
  const [hasBahasaLainnya, setHasBahasaLainnya] = useState(otherBahasa.length > 0);
  const [bahasaLainnyaText, setBahasaLainnyaText] = useState(otherBahasa.join(", "));

  // Initial masakan khusus
  const initialMasakan = pekerja.masakan_khusus || "";
  const [hasMasakanKhusus, setHasMasakanKhusus] = useState(Boolean(initialMasakan));
  const [masakanKhususText, setMasakanKhususText] = useState(initialMasakan);

  // Popup Modal States
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalErrorMessage, setModalErrorMessage] = useState("");
  const [modalSuccessMessage, setModalSuccessMessage] = useState("");

  useEffect(() => {
    if (state?.success === true) {
      setModalSuccessMessage(state.message || "Profil pekerja berhasil diperbarui!");
      setShowSuccessModal(true);

      const timer = setTimeout(() => {
        router.push("/admin/dashboard/pekerja");
      }, 2000);
      return () => clearTimeout(timer);
    } else if (state?.success === false && state?.error) {
      setModalErrorMessage(state.error);
      setShowErrorModal(true);
    }
  }, [state, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageToCrop(URL.createObjectURL(file));
  };

  const handleCropComplete = (croppedFile: File) => {
    setCroppedImageFile(croppedFile);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const toggleBahasa = (lang: string) => {
    if (selectedBahasa.includes(lang)) {
      setSelectedBahasa(selectedBahasa.filter((b) => b !== lang));
    } else {
      setSelectedBahasa([...selectedBahasa, lang]);
    }
  };

  const handleFormSubmit = (formData: FormData) => {
    if (croppedImageFile) {
      formData.set("fotoUrl", croppedImageFile, croppedImageFile.name);
    } else if (fileInputRef.current?.files?.[0]) {
      formData.set("fotoUrl", fileInputRef.current.files[0]);
    }

    if (hasBahasaLainnya && bahasaLainnyaText.trim()) {
      formData.append("bahasa_asing", bahasaLainnyaText.trim());
    }

    if (hasMasakanKhusus && masakanKhususText.trim()) {
      formData.set("masakan_khusus", masakanKhususText.trim());
    } else {
      formData.set("masakan_khusus", "");
    }

    formAction(formData);
  };

  const currentFoto = pekerja.fotoUrl || pekerja.foto_url || "/Image/placeholder.png";

  return (
    <div className="max-w-4xl mx-auto font-sans relative">
      {imageToCrop && (
        <ImageCropModal upImg={imageToCrop} onClose={() => setImageToCrop(null)} onComplete={handleCropComplete} />
      )}

      {/* SUCCESS POPUP MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-[#D5E8D0] shadow-2xl space-y-6 text-center relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-[#EBF4E7] text-[#3E7B28] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-[#3E7B28]" />
            </div>

            <div className="space-y-2 relative z-10">
              <h3 className="font-serif text-2xl font-bold text-[#0B4F42]">
                Perubahan Disimpan!
              </h3>
              <p className="font-sans text-sm text-[#404945] leading-relaxed">
                {modalSuccessMessage}
              </p>
              <p className="font-sans text-xs text-[#0B4F42] font-semibold pt-1">
                Mengalihkan kembali ke daftar pekerja...
              </p>
            </div>

            <div className="pt-2 relative z-10">
              <button
                onClick={() => router.push("/admin/dashboard/pekerja")}
                className="w-full py-3.5 px-6 bg-[#0B4F42] hover:bg-[#00372d] text-white font-sans text-sm font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Lihat Daftar Pekerja Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ERROR POPUP MODAL */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-[#ffdad6] shadow-2xl space-y-6 text-center relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mx-auto shadow-sm">
              <AlertTriangle className="w-8 h-8 text-[#ba1a1a]" />
            </div>

            <div className="space-y-2 relative z-10">
              <h3 className="font-serif text-2xl font-bold text-[#ba1a1a]">
                Gagal Memperbarui Profil
              </h3>
              <div className="font-sans text-xs text-[#404945] leading-relaxed p-3 bg-[#FAFAF7] rounded-xl border border-outline-variant/30 text-left max-h-40 overflow-y-auto">
                {modalErrorMessage}
              </div>
            </div>

            <div className="pt-2 relative z-10">
              <button
                onClick={() => setShowErrorModal(false)}
                className="w-full py-3.5 px-6 bg-[#9E232A] hover:bg-[#8c151f] text-white font-sans text-sm font-semibold rounded-xl shadow-md transition-all"
              >
                Tutup & Perbaiki Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Breadcrumbs */}
      <div className="mb-8">
        <Link href="/admin/dashboard/pekerja" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B4F42] hover:underline mb-3">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Pekerja</span>
        </Link>
        <h2 className="font-serif text-3xl font-bold text-[#14201D] tracking-tight">Edit Profil Pekerja</h2>
        <p className="text-sm text-on-surface-variant mt-1">Perbarui data profil untuk {pekerja.nama}.</p>
      </div>

      <form action={handleFormSubmit} className="space-y-8">
        <input type="hidden" name="id" defaultValue={pekerja?.id} />
        <input type="hidden" name="currentFotoUrl" defaultValue={currentFoto} />

        {/* SECTION 1: PROFIL DASAR */}
        <section className="bg-white p-6 rounded-2xl border border-[#D5E8D0] shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
            <div className="w-9 h-9 rounded-xl bg-[#EBF4E7] flex items-center justify-center text-[#3E7B28]">
              <User className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#14201D]">1. Identitas & Informasi Dasar</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="nama"
                required
                defaultValue={pekerja.nama}
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Domisili Pekerja (Kota Asal)
              </label>
              <input
                type="text"
                name="lokasi"
                defaultValue={pekerja.lokasi || ""}
                placeholder="Contoh: Brebes, Jawa Tengah"
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Umur (Tahun)
              </label>
              <input
                type="number"
                name="umur"
                required
                defaultValue={pekerja.umur || 25}
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Agama
              </label>
              <select
                name="agama"
                defaultValue={pekerja.agama || "Islam"}
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 font-medium"
              >
                <option value="Islam">Islam</option>
                <option value="Kristen Protestan">Kristen Protestan</option>
                <option value="Katolik">Katolik</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddha">Buddha</option>
                <option value="Konghucu">Konghucu</option>
              </select>
            </div>

            <SukuInput defaultValue={pekerja.suku} />

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Status Perkawinan
              </label>
              <select
                name="status_perkawinan"
                defaultValue={pekerja.status_perkawinan || "Lajang"}
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 font-medium"
              >
                <option value="Lajang">Lajang (Belum Menikah)</option>
                <option value="Menikah">Menikah</option>
                <option value="Janda / Duda">Janda / Duda</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Pendidikan Terakhir
              </label>
              <select
                name="pendidikan_terakhir"
                defaultValue={pekerja.pendidikan_terakhir || "SMP"}
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 font-medium"
              >
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA / SMK">SMA / SMK</option>
                <option value="Diploma / S1">Diploma / S1</option>
              </select>
            </div>
          </div>
        </section>

        {/* SECTION 2: KATEGORI & KETERAMPILAN */}
        <section className="bg-white p-6 rounded-2xl border border-[#D5E8D0] shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
            <h3 className="font-serif text-xl font-bold text-[#14201D]">2. Kategori Layanan & Keahlian</h3>
          </div>

          <KeterampilanSelector
            kategoriDefault={pekerja.kategori}
            defaultSelected={pekerja.keahlian_khusus}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-outline-variant/20">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Pengalaman Kerja (Tahun)
              </label>
              <input
                type="number"
                name="pengalaman"
                required
                defaultValue={pekerja.pengalaman}
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Ekspektasi Gaji Bulanan (Rp)
              </label>
              <input
                type="number"
                name="gaji"
                required
                defaultValue={pekerja.gaji}
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Status Ketersediaan
              </label>
              <select
                name="status"
                defaultValue={pekerja.status}
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 font-medium"
              >
                <option value="Tersedia">Tersedia Siap Kerja</option>
                <option value="Akan Tersedia">Akan Tersedia (Inden)</option>
              </select>
            </div>
          </div>
        </section>

        {/* SECTION 3: KEMAMPUAN BAHASA & KEAHLIAN MASAKAN KHUSUS */}
        <section className="bg-white p-6 rounded-2xl border border-[#D5E8D0] shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
            <Languages className="w-5 h-5 text-[#0B4F42]" />
            <h3 className="font-serif text-xl font-bold text-[#14201D]">3. Kemampuan Bahasa Asing & Masakan Khusus</h3>
          </div>

          {/* Bahasa Asing Checkboxes */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Kemampuan Bahasa Asing (Pilih yang Dikuasai)
            </label>
            <div className="flex flex-wrap gap-3">
              {BAHASA_OPTIONS.map((lang) => {
                const isChecked = selectedBahasa.includes(lang);
                return (
                  <label
                    key={lang}
                    onClick={() => toggleBahasa(lang)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                      isChecked
                        ? "bg-[#EBF4E7] border-[#3E7B28] text-[#3E7B28] font-semibold"
                        : "bg-surface-container-low border-outline-variant/30 text-on-surface hover:bg-surface-container"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="bahasa_asing"
                      value={lang}
                      checked={isChecked}
                      onChange={() => {}}
                      className="rounded text-[#0B4F42] focus:ring-[#0B4F42]"
                    />
                    <span>{lang}</span>
                  </label>
                );
              })}

              <label
                onClick={() => setHasBahasaLainnya(!hasBahasaLainnya)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                  hasBahasaLainnya
                    ? "bg-[#EBF4E7] border-[#3E7B28] text-[#3E7B28] font-semibold"
                    : "bg-surface-container-low border-outline-variant/30 text-on-surface hover:bg-surface-container"
                }`}
              >
                <input
                  type="checkbox"
                  checked={hasBahasaLainnya}
                  onChange={() => {}}
                  className="rounded text-[#0B4F42] focus:ring-[#0B4F42]"
                />
                <span>Lainnya...</span>
              </label>
            </div>

            {hasBahasaLainnya && (
              <div className="pt-2">
                <input
                  type="text"
                  value={bahasaLainnyaText}
                  onChange={(e) => setBahasaLainnyaText(e.target.value)}
                  placeholder="Ketik bahasa asing lainnya (contoh: Jepang, Tagalog)..."
                  className="w-full sm:w-80 bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 font-medium"
                />
              </div>
            )}
          </div>

          {/* Masakan Khusus Checkbox & Input */}
          <div className="space-y-3 pt-4 border-t border-outline-variant/20">
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-[#0B4F42]" />
              <label className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-on-surface cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasMasakanKhusus}
                  onChange={(e) => setHasMasakanKhusus(e.target.checked)}
                  className="rounded text-[#0B4F42] focus:ring-[#0B4F42]"
                />
                <span>Punya Spesialisasi / Masakan Khusus?</span>
              </label>
            </div>

            {hasMasakanKhusus && (
              <div className="pl-7">
                <input
                  type="text"
                  value={masakanKhususText}
                  onChange={(e) => setMasakanKhususText(e.target.value)}
                  placeholder="Contoh: Masakan Sunda, Masakan Padang, Western Food, Baking / Kue..."
                  className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 font-medium"
                />
              </div>
            )}
          </div>
        </section>

        {/* SECTION 4: SPESIFIKASI FISIK & CATATAN KHUSUS */}
        <section className="bg-white p-6 rounded-2xl border border-[#D5E8D0] shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
            <h3 className="font-serif text-xl font-bold text-[#14201D]">4. Spesifikasi Fisik & Catatan</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Tinggi Badan (cm)
              </label>
              <input
                type="number"
                name="tinggi_badan"
                defaultValue={pekerja.tinggi_badan || 155}
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Berat Badan (kg)
              </label>
              <input
                type="number"
                name="berat_badan"
                defaultValue={pekerja.berat_badan || 50}
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 font-medium"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 text-sm font-medium text-on-surface cursor-pointer">
              <input
                type="checkbox"
                name="bisa_bawa_motor"
                defaultChecked={pekerja.bisa_bawa_motor}
                className="rounded text-[#0B4F42] focus:ring-[#0B4F42]"
              />
              <span>Bisa Mengendarai Sepeda Motor</span>
            </label>

            <label className="flex items-center gap-3 text-sm font-medium text-on-surface cursor-pointer">
              <input
                type="checkbox"
                name="takut_anjing"
                defaultChecked={pekerja.takut_anjing}
                className="rounded text-[#0B4F42] focus:ring-[#0B4F42]"
              />
              <span>Takut Anjing / Hewan Peliharaan Berbulu</span>
            </label>

            <label className="flex items-center gap-3 text-sm font-medium text-on-surface cursor-pointer">
              <input
                type="checkbox"
                name="bisa_masak_babi"
                defaultChecked={pekerja.bisa_masak_babi}
                className="rounded text-[#0B4F42] focus:ring-[#0B4F42]"
              />
              <span>Bisa Memasak Daging Babi</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
              Deskripsi Profil / Catatan Tambahan
            </label>
            <textarea
              name="deskripsi"
              rows={4}
              defaultValue={pekerja.deskripsi || ""}
              className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl p-4 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 font-medium"
            ></textarea>
          </div>
        </section>

        {/* SECTION 5: FOTO PROFIL */}
        <section className="bg-white p-6 rounded-2xl border border-[#D5E8D0] shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
            <Upload className="w-5 h-5 text-[#0B4F42]" />
            <h3 className="font-serif text-xl font-bold text-[#14201D]">5. Foto Profil Pekerja</h3>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-outline-variant/40 shrink-0 bg-surface-container-low">
                <Image src={currentFoto} alt={pekerja.nama} fill sizes="96px" className="object-cover" />
              </div>

              <div className="text-xs text-on-surface-variant">
                <p className="font-semibold text-on-surface">Foto Saat Ini</p>
                <p className="text-[11px] text-on-surface-variant/70">Akan tetap digunakan jika tidak diganti</p>
              </div>
            </div>

            <div className="flex-1 w-full space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Pilih Foto Baru (Opsional)
              </label>
              <input
                ref={fileInputRef}
                type="file"
                name="fotoUrl"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-on-surface file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#EBF4E7] file:text-[#3E7B28] hover:file:bg-[#D5E8D0] transition-colors cursor-pointer"
              />
              <p className="text-xs text-on-surface-variant/70">
                Format: JPG, PNG, WEBP. Otomatis dipotong rapi dengan rasio 1:1.
              </p>
            </div>
          </div>

          {croppedImageFile && (
            <div className="flex items-center justify-between gap-4 bg-[#EBF4E7] p-4 rounded-2xl border border-[#D5E8D0]">
              <div className="flex items-center gap-3">
                <img
                  src={URL.createObjectURL(croppedImageFile)}
                  alt="Foto Profil Baru"
                  className="w-16 h-16 rounded-xl object-cover border border-[#3E7B28] shadow-sm"
                />
                <div className="text-xs space-y-1">
                  <span className="font-bold text-[#3E7B28] flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="w-4 h-4" /> Foto Baru Siap Disimpan
                  </span>
                  <p className="text-on-surface-variant text-[11px]">
                    Ukuran: {(croppedImageFile.size / 1024).toFixed(1)} KB (Telah disesuaikan)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCroppedImageFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="text-xs font-semibold text-rose-600 hover:text-rose-800 bg-white px-3 py-1.5 rounded-lg border border-rose-200 transition-colors"
              >
                Batal Ganti
              </button>
            </div>
          )}
        </section>

        <div className="flex justify-end gap-4 pt-4">
          <Link
            href="/admin/dashboard/pekerja"
            className="px-6 py-3.5 rounded-xl border border-outline-variant text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors"
          >
            Batal
          </Link>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
