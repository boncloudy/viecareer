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

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <div className="flex-1 ml-[220px] flex flex-col min-w-0">
        
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-600" />
            <span className="font-semibold text-slate-800">Performance Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center text-xs font-medium text-white shadow-sm">
              JD
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-8">
          
          {/* Section 1: JRI Score Card */}
          <Card className="p-8 border border-slate-200 shadow-sm rounded-3xl bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <div className="space-y-2">
                  <h2 className="text-xs font-bold text-teal-600 uppercase tracking-widest">Job Readiness Index</h2>
                  <p className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Your JRI: {jriScore}%</p>
                </div>
                <p className="text-slate-600 text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                  You are approaching the <span className="text-slate-900 font-semibold">Intern Frontend Developer</span> threshold. 
                  Our AI recommends focusing on <span className="text-teal-600 font-semibold">System Design</span> to boost your score.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
                  <Button 
                    className="bg-slate-900 text-white hover:bg-slate-800 px-8 h-12 rounded-xl shadow-sm w-full sm:w-auto transition-all"
                    onClick={() => router.push("/setup")}
                  >
                    <PlayCircle className="w-5 h-5 mr-2" /> Start Interview
                  </Button>
                  <Button variant="outline" className="h-12 px-6 rounded-xl w-full sm:w-auto border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 transition-all">
                    Analyze Gaps
                  </Button>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="bg-slate-50 p-6 rounded-full  border-slate-100 shadow-inner">
                  <CircularScore score={jriScore} size={180} strokeWidth={16} color="#0F172A" />
                </div>
              </div>
            </div>
          </Card>

          {/* Section 2: Daily Focus */}
          <div className="bg-slate-900 rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5 w-full sm:w-auto">
              <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center border border-teal-500/30 shrink-0">
                <Target className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-teal-400 mb-1">Daily Focus</h3>
                <p className="text-slate-400 text-sm">Mastering the <span className="text-slate-200 font-medium">STAR method</span> for behavioral assessments.</p>
              </div>
            </div>
            <Button className="bg-teal-500 hover:bg-teal-400 text-white text-slate-900 font-bold px-8 h-11 rounded-xl shrink-0 w-full sm:w-auto flex justify-center transition-colors">
              Update Goal
            </Button>
          </div>

          {/* Section 3: Analysis & Milestones */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Analysis Box */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2 px-1">
                <BarChart3 className="w-5 h-5 text-teal-600" />
                <h3 className="font-semibold text-slate-800 text-lg">Readiness Gap Analysis</h3>
              </div>
              <Card className="p-6 border border-slate-200 shadow-sm rounded-2xl bg-white h-[400px] flex flex-col items-center justify-center">
                <RadarChartComponent data={dashboardRadarData} height={320} />
              </Card>
            </div>

            {/* Milestones Box */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2 px-1">
                <h3 className="font-semibold text-slate-800 text-lg">Next Milestones</h3>
              </div>
              <div className="space-y-3">
                {upcomingMilestones.map((milestone, i) => (
                  <Card key={i} className="group p-4 border border-slate-200 hover:border-teal-500/50 hover:shadow-md transition-all cursor-pointer rounded-xl bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-8 flex justify-center">
                          <span className="text-xs font-bold text-slate-300 group-hover:text-teal-500 transition-colors">0{i + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-700 transition-colors">{milestone.title}</p>
                          <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mt-1">{milestone.time}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                ))}
              </div>
              <Button variant="ghost" className="w-full text-teal-600 font-semibold text-sm h-12 rounded-xl hover:bg-teal-50 hover:text-teal-700 transition-colors mt-2">
                View Full Roadmap
              </Button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}