"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { updateArtikel } from "@/app/actions";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import TagSelector from "@/components/ArtikelApp/TagSelector";
import SeoMetadataForm from "@/components/ArtikelApp/SeoMetadataForm";
import { Save, Eye } from "lucide-react";

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
      <span>{pending ? "Memperbarui..." : "Simpan Perubahan"}</span>
    </button>
  );
}

export default function EditArtikelFormClient({ article }: { article: any }) {
  const initialState = { error: undefined };
  const [state, formAction] = useActionState(updateArtikel, initialState as any);

  const initialContent = typeof article.konten === "object" ? JSON.stringify(article.konten) : article.konten;
  const editorContentRef = useRef(initialContent || "");
  const formRef = useRef<HTMLFormElement>(null);

  const [titleValue, setTitleValue] = useState(article.judul || "");
  const [coverPreview, setCoverPreview] = useState<string | null>(article.gambar_url || null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

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

    const previewData = { judul, konten, gambarUrl: coverPreview || "/Image/placeholder.png" };
    sessionStorage.setItem("articlePreview", JSON.stringify(previewData));
    window.open("/admin/dashboard/artikel/preview", "_blank");
  };

  const handleFormSubmit = (formData: FormData) => {
    formData.set("konten", editorContentRef.current);
    formAction(formData);
  };

  return (
    <form ref={formRef} action={handleFormSubmit} className="space-y-8 font-sans">
      <input type="hidden" name="id" defaultValue={article.id} />
      <input type="hidden" name="currentGambarUrl" defaultValue={article.gambar_url || ""} />

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
              defaultValue={article.kategori ? "Published" : "Draft"}
              className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm font-medium text-on-surface"
            >
              <option value="Published">Published (Terbit)</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
              Tag / Kategori
            </label>
            <TagSelector defaultValue={article.tags} />
          </div>
        </div>
      </div>

      {/* Gambar Cover */}
      <div className="bg-white p-6 rounded-2xl border border-[#D5E8D0] shadow-sm space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
          Gambar Cover Artikel
        </label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            name="gambar_utama"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-on-surface file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#EBF4E7] file:text-[#3E7B28] hover:file:bg-[#D5E8D0] transition-colors cursor-pointer"
          />
        </div>

        {coverPreview && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-outline-variant/30 mt-2">
            <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Rich Text Editor */}
      <div className="bg-white p-6 rounded-2xl border border-[#D5E8D0] shadow-sm space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
          Isi Artikel
        </label>
        <LexicalEditor
          initialContent={initialContent}
          onChange={(jsonString) => {
            editorContentRef.current = jsonString;
          }}
        />
      </div>

      {/* Pengaturan SEO & OpenGraph Metadata (Ditaruh di bagian bawah) */}
      <SeoMetadataForm
        initialData={{
          slug: article.slug,
          alt_gambar: article.alt_gambar,
          meta_title: article.meta_title,
          meta_description: article.meta_description,
          focus_keyword: article.focus_keyword,
          secondary_keyword: article.secondary_keyword,
        }}
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
  );
}
