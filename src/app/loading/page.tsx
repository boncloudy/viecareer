"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/app-context";
import {
  scoreInterviewWithAI,
  calculateComposite,
  calculateJRIFinal,
} from "@/lib/jri-calculator";
import { BrainCircuit, BarChart3, Search } from "lucide-react";

export default function LoadingResultPage() {
  const router = useRouter();
  const app = useApp();
  const [step, setStep] = useState(0);
  const scoringDoneRef = useRef(false);

  const loadingSteps = [
    { icon: <Search className="w-6 h-6" />, text: "Analyzing your responses..." },
    { icon: <BrainCircuit className="w-6 h-6" />, text: "Evaluating technical depth..." },
    { icon: <BarChart3 className="w-6 h-6" />, text: "Generating ATS matching report..." },
    { icon: <BrainCircuit className="w-6 h-6" />, text: "Finalizing your performance score..." },
  ];

  // Step animation
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(interval);
  }, [loadingSteps.length]);

  // Scoring + navigation
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (scoringDoneRef.current) return;
      scoringDoneRef.current = true;

      // Score the captured Q&A with AI
      const position = app.extraction?.targetPosition || "Software Developer";
      const qaPairs = app.capturedQA.length > 0
        ? app.capturedQA
        : [
            { question: "General technical question", answer: "The candidate provided verbal answers during the live interview session.", timestamp: "00:00" },
          ];

      try {
        const scoring = await scoreInterviewWithAI(qaPairs, position);

        if (cancelled) return;

        // Calculate JRI Final using Phase 2 formula
        const ats = app.extraction?.atsScore || 65;
        const composite = calculateComposite(scoring.sessionScore, ats);
        const jriBaseline = app.extraction?.jriBaseline || ats;
        const jriFinal = calculateJRIFinal(composite, jriBaseline, 1);

        // Store results in context
        app.setDimensions(scoring.dimensions);
        app.setSessionScore(scoring.sessionScore);
        app.setJriFinal(jriFinal);
        app.setScoredInterviewQuestions(scoring.interviewQuestions);

        // Add completed interview to history
        const scoredQA = scoring.scoredQA.map((qa) => ({
          question: qa.question,
          answer: qa.answer,
          score: qa.score,
          timestamp: qa.timestamp,
        }));
        const overallScore = jriFinal;
        app.addCompletedInterview(
          app.interviewRecordingUrl,
          app.interviewDuration,
          scoredQA,
          overallScore,
          position,
        );
      } catch (err) {
        console.error("Scoring failed:", err);
      }

      // Navigate after scoring completes
      if (!cancelled) {
        setTimeout(() => router.push("/analytics"), 500);
      }
    };

    run();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">

      <div className="relative mb-8">
        <div className="w-24 h-24 border-4 border-[#5378EF]/20 border-t-[#5378EF] rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-[#5378EF]">
          {loadingSteps[step].icon}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-[#191A23] mb-2">
        AI is Scoring Your Performance
      </h2>

      <div className="h-6 overflow-hidden">
        <p className="text-[#191A23]/60 animate-pulse transition-all duration-500">
          {loadingSteps[step].text}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-1.5 bg-[#F3F3F3] rounded-full mt-8 overflow-hidden border border-[#191A23]/10">
        <div
          className="h-full bg-[#5378EF] transition-all duration-[6000ms] ease-linear"
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
}
