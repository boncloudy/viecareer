"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type {
  ExtractedCVJD,
  CapturedQA,
  DimensionScores,
} from "@/lib/jri-calculator";

export type AppFlow = "setup" | "dashboard" | "interview" | "coding" | "analytics";

export interface CompletedInterview {
  id: string;
  date: string;
  position: string;
  type: "Technical" | "Behavioral" | "Mixed";
  durationSecs: number;
  recordingUrl: string;
  qaPairs: { question: string; answer: string; score: number; timestamp: string }[];
  overallScore: number;
}

const INTERVIEW_TYPES: CompletedInterview["type"][] = ["Technical", "Behavioral", "Mixed"];

interface AppContextType {
  currentFlow: AppFlow;
  setCurrentFlow: (flow: AppFlow) => void;

  // Upload state
  cvUploaded: boolean;
  jdUploaded: boolean;
  cvFileName: string;
  jdFileName: string;
  setCvUploaded: (v: boolean) => void;
  setJdUploaded: (v: boolean) => void;
  setCvFileName: (name: string) => void;
  setJdFileName: (name: string) => void;
  extractionVisible: boolean;
  setExtractionVisible: (v: boolean) => void;

  // Interview state
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (i: number) => void;
  isAiProcessing: boolean;
  setIsAiProcessing: (v: boolean) => void;
  interviewCompleted: boolean;
  setInterviewCompleted: (v: boolean) => void;
  questionsAnswered: number;
  setQuestionsAnswered: (n: number) => void;

  // Coding state
  codeSubmitted: boolean;
  setCodeSubmitted: (v: boolean) => void;

  // Recording state
  interviewRecordingUrl: string;
  setInterviewRecordingUrl: (url: string) => void;
  interviewDuration: number;
  setInterviewDuration: (secs: number) => void;

  // Completed interviews history
  completedInterviews: CompletedInterview[];
  addCompletedInterview: (
    recordingUrl: string,
    durationSecs: number,
    qaPairs: { question: string; answer: string; score: number; timestamp: string }[],
    overallScore: number,
    position: string,
  ) => void;

  // Extracted CV/JD data from AI
  extraction: ExtractedCVJD | null;
  setExtraction: (data: ExtractedCVJD | null) => void;

  // Raw CV/JD text content (for AI extraction)
  cvTextContent: string;
  setCvTextContent: (text: string) => void;
  jdTextContent: string;
  setJdTextContent: (text: string) => void;

  // Captured Q&A transcript from realtime interview
  capturedQA: CapturedQA[];
  addCapturedQA: (qa: CapturedQA) => void;
  clearCapturedQA: () => void;

  // AI scoring results (populated after interview scoring)
  dimensions: DimensionScores | null;
  setDimensions: (d: DimensionScores | null) => void;
  sessionScore: number;
  setSessionScore: (s: number) => void;
  jriFinal: number;
  setJriFinal: (s: number) => void;
  scoredInterviewQuestions: {
    id: number;
    question: string;
    userAnswer: string;
    strengths: string[];
    weaknesses: string[];
    optimalAnswer: string;
  }[];
  setScoredInterviewQuestions: (q: AppContextType["scoredInterviewQuestions"]) => void;

  // Helpers
  resetAll: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentFlow, setCurrentFlow] = useState<AppFlow>("dashboard");
  const [cvUploaded, setCvUploaded] = useState(false);
  const [jdUploaded, setJdUploaded] = useState(false);
  const [cvFileName, setCvFileName] = useState("");
  const [jdFileName, setJdFileName] = useState("");
  const [extractionVisible, setExtractionVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [codeSubmitted, setCodeSubmitted] = useState(false);
  const [interviewRecordingUrl, setInterviewRecordingUrl] = useState("");
  const [interviewDuration, setInterviewDuration] = useState(0);
  const [completedInterviews, setCompletedInterviews] = useState<CompletedInterview[]>([]);

  // AI state
  const [extraction, setExtraction] = useState<ExtractedCVJD | null>(null);
  const [cvTextContent, setCvTextContent] = useState("");
  const [jdTextContent, setJdTextContent] = useState("");
  const [capturedQA, setCapturedQA] = useState<CapturedQA[]>([]);
  const [dimensions, setDimensions] = useState<DimensionScores | null>(null);
  const [sessionScore, setSessionScore] = useState(0);
  const [jriFinal, setJriFinal] = useState(0);
  const [scoredInterviewQuestions, setScoredInterviewQuestions] = useState<AppContextType["scoredInterviewQuestions"]>([]);

  const addCapturedQA = useCallback((qa: CapturedQA) => {
    setCapturedQA((prev) => [...prev, qa]);
  }, []);

  const clearCapturedQA = useCallback(() => {
    setCapturedQA([]);
  }, []);

  const addCompletedInterview = useCallback((
    recordingUrl: string,
    durationSecs: number,
    qaPairs: { question: string; answer: string; score: number; timestamp: string }[],
    overallScore: number,
    position: string,
  ) => {
    setCompletedInterviews((prev) => {
      const now = new Date();
      const entry: CompletedInterview = {
        id: `CI-${Date.now()}`,
        date: now.toISOString().slice(0, 10),
        position,
        type: INTERVIEW_TYPES[prev.length % INTERVIEW_TYPES.length],
        durationSecs,
        recordingUrl,
        qaPairs,
        overallScore,
      };
      return [entry, ...prev];
    });
  }, []);

  const resetAll = useCallback(() => {
    setCurrentFlow("dashboard");
    setCvUploaded(false);
    setJdUploaded(false);
    setCvFileName("");
    setJdFileName("");
    setExtractionVisible(false);
    setCurrentQuestionIndex(0);
    setIsAiProcessing(false);
    setInterviewCompleted(false);
    setQuestionsAnswered(0);
    setCodeSubmitted(false);
    if (interviewRecordingUrl) URL.revokeObjectURL(interviewRecordingUrl);
    setInterviewRecordingUrl("");
    setInterviewDuration(0);
    // Clear transient scoring data for next cycle
    setCapturedQA([]);
    setDimensions(null);
    setSessionScore(0);
    setJriFinal(0);
    setScoredInterviewQuestions([]);
    // Keep extraction and text content — persist if user re-uploads
  }, [interviewRecordingUrl]);

  return (
    <AppContext.Provider
      value={{
        currentFlow,
        setCurrentFlow,
        cvUploaded,
        jdUploaded,
        cvFileName,
        jdFileName,
        setCvUploaded,
        setJdUploaded,
        setCvFileName,
        setJdFileName,
        extractionVisible,
        setExtractionVisible,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        isAiProcessing,
        setIsAiProcessing,
        interviewCompleted,
        setInterviewCompleted,
        questionsAnswered,
        setQuestionsAnswered,
        codeSubmitted,
        setCodeSubmitted,
        interviewRecordingUrl,
        setInterviewRecordingUrl,
        interviewDuration,
        setInterviewDuration,
        completedInterviews,
        addCompletedInterview,
        extraction,
        setExtraction,
        cvTextContent,
        setCvTextContent,
        jdTextContent,
        setJdTextContent,
        capturedQA,
        addCapturedQA,
        clearCapturedQA,
        dimensions,
        setDimensions,
        sessionScore,
        setSessionScore,
        jriFinal,
        setJriFinal,
        scoredInterviewQuestions,
        setScoredInterviewQuestions,
        resetAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
