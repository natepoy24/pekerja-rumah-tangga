"use client";

import { useState } from "react";

const SUKU_PRESET = ["Jawa", "Sunda", "Madura", "Batak", "Lampung", "Palembang", "Bugis"];

export default function SukuInput({ defaultValue = "" }: { defaultValue?: string }) {
  const [sukuSelect, setSukuSelect] = useState(() => {
    if (!defaultValue) return "Jawa";
    return SUKU_PRESET.includes(defaultValue) ? defaultValue : "Lainnya";
  });
  const [customSuku, setCustomSuku] = useState(() => {
    if (!defaultValue) return "";
    return SUKU_PRESET.includes(defaultValue) ? "" : defaultValue;
  });

  return (
    <div className="space-y-2 font-sans">
      <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">Suku</label>
      <select
        value={sukuSelect}
        onChange={(e) => setSukuSelect(e.target.value)}
        className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20 font-medium"
      >
        {SUKU_PRESET.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
        <option value="Lainnya">Lainnya (Ketik Manual)</option>
      </select>

      {sukuSelect === "Lainnya" ? (
        <input
          type="text"
          name="suku"
          required
          value={customSuku}
          onChange={(e) => setCustomSuku(e.target.value)}
          placeholder="Tuliskan nama suku..."
          className="w-full bg-white border border-outline-variant rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20"
        />
      ) : (
        <input type="hidden" name="suku" value={sukuSelect} />
      )}
    </div>
  );
}
