"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type AppFlow = "setup" | "dashboard" | "interview" | "coding" | "analytics";

interface AppContextType {
  currentFlow: AppFlow;
  setCurrentFlow: (flow: AppFlow) => void;

  // Upload state
  cvUploaded: boolean;
  jdUploaded: boolean;
  setCvUploaded: (v: boolean) => void;
  setJdUploaded: (v: boolean) => void;
  extractionVisible: boolean;
  setExtractionVisible: (v: boolean) => void;

  // Interview state
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (i: number) => void;
  isAiProcessing: boolean;
  setIsAiProcessing: (v: boolean) => void;
  interviewCompleted: boolean;
  setInterviewCompleted: (v: boolean) => void;

  // Helpers
  resetAll: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentFlow, setCurrentFlow] = useState<AppFlow>("setup");
  const [cvUploaded, setCvUploaded] = useState(false);
  const [jdUploaded, setJdUploaded] = useState(false);
  const [extractionVisible, setExtractionVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [interviewCompleted, setInterviewCompleted] = useState(false);

  const resetAll = useCallback(() => {
    setCurrentFlow("setup");
    setCvUploaded(false);
    setJdUploaded(false);
    setExtractionVisible(false);
    setCurrentQuestionIndex(0);
    setIsAiProcessing(false);
    setInterviewCompleted(false);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentFlow,
        setCurrentFlow,
        cvUploaded,
        jdUploaded,
        setCvUploaded,
        setJdUploaded,
        extractionVisible,
        setExtractionVisible,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        isAiProcessing,
        setIsAiProcessing,
        interviewCompleted,
        setInterviewCompleted,
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
