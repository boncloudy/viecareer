"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { AudioWave } from "@/components/audio-wave";
import { interviewQuestions } from "@/lib/mock-data";
import {
  Mic,
  Video,
  Hand,
  LayoutGrid,
  MoreVertical,
  PhoneOff,
  Settings,
  HelpCircle,
  Info,
  Users,
  MessageSquare,
  Sparkles,
  User,
} from "lucide-react";

export default function InterviewPage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleNextQuestion = useCallback(() => {
    if (currentQ < interviewQuestions.length - 1) {
      setIsProcessing(true);
      setTimeout(() => {
        setCurrentQ((q) => q + 1);
        setIsProcessing(false);
      }, 2000);
    }
  }, [currentQ]);

  const handleEndInterview = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    router.push("/analytics");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold">VieCareer</span>
          <span className="text-teal-400 text-sm font-semibold ml-1">
            AI INTERVIEW
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse-dot" />
            <span className="text-sm font-medium">REC {formatTime(timer)}</span>
          </div>
          <button className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-6 relative">
        {/* Question Banner */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 animate-fade-in-up">
          <div className="bg-[#1E293B]/90 backdrop-blur-md rounded-xl px-8 py-4 border border-white/10 text-center max-w-2xl">
            <p className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-1.5">
              Current Question
            </p>
            <p className="text-white text-lg font-medium leading-relaxed">
              {isProcessing
                ? "AI is generating the next question..."
                : `"${interviewQuestions[currentQ].question}"`}
            </p>
          </div>
        </div>

        {/* Candidate Video (Main) */}
        <div className="relative w-full max-w-4xl aspect-video bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Placeholder person silhouette */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-slate-500/30 flex items-center justify-center">
              <User className="w-24 h-24 text-slate-400" />
            </div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Audio indicator (top right) */}
          <div className="absolute top-4 right-4">
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-teal-400 rounded-full animate-audio-wave" style={{ animationDelay: "0s" }} />
              <div className="w-1 h-4 bg-teal-400 rounded-full animate-audio-wave" style={{ animationDelay: "0.1s" }} />
              <div className="w-1 h-5 bg-teal-400 rounded-full animate-audio-wave" style={{ animationDelay: "0.2s" }} />
            </div>
          </div>

          {/* Label */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5">
            <User className="w-3.5 h-3.5 text-white/80" />
            <span className="text-sm text-white/90 font-medium">
              You (Candidate)
            </span>
          </div>
        </div>

        {/* AI Interviewer Panel */}
        <div className="mt-6 relative">
          <div className="w-80 h-48 bg-slate-800 rounded-xl overflow-hidden border border-white/10 shadow-xl relative">
            {/* AI Avatar placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-teal-500/20 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-teal-400" />
              </div>
            </div>

            {/* Speaking indicator */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
              <AudioWave barCount={10} color="#14B8A6" />
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                AI Speaking...
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 justify-center">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-sm text-slate-400 font-medium">
              VieCareer AI Panel
            </span>
          </div>
        </div>
      </main>

      {/* Bottom Control Bar */}
      <div className="border-t border-white/10 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {/* Left: Time */}
          <div className="text-left">
            <p className="text-sm font-medium">
              {new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <p className="text-xs text-slate-400">React Developer Interview</p>
          </div>

          {/* Center: Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isMuted
                  ? "bg-red-500/20 text-red-400"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isVideoOff
                  ? "bg-red-500/20 text-red-400"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              <Video className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
              <Hand className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextQuestion}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              title="More / Next Question"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            <button
              onClick={handleEndInterview}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors ml-2"
            >
              <PhoneOff className="w-4 h-4" />
              End Interview
            </button>
          </div>

          {/* Right: Extra icons */}
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors">
              <Info className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors">
              <Users className="w-4 h-4" />
            </button>
            <button className="relative w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-teal-400 rounded-full border-2 border-[#0F172A]" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="max-w-4xl mx-auto mt-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>
              Question {currentQ + 1} of {interviewQuestions.length}
            </span>
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-500 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    ((currentQ + 1) / interviewQuestions.length) * 100
                  }%`,
                }}
              />
            </div>
            <span>Q{interviewQuestions.length} Final Question</span>
          </div>
        </div>
      </div>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1E293B] rounded-2xl p-8 text-center">
            <div className="animate-spin w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-white font-semibold">
              AI is processing your response...
            </p>
            <p className="text-slate-400 text-sm mt-1">
              Generating next question
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
