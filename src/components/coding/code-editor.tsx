"use client";

import React from "react";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#1E1E2E] flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full" />
    </div>
  ),
});

interface CodeEditorProps {
  value: string;
  language?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  height?: string;
}

export default function CodeEditor({
  value,
  language = "python",
  readOnly = false,
  onChange,
  height = "100%",
}: CodeEditorProps) {
  return (
    <MonacoEditor
      height={height}
      language={language}
      theme="vs-dark"
      value={value}
      onChange={(v) => onChange?.(v || "")}
      options={{
        readOnly,
        fontSize: 13,
        fontFamily: "'Fira Code', 'Cascadia Code', monospace",
        minimap: { enabled: false },
        padding: { top: 16 },
        scrollBeyondLastLine: false,
        lineNumbers: "on",
        renderLineHighlight: readOnly ? "none" : "all",
        automaticLayout: true,
        wordWrap: "on",
        cursorBlinking: "smooth",
      }}
    />
  );
}
