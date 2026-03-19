"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { feedbackSteps } from "@/lib/mock-data";
import AnalysisSteps from "@/components/coding/analysis-steps";

export default function CodingFeedbackPage() {
  const router = useRouter();

  return (
    <AnalysisSteps
      steps={feedbackSteps}
      variant="fullscreen"
      onComplete={() => {
        setTimeout(() => router.push("/coding-results"), 800);
      }}
    />
  );
}
