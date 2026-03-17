"use client";

import React, { useRef } from "react";
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    if (!isUploading && !isUploaded) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
      onUpload();
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      className={`
        relative flex flex-col items-center justify-center w-full p-12
        border-2 border-dashed rounded-xl transition-all duration-300
        ${isUploaded
          ? "border-teal-400 bg-teal-50/50 cursor-default"
          : isUploading
          ? "border-gray-200 bg-gray-50 cursor-not-allowed"
          : "border-gray-300 hover:border-teal-500 hover:bg-slate-50 cursor-pointer"
        }
      `}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx"
      />

      {isUploading ? (
        <Loader2 className="w-12 h-12 text-teal-500 animate-spin mb-4" />
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
    </div>
  );
}