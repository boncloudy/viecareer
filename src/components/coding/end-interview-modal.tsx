"use client";

import React from "react";
import { LogOut } from "lucide-react";

interface EndInterviewModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function EndInterviewModal({
  open,
  onClose,
  onConfirm,
}: EndInterviewModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1E293B] border border-white/10 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl animate-fade-in-up">
        <div className="flex items-center justify-center w-12 h-12 bg-red-500/15 rounded-xl mx-auto mb-4">
          <LogOut className="w-6 h-6 text-red-400" />
        </div>
        <h3 className="text-lg font-bold text-white text-center mb-2">
          End Interview?
        </h3>
        <p className="text-sm text-slate-400 text-center mb-6 leading-relaxed">
          This will finalize your session and generate a comprehensive
          performance report. You won&apos;t be able to make further changes.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-lg shadow-red-500/25"
          >
            End &amp; View Report
          </button>
        </div>
      </div>
    </div>
  );
}
