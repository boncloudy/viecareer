"use client";

import React from "react";
import { FileText, Briefcase, Loader2 } from "lucide-react";

interface UploadDropzoneProps {
  title: string;
  subtitle: string;
  isUploading: boolean;
  isUploaded: boolean;
  onUpload: () => void;
  variant?: "cv" | "jd";
}

export function UploadDropzone({
  title,
  subtitle,
  isUploading,
  isUploaded,
  onUpload,
  variant = "cv",
}: UploadDropzoneProps) {
  const Icon = variant === "cv" ? FileText : Briefcase;

  return (
    <button
      onClick={onUpload}
      disabled={isUploading || isUploaded}
      className={`
        relative flex flex-col items-center justify-center w-full p-12
        border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer
        ${isUploaded
          ? "border-teal-400 bg-teal-50/50"
          : isUploading
          ? "border-gray-300 bg-gray-50"
          : "border-gray-300 hover:border-navy-400 hover:bg-slate-50"
        }
      `}
    >
      {isUploading ? (
        <Loader2 className="w-12 h-12 text-gray-400 animate-spin mb-4" />
      ) : (
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            isUploaded ? "bg-teal-100" : "bg-gray-100"
          }`}
        >
          <Icon
            className={`w-7 h-7 ${
              isUploaded ? "text-teal-600" : "text-gray-500"
            }`}
          />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">
        {isUploading
          ? "Processing..."
          : isUploaded
          ? "✓ File uploaded successfully"
          : subtitle}
      </p>
    </button>
  );
}
