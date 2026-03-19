"use client";

import React, { useState, useEffect } from "react";

interface ScoreRingProps {
  /** Target score 0–100 */
  score: number;
  /** Label displayed below the score number */
  label?: string;
  /** Ring color (default teal) */
  color?: string;
  /** SVG size in px (default 130) */
  size?: number;
  /** Animation duration in ms (default 1400) */
  duration?: number;
}

export default function ScoreRing({
  score,
  label,
  color = "#14B8A6",
  size = 130,
  duration = 1400,
}: ScoreRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [score, duration]);

  const center = size / 2;
  const radius = center - 13;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (animatedScore / 100) * circumference;

  return (
    <div className="relative shrink-0">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="8"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-white tabular-nums">
          {animatedScore}
        </span>
        {label && (
          <span className="text-[10px] text-teal-400 font-semibold uppercase tracking-wider">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
