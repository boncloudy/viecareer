"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { CircularScore } from "@/components/circular-score";
import { RadarChartComponent } from "@/components/radar-chart";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { jriScore, dashboardRadarData, upcomingMilestones } from "@/lib/mock-data";
import { Bell, PlayCircle, ChevronRight, Target, BarChart3, BrainCircuit } from "lucide-react";
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
            <BrainCircuit className="w-5 h-5 text-[#5378EF]" />
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

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-5">

          {/* Section 1: JRI Score Card */}
          <Card className="p-6 border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] rounded-3xl bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="space-y-4 text-center lg:text-left">
                <div className="space-y-1">
                  <h2 className="text-[10px] font-bold text-[#5378EF] uppercase tracking-widest">Job Readiness Index</h2>
                  <p className="text-3xl md:text-4xl font-extrabold text-[#191A23] tracking-tight">Your JRI: {jriScore}%</p>
                </div>
                <p className="text-[#191A23]/60 text-sm leading-relaxed max-w-lg mx-auto lg:mx-0">
                  You are approaching the <span className="text-[#191A23] font-semibold">Intern Frontend Developer</span> threshold.
                  Our AI recommends focusing on <span className="text-[#5378EF] font-semibold">System Design</span> to boost your score.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start pt-1">
                  <Button
                    className="bg-[#191A23] text-white hover:bg-[#5378EF] px-6 h-10 rounded-full w-full sm:w-auto transition-all text-sm"
                    onClick={() => router.push("/setup")}
                  >
                    <PlayCircle className="w-4 h-4 mr-2" /> Start Interview
                  </Button>
                  <Button variant="outline" className="h-10 px-5 rounded-full w-full sm:w-auto border-2 border-[#191A23] hover:bg-[#F3F3F3] font-semibold text-[#191A23] transition-all text-sm">
                    Analyze Gaps
                  </Button>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="bg-[#F3F3F3] p-4 rounded-full border-2 border-[#191A23]/10">
                  <CircularScore score={jriScore} size={140} strokeWidth={14} color="#191A23" />
                </div>
              </div>
            </div>
          </Card>

          {/* Section 2: Daily Focus */}
          <div className="bg-[#191A23] rounded-2xl border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-10 h-10 bg-[#5378EF]/20 rounded-lg flex items-center justify-center border border-[#5378EF]/30 shrink-0">
                <Target className="w-5 h-5 text-[#5378EF]" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-[#5378EF] mb-1">Daily Focus</h3>
                <p className="text-white/60 text-xs">Mastering the <span className="text-white font-medium">STAR method</span> for behavioral assessments.</p>
              </div>
            </div>
            <Button className="bg-[#5378EF] hover:bg-white hover:text-[#191A23] text-white font-semibold px-6 h-9 rounded-full shrink-0 w-full sm:w-auto text-xs flex justify-center transition-colors">
              Update Goal
            </Button>
          </div>

          {/* Section 3: Analysis & Milestones */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Analysis Box */}
            <div className="lg:col-span-3 space-y-3">
              <div className="flex items-center gap-2 px-1">
                <BarChart3 className="w-4 h-4 text-[#5378EF]" />
                <h3 className="font-semibold text-[#191A23] text-base">Readiness Gap Analysis</h3>
              </div>
              <Card className="p-4 border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] rounded-2xl bg-white h-[340px] flex flex-col items-center justify-center">
                <RadarChartComponent data={dashboardRadarData} height={280} />
              </Card>
            </div>

            {/* Milestones Box */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2 px-1">
                <h3 className="font-semibold text-[#191A23] text-base">Next Milestones</h3>
              </div>
              <div className="space-y-2">
                {upcomingMilestones.map((milestone, i) => (
                  <Card key={i} className="group p-3 border-2 border-[#191A23] shadow-[2px_2px_0_#191A23] hover:shadow-[4px_4px_0_#191A23] transition-all cursor-pointer rounded-xl bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-left">
                        <div className="w-6 flex justify-center">
                          <span className="text-[10px] font-bold text-[#191A23]/30 group-hover:text-[#5378EF] transition-colors">0{i + 1}</span>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#191A23] group-hover:text-[#5378EF] transition-colors">{milestone.title}</p>
                          <p className="text-[9px] text-[#191A23]/50 font-medium uppercase tracking-wider mt-1">{milestone.time}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#191A23]/30 group-hover:text-[#5378EF] group-hover:translate-x-1 transition-all" />
                    </div>
                  </Card>
                ))}
              </div>
              <Button variant="ghost" className="w-full text-[#5378EF] font-semibold text-xs h-10 rounded-full hover:bg-[#5378EF]/10 hover:text-[#5378EF] transition-colors mt-1" onClick={() => router.push("/action-plan")}
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
