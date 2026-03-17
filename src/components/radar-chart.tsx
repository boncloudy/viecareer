"use client";

import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface RadarDataPoint {
  dimension: string;
  current: number;
  target: number;
  fullMark: number;
}

interface RadarChartComponentProps {
  data: RadarDataPoint[];
  showLegend?: boolean;
  height?: number;
  currentColor?: string;
  targetColor?: string;
  currentLabel?: string;
  targetLabel?: string;
}

export function RadarChartComponent({
  data,
  showLegend = true,
  height = 350,
  currentColor = "#0F172A",
  targetColor = "#94A3B8",
  currentLabel = "Current",
  targetLabel = "Target",
}: RadarChartComponentProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid stroke="#E2E8F0" />
        <PolarAngleAxis
          dataKey="dimension"
          tick={{ fill: "#475569", fontSize: 12, fontWeight: 600 }}
          className="text-xs"
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={false}
          axisLine={false}
        />
        <Radar
          name={targetLabel}
          dataKey="target"
          stroke={targetColor}
          fill={targetColor}
          fillOpacity={0.1}
          strokeWidth={2}
          strokeDasharray="5 5"
        />
        <Radar
          name={currentLabel}
          dataKey="current"
          stroke={currentColor}
          fill={currentColor}
          fillOpacity={0.15}
          strokeWidth={2}
        />
        {showLegend && (
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
          />
        )}
      </RadarChart>
    </ResponsiveContainer>
  );
}
