"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type AppFlow = "setup" | "dashboard" | "interview" | "coding" | "analytics";

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
  }, []);

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
