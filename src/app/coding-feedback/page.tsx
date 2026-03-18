"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { feedbackSteps } from "@/lib/mock-data";
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

const stepIcons: Record<string, React.ReactNode> = {
  code: <Code className="w-5 h-5" />,
  search: <Search className="w-5 h-5" />,
  zap: <Zap className="w-5 h-5" />,
  shield: <Shield className="w-5 h-5" />,
  lightbulb: <Lightbulb className="w-5 h-5" />,
  check: <CheckCircle2 className="w-5 h-5" />,
};

export default function CodingFeedbackPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepDuration = 1200;
    const totalSteps = feedbackSteps.length;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;
        if (next >= totalSteps) {
          clearInterval(interval);
          // Redirect after last step completes
          setTimeout(() => router.push("/coding-results"), 800);
          return prev;
        }
        return next;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [router]);

  // Progress bar animation
  useEffect(() => {
    const totalSteps = feedbackSteps.length;
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
  }, [currentStep]);

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
          {feedbackSteps.map((step, index) => {
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
                {/* Icon / spinner / check */}
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
                    stepIcons[step.icon]
                  )}
                </div>

                {/* Label */}
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

                {/* Status badge */}
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
