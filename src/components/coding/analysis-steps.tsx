"use client";

import React, { useState, useEffect } from "react";
import {
  Code,
  Search,
  Zap,
  Shield,
  Lightbulb,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";
import type { FeedbackStep } from "@/lib/mock-data";

/* ── Icon map ── */
const stepIcons: Record<string, React.ReactNode> = {
  code: <Code className="w-4 h-4" />,
  search: <Search className="w-4 h-4" />,
  zap: <Zap className="w-4 h-4" />,
  shield: <Shield className="w-4 h-4" />,
  lightbulb: <Lightbulb className="w-4 h-4" />,
  check: <CheckCircle2 className="w-4 h-4" />,
};

const stepIconsLarge: Record<string, React.ReactNode> = {
  code: <Code className="w-5 h-5" />,
  search: <Search className="w-5 h-5" />,
  zap: <Zap className="w-5 h-5" />,
  shield: <Shield className="w-5 h-5" />,
  lightbulb: <Lightbulb className="w-5 h-5" />,
  check: <CheckCircle2 className="w-5 h-5" />,
};

interface AnalysisStepsProps {
  steps: FeedbackStep[];
  /** Called when all steps finish */
  onComplete?: () => void;
  /** "inline" = compact sidebar view, "fullscreen" = centered loading page */
  variant?: "inline" | "fullscreen";
  /** Step duration in ms (default 1200) */
  stepDuration?: number;
  /** Auto-start immediately (default true) */
  autoStart?: boolean;
}

export default function AnalysisSteps({
  steps,
  onComplete,
  variant = "fullscreen",
  stepDuration = 1200,
  autoStart = true,
}: AnalysisStepsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  // Step progression
  useEffect(() => {
    if (!autoStart || complete) return;
    const totalSteps = steps.length;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;
        if (next >= totalSteps) {
          clearInterval(interval);
          setComplete(true);
          onComplete?.();
          return prev;
        }
        return next;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [autoStart, complete, steps.length, stepDuration, onComplete]);

  // Progress bar
  useEffect(() => {
    if (!autoStart) return;
    const totalSteps = steps.length;
    const targetProgress = Math.min(
      ((currentStep + 1) / totalSteps) * 100,
      100
    );
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= targetProgress) {
          clearInterval(progressInterval);
          return targetProgress;
        }
        return prev + 0.8;
      });
    }, 20);
    return () => clearInterval(progressInterval);
  }, [currentStep, autoStart, steps.length]);

  const icons = variant === "fullscreen" ? stepIconsLarge : stepIcons;

  /* ═══════ Fullscreen variant ═══════ */
  if (variant === "fullscreen") {
    return (
      <div className="h-screen bg-[#0F172A] flex items-center justify-center overflow-hidden relative">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />

        <div className="relative z-10 w-full max-w-lg mx-auto px-6">
          {/* Header Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30 flex items-center justify-center animate-pulse">
              <Sparkles className="w-7 h-7 text-teal-400" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-white mb-2">
              Analyzing Solution...
            </h1>
            <p className="text-sm text-slate-400">
              Examining your solution&apos;s logic and approach
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-3 mb-10">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isComplete = index < currentStep;
              const isPending = index > currentStep;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-500 ${
                    isActive
                      ? "bg-teal-500/10 border border-teal-500/20 shadow-lg shadow-teal-500/5"
                      : isComplete
                        ? "bg-white/5 border border-white/5"
                        : "bg-transparent border border-transparent opacity-40"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive
                        ? "bg-teal-500/20 text-teal-400"
                        : isComplete
                          ? "bg-green-500/20 text-green-400"
                          : "bg-white/5 text-slate-600"
                    }`}
                  >
                    {isActive ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : isComplete ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      icons[step.icon]
                    )}
                  </div>

                  <span
                    className={`text-sm font-medium ${
                      isActive
                        ? "text-white"
                        : isComplete
                          ? "text-slate-300"
                          : "text-slate-600"
                    }`}
                  >
                    {step.label}
                  </span>

                  {isActive && (
                    <span className="ml-auto text-[10px] text-teal-400 font-semibold uppercase tracking-wider">
                      Processing
                    </span>
                  )}
                  {isComplete && (
                    <span className="ml-auto text-[10px] text-green-400 font-semibold uppercase tracking-wider">
                      Done
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium uppercase tracking-wider">
                Overall Progress
              </span>
              <span className="text-teal-400 font-bold tabular-nums">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Toast notification */}
          <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3 animate-fade-in-up">
            <div className="w-8 h-8 bg-teal-500/15 rounded-lg flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">
                Feedback Requested
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                AI feedback is being generated for your submission
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ═══════ Inline (sidebar) variant ═══════ */
  return (
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
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isComplete = index < currentStep;
          const isPending = index > currentStep;

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
                  icons[step.icon] || <Code className="w-4 h-4" />
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
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
