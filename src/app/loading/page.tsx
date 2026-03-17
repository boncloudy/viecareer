"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, BrainCircuit, BarChart3, Search } from "lucide-react";

export default function LoadingResultPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const loadingSteps = [
    { icon: <Search className="w-6 h-6" />, text: "Analyzing your responses..." },
    { icon: <BrainCircuit className="w-6 h-6" />, text: "Evaluating technical depth..." },
    { icon: <BarChart3 className="w-6 h-6" />, text: "Generating ATS matching report..." },
    { icon: <Sparkles className="w-6 h-6" />, text: "Finalizing your performance score..." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 1500);

    const timeout = setTimeout(() => {
      router.push("/analytics");
    }, 6500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router, loadingSteps.length]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
    
      <div className="relative mb-8">
        <div className="w-24 h-24 border-4 border-teal-100 border-t-teal-500 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-teal-500">
          {loadingSteps[step].icon}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Processing Your Results
      </h2>
   
      <div className="h-6 overflow-hidden">
         <p className="text-gray-500 animate-pulse transition-all duration-500">
            {loadingSteps[step].text}
         </p>
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-1.5 bg-gray-100 rounded-full mt-8 overflow-hidden">
        <div 
          className="h-full bg-teal-500 transition-all duration-[6000ms] ease-linear"
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
}