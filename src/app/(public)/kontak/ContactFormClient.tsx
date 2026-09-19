"use client";

import { useState } from "react";
import { Send, Calendar, Briefcase, Home, FileText, CheckCircle2 } from "lucide-react";

export function ContactFormClient() {
  const [layanan, setLayanan] = useState("PRT");
  const [tipePenempatan, setTipePenempatan] = useState("Menginap (Live-in)");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [catatan, setCatatan] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6285111399962";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const native = e.nativeEvent as any;
    if (native && native.agentInvoked && typeof native.respondWith === "function") {
      native.respondWith(
        Promise.resolve({
          status: "success",
          message: "Formulir kriteria pekerja berhasil disiapkan dan diteruskan ke WhatsApp konsultan PT Jasa Mandiri.",
          data: {
            layanan,
            tipePenempatan,
            tanggalMulai: tanggalMulai || "Secepatnya",
            catatan: catatan || "-",
          },
        })
      );
    }

    const formattedMessage =
      `Halo PT Jasa Mandiri, saya ingin berkonsultasi mengenai kebutuhan tenaga kerja:\n\n` +
      `📌 *Pilihan Layanan:* ${layanan}\n` +
      `🏡 *Tipe Penempatan:* ${tipePenempatan}\n` +
      `📅 *Perkiraan Mulai:* ${tanggalMulai || "Secepatnya"}\n` +
      `📝 *Catatan Khusus:* ${catatan || "-"}\n\n` +
      `Mohon info kandidat yang tersedia. Terima kasih!`;

    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(formattedMessage)}`;

    setSubmitted(true);
    
    // Open WhatsApp in a new tab
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D5E8D0] shadow-md relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#EBF4E7] rounded-bl-full -z-0 pointer-events-none opacity-60" />

      <div className="relative z-10 space-y-6">
        <div>
          <span className="inline-block text-xs font-semibold text-[#0B4F42] bg-[#EBF4E7] px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Formulir Kurasi Kebutuhan
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#0B4F42]">
            Isi Kriteria Pekerja Anda
          </h3>
          <p className="font-sans text-xs text-[#404945] mt-1">
            Sampaikan kebutuhan spesifik rumah tangga Anda untuk respons fast-track via WhatsApp.
          </p>
        </div>

        {submitted && (
          <div className="p-4 rounded-xl bg-[#EBF4E7] border border-[#3E7B28]/30 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#3E7B28] shrink-0 mt-0.5" />
            <div className="text-xs text-[#14201D] leading-relaxed">
              <span className="font-bold block text-[#0B4F42] mb-0.5">Formulir Terkirim!</span>
              Sistem telah membuka percakapan WhatsApp resmi PT Jasa Mandiri. Jika halaman WhatsApp tidak terbuka otomatis, silakan klik tombol di bawah lagi.
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          toolname="konsultasiKebutuhanPekerja"
          tooldescription="Kirim formulir kurasi kebutuhan dan kriteria pekerja rumah tangga (PRT, Baby Sitter, atau Perawat Lansia) ke konsultan resmi PT Jasa Mandiri."
          className="space-y-5"
        >
          {/* Pilihan Layanan */}
          <div className="space-y-2">
            <label htmlFor="pilihanLayanan" className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#14201D] flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#0B4F42]" />
              <span>Pilihan Layanan</span>
            </label>
            <select
              id="pilihanLayanan"
              name="pilihanLayanan"
              aria-label="Pilihan Layanan"
              toolparamdescription="Pilihan kategori profesi pekerja: Asisten Rumah Tangga (PRT), Baby Sitter / Pengasuh Anak, atau Perawat Lansia (Elder Care)"
              value={layanan}
              onChange={(e) => setLayanan(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#D5E8D0] rounded-lg text-sm text-[#14201D] focus:outline-none focus:ring-2 focus:ring-[#0B4F42] focus:border-transparent transition-all"
            >
              <option value="PRT">Asisten Rumah Tangga (PRT)</option>
              <option value="Baby Sitter">Baby Sitter / Pengasuh Anak</option>
              <option value="Perawat Lansia">Perawat Lansia (Elder Care)</option>
            </select>
          </div>

          {/* Tipe Penempatan */}
          <div className="space-y-2">
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#14201D] flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-[#0B4F42]" />
              <span>Tipe Penempatan</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs sm:text-sm font-medium cursor-pointer transition-all ${
                  tipePenempatan.includes("Menginap")
                    ? "bg-[#0B4F42] text-white border-[#0B4F42] shadow-sm"
                    : "bg-[#FAFAF7] text-[#14201D] border-[#D5E8D0] hover:bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="tipePenempatan"
                  value="Menginap (Live-in)"
                  toolparamdescription="Tipe penempatan waktu kerja: Menginap (Live-in) di rumah majikan"
                  checked={tipePenempatan.includes("Menginap")}
                  onChange={(e) => setTipePenempatan(e.target.value)}
                  className="sr-only"
                />
                <span>Menginap (Live-in)</span>
              </label>

              <label
                className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs sm:text-sm font-medium cursor-pointer transition-all ${
                  tipePenempatan.includes("Pulang-Pergi")
                    ? "bg-[#0B4F42] text-white border-[#0B4F42] shadow-sm"
                    : "bg-[#FAFAF7] text-[#14201D] border-[#D5E8D0] hover:bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="tipePenempatan"
                  value="Pulang-Pergi (Live-out)"
                  toolparamdescription="Tipe penempatan waktu kerja: Pulang-Pergi (Live-out) harian"
                  checked={tipePenempatan.includes("Pulang-Pergi")}
                  onChange={(e) => setTipePenempatan(e.target.value)}
                  className="sr-only"
                />
                <span>Pulang-Pergi (Live-out)</span>
              </label>
            </div>
          </div>

          {/* Tanggal Mulai Bekerja */}
          <div className="space-y-2">
            <label htmlFor="tanggalMulai" className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#14201D] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#0B4F42]" />
              <span>Perkiraan Tanggal Mulai</span>
            </label>
            <input
              id="tanggalMulai"
              name="tanggalMulai"
              type="date"
              aria-label="Perkiraan Tanggal Mulai"
              toolparamdescription="Perkiraan tanggal pekerja mulai aktif bekerja di kediaman majikan"
              value={tanggalMulai}
              onChange={(e) => setTanggalMulai(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#D5E8D0] rounded-lg text-sm text-[#14201D] focus:outline-none focus:ring-2 focus:ring-[#0B4F42] focus:border-transparent transition-all"
            />
          </div>

          {/* Catatan Kriteria Khusus */}
          <div className="space-y-2">
            <label htmlFor="catatanKhusus" className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#14201D] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#0B4F42]" />
              <span>Catatan Kriteria Khusus</span>
            </label>
            <textarea
              id="catatanKhusus"
              name="catatanKhusus"
              aria-label="Catatan Kriteria Khusus"
              toolparamdescription="Catatan kriteria khusus kualifikasi pekerja (contoh: bisa memasak, rawat bayi, tidak takut anjing/kucing)"
              rows={3}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Contoh: Bisa memasak masakan Sunda, berpengalaman merawat balita 2 tahun, tidak takut hewan peliharaan..."
              className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#D5E8D0] rounded-lg text-sm text-[#14201D] focus:outline-none focus:ring-2 focus:ring-[#0B4F42] focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 bg-[#0B4F42] hover:bg-[#00372d] text-white font-sans text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
          >
            <span>Kirim Kriteria Kebutuhan</span>
            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <p className="text-center text-[11px] text-[#404945]">
          *Informasi kriteria Anda akan langsung terhubung ke konsultan penempatan kami via WhatsApp.
        </p>
      </div>
    </div>
  );
}
