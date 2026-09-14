"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { addArtikel } from "@/app/actions";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import Link from "next/link";
import TagSelector from "@/components/ArtikelApp/TagSelector";
import SeoMetadataForm from "@/components/ArtikelApp/SeoMetadataForm";
import ImageZoomModal from "@/components/ui/ImageZoomModal";
import { ArrowLeft, Save, Eye, ZoomIn } from "lucide-react";

const LexicalEditor = dynamic(() => import("@/components/ArtikelApp/LexicalEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-80 flex items-center justify-center bg-surface-container-low animate-pulse rounded-2xl border border-outline-variant/30 font-sans text-on-surface-variant">
      Memuat Editor Menulis...
    </div>
  ),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-8 py-3 rounded-xl bg-[#0B4F42] hover:bg-[#00372d] text-white font-sans font-semibold shadow-md active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
    >
      <Save className="w-4 h-4" />
      <span>{pending ? "Menyimpan..." : "Simpan & Diterbitkan"}</span>
    </button>
  );
}

import { useRouter } from "next/navigation";
import NotificationModal from "@/components/ui/NotificationModal";

export default function TambahArtikelPage() {
  const router = useRouter();
  const initialState = { error: undefined, success: undefined };
  const [state, formAction] = useActionState(addArtikel, initialState as any);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const editorContentRef = useRef("");
  const formRef = useRef<HTMLFormElement>(null);

  const [titleValue, setTitleValue] = useState("");
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.success) {
      setShowNotificationModal(true);
    }
  }, [state]);

  const handleNotificationClose = () => {
    setShowNotificationModal(false);
    router.push("/admin/dashboard/artikel");
    router.refresh();
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        toast.error("Ukuran foto maksimal adalah 3MB.");
        e.target.value = "";
        return;
      }
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handlePreview = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const judul = formData.get("judul") as string;
    const konten = editorContentRef.current;

    if (!judul || !konten) {
      toast.error("Judul dan Konten harus diisi untuk melihat pratinjau.");
      return;
    }

    const previewData = { judul, konten, gambarUrl: coverPreview || "/Image/placeholder.png" };
    sessionStorage.setItem("articlePreview", JSON.stringify(previewData));
    window.open("/admin/dashboard/artikel/preview", "_blank");
  };

  const handleFormSubmit = (formData: FormData) => {
    const imageFile = formData.get("gambar_utama") as File;
    if (imageFile && imageFile instanceof File && imageFile.size > 3 * 1024 * 1024) {
      toast.error("Ukuran foto maksimal adalah 3MB.");
      return;
    }

    if (!editorContentRef.current || editorContentRef.current.length < 20) {
      toast.error("Konten artikel tidak boleh kosong.");
      return;
    }

    formData.set("konten", editorContentRef.current);
    formAction(formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#14201D] tracking-tight">Tulis Artikel Edukasi Baru</h1>
        <p className="text-sm text-on-surface-variant mt-1">Buat artikel berkualitas untuk membantu calon majikan.</p>
      </div>

        <form ref={formRef} action={handleFormSubmit} className="space-y-8">
          {/* Judul & Status */}
          <div className="bg-white p-6 rounded-2xl border border-[#D5E8D0] shadow-sm space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Judul Artikel
              </label>
              <input
                type="text"
                name="judul"
                required
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                placeholder="Masukkan judul artikel yang menarik..."
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-lg font-serif font-bold text-[#14201D] focus:outline-none focus:ring-2 focus:ring-[#0B4F42]/20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                  Status Publikasi
                </label>
                <select
                  name="status"
                  className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm font-medium text-on-surface"
                >
                  <option value="Published">Langsung Terbit (Published)</option>
                  <option value="Draft">Simpan Sebagai Draft</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                  Tag / Kategori
                </label>
                <TagSelector />
              </div>
            </div>
          </div>

          {/* Gambar Cover */}
          <div className="bg-white p-6 rounded-2xl border border-[#D5E8D0] shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Gambar Cover Utama Artikel
              </label>
              {coverPreview && <span className="text-[11px] text-on-surface-variant">Klik gambar untuk zoom</span>}
            </div>

            {coverPreview && (
              <div
                onClick={() => setZoomImage({ src: coverPreview, alt: "Pratinjau Cover Artikel" })}
                className="relative w-full aspect-video rounded-xl overflow-hidden border border-outline-variant/30 mt-2 cursor-pointer group"
                title="Klik untuk Zoom"
              >
                <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <ZoomIn className="w-6 h-6 text-white drop-shadow" />
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <input
                type="file"
                name="gambar_utama"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-on-surface file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#EBF4E7] file:text-[#3E7B28] hover:file:bg-[#D5E8D0] transition-colors cursor-pointer"
              />
            </div>
          </div>

          {/* Rich Text Editor */}
          <div className="bg-white p-6 rounded-2xl border border-[#D5E8D0] shadow-sm space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
              Isi Artikel (Rich Text Editor)
            </label>
            <LexicalEditor
              onChange={(jsonString) => {
                editorContentRef.current = jsonString;
              }}
            />
          </div>

          {/* Pengaturan SEO & OpenGraph Metadata (Ditaruh di bagian bawah) */}
          <SeoMetadataForm
            titleValue={titleValue}
            coverImageSrc={coverPreview}
            getContent={() => editorContentRef.current}
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handlePreview}
              className="px-6 py-3 rounded-xl border border-[#0B4F42] text-[#0B4F42] font-semibold text-sm hover:bg-[#EBF4E7] transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              <span>Pratinjau Artikel</span>
            </button>
            <SubmitButton />
          </div>
        </form>

      <NotificationModal
        isOpen={showNotificationModal}
        title="Artikel Berhasil Diterbitkan!"
        message={`Artikel "${titleValue || 'baru'}" telah berhasil disimpan dan dipublikasikan.`}
        autoCloseMs={1500}
        onClose={handleNotificationClose}
      />

      <ImageZoomModal
        src={zoomImage?.src || null}
        alt={zoomImage?.alt}
        onClose={() => setZoomImage(null)}
      />
    </div>
  );
}
