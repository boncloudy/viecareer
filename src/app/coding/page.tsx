"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AudioWave } from "@/components/audio-wave";
import { useApp } from "@/lib/app-context";
import { codingProblem } from "@/lib/mock-data";
import {
  ChevronDown,
  Play,
  Send,
  Sparkles,
  Circle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#1E1E2E] flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full" />
    </div>
  ),
});

export default function CodingPage() {
  const router = useRouter();
  const app = useApp();
  const [code, setCode] = useState(codingProblem.defaultCode);
  const [language, setLanguage] = useState("python");
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [runOutput, setRunOutput] = useState<string | null>(null);

  const languages = ["python", "javascript", "typescript", "java", "cpp"];

  const handleRun = useCallback(() => {
    setRunOutput(null);
    setTimeout(() => {
      setRunOutput("Test case 1: PASSED ✓\nTest case 2: PASSED ✓\nAll tests passed!");
    }, 1500);
  }, []);

  const handleSubmit = useCallback(() => {
    setIsSubmitting(true);
    // Simulate submission processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      app.setCodeSubmitted(true);
      // Redirect to analytics after a brief success display
      setTimeout(() => {
        app.setCurrentFlow("analytics");
        router.push("/loading");
      }, 1500);
    }, 2000);
  }, [app, router]);

  return (
    <div className="h-screen bg-[#0F172A] text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-2.5 border-b border-white/10 bg-[#0F172A] shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-teal-400">VieCareer</span>
          <span className="text-slate-500">|</span>
          <span className="text-sm text-slate-300">Coding Interview #124</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Circle className="w-2.5 h-2.5 fill-green-500 text-green-500" />
            <span className="text-sm text-slate-300">Recording Live</span>
          </div>
          <button
            onClick={() => router.push("/loading")}
            className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-1.5 rounded-lg transition-colors"
          >
            Exit Session
          </button>
        </div>
      </header>

      {/* Main 3-Panel Layout */}
      <div className="flex-1 flex min-h-0">
        {/* Left Panel: Problem Description */}
        <div className="w-[280px] border-r border-white/10 overflow-y-auto p-6 shrink-0">
          <h1 className="text-xl font-bold mb-4">{codingProblem.title}</h1>
          <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line mb-6">
            {codingProblem.description}
          </div>

          {codingProblem.examples.map((ex, i) => (
            <div key={i} className="mb-6">
              <h3 className="font-bold text-white mb-2">Example {i + 1}:</h3>
              <div className="bg-white/5 rounded-lg p-3 text-sm font-mono text-slate-300 space-y-1">
                <div>
                  <span className="text-slate-500">Input: </span>
                  {ex.input}
                </div>
                <div>
                  <span className="text-slate-500">Output: </span>
                  {ex.output}
                </div>
                <div>
                  <span className="text-slate-500">Explanation: </span>
                  {ex.explanation}
                </div>
              </div>
            </div>
          ))}

          <div>
            <h3 className="font-bold text-white mb-2">Constraints:</h3>
            <ul className="space-y-1.5">
              {codingProblem.constraints.map((c, i) => (
                <li
                  key={i}
                  className={`text-sm ${i === codingProblem.constraints.length - 1
                      ? "text-teal-400"
                      : "text-slate-400"
                    }`}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center Panel: Code Editor */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Editor Toolbar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#151B2B] shrink-0">
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg text-sm transition-colors"
              >
                Python 3
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {showLangDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-[#1E293B] border border-white/10 rounded-lg shadow-xl py-1 z-10">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setShowLangDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-1.5 text-sm text-slate-300 hover:bg-white/10 capitalize"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRun}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-1.5 rounded-lg text-sm transition-colors border border-white/10"
              >
                <Play className="w-3.5 h-3.5" />
                Run
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || isSubmitted}
                className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors"
              >
                {isSubmitting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : isSubmitted ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                {isSubmitting
                  ? "Submitting..."
                  : isSubmitted
                    ? "Submitted ✓"
                    : "Submit"}
              </button>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1">
            <MonacoEditor
              height="100%"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                fontSize: 14,
                fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                minimap: { enabled: false },
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                lineNumbers: "on",
                renderLineHighlight: "all",
                automaticLayout: true,
                wordWrap: "on",
              }}
            />
          </div>

          {/* Run Output / Status Bar */}
          {runOutput ? (
            <div className="px-4 py-3 text-sm bg-[#151B2B] border-t border-white/10 shrink-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Console Output</span>
                <button
                  onClick={() => setRunOutput(null)}
                  className="text-xs text-slate-500 hover:text-slate-300"
                >
                  Clear
                </button>
              </div>
              <pre className="text-green-400 font-mono text-xs whitespace-pre-wrap">{runOutput}</pre>
            </div>
          ) : (
            <div className="flex items-center justify-between px-4 py-1.5 text-xs text-slate-500 border-t border-white/10 bg-[#151B2B] shrink-0">
              <span>LINE 12, COLUMN 18</span>
              <span>UTF-8 | PYTHON SYNTAX</span>
            </div>
          )}
        </div>

        {/* Right Panel: Feedback */}
        <div className="w-[300px] border-l border-white/10 overflow-y-auto p-5 shrink-0 bg-[#0D1320]">
          {/* Real-Time Complexity */}
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Real-Time Complexity
          </h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-[10px] uppercase text-slate-500 tracking-wider font-semibold mb-1">
                Time
              </p>
              <p className="text-2xl font-bold text-teal-400">
                {codingProblem.timeComplexity}
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-[10px] uppercase text-slate-500 tracking-wider font-semibold mb-1">
                Space
              </p>
              <p className="text-2xl font-bold text-teal-400">
                {codingProblem.spaceComplexity}
              </p>
            </div>
          </div>

          {/* Live Feedback */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-teal-400 rounded-full" />
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Live Feedback
              </h3>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-sm text-slate-300 leading-relaxed">
                &quot;Great choice! Using a{" "}
                <span className="text-teal-400 font-bold">Hash Map</span>{" "}
                (prevMap) allows you to find the complement in constant time.
                This reduces the overall time complexity from O(n²) to O(n).&quot;
              </p>
            </div>
          </div>

          {/* Actionable Hints */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Actionable Hints
            </h3>
            <div className="space-y-2">
              {codingProblem.hints.map((hint, i) => (
                <div
                  key={i}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 flex gap-3"
                >
                  <span className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-slate-300">{hint}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Mentor */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  AI Mentor Voice Stream
                </p>
                <AudioWave barCount={12} color="#14B8A6" className="mt-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1E293B] rounded-2xl p-8 text-center">
            <div className="animate-spin w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-white font-semibold">Submitting your solution...</p>
            <p className="text-slate-400 text-sm mt-1">
              AI is evaluating your code
            </p>
          </div>
        </div>
      )}

      {/* Success Overlay */}
      {isSubmitted && !isSubmitting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1E293B] rounded-2xl p-8 text-center animate-fade-in-up">
            <CheckCircle2 className="w-12 h-12 text-teal-400 mx-auto mb-4" />
            <p className="text-white font-semibold text-lg">Code Submitted Successfully!</p>
            <p className="text-slate-400 text-sm mt-1">
              Redirecting to your analytics report...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
