import { createClient } from "@/lib/supabase/server";
import EditPekerjaForm from "@/components/PekerjaApp/EditPekerjaForm";
import { redirect } from "next/navigation";

export default async function EditPekerjaPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const supabase = await createClient();

  const { data: pekerja, error } = await supabase
    .from("pekerja")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !pekerja) {
    console.error("Gagal mengambil data pekerja:", error?.message);
    redirect("/admin/dashboard/pekerja");
  }

  return (
    <div className="max-w-7xl mx-auto">
      <EditPekerjaForm pekerja={pekerja} />
    </div>
  );
}
