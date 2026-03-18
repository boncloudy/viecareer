"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AudioWave } from "@/components/audio-wave";
import { useApp } from "@/lib/app-context";
import { codingProblem, codingTestCases, feedbackSteps } from "@/lib/mock-data";
import {
  ChevronDown,
  Play,
  Send,
  Sparkles,
  Loader2,
  CheckCircle2,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  Clock,
  MessageSquare,
  User,
  BookOpen,
  Building2,
  Lightbulb,
  Timer,
  X,
  Check,
  RotateCcw,
  Code2,
  BrainCircuit,
  Zap,
  LogOut,
  Code,
  Search,
  Shield,
  PanelLeft,
  PanelRight,
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

type ProblemTab = "description" | "testcases" | "hint";
type EditorTab = "code" | "diagram";

/* ── Step icons for analysis ── */
const stepIcons: Record<string, React.ReactNode> = {
  code: <Code className="w-4 h-4" />,
  search: <Search className="w-4 h-4" />,
  zap: <Zap className="w-4 h-4" />,
  shield: <Shield className="w-4 h-4" />,
  lightbulb: <Lightbulb className="w-4 h-4" />,
  check: <CheckCircle2 className="w-4 h-4" />,
};

export default function CodingPage() {
  const router = useRouter();
  const app = useApp();
  const [code, setCode] = useState(codingProblem.defaultCode);
  const [language, setLanguage] = useState("python");
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [activeTestCase, setActiveTestCase] = useState(0);
  const [showTestResults, setShowTestResults] = useState(false);
  const [activeTab, setActiveTab] = useState<ProblemTab>("description");
  const [editorTab, setEditorTab] = useState<EditorTab>("code");
  const [learnMode, setLearnMode] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  /* ── Mobile panel toggles ── */
  const [showLeftPanel, setShowLeftPanel] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false);

  /* ── Analysis state (inline in right panel) ── */
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Timer
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const languages = ["python", "javascript", "typescript", "java", "cpp"];

  const handleRun = useCallback(() => {
    setShowTestResults(true);
  }, []);

  /* ── Submit: starts inline analysis in right panel ── */
  const handleSubmit = useCallback(() => {
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setAnalysisProgress(0);
    setAnalysisComplete(false);
    app.setCodeSubmitted(true);
  }, [app]);

  /* ── Analysis step progression ── */
  useEffect(() => {
    if (!isAnalyzing || analysisComplete) return;
    const totalSteps = feedbackSteps.length;
    const stepDuration = 1200;

    const interval = setInterval(() => {
      setAnalysisStep((prev) => {
        const next = prev + 1;
        if (next >= totalSteps) {
          clearInterval(interval);
          setAnalysisComplete(true);
          // Navigate to results after a brief pause
          setTimeout(() => {
            app.setCurrentFlow("analytics");
            router.push("/coding-results");
          }, 1200);
          return prev;
        }
        return next;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isAnalyzing, analysisComplete, app, router]);

  /* ── Analysis progress bar ── */
  useEffect(() => {
    if (!isAnalyzing) return;
    const totalSteps = feedbackSteps.length;
    const targetProgress = Math.min(
      ((analysisStep + 1) / totalSteps) * 100,
      100
    );
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= targetProgress) {
          clearInterval(progressInterval);
          return targetProgress;
        }
        return prev + 0.8;
      });
    }, 20);
    return () => clearInterval(progressInterval);
  }, [analysisStep, isAnalyzing]);

  const handleReset = useCallback(() => {
    setCode(codingProblem.defaultCode);
  }, []);

  const problemTabs: {
    key: ProblemTab;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      key: "description",
      label: "Description",
      icon: <BookOpen className="w-3 h-3" />,
    },
    {
      key: "testcases",
      label: "Test Cases",
      icon: <CheckCircle2 className="w-3 h-3" />,
    },
    {
      key: "hint",
      label: "Hints",
      icon: <Lightbulb className="w-3 h-3" />,
    },
  ];

  const topicTags = ["Array", "Hash Table"];

  return (
    <div className="h-screen bg-[#0A0E1A] text-white flex flex-col overflow-hidden">
      {/* ───────── Top Bar: Learn Mode + Guidance ───────── */}
      <div className="flex items-center justify-between px-3 sm:px-5 py-2 border-b border-white/5 bg-[#0A0E1A] shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile left panel toggle */}
          <button
            onClick={() => setShowLeftPanel(!showLeftPanel)}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <PanelLeft className="w-4 h-4 text-slate-300" />
          </button>

          {/* Learn Mode toggle */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1">
            <div className="w-2 h-2 rounded-full bg-teal-400" />
            <span className="text-[11px] text-slate-300 font-medium hidden sm:inline">
              Learn Mode
            </span>
            <button
              onClick={() => setLearnMode(!learnMode)}
              className={`relative w-8 h-4.5 rounded-full transition-colors ${
                learnMode ? "bg-teal-500" : "bg-slate-600"
              }`}
              style={{ width: 32, height: 18 }}
            >
              <div
                className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow transition-transform ${
                  learnMode ? "left-[15px]" : "left-[2px]"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Center guidance text - hidden on mobile */}
        <div className="items-center gap-2 hidden md:flex">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] text-slate-400">
            You&apos;re in tutor mode – ask for guidance when stuck
          </span>
          <div className="flex items-center gap-1 ml-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full ${
                  i < 3 ? "bg-teal-400" : "bg-slate-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Timer + mobile right panel toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span className="text-[11px] font-mono text-slate-300 tabular-nums">
              {formatTime(elapsedSeconds)}
            </span>
          </div>

          {/* Mobile right panel toggle */}
          <button
            onClick={() => setShowRightPanel(!showRightPanel)}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <PanelRight className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </div>

      {/* ───────── Main 3-Panel Layout ───────── */}
      <div className="flex-1 flex min-h-0 relative">
        {/* ── Mobile overlay backdrop ── */}
        {(showLeftPanel || showRightPanel) && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => {
              setShowLeftPanel(false);
              setShowRightPanel(false);
            }}
          />
        )}

        {/* ── Left Panel: Problem ── */}
        <div
          className={`
            w-[300px] xl:w-[340px] border-r border-white/10 flex flex-col shrink-0 bg-[#0D1220]
            fixed lg:static top-0 bottom-0 left-0 z-40
            transition-transform duration-300 ease-in-out
            ${showLeftPanel ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          {/* Close button on mobile */}
          <button
            onClick={() => setShowLeftPanel(false)}
            className="lg:hidden absolute top-3 right-3 z-50 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-slate-300" />
          </button>

          {/* Problem Header */}
          <div className="px-4 xl:px-5 pt-4 pb-2 shrink-0">
            <h1 className="text-base xl:text-lg font-bold text-white leading-snug mb-2">
              {codingProblem.title}
            </h1>

            {/* Difficulty + Topics */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-amber-500/15 text-amber-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                Medium
              </span>
              <span className="bg-slate-700/50 text-slate-400 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">
                DSA
              </span>
              {topicTags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white/5 border border-white/10 text-slate-300 text-[10px] px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex border-b border-white/10 shrink-0 px-2">
            {problemTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 xl:px-3.5 py-2.5 text-xs font-medium transition-colors relative ${
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

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto p-4 xl:p-5 scrollbar-thin">
            {activeTab === "description" && (
              <div className="space-y-4 xl:space-y-5">
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {codingProblem.description}
                </p>
                {codingProblem.examples.map((ex, i) => (
                  <div key={i}>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Example {i + 1}
                    </h3>
                    <div className="bg-white/5 border border-white/5 rounded-lg p-3 text-sm font-mono text-slate-300 space-y-1.5">
                      <div>
                        <span className="text-slate-500">Input: </span>
                        <span className="text-teal-300">{ex.input}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Output: </span>
                        <span className="text-teal-300">{ex.output}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Explanation: </span>
                        {ex.explanation}
                      </div>
                    </div>
                  </div>
                ))}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Constraints
                  </h3>
                  <ul className="space-y-1.5">
                    {codingProblem.constraints.map((c, i) => (
                      <li
                        key={i}
                        className={`text-sm font-mono ${
                          i === codingProblem.constraints.length - 1
                            ? "text-teal-400"
                            : "text-slate-400"
                        }`}
                      >
                        • {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-lg p-3.5">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <span className="font-semibold text-slate-300">
                      Follow up:
                    </span>{" "}
                    Can you come up with an algorithm that is less than{" "}
                    <code className="bg-white/10 px-1 py-0.5 rounded text-teal-300 text-[11px]">
                      O(n²)
                    </code>{" "}
                    time complexity?
                  </p>
                </div>
              </div>
            )}

            {activeTab === "testcases" && (
              <div className="space-y-3 pt-2">
                {codingTestCases.map((tc) => (
                  <div
                    key={tc.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-3.5 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-300">
                        {tc.label}
                      </span>
                      {tc.passed ? (
                        <span className="text-[10px] text-green-400 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Passed
                        </span>
                      ) : (
                        <span className="text-[10px] text-red-400 flex items-center gap-1">
                          <X className="w-3 h-3" /> Failed
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      <div>
                        Input:{" "}
                        <span className="text-slate-300">{tc.input}</span>
                      </div>
                      <div>
                        Expected:{" "}
                        <span className="text-teal-300">{tc.expected}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "hint" && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Actionable Hints
                </h3>
                {codingProblem.hints.map((hint, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-3"
                  >
                    <span className="w-6 h-6 bg-teal-500/15 rounded-full flex items-center justify-center text-xs font-bold text-teal-400 shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-sm text-slate-300">{hint}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom action buttons */}
          <div className="border-t border-white/10 p-3 flex gap-2 shrink-0">
            <button className="flex-1 flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-2 text-xs text-slate-300 transition-colors">
              <Lightbulb className="w-3 h-3 text-amber-400" />
              Get AI Coach help
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-2 text-xs text-slate-300 transition-colors">
              <Zap className="w-3 h-3 text-cyan-400" />
              Try random Interview
            </button>
          </div>
        </div>

        {/* ── Center Panel: Code Editor ── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Editor Tab Bar: Code | AI Diagram */}
          <div className="flex items-center border-b border-white/10 bg-[#111827] shrink-0">
            <button
              onClick={() => setEditorTab("code")}
              className={`flex items-center gap-1.5 px-4 xl:px-5 py-2.5 text-xs font-medium transition-colors relative ${
                editorTab === "code"
                  ? "text-white bg-white/5"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Code
              {editorTab === "code" && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-400" />
              )}
            </button>
            <button
              onClick={() => setEditorTab("diagram")}
              className={`flex items-center gap-1.5 px-4 xl:px-5 py-2.5 text-xs font-medium transition-colors relative ${
                editorTab === "diagram"
                  ? "text-white bg-white/5"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              AI Diagram
              {editorTab === "diagram" && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-400" />
              )}
            </button>
          </div>

          {/* Editor Toolbar */}
          <div className="flex items-center justify-between px-3 xl:px-4 py-2 border-b border-white/10 bg-[#111827] shrink-0">
            {/* Language selector + Reset */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg text-xs transition-colors border border-white/5"
                >
                  <Code2 className="w-3 h-3 text-teal-400" />
                  <span className="capitalize">{language}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                {showLangDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-[#1E293B] border border-white/10 rounded-lg shadow-2xl py-1 z-30 min-w-[140px]">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setShowLangDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-1.5 text-xs capitalize transition-colors ${
                          lang === language
                            ? "text-teal-400 bg-teal-400/10"
                            : "text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg text-xs transition-colors border border-white/5 text-slate-300"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>

            {/* Action buttons + Live sync */}
            <div className="flex items-center gap-2 xl:gap-3">
              <button
                onClick={handleRun}
                className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white px-3 xl:px-3.5 py-1.5 rounded-lg text-xs transition-colors border border-white/10"
              >
                <Play className="w-3 h-3 fill-current text-green-400" />
                Run
              </button>
              <button
                onClick={handleSubmit}
                disabled={isAnalyzing}
                className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 xl:px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              >
                {isAnalyzing ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Play className="w-3 h-3 fill-current" />
                )}
                {isAnalyzing ? "Analyzing..." : "Submit"}
              </button>

              {/* Live sync indicator - hidden on small screens */}
              <div className="items-center gap-1.5 ml-1 hidden sm:flex">
                <Zap className="w-3 h-3 text-teal-400" />
                <span className="text-[10px] text-teal-400 font-medium">
                  Live sync active
                </span>
              </div>
            </div>
          </div>

          {editorTab === "code" ? (
            <>
              {/* Monaco Editor */}
              <div className="flex-1 min-h-0">
                <MonacoEditor
                  height="100%"
                  language={language}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    fontSize: 13,
                    fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                    minimap: { enabled: false },
                    padding: { top: 16 },
                    scrollBeyondLastLine: false,
                    lineNumbers: "on",
                    renderLineHighlight: "all",
                    automaticLayout: true,
                    wordWrap: "on",
                    cursorBlinking: "smooth",
                  }}
                />
              </div>

              {/* Test Results Panel */}
              {showTestResults && (
                <div className="border-t border-white/10 bg-[#111827] shrink-0">
                  <div className="flex items-center justify-between px-3 xl:px-4 py-1.5 border-b border-white/5">
                    <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                      {codingTestCases.slice(0, 5).map((tc, i) => (
                        <button
                          key={tc.id}
                          onClick={() => setActiveTestCase(i)}
                          className={`flex items-center gap-1 px-2 xl:px-2.5 py-1 rounded text-[11px] transition-colors whitespace-nowrap ${
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
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-green-400 font-medium">
                        ✓ Accepted
                      </span>
                      <span className="text-[10px] text-slate-500 hidden sm:inline">
                        Runtime:{" "}
                        {codingTestCases[activeTestCase]?.runtime}
                      </span>
                      <button
                        onClick={() => setShowTestResults(false)}
                        className="text-slate-500 hover:text-slate-300 ml-2"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="px-3 xl:px-4 py-3 grid grid-cols-3 gap-3 xl:gap-4 text-xs">
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

              {/* Status bar */}
              {!showTestResults && (
                <div className="flex items-center justify-between px-3 xl:px-4 py-1.5 text-[10px] text-slate-600 border-t border-white/10 bg-[#111827] shrink-0 font-mono">
                  <span>Ln 12, Col 18</span>
                  <span>UTF-8 • {language.toUpperCase()} SYNTAX</span>
                </div>
              )}
            </>
          ) : (
            /* AI Diagram tab content */
            <div className="flex-1 flex items-center justify-center bg-[#111827]">
              <div className="text-center">
                <BrainCircuit className="w-12 h-12 text-teal-500/30 mx-auto mb-3" />
                <p className="text-sm text-slate-400 font-medium">
                  AI Diagram Visualization
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Visual representation of your algorithm flow
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Right Panel: Participants / Analysis ── */}
        <div
          className={`
            w-[280px] xl:w-[300px] border-l border-white/10 flex flex-col shrink-0 bg-[#0D1220]
            fixed lg:static top-0 bottom-0 right-0 z-40
            transition-transform duration-300 ease-in-out
            ${showRightPanel ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
          `}
        >
          {/* Close button on mobile */}
          <button
            onClick={() => setShowRightPanel(false)}
            className="lg:hidden absolute top-3 left-3 z-50 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-slate-300" />
          </button>

          {isAnalyzing ? (
            /* ─── INLINE ANALYSIS VIEW ─── */
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
              {/* Header */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30 flex items-center justify-center animate-pulse">
                  <Sparkles className="w-5 h-5 text-teal-400" />
                </div>
              </div>
              <div className="text-center mb-6">
                <h2 className="text-base font-bold text-white mb-1">
                  Analyzing Solution…
                </h2>
                <p className="text-[11px] text-slate-400">
                  Examining your solution&apos;s logic and approach
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-2 mb-6">
                {feedbackSteps.map((step, index) => {
                  const isActive = index === analysisStep;
                  const isComplete = index < analysisStep;
                  const isPending = index > analysisStep;

                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 border transition-all duration-300 ${
                        isActive
                          ? "bg-teal-500/10 border-teal-500/30"
                          : isComplete
                            ? "bg-white/[0.03] border-white/5"
                            : "bg-transparent border-transparent opacity-40"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          isComplete
                            ? "bg-teal-500/20 text-teal-400"
                            : isActive
                              ? "bg-teal-500/20 text-teal-400"
                              : "bg-white/5 text-slate-600"
                        }`}
                      >
                        {isComplete ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : isActive ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          stepIcons[step.icon] || (
                            <Code className="w-4 h-4" />
                          )
                        )}
                      </div>
                      <span
                        className={`text-xs font-medium flex-1 ${
                          isPending ? "text-slate-600" : "text-slate-200"
                        }`}
                      >
                        {step.label}
                      </span>
                      {isComplete && (
                        <span className="text-[9px] font-bold text-teal-400 uppercase tracking-wider">
                          Done
                        </span>
                      )}
                      {isActive && (
                        <span className="text-[9px] font-bold text-teal-400 uppercase tracking-wider">
                          Processing
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] text-slate-500 font-semibold">
                    Overall Progress
                  </span>
                  <span className="text-[11px] font-bold text-teal-400 tabular-nums">
                    {Math.round(analysisProgress)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all duration-300"
                    style={{ width: `${analysisProgress}%` }}
                  />
                </div>
              </div>

              {/* Feedback requested badge */}
              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-3 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-teal-500/15 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                </div>
                <span className="text-[11px] text-slate-300 font-medium">
                  Feedback Requested
                </span>
              </div>
            </div>
          ) : (
            /* ─── NORMAL VIEW: PARTICIPANTS ─── */
            <div className="flex-1 flex flex-col items-center justify-center gap-6 p-4">
              {/* Mentor / HR AI Avatar */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <div className="w-24 h-24 xl:w-28 xl:h-28 rounded-full overflow-hidden border-2 border-teal-500/40 shadow-lg shadow-teal-500/10">
                    <Image
                      src="/mentor-avatar.png"
                      alt="Samuel Brooks"
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Online indicator */}
                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0D1220]" />
                </div>
                <h3 className="text-sm font-semibold text-white">
                  Samuel Brooks
                </h3>
                <p className="text-[11px] text-slate-400">
                  Senior Software Engineer · Google
                </p>
                {/* Speaking indicator */}
                <div className="flex items-center gap-1.5 mt-2">
                  <AudioWave barCount={12} color="#14B8A6" className="" />
                </div>
              </div>

              {/* Divider */}
              <div className="w-12 h-px bg-white/10" />

              {/* Candidate Avatar */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <div className="w-24 h-24 xl:w-28 xl:h-28 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
                    <Image
                      src="/candidate-avatar.png"
                      alt="John Doe"
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Online indicator */}
                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0D1220]" />
                </div>
                <h3 className="text-sm font-semibold text-white">
                  John Doe
                </h3>
                <p className="text-[11px] text-slate-400">Candidate</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ───────── Bottom Call Controls Bar ───────── */}
      <div className="flex items-center justify-center gap-3 px-6 py-2.5 xl:py-3 border-t border-white/10 bg-[#0A0E1A] shrink-0">
        {/* Mic button - green when on */}
        <button
          onClick={() => setMicOn(!micOn)}
          className={`w-10 h-10 xl:w-11 xl:h-11 rounded-full flex items-center justify-center transition-all ${
            micOn
              ? "bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20"
              : "bg-white/10 hover:bg-white/15 text-slate-400"
          }`}
        >
          {micOn ? (
            <Mic className="w-4 h-4" />
          ) : (
            <MicOff className="w-4 h-4" />
          )}
        </button>

        {/* Video button */}
        <button
          onClick={() => setVideoOn(!videoOn)}
          className={`w-10 h-10 xl:w-11 xl:h-11 rounded-full flex items-center justify-center transition-all ${
            videoOn
              ? "bg-white/10 hover:bg-white/15 text-white"
              : "bg-white/10 hover:bg-white/15 text-slate-400"
          }`}
        >
          {videoOn ? (
            <Video className="w-4 h-4" />
          ) : (
            <VideoOff className="w-4 h-4" />
          )}
        </button>

        {/* End call — red */}
        <button
          onClick={() => router.push("/dashboard")}
          className="w-10 h-10 xl:w-11 xl:h-11 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-all shadow-lg shadow-red-500/20"
        >
          <Phone className="w-4 h-4 rotate-[135deg]" />
        </button>
      </div>
    </div>
  );
}
