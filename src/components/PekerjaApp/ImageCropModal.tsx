"use client";

import { useRef, useState } from "react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

type ImageCropModalProps = {
  upImg: string | null;
  onClose: () => void;
  onComplete: (file: File) => void;
};

export default function ImageCropModal({ upImg, onClose, onComplete }: ImageCropModalProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const [processing, setProcessing] = useState(false);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const initialCrop = centerCrop(
      makeAspectCrop({ unit: "%", width: 90 }, 1 / 1, width, height),
      width,
      height
    );
    setCrop(initialCrop);
    setCompletedCrop(initialCrop);
  }

  const handleSave = async () => {
    if (!imgRef.current || !completedCrop) return;
    setProcessing(true);

    try {
      const image = imgRef.current;
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const cropWidth = completedCrop.width * scaleX;
      const cropHeight = completedCrop.height * scaleY;

      canvas.width = cropWidth;
      canvas.height = cropHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      canvas.toBlob((blob) => {
        if (blob) {
          const croppedFile = new File([blob], `cropped_${Date.now()}.jpg`, { type: "image/jpeg" });
          onComplete(croppedFile);
          onClose();
        }
        setProcessing(false);
      }, "image/jpeg");
    } catch (err) {
      console.error(err);
      setProcessing(false);
    }
  };

  if (!upImg) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-outline-variant/30 space-y-6">
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
          <h3 className="font-serif text-xl font-bold text-[#14201D]">Sesuaikan / Potong Foto Profil</h3>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface font-bold text-lg">
            &times;
          </button>
        </div>

        <div className="max-h-[60vh] overflow-auto flex justify-center bg-surface-container-low p-4 rounded-2xl">
          <ReactCrop crop={crop} onChange={(c) => setCrop(c)} onComplete={(c) => setCompletedCrop(c)} aspect={1}>
            <img ref={imgRef} src={upImg} alt="Crop target" onLoad={onImageLoad} className="max-w-full h-auto rounded-lg" />
          </ReactCrop>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-outline-variant text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={processing}
            className="px-6 py-2.5 rounded-xl bg-[#0B4F42] hover:bg-[#00372d] text-white text-sm font-semibold shadow-sm transition-all disabled:opacity-50"
          >
            {processing ? "Memproses..." : "Gunakan Foto Ini"}
          </button>
        </div>
      </div>
    </div>
  );
}
