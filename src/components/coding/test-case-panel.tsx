"use client";

import React from "react";
import { Check, X } from "lucide-react";
import type { CodingTestCase } from "@/lib/mock-data";

interface TestCasePanelProps {
  testCases: CodingTestCase[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onClose?: () => void;
  /** e.g. "5/5 Passed" or "✓ Accepted" */
  summaryLabel?: string;
  /** Optional runtime to display, pulled from currently active case */
  showRuntime?: boolean;
}

export default function TestCasePanel({
  testCases,
  activeIndex,
  onSelect,
  onClose,
  summaryLabel = `${testCases.filter((t) => t.passed).length}/${testCases.length} Passed`,
  showRuntime = false,
}: TestCasePanelProps) {
  const activeCase = testCases[activeIndex];

  return (
    <div className="border-t border-white/10 bg-[#131A2B] shrink-0">
      {/* Tab row */}
      <div className="flex items-center justify-between px-4 py-1.5 border-b border-white/5">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {testCases.map((tc, i) => (
            <button
              key={tc.id}
              onClick={() => onSelect(i)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] transition-colors whitespace-nowrap ${
                i === activeIndex
                  ? "bg-white/10 text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {tc.passed ? (
                <Check className="w-3 h-3 text-green-400" />
              ) : (
                <X className="w-3 h-3 text-red-400" />
              )}
              {tc.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-[10px] shrink-0">
          <span className="text-green-400 font-medium">{summaryLabel}</span>
          {showRuntime && activeCase?.runtime && (
            <span className="text-slate-500 hidden sm:inline">
              Runtime: {activeCase.runtime}
            </span>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-300 ml-2"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Detail grid */}
      <div className="px-4 py-2.5 grid grid-cols-3 gap-4 text-xs">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block mb-1">
            Input
          </span>
          <code className="text-slate-300 font-mono text-[11px]">
            {activeCase?.input}
          </code>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block mb-1">
            Expected
          </span>
          <code className="text-teal-300 font-mono text-[11px]">
            {activeCase?.expected}
          </code>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block mb-1">
            Output
          </span>
          <code className="text-green-400 font-mono text-[11px]">
            {activeCase?.output}
          </code>
        </div>
      </div>
    </div>
  );
}
