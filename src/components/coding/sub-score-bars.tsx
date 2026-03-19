"use client";

import React, { useState, useEffect } from "react";
import type { CodingFeedbackScore } from "@/lib/mock-data";

interface SubScoreBarsProps {
  scores: CodingFeedbackScore[];
  /** Animation duration in ms (default 1600) */
  duration?: number;
}

export default function SubScoreBars({
  scores,
  duration = 1600,
}: SubScoreBarsProps) {
  const [animatedValues, setAnimatedValues] = useState(scores.map(() => 0));

  useEffect(() => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValues(scores.map((s) => Math.round(eased * s.value)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [scores, duration]);

  return (
    <div className="flex-1 space-y-3">
      {scores.map((score, i) => (
        <div key={score.label} className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">{score.label}</span>
            <span
              className="font-bold tabular-nums"
              style={{ color: score.color }}
            >
              {animatedValues[i]}/{score.max}
            </span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${animatedValues[i]}%`,
                backgroundColor: score.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
