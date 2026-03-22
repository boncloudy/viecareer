"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AudioWave } from "@/components/audio-wave";
import { useApp } from "@/lib/app-context";
import { interviewQuestions } from "@/lib/mock-data";
import {
  Mic,
  Video,
  Hand,
  LayoutGrid,
  PhoneOff,
  Settings,
  HelpCircle,
  Info,
  Users,
  MessageSquare,
  Sparkles,
  Code2,
  ChevronRight,
} from "lucide-react";

export default function InterviewPage() {
  const router = useRouter();
  const app = useApp();
  const [currentQ, setCurrentQ] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
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

  const handleSubmitAnswer = useCallback(() => {
    // Mark current question as answered
    const newAnswered = new Set(answeredQuestions);
    newAnswered.add(currentQ);
    setAnsweredQuestions(newAnswered);

    if (currentQ < interviewQuestions.length - 1) {
      // Show processing, then advance
      setIsProcessing(true);
      setTimeout(() => {
        setCurrentQ((q) => q + 1);
        setIsProcessing(false);
      }, 2000);
    } else {
      // All questions answered
      setAllQuestionsAnswered(true);
      app.setQuestionsAnswered(interviewQuestions.length);
      app.setInterviewCompleted(true);
    }
  }, [currentQ, answeredQuestions, app]);

  const handleEndInterview = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    router.push("/loading");
  }, [router]);

  const handleNextCodingInterview = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    app.setCurrentFlow("coding");
    router.push("/coding");
  }, [router, app]);

  return (
    <div className="h-screen bg-[#191A23] text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8  rounded-lg flex items-center justify-center">
            <img
            src="/logo.png"
            alt="VieCareer Logo"
            className="w-8 h-8 object-contain"
          />
          </div>
          <span className="text-lg font-bold">VieCareer</span>
          <span className="text-[#5378EF] text-sm font-semibold ml-1">
            AI INTERVIEW
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#5378EF]/20 border border-[#5378EF]/30 rounded-full px-4 py-1.5">
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
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-4 relative min-h-0">
        {/* Question Banner */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-4">
          <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/10 text-center animate-fade-in-up">
            <p className="text-xs font-bold text-[#5378EF] uppercase tracking-widest mb-1">
              Current Question ({currentQ + 1}/{interviewQuestions.length})
            </p>
            <p className="text-white text-base font-medium leading-relaxed">
              {isProcessing
                ? "AI is generating the next question..."
                : `"${interviewQuestions[currentQ].question}"`}
            </p>
          </div>
        </div>

        {/* Video Area */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl gap-4 pt-12">
          {/* Candidate Video (Main) */}
          <div className="relative w-full flex-1 max-w-[70vh] max-h-[60vh] bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/candidate-avatar.png"
                alt="Candidate"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute top-4 right-4">
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-[#5378EF] rounded-full animate-audio-wave" style={{ animationDelay: "0s" }} />
                <div className="w-1 h-4 bg-[#5378EF] rounded-full animate-audio-wave" style={{ animationDelay: "0.1s" }} />
                <div className="w-1 h-5 bg-[#5378EF] rounded-full animate-audio-wave" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <Users className="w-3.5 h-3.5 text-white/80" />
              <span className="text-sm text-white/90 font-medium">You (Candidate)</span>
            </div>
          </div>

          {/* AI Interviewer Panel */}
          <div className="flex items-center gap-4">
            <div className="w-56 h-32 bg-slate-800 rounded-xl overflow-hidden border border-white/10 shadow-xl relative">
              <Image
                src="/mentor-avatar.png"
                alt="AI Interviewer"
                fill
                className="object-cover object-top"
              />
              <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
                <AudioWave barCount={8} color="#5378EF" />
                <span className="text-[10px] font-bold text-[#5378EF] uppercase tracking-wider">
                  AI Speaking...
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#5378EF]" />
              <span className="text-sm text-white/50 font-medium">VieCareer AI Panel</span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Control Bar */}
      <div className="border-t border-white/10 px-6 py-3 shrink-0">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {/* Left: Time */}
          <div className="text-left min-w-[160px]">
            <p className="text-sm font-medium">
              {new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <p className="text-xs text-white/50">React Developer Interview</p>
          </div>

          {/* Center: Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                isMuted
                  ? "bg-red-500/20 text-red-400"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                isVideoOff
                  ? "bg-red-500/20 text-red-400"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              <Video className="w-5 h-5" />
            </button>
            <button className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
              <Hand className="w-5 h-5" />
            </button>
            <button className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
              <LayoutGrid className="w-5 h-5" />
            </button>

            {/* Submit Answer button */}
            {!allQuestionsAnswered && (
              <button
                onClick={handleSubmitAnswer}
                disabled={isProcessing}
                className="flex items-center gap-2 bg-[#5378EF] hover:bg-[#5378EF]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-colors ml-2"
              >
                <ChevronRight className="w-4 h-4" />
                {currentQ < interviewQuestions.length - 1
                  ? "Submit & Next"
                  : "Submit Final Answer"}
              </button>
            )}

            {/* Next: Code Interview — shown only after all Q&A done */}
            {allQuestionsAnswered && (
              <button
                onClick={handleNextCodingInterview}
                className="flex items-center gap-2 bg-[#5378EF] hover:bg-[#5378EF]/80 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-colors ml-2 animate-fade-in-up"
              >
                <Code2 className="w-4 h-4" />
                Next: Code Interview
              </button>
            )}

            <button
              onClick={handleEndInterview}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-colors ml-1"
            >
              <PhoneOff className="w-4 h-4" />
              End Interview
            </button>
          </div>

          {/* Right: Extra icons */}
          <div className="flex items-center gap-2 min-w-[100px] justify-end">
            <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 transition-colors">
              <Info className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 transition-colors">
              <Users className="w-4 h-4" />
            </button>
            <button className="relative w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#5378EF] rounded-full border-2 border-[#191A23]" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="max-w-4xl mx-auto mt-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>
              Question {currentQ + 1} of {interviewQuestions.length}
            </span>
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#5378EF] rounded-full transition-all duration-500"
                style={{
                  width: `${
                    (answeredQuestions.size / interviewQuestions.length) * 100
                  }%`,
                }}
              />
            </div>
            <span>
              {allQuestionsAnswered
                ? "✓ All questions completed"
                : `${answeredQuestions.size} answered`}
            </span>
          </div>
        </div>
      </div>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#191A23] border-2 border-[#5378EF]/30 rounded-2xl p-8 text-center">
            <div className="animate-spin w-10 h-10 border-4 border-[#5378EF] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-white font-semibold">
              AI is processing your response...
            </p>
            <p className="text-white/50 text-sm mt-1">
              Generating next question
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
