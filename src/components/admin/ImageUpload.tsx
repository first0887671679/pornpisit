"use client";

import { useState, useRef } from "react";
import { upload } from "@vercel/blob/client";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

const ASPECT_RATIOS = [
  { label: "อิสระ", value: "free", cls: "" },
  { label: "1:1", value: "1/1", cls: "aspect-square" },
  { label: "16:9", value: "16/9", cls: "aspect-video" },
  { label: "9:16", value: "9/16", cls: "aspect-[9/16]" },
  { label: "4:5", value: "4/5", cls: "aspect-[4/5]" },
  { label: "4:3", value: "4/3", cls: "aspect-[4/3]" },
  { label: "3:2", value: "3/2", cls: "aspect-[3/2]" },
  { label: "21:9", value: "21/9", cls: "aspect-[21/9]" },
];

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
  aspectRatio?: string;
  onAspectRatioChange?: (ratio: string) => void;
  showAspectRatio?: boolean;
}

export default function ImageUpload({ value, onChange, label, className, aspectRatio, onAspectRatioChange, showAspectRatio = true }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const currentRatio = ASPECT_RATIOS.find(r => r.value === aspectRatio) || ASPECT_RATIOS[0];
  const previewCls = currentRatio.cls || "h-40";

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });

      onChange(blob.url);
    } catch (err: any) {
      setError(err?.message || "อัพโหลดไม่สำเร็จ กรุณาลองอีกครั้ง");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className={className}>
      {label && <p className="text-sm font-medium mb-1.5 text-slate-700">{label}</p>}

      {showAspectRatio && onAspectRatioChange && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {ASPECT_RATIOS.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => onAspectRatioChange(r.value)}
              className={`px-2 py-0.5 text-xs rounded-full border transition-colors ${
                aspectRatio === r.value || (!aspectRatio && r.value === "free")
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-slate-600 border-slate-300 hover:border-orange-400"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      )}

      {value ? (
        <div className="relative group">
          <div className={`relative w-full ${previewCls} ${!currentRatio.cls ? "h-40" : ""} rounded-lg overflow-hidden border border-slate-200 bg-slate-50`}>
            <Image
              src={value}
              alt="uploaded"
              fill
              className="object-cover"
              unoptimized={value.startsWith("/uploads/")}
            />
          </div>
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => onChange("")}
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mt-2 text-xs text-orange-600 hover:underline"
          >
            เปลี่ยนรูป
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className={`w-full ${!currentRatio.cls ? "h-32" : previewCls + " max-h-48"} border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-orange-400 hover:text-orange-500 transition-colors cursor-pointer disabled:cursor-wait`}
        >
          {uploading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-sm">กำลังอัพโหลด...</span>
            </>
          ) : (
            <>
              <Upload className="w-6 h-6" />
              <span className="text-sm">คลิกเพื่ออัพโหลดรูปภาพ</span>
              <span className="text-xs">รองรับ JPG, PNG, WebP, GIF, SVG, HEIC (สูงสุด 10MB)</span>
            </>
          )}
        </button>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
