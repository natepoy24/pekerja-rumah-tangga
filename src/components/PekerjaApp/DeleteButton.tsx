"use client";

import { useState } from "react";
import { deletePekerjaById } from "@/app/actions";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

export default function DeleteButton({ id, fotoUrl }: { id: number; fotoUrl: string | null }) {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    const confirmed = window.confirm("Apakah Anda yakin ingin menghapus data pekerja ini?");
    if (confirmed) {
      setIsPending(true);
      try {
        await deletePekerjaById(id, fotoUrl);
        toast.success("Data pekerja berhasil dihapus");
      } catch (error) {
        if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
          toast.error(`Gagal menghapus data: ${error.message}`);
          setIsPending(false);
        }
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors disabled:text-slate-400"
      title="Hapus Pekerja"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
