"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  codingProblem,
  codingOverallScore,
  codingOverallLabel,
  codingSubScores,
  codingTestCases,
  codingCorrectnessAnalysis,
  codingComplexityAnalysis,
} from "@/lib/mock-data";
import {
  ArrowLeft,
  Download,
  Share2,
  Sparkles,
  CheckCircle2,
  Clock,
  TrendingUp,
  Code,
  BookOpen,
  Check,
  X,
  ChevronDown,
  Trophy,
  Target,
  Zap,
  BarChart3,
  LogOut,
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

type AnalysisTab = "correctness" | "optimization" | "learning" | "solution";

export default function CodingResultsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AnalysisTab>("correctness");
  const [activeTestCase, setActiveTestCase] = useState(0);
  const [showTestPanel, setShowTestPanel] = useState(true);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedSubs, setAnimatedSubs] = useState(
    codingSubScores.map(() => 0)
  );

  // Animate overall score
  useEffect(() => {
    const target = codingOverallScore;
    const duration = 1400;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  // Animate sub-scores
  useEffect(() => {
    const duration = 1600;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedSubs(
        codingSubScores.map((s) => Math.round(eased * s.value))
      );
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  const analysisTabs: { key: AnalysisTab; label: string; icon: React.ReactNode }[] = [
    { key: "correctness", label: "Correctness", icon: <Target className="w-3.5 h-3.5" /> },
    { key: "optimization", label: "Optimization", icon: <Zap className="w-3.5 h-3.5" /> },
    { key: "learning", label: "Learning", icon: <BookOpen className="w-3.5 h-3.5" /> },
    { key: "solution", label: "Solution", icon: <Code className="w-3.5 h-3.5" /> },
  ];

  // Score ring SVG config
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (animatedScore / 100) * circumference;

  return (
    <div className="h-screen bg-[#0F172A] text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#0B1120] shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/coding")}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-base font-bold text-teal-400 tracking-tight">
            VieCareer
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-xs text-slate-400">
            AI Code Analysis / {codingProblem.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg text-xs text-slate-300 transition-colors border border-white/5">
            <Download className="w-3 h-3" />
            Export
          </button>
          <button className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg text-xs text-slate-300 transition-colors border border-white/5">
            <Share2 className="w-3 h-3" />
            Share
          </button>
          <button
            onClick={() => setShowEndConfirm(true)}
            className="flex items-center gap-1.5 bg-red-500/15 hover:bg-red-500/25 px-3 py-1.5 rounded-lg text-xs text-red-400 font-semibold transition-colors border border-red-500/30 hover:border-red-500/50"
          >
            <LogOut className="w-3 h-3" />
            End Interview
          </button>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="flex-1 flex min-h-0">
        {/* Left: Code (read-only) */}
        <div className="w-[45%] flex flex-col border-r border-white/10">
          <div className="px-4 py-2 border-b border-white/10 text-xs text-slate-500 bg-[#131A2B]">
            <span className="text-slate-300 font-medium">{codingProblem.title}</span>
            <span className="text-slate-600 ml-2">•</span>
            <span className="ml-2">Submitted solution</span>
          </div>
          <div className="flex-1 min-h-0">
            <MonacoEditor
              height="100%"
              language="python"
              theme="vs-dark"
              value={codingProblem.defaultCode}
              options={{
                readOnly: true,
                fontSize: 13,
                fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                minimap: { enabled: false },
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                lineNumbers: "on",
                renderLineHighlight: "none",
                automaticLayout: true,
              }}
            />
          </div>

          {/* Test Results Panel (bottom of left side) */}
          {showTestPanel && (
            <div className="border-t border-white/10 bg-[#131A2B] shrink-0">
              <div className="flex items-center justify-between px-4 py-1.5 border-b border-white/5">
                <div className="flex items-center gap-1">
                  {codingTestCases.map((tc, i) => (
                    <button
                      key={tc.id}
                      onClick={() => setActiveTestCase(i)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] transition-colors ${
                        i === activeTestCase
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
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="text-green-400 font-medium">
                    5/5 Passed
                  </span>
                  <button
                    onClick={() => setShowTestPanel(false)}
                    className="text-slate-500 hover:text-slate-300"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="px-4 py-2.5 grid grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                    Input
                  </span>
                  <code className="text-slate-300 font-mono text-[11px]">
                    {codingTestCases[activeTestCase]?.input}
                  </code>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                    Expected
                  </span>
                  <code className="text-teal-300 font-mono text-[11px]">
                    {codingTestCases[activeTestCase]?.expected}
                  </code>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                    Output
                  </span>
                  <code className="text-green-400 font-mono text-[11px]">
                    {codingTestCases[activeTestCase]?.output}
                  </code>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: AI Feedback */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto scrollbar-thin bg-[#0D1320]">
          <div className="p-6 space-y-6">
            {/* Feedback Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1.5 bg-teal-500/15 text-teal-400 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  AI Feedback
                </div>
                <span className="text-[10px] text-slate-500">
                  Generated just now
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-1">
                AI Code Analysis
              </h2>
              <p className="text-xs text-slate-400">
                Comprehensive analysis of your Two Sum solution
              </p>
            </div>

            {/* Overall Score & Sub-scores */}
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-8">
                {/* Score Ring */}
                <div className="relative shrink-0">
                  <svg
                    width="130"
                    height="130"
                    className="transform -rotate-90"
                  >
                    <circle
                      cx="65"
                      cy="65"
                      r={radius}
                      fill="none"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="65"
                      cy="65"
                      r={radius}
                      fill="none"
                      stroke="#14B8A6"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-white tabular-nums">
                      {animatedScore}
                    </span>
                    <span className="text-[10px] text-teal-400 font-semibold uppercase tracking-wider">
                      {codingOverallLabel}
                    </span>
                  </div>
                </div>

                {/* Sub-scores */}
                <div className="flex-1 space-y-3">
                  {codingSubScores.map((score, i) => (
                    <div key={score.label} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 font-medium">
                          {score.label}
                        </span>
                        <span
                          className="font-bold tabular-nums"
                          style={{ color: score.color }}
                        >
                          {animatedSubs[i]}/{score.max}
                        </span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${animatedSubs[i]}%`,
                            backgroundColor: score.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Analysis Tabs */}
            <div>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                Detailed Analysis
              </h3>
              <div className="flex border-b border-white/10 mb-4">
                {analysisTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-colors relative ${
                      activeTab === tab.key
                        ? "text-white"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                    {activeTab === tab.key && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-400" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === "correctness" && (
                <div className="space-y-4">
                  {/* Correctness Score */}
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-semibold text-white">
                          Correctness Analysis
                        </span>
                      </div>
                      <span className="text-green-400 font-bold text-sm">
                        {codingCorrectnessAnalysis.score}/100
                      </span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-4">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{
                          width: `${codingCorrectnessAnalysis.score}%`,
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-semibold text-green-400">
                        {codingCorrectnessAnalysis.summary}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {codingCorrectnessAnalysis.description}
                    </p>
                  </div>

                  {/* Suggestions */}
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Actionable Suggestions
                    </h4>
                    <div className="space-y-2.5">
                      {codingCorrectnessAnalysis.suggestions.map((s, i) => (
                        <div key={i} className="flex gap-3">
                          <span className="w-5 h-5 bg-teal-500/15 rounded-full flex items-center justify-center text-[10px] font-bold text-teal-400 shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <p className="text-sm text-slate-300">{s}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Complexity Analysis */}
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart3 className="w-4 h-4 text-slate-400" />
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Complexity Analysis
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500 mb-3">
                      Current solution:
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/[0.03] border border-white/5 rounded-lg p-3.5">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Clock className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                            Time
                          </span>
                        </div>
                        <p className="text-sm font-bold text-cyan-400 font-mono">
                          {codingComplexityAnalysis.timeComplexity}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1">
                          {codingComplexityAnalysis.timeExplanation}
                        </p>
                      </div>
                      <div className="bg-white/[0.03] border border-white/5 rounded-lg p-3.5">
                        <div className="flex items-center gap-2 mb-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                            Space
                          </span>
                        </div>
                        <p className="text-sm font-bold text-purple-400 font-mono">
                          {codingComplexityAnalysis.spaceComplexity}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1">
                          {codingComplexityAnalysis.spaceExplanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "optimization" && (
                <div className="space-y-4">
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span className="text-sm font-semibold text-white">
                          Optimization Analysis
                        </span>
                      </div>
                      <span className="text-amber-400 font-bold text-sm">
                        70/100
                      </span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-4">
                      <div className="h-full bg-amber-500 rounded-full w-[70%]" />
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Your solution uses a hash map for O(n) time complexity,
                      which is optimal. However, there are opportunities to reduce
                      memory allocation and improve cache locality.
                    </p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Optimization Suggestions
                    </h4>
                    <div className="space-y-2.5">
                      <div className="flex gap-3">
                        <span className="w-5 h-5 bg-amber-500/15 rounded-full flex items-center justify-center text-[10px] font-bold text-amber-400 shrink-0">
                          1
                        </span>
                        <p className="text-sm text-slate-300">
                          Pre-allocate dictionary size when input length is known
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <span className="w-5 h-5 bg-amber-500/15 rounded-full flex items-center justify-center text-[10px] font-bold text-amber-400 shrink-0">
                          2
                        </span>
                        <p className="text-sm text-slate-300">
                          Consider using enumerate() for cleaner iteration
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "learning" && (
                <div className="space-y-4">
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-semibold text-white">
                          Learning Assessment
                        </span>
                      </div>
                      <span className="text-purple-400 font-bold text-sm">
                        80/100
                      </span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-4">
                      <div className="h-full bg-purple-500 rounded-full w-[80%]" />
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      You demonstrated strong problem-solving skills with good
                      pattern recognition. Your approach shows understanding of
                      hash table trade-offs between time and space complexity.
                    </p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Related Topics to Study
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Hash Tables",
                        "Two Pointers",
                        "Sliding Window",
                        "Binary Search",
                      ].map((topic) => (
                        <span
                          key={topic}
                          className="bg-purple-500/10 text-purple-300 text-xs px-3 py-1.5 rounded-lg border border-purple-500/20"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "solution" && (
                <div className="space-y-4">
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-semibold text-white">
                        Code Quality
                      </span>
                      <span className="text-blue-400 font-bold text-sm ml-auto">
                        85/100
                      </span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-4">
                      <div className="h-full bg-blue-500 rounded-full w-[85%]" />
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Clean and readable code with good variable naming. The
                      solution is well-structured with clear logic flow. Consider
                      adding docstrings and type hints for improved documentation.
                    </p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Best Practices
                    </h4>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                        <span className="text-slate-300">
                          Clean variable naming conventions
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                        <span className="text-slate-300">
                          Efficient use of built-in data structures
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="text-slate-300">
                          Could benefit from edge case documentation
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      <div className="fixed bottom-6 right-6 bg-[#1E293B] border border-white/10 rounded-xl p-4 flex items-start gap-3 shadow-2xl animate-fade-in-up z-40">
        <div className="w-8 h-8 bg-green-500/15 rounded-lg flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
        </div>
        <div>
          <p className="text-xs font-semibold text-white">Feedback Ready!</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            AI feedback has been generated successfully
          </p>
        </div>
      </div>

      {/* End Interview Confirmation Modal */}
      {showEndConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1E293B] border border-white/10 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl animate-fade-in-up">
            <div className="flex items-center justify-center w-12 h-12 bg-red-500/15 rounded-xl mx-auto mb-4">
              <LogOut className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-white text-center mb-2">
              End Interview?
            </h3>
            <p className="text-sm text-slate-400 text-center mb-6 leading-relaxed">
              This will finalize your session and generate a comprehensive performance report. You won&apos;t be able to make further changes.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowEndConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => router.push("/loading")}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-lg shadow-red-500/25"
              >
                End & View Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
