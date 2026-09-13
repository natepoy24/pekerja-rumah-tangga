"use client";

import { useState, useEffect } from "react";
import { Plus, Check, Sparkles, Loader2, Edit2, Trash2, Save, X } from "lucide-react";
import {
  getMasterKeahlian,
  addMasterKeahlian,
  updateMasterKeahlian,
  deleteMasterKeahlian,
} from "@/app/actions";
import toast from "react-hot-toast";

const DEFAULT_KETERAMPILAN_MAP: Record<string, string[]> = {
  "Asisten Rumah Tangga": [
    "Memasak Makanan Indonesia",
    "Mencuci & Menyetrika Rapi",
    "Membersihkan Rumah (Deep Cleaning)",
    "Mengoperasikan Mesin Cuci",
    "Mengurus Tanaman / Kebun",
    "Mengasuh Anak Kecil (Bantu)",
    "Mengurus Hewan Peliharaan",
  ],
  "Baby Sitter": [
    "Memandikan Bayi Baru Lahir (Newborn)",
    "Membuat & Sterilisasi Botol Susu",
    "Menyiapkan MPASI Sehat",
    "Menstimulasi Tumbuh Kembang Anak",
    "Pendampingan Belajar Anak",
    "Pertolongan Pertama Bayi / Anak",
    "Menidurkan & Menjaga Tidur Bayi",
  ],
  "Perawat Lansia": [
    "Merawat Lansia Bedridden (Tirah Baring)",
    "Mendampingi Aktivitas Harian Lansia",
    "Menyiapkan Makanan & Obat Sesuai Jadwal",
    "Mengukur Tensi & Gula Darah",
    "Membantu Fisioterapi Ringan / Jalan",
    "Memandikan Lansia Menggunakan Kursi Roda",
    "Sabar & Menangani Demensia / Alzheimer",
  ],
  "Supir": [
    "Mengemudikan Mobil Transmisi Manual & Matic",
    "Memahami Rute Jabodetabek & Tol",
    "Perawatan & Kebersihan Kendaraan",
    "Disiplin Waktu & Mengutamakan Keselamatan",
  ],
  "Tukang Kebun": [
    "Pemangkasan & Perapian Tanaman",
    "Pemupukan & Pemeliharaan Tanah",
    "Pembersihan Area Halaman & Taman",
  ],
};

export default function KeterampilanSelector({
  kategoriDefault = "Asisten Rumah Tangga",
  defaultSelected = [],
}: {
  kategoriDefault?: string;
  defaultSelected?: string[] | string;
}) {
  const [selectedKategori, setSelectedKategori] = useState(kategoriDefault);

  const initialSelectedArray = Array.isArray(defaultSelected)
    ? defaultSelected
    : typeof defaultSelected === "string"
    ? defaultSelected.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const [selectedSkill, setSelectedSkill] = useState<string[]>(initialSelectedArray);
  const [skillsList, setSkillsList] = useState<string[]>([]);
  const [newSkillInput, setNewSkillInput] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Edit skill inline state
  const [editingSkill, setEditingSkill] = useState<string | null>(null);
  const [editInputValue, setEditInputValue] = useState("");

  // Load skills from master_keahlian table
  useEffect(() => {
    let isMounted = true;
    async function loadSkills() {
      setIsLoading(true);
      const res = await getMasterKeahlian(selectedKategori);
      if (isMounted) {
        const defaults =
          DEFAULT_KETERAMPILAN_MAP[selectedKategori] ||
          DEFAULT_KETERAMPILAN_MAP["Asisten Rumah Tangga"];
        if (res.success && res.data && res.data.length > 0) {
          const dbSkills = res.data.map((item: any) => item.nama_keahlian);
          const combined = Array.from(new Set([...dbSkills, ...defaults]));
          setSkillsList(combined);
        } else {
          setSkillsList(defaults);
        }
        setIsLoading(false);
      }
    }
    loadSkills();
    return () => {
      isMounted = false;
    };
  }, [selectedKategori]);

  const toggleSkill = (skill: string) => {
    if (selectedSkill.includes(skill)) {
      setSelectedSkill(selectedSkill.filter((s) => s !== skill));
    } else {
      setSelectedSkill([...selectedSkill, skill]);
    }
  };

  const handleAddNewSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillInput || !newSkillInput.trim()) return;

    const trimmedSkill = newSkillInput.trim();
    setIsAdding(true);

    try {
      const res = await addMasterKeahlian(trimmedSkill, selectedKategori);
      if (res.success) {
        toast.success(`Keahlian "${trimmedSkill}" berhasil ditambahkan!`);
        if (!skillsList.includes(trimmedSkill)) {
          setSkillsList((prev) => [...prev, trimmedSkill]);
        }
        if (!selectedSkill.includes(trimmedSkill)) {
          setSelectedSkill((prev) => [...prev, trimmedSkill]);
        }
        setNewSkillInput("");
      } else {
        toast.error(res.error || "Gagal menambah keahlian baru");
      }
    } catch (err: any) {
      toast.error("Gagal menambah keahlian baru");
    } finally {
      setIsAdding(false);
    }
  };

  const handleStartEdit = (skill: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSkill(skill);
    setEditInputValue(skill);
  };

  const handleSaveEdit = async (oldSkill: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editInputValue || !editInputValue.trim() || editInputValue.trim() === oldSkill) {
      setEditingSkill(null);
      return;
    }

    const newSkill = editInputValue.trim();
    try {
      const res = await updateMasterKeahlian(oldSkill, newSkill);
      if (res.success) {
        toast.success(`Keahlian diperbarui menjadi "${newSkill}"`);
        setSkillsList((prev) => prev.map((s) => (s === oldSkill ? newSkill : s)));
        setSelectedSkill((prev) => prev.map((s) => (s === oldSkill ? newSkill : s)));
      }
    } catch (err) {
      toast.error("Gagal memperbarui keahlian");
    } finally {
      setEditingSkill(null);
    }
  };

  const handleDeleteSkill = async (skillToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`Hapus keahlian "${skillToDelete}" dari daftar master?`)) return;

    try {
      const res = await deleteMasterKeahlian(skillToDelete);
      if (res.success) {
        toast.success(`Keahlian "${skillToDelete}" telah dihapus.`);
        setSkillsList((prev) => prev.filter((s) => s !== skillToDelete));
        setSelectedSkill((prev) => prev.filter((s) => s !== skillToDelete));
      }
    } catch (err) {
      toast.error("Gagal menghapus keahlian");
    }
  };

  return (
    <div className="space-y-5 font-sans">
      {/* Selection Category */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
          Kategori Layanan Utama
        </label>
        <select
          name="kategori"
          value={selectedKategori}
          onChange={(e) => {
            setSelectedKategori(e.target.value);
          }}
          className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20"
        >
          <option value="Asisten Rumah Tangga">Asisten Rumah Tangga</option>
          <option value="Baby Sitter">Baby Sitter & Nanny</option>
          <option value="Perawat Lansia">Perawat Lansia</option>
          <option value="Supir">Supir Pribadi</option>
          <option value="Tukang Kebun">Tukang Kebun</option>
        </select>
      </div>

      {/* Multiple Skills Selection Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            Pilih Keahlian & Spesialisasi (Bisa Pilih Banyak)
          </label>
          <span className="text-xs text-[#0B4F42] font-medium bg-[#EBF4E7] px-2.5 py-0.5 rounded-full">
            {selectedSkill.length} Keahlian Terpilih
          </span>
        </div>

        {isLoading ? (
          <div className="flex items-center gap-2 text-xs text-on-surface-variant p-4">
            <Loader2 className="w-4 h-4 animate-spin text-[#0B4F42]" />
            <span>Memuat daftar keahlian dari database...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {skillsList.map((skill) => {
              const isChecked = selectedSkill.includes(skill);
              const isEditing = editingSkill === skill;

              if (isEditing) {
                return (
                  <div
                    key={skill}
                    className="flex items-center gap-2 p-2 rounded-xl border border-[#0B4F42] bg-white shadow-sm"
                  >
                    <input
                      type="text"
                      value={editInputValue}
                      onChange={(e) => setEditInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveEdit(skill, e);
                      }}
                      autoFocus
                      className="flex-1 bg-[#FAFAF7] border border-outline-variant/40 rounded-lg px-2.5 py-1 text-xs text-[#14201D] font-medium focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={(e) => handleSaveEdit(skill, e)}
                      className="p-1.5 bg-[#0B4F42] text-white rounded-lg hover:bg-[#00372d]"
                      title="Simpan"
                    >
                      <Save className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingSkill(null)}
                      className="p-1.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
                      title="Batal"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              }

              return (
                <div
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all group ${
                    isChecked
                      ? "bg-[#EBF4E7] border-[#3E7B28] text-[#3E7B28] font-semibold shadow-xs"
                      : "bg-surface-container-low border-outline-variant/30 text-on-surface hover:bg-surface-container"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                    <input
                      type="checkbox"
                      name="keahlian_khusus"
                      value={skill}
                      checked={isChecked}
                      onChange={() => {}}
                      className="rounded text-[#0B4F42] focus:ring-[#0B4F42] w-4 h-4 shrink-0"
                    />
                    <span className="truncate">{skill}</span>
                  </div>

                  {/* Actions: Edit & Delete */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleStartEdit(skill, e)}
                      className="p-1 text-slate-400 hover:text-[#0B4F42] hover:bg-white rounded transition-colors"
                      title="Edit Nama Keahlian"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDeleteSkill(skill, e)}
                      className="p-1 text-slate-400 hover:text-[#9E232A] hover:bg-white rounded transition-colors"
                      title="Hapus Keahlian"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Input Add New Skill directly to Master Table */}
        <div className="pt-3 border-t border-outline-variant/20">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#3E7B28]" />
            <span className="text-xs font-semibold text-[#0B4F42]">
              Keahlian tidak ada di daftar? Tambahkan keahlian baru ke database:
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              placeholder="Contoh: Merawat Kucing Anggora, Penyiapan Makanan Organik..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddNewSkill(e);
                }
              }}
              className="flex-1 bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 font-medium"
            />
            <button
              type="button"
              onClick={handleAddNewSkill}
              disabled={isAdding || !newSkillInput.trim()}
              className="px-4 py-2 bg-[#0B4F42] hover:bg-[#00372d] text-white text-xs font-semibold rounded-xl shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0"
            >
              {isAdding ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
              <span>+ Tambah Keahlian</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
