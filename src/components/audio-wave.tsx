"use client";

import React from "react";

interface AudioWaveProps {
  barCount?: number;
  color?: string;
  className?: string;
}

export function AudioWave({
  barCount = 8,
  color = "#14B8A6",
  className = "",
}: AudioWaveProps) {
  return (
    <div className={`flex items-end gap-[3px] h-6 ${className}`}>
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full animate-audio-wave"
          style={{
            backgroundColor: color,
            animationDelay: `${i * 0.1}s`,
            height: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}
