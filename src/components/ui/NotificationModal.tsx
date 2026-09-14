"use client";

import { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

interface NotificationModalProps {
  isOpen: boolean;
  type?: "success" | "error";
  title: string;
  message?: string;
  autoCloseMs?: number;
  onClose: () => void;
}

export default function NotificationModal({
  isOpen,
  type = "success",
  title,
  message,
  autoCloseMs = 1500,
  onClose,
}: NotificationModalProps) {
  useEffect(() => {
    if (!isOpen || autoCloseMs <= 0) return;

    const timer = setTimeout(() => {
      onClose();
    }, autoCloseMs);

    return () => clearTimeout(timer);
  }, [isOpen, autoCloseMs, onClose]);

  if (!isOpen) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-[#D5E8D0] shadow-2xl space-y-5 text-center transform animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors"
          aria-label="Tutup Notifikasi"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center p-3 shadow-inner ${
              isSuccess
                ? "bg-[#EBF4E7] text-[#3E7B28] border-2 border-[#D5E8D0]"
                : "bg-red-50 text-red-600 border-2 border-red-200"
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
            ) : (
              <AlertCircle className="w-10 h-10 stroke-[2.2]" />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14201D]">
            {title}
          </h3>
          {message && (
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              {message}
            </p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className={`w-full py-3 px-6 rounded-xl font-sans text-sm font-semibold text-white shadow-md transition-all active:scale-95 ${
              isSuccess
                ? "bg-[#0B4F42] hover:bg-[#00372d]"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}
