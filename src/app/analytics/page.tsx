"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TopNavbar } from "@/components/top-navbar";
import { CircularScore } from "@/components/circular-score";
import { RadarChartComponent } from "@/components/radar-chart";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  analyticsRadarData,
  analyticsDimensionScores,
  skillRecommendations,
  interviewQuestions,
  finaljriScore,
} from "@/lib/mock-data";
import {
  Share2,
  Download,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  BrainCircuit,
} from "lucide-react";

export default function AnalyticsPage() {
  const router = useRouter();
  const [expandedQ, setExpandedQ] = useState<number | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-700 border-red-200";
      case "Moderate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Ongoing":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-[#F3F3F3] text-[#191A23] border-[#191A23]/20";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <TopNavbar />

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-[#191A23] mb-1">
              Post-Interview Analytics
            </h1>
            <p className="text-[#191A23]/60">
              Frontend Developer Intern - TechFlow Systems
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-2 border-[#191A23] text-[#191A23] gap-2 rounded-full hover:bg-[#F3F3F3]"
            >
              <Share2 className="w-4 h-4" />
              Share your result
            </Button>
            <Button className="bg-[#191A23] hover:bg-[#5378EF] text-white gap-2 rounded-full transition-colors">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Score + Radar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* JRI Score */}
          <Card className="p-8 text-center border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] rounded-2xl bg-white">
            <h2 className="text-lg font-bold text-[#191A23] mb-6">
              Job Readiness Index
            </h2>
            <CircularScore
              score={finaljriScore}
              maxScore={100}
              sublabel="/ 100"
              size={180}
              strokeWidth={12}
              color="#191A23"
            />
            <div className="mt-4">
              <Badge className="bg-[#5378EF]/10 text-[#5378EF] border border-[#5378EF]/30 px-4 py-1 text-sm">
                Excellent Readiness
              </Badge>
            </div>
            <p className="mt-4 text-sm text-[#191A23]/60 leading-relaxed max-w-xs mx-auto">
              &quot;Your technical depth impressed the panel, with slight gaps
              identified in specific state management patterns.&quot;
            </p>
          </Card>

          {/* Radar Chart */}
          <Card className="p-6 border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] rounded-2xl bg-white">
            <h2 className="text-lg font-bold text-[#191A23] mb-4">
              Readiness Gap Analysis
            </h2>
            <RadarChartComponent
              data={analyticsRadarData}
              showLegend={false}
              height={280}
              currentColor="#5378EF"
              targetColor="#191A23"
            />
            {/* Dimension Scores */}
            <div className="flex justify-between mt-4 px-2">
              {analyticsDimensionScores.map((dim) => (
                <div key={dim.label} className="text-center">
                  <p className="text-[10px] font-semibold text-[#191A23]/40 uppercase tracking-wider">
                    {dim.label}
                  </p>
                  <p className="text-lg font-bold text-[#191A23] mt-1">
                    {dim.value}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Action Plan & Skill Recommendations */}
        <Card className="p-8 mb-8 border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] rounded-2xl bg-white">
          <h2 className="text-xl font-bold text-[#191A23] mb-6">
            Action Plan & Skill Recommendations
          </h2>

          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 pb-3 border-b-2 border-[#191A23]/10 mb-4">
            <span className="text-xs font-bold text-[#191A23]/50 uppercase tracking-wider">
              Skill Gap Identified
            </span>
            <span className="text-xs font-bold text-[#191A23]/50 uppercase tracking-wider">
              Priority Status
            </span>
            <span className="text-xs font-bold text-[#191A23]/50 uppercase tracking-wider">
              Recommended Action
            </span>
            <span className="text-xs font-bold text-[#191A23]/50 uppercase tracking-wider">
              Predicted JRI Boost
            </span>
          </div>

          {/* Table Rows */}
          {skillRecommendations.map((rec, i) => (
            <div
              key={i}
              className="grid grid-cols-4 gap-4 py-4 border-b border-[#191A23]/10 items-center last:border-0"
            >
              <div>
                <p className="font-semibold text-[#191A23] text-sm">
                  {rec.skillGap}
                </p>
                <p className="text-xs text-[#191A23]/50 mt-0.5">
                  {rec.description}
                </p>
              </div>
              <div>
                <Badge
                  className={`${getPriorityColor(rec.priority)} text-xs px-3 py-0.5 border`}
                >
                  ● {rec.priority}
                </Badge>
              </div>
              <div>
                <Button
                  size="sm"
                  className="bg-[#191A23] hover:bg-[#5378EF] text-white text-xs h-8 uppercase tracking-wider font-bold transition-all active:scale-95 group rounded-full"
                  onClick={() => {
                    alert("Skill added to your Action Plan!");
                    router.push("/action-plan");
                  }}
                >
                  {rec.actionLabel}
                  <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div>
                <span className="text-lg font-bold text-[#5378EF]">
                  {rec.jdiBoost}
                </span>
              </div>
            </div>
          ))}
        </Card>

        {/* Interview Breakdown */}
        <Card className="p-8 mb-8 border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] rounded-2xl bg-white">
          <h2 className="text-xl font-bold text-[#191A23] mb-6">
            Interview Question Breakdown
          </h2>
          <div className="space-y-3">
            {interviewQuestions.map((q) => (
              <div
                key={q.id}
                className="border-2 border-[#191A23] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedQ(expandedQ === q.id ? null : q.id)
                  }
                  className="w-full flex items-center justify-between p-5 hover:bg-[#F3F3F3] transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#191A23] text-white rounded-lg flex items-center justify-center text-sm font-bold">
                      Q{q.id}
                    </span>
                    <span className="font-medium text-[#191A23] text-sm">
                      {q.question}
                    </span>
                  </div>
                  {expandedQ === q.id ? (
                    <ChevronUp className="w-5 h-5 text-[#191A23]/40 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#191A23]/40 shrink-0" />
                  )}
                </button>

                {expandedQ === q.id && (
                  <div className="px-5 pb-5 space-y-4 animate-fade-in-up">
                    {/* User Answer */}
                    <div className="bg-[#F3F3F3] rounded-lg p-4">
                      <h4 className="text-xs font-bold text-[#191A23]/50 uppercase tracking-wider mb-2">
                        Your Answer
                      </h4>
                      <p className="text-sm text-[#191A23]/80 leading-relaxed">
                        {q.userAnswer}
                      </p>
                    </div>

                    {/* Strengths & Weaknesses */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#5378EF]/5 border border-[#5378EF]/20 rounded-lg p-4">
                        <h4 className="text-xs font-bold text-[#5378EF] uppercase tracking-wider mb-2">
                          ✓ Strengths
                        </h4>
                        <ul className="space-y-1.5">
                          {q.strengths.map((s, i) => (
                            <li
                              key={i}
                              className="text-sm text-[#191A23] flex items-start gap-1.5"
                            >
                              <span className="text-[#5378EF] mt-0.5">•</span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-red-50 rounded-lg p-4">
                        <h4 className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2">
                          ✗ Areas to Improve
                        </h4>
                        <ul className="space-y-1.5">
                          {q.weaknesses.map((w, i) => (
                            <li
                              key={i}
                              className="text-sm text-red-800 flex items-start gap-1.5"
                            >
                              <span className="text-red-500 mt-0.5">•</span>
                              {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Optimal Answer */}
                    <div className="bg-[#191A23]/5 rounded-lg p-4">
                      <h4 className="text-xs font-bold text-[#191A23] uppercase tracking-wider mb-2">
                        💡 Optimal Answer Suggestion
                      </h4>
                      <p className="text-sm text-[#191A23]/80 leading-relaxed">
                        {q.optimalAnswer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* CTA Banner */}
        <div className="bg-[#191A23] rounded-2xl border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] p-10 text-center text-white mb-8 relative overflow-hidden">
          <div className="absolute top-8 right-8 w-32 h-32 bg-[#5378EF]/10 rounded-full blur-2xl" />
          <BrainCircuit className="w-8 h-8 text-[#5378EF] mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">
            Ready to take the next step?
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Based on your {finaljriScore}/100 JRI Score, you are in the top 5% of
            candidates for this internship. Secure your spot today.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button className="bg-white text-[#191A23] hover:bg-[#5378EF] hover:text-white font-bold px-8 py-3 h-auto text-sm uppercase tracking-wider rounded-full transition-colors">
              Apply for Internship
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#191A23] font-bold px-8 py-3 h-auto text-sm uppercase tracking-wider rounded-full transition-colors bg-transparent"
            >
              View Similar Roles
            </Button>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-between py-6 border-t-2 border-[#191A23]/10 text-sm text-[#191A23]/40">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-[#5378EF]" />
            <span>VieCareer Powered Performance Analytics © 2026</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="hover:text-[#191A23] font-medium uppercase text-xs tracking-wider">
              Privacy Policy
            </button>
            <button className="hover:text-[#191A23] font-medium uppercase text-xs tracking-wider">
              Support
            </button>
            <button className="hover:text-[#191A23] font-medium uppercase text-xs tracking-wider">
              Help Center
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
