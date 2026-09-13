"use client";

import { useState } from "react";
import { Plus, X, Tag } from "lucide-react";

const DEFAULT_TAGS = ["Edukasi", "Panduan Majikan", "Kesehatan Lansia", "Perawatan Bayi", "Tips Rumah Tangga"];

export default function TagSelector({ defaultValue = "" }: { defaultValue?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [availableTags, setAvailableTags] = useState<string[]>(DEFAULT_TAGS);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    defaultValue ? defaultValue.split(",").map((t) => t.trim()).filter(Boolean) : []
  );
  const [newTagName, setNewTagName] = useState("");

  const handleToggleTag = (tagName: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagName) ? prev.filter((t) => t !== tagName) : [...prev, tagName]
    );
  };

  const handleAddNewTag = () => {
    const trimmed = newTagName.trim();
    if (!trimmed) return;
    if (!availableTags.includes(trimmed)) {
      setAvailableTags((prev) => [...prev, trimmed]);
    }
    if (!selectedTags.includes(trimmed)) {
      setSelectedTags((prev) => [...prev, trimmed]);
    }
    setNewTagName("");
  };

  return (
    <div className="font-sans">
      <input type="hidden" name="tags" value={selectedTags.join(", ")} />

      <div className="flex flex-wrap gap-2 mb-3">
        {selectedTags.length === 0 && <span className="text-xs text-on-surface-variant/60 italic">Belum ada tag...</span>}
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-[#EBF4E7] text-[#3E7B28] text-xs font-semibold rounded-full border border-[#D5E8D0] flex items-center gap-1.5"
          >
            <Tag className="w-3 h-3" />
            #{tag}
            <button
              type="button"
              onClick={() => handleToggleTag(tag)}
              className="hover:text-red-600 transition-colors ml-0.5"
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full py-2.5 bg-surface-container-low border border-outline-variant/40 text-on-surface text-xs font-semibold rounded-xl hover:bg-surface-container transition-all flex items-center justify-center gap-1.5"
      >
        <Plus className="w-4 h-4 text-[#0B4F42]" />
        <span>Kelola Tag Artikel</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col overflow-hidden border border-outline-variant/30">
            <div className="flex justify-between items-center p-4 border-b border-outline-variant/20">
              <h3 className="font-serif text-lg font-bold text-[#14201D]">Pilih / Tambah Tag</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-on-surface-variant hover:text-on-surface text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <div className="p-4 max-h-60 overflow-y-auto flex flex-wrap gap-2">
              {availableTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleToggleTag(tag)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                      isSelected
                        ? "bg-[#0B4F42] border-[#0B4F42] text-white shadow-sm font-semibold"
                        : "bg-surface-container-low border-outline-variant/30 text-on-surface hover:bg-surface-container"
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>

            <div className="p-4 bg-surface-container-low border-t border-outline-variant/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Ketik tag baru..."
                  className="flex-1 px-3 py-2 border border-outline-variant/40 rounded-xl text-xs bg-white text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20"
                />
                <button
                  type="button"
                  onClick={handleAddNewTag}
                  disabled={!newTagName.trim()}
                  className="px-4 py-2 bg-[#0B4F42] text-white font-semibold text-xs rounded-xl hover:bg-[#00372d] disabled:opacity-50 transition-colors"
                >
                  Tambah
                </button>
              </div>
            </div>

            <div className="p-4 border-t border-outline-variant/20 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-[#14201D] text-white font-semibold text-xs rounded-xl hover:bg-black transition-colors"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
