"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { CircularScore } from "@/components/circular-score";
import { RadarChartComponent } from "@/components/radar-chart";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { jriScore, dashboardRadarData, upcomingMilestones } from "@/lib/mock-data";
import { Bell, PlayCircle, ChevronRight, Target, BarChart3, Sparkles } from "lucide-react";
import { ChatbotBubble } from "@/components/chatbot-bubble";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />

      <div className="flex-1 ml-[220px] flex flex-col min-w-0">

        {/* Top bar */}
        <header className="h-16 bg-white border-b-2 border-[#191A23] flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#5378EF]" />
            <span className="font-semibold text-[#191A23]">Performance Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-[#191A23]/50 hover:bg-[#F3F3F3] rounded-full transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 bg-[#191A23] rounded-full flex items-center justify-center text-xs font-medium text-white shadow-sm">
              JD
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-8">

          {/* Section 1: JRI Score Card */}
          <Card className="p-8 border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] rounded-3xl bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <div className="space-y-2">
                  <h2 className="text-xs font-bold text-[#5378EF] uppercase tracking-widest">Job Readiness Index</h2>
                  <p className="text-4xl md:text-5xl font-extrabold text-[#191A23] tracking-tight">Your JRI: {jriScore}%</p>
                </div>
                <p className="text-[#191A23]/60 text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                  You are approaching the <span className="text-[#191A23] font-semibold">Intern Frontend Developer</span> threshold.
                  Our AI recommends focusing on <span className="text-[#5378EF] font-semibold">System Design</span> to boost your score.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
                  <Button
                    className="bg-[#191A23] text-white hover:bg-[#5378EF] px-8 h-12 rounded-full w-full sm:w-auto transition-all"
                    onClick={() => router.push("/setup")}
                  >
                    <PlayCircle className="w-5 h-5 mr-2" /> Start Interview
                  </Button>
                  <Button variant="outline" className="h-12 px-6 rounded-full w-full sm:w-auto border-2 border-[#191A23] hover:bg-[#F3F3F3] font-semibold text-[#191A23] transition-all">
                    Analyze Gaps
                  </Button>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="bg-[#F3F3F3] p-6 rounded-full border-2 border-[#191A23]/10">
                  <CircularScore score={jriScore} size={180} strokeWidth={16} color="#191A23" />
                </div>
              </div>
            </div>
          </Card>

          {/* Section 2: Daily Focus */}
          <div className="bg-[#191A23] rounded-2xl border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5 w-full sm:w-auto">
              <div className="w-12 h-12 bg-[#5378EF]/20 rounded-xl flex items-center justify-center border border-[#5378EF]/30 shrink-0">
                <Target className="w-6 h-6 text-[#5378EF]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[#5378EF] mb-1">Daily Focus</h3>
                <p className="text-white/60 text-sm">Mastering the <span className="text-white font-medium">STAR method</span> for behavioral assessments.</p>
              </div>
            </div>
            <Button className="bg-[#5378EF] hover:bg-white hover:text-[#191A23] text-white font-semibold px-8 h-11 rounded-full shrink-0 w-full sm:w-auto flex justify-center transition-colors">
              Update Goal
            </Button>
          </div>

          {/* Section 3: Analysis & Milestones */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Analysis Box */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2 px-1">
                <BarChart3 className="w-5 h-5 text-[#5378EF]" />
                <h3 className="font-semibold text-[#191A23] text-lg">Readiness Gap Analysis</h3>
              </div>
              <Card className="p-6 border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] rounded-2xl bg-white h-[400px] flex flex-col items-center justify-center">
                <RadarChartComponent data={dashboardRadarData} height={320} />
              </Card>
            </div>

            {/* Milestones Box */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2 px-1">
                <h3 className="font-semibold text-[#191A23] text-lg">Next Milestones</h3>
              </div>
              <div className="space-y-3">
                {upcomingMilestones.map((milestone, i) => (
                  <Card key={i} className="group p-4 border-2 border-[#191A23] shadow-[2px_2px_0_#191A23] hover:shadow-[4px_4px_0_#191A23] transition-all cursor-pointer rounded-xl bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-8 flex justify-center">
                          <span className="text-xs font-bold text-[#191A23]/30 group-hover:text-[#5378EF] transition-colors">0{i + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#191A23] group-hover:text-[#5378EF] transition-colors">{milestone.title}</p>
                          <p className="text-[11px] text-[#191A23]/50 font-medium uppercase tracking-wider mt-1">{milestone.time}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#191A23]/30 group-hover:text-[#5378EF] group-hover:translate-x-1 transition-all" />
                    </div>
                  </Card>
                ))}
              </div>
              <Button variant="ghost" className="w-full text-[#5378EF] font-semibold text-sm h-12 rounded-full hover:bg-[#5378EF]/10 hover:text-[#5378EF] transition-colors mt-2" onClick={() => router.push("/action-plan")}
>
              
                View Full Roadmap
              </Button>
            </div>
          </div>

        </main>
      </div>

      <ChatbotBubble />
    </div>
  );
}
