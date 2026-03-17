"use client";

import React, { useRef } from "react";
import { FileText, Briefcase, Loader2, CheckCircle2 } from "lucide-react";

interface UploadDropzoneProps {
  title: string;
  subtitle: string;
  isUploading: boolean;
  isUploaded: boolean;
  fileName?: string;
  onFileSelected: (file: File) => void;
  variant?: "cv" | "jd";
}

export function UploadDropzone({
  title,
  subtitle,
  isUploading,
  isUploaded,
  fileName,
  onFileSelected,
  variant = "cv",
}: UploadDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const Icon = variant === "cv" ? FileText : Briefcase;

  const handleClick = () => {
    if (isUploading || isUploaded) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelected(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isUploading || isUploaded) return;
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileSelected(file);
    }
  };

  return (
    <button
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      disabled={isUploading || isUploaded}
      className={`
        relative flex flex-col items-center justify-center w-full p-12
        border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer
        ${isUploaded
          ? "border-teal-400 bg-teal-50/50"
          : isUploading
          ? "border-gray-300 bg-gray-50"
          : "border-gray-300 hover:border-teal-400 hover:bg-slate-50"
        }
      `}
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleFileChange}
        className="hidden"
      />

      {isUploading ? (
        <Loader2 className="w-12 h-12 text-teal-500 animate-spin mb-4" />
      ) : (
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            isUploaded ? "bg-teal-100" : "bg-gray-100"
          }`}
        >
          {isUploaded ? (
            <CheckCircle2 className="w-7 h-7 text-teal-600" />
          ) : (
            <Icon className="w-7 h-7 text-gray-500" />
          )}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">
        {isUploading
          ? "Processing file..."
          : isUploaded
          ? `✓ ${fileName || "File uploaded successfully"}`
          : subtitle}
      </p>
    </button>
  );
}
