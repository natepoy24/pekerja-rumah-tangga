"use client";

import { useTransition } from "react";
import { deleteArtikel } from "@/app/actions";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

interface DeleteArtikelButtonProps {
  id: number;
  gambar_url: string | null;
}

export default function DeleteArtikelButton({ id, gambar_url }: DeleteArtikelButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      startTransition(async () => {
        try {
          await deleteArtikel(id, gambar_url);
          toast.success("Artikel berhasil dihapus.");
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Gagal menghapus artikel.");
        }
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors disabled:text-slate-400"
      title="Hapus Artikel"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
