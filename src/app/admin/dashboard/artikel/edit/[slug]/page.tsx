import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import TagSelector from "@/components/ArtikelApp/TagSelector";
import EditArtikelFormClient from "./EditArtikelFormClient";
import { ArrowLeft } from "lucide-react";

export default async function EditArtikelPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const supabase = await createClient();

  const { data: article, error } = await supabase
    .from("artikel")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !article) {
    console.error("Gagal mengambil data artikel:", error?.message);
    redirect("/admin/dashboard/artikel");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#14201D] tracking-tight">Edit Artikel</h1>
        <p className="text-sm text-on-surface-variant mt-1">Perbarui konten artikel "{article.judul}".</p>
      </div>

      <EditArtikelFormClient article={article} />
    </div>
  );
}
