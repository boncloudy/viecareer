"use client";

import React from "react";
import { Sidebar } from "@/components/sidebar";
import { TopNavbar } from "@/components/top-navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Circle,
  BookOpen,
  ExternalLink,
  TrendingUp,
  Clock,
  Layout
} from "lucide-react";
import { roadmapSteps, aiLibraryResources } from "@/lib/mock-data";

export default function ActionPlanPage() {
  return (
    <div className="min-h-screen bg-[#F3F3F3] flex">
      <Sidebar />

      <div className="flex-1 ml-[220px]">
        <TopNavbar />

        <main className="p-10 max-w-5xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex items-end justify-between border-b-2 border-[#191A23]/10 pb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Layout className="w-4 h-4 text-[#5378EF]" />
                <span className="text-[10px] font-black text-[#5378EF] uppercase tracking-[.2em]">Personalized Learning Path</span>
              </div>
              <h1 className="text-4xl font-black text-[#191A23] tracking-tight">Growth Roadmap</h1>
              <p className="text-[#191A23]/60 mt-2">Strategically closing your gaps for <span className="font-bold text-[#191A23] underline decoration-[#5378EF]">Senior Software Engineer</span> roles.</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-[#191A23]/40 uppercase tracking-widest mb-1">Overall Progress</p>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-[#191A23]/10 rounded-full overflow-hidden">
                  <div className="w-[35%] h-full bg-[#5378EF]"></div>
                </div>
                <span className="font-black text-[#191A23]">35%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Roadmap Timeline */}
            <div className="lg:col-span-2 space-y-8">
              {roadmapSteps.map((step, idx) => (
                <div key={idx} className="relative pl-8 border-l-2 border-[#191A23]/15 space-y-4">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white bg-[#191A23] shadow-sm"></div>

                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xl text-[#191A23]">{step.phase}</h3>
                    <Badge variant="outline" className={step.status === "In Progress" ? "bg-[#5378EF]/10 text-[#5378EF] border-[#5378EF]/30" : "text-[#191A23]/40 border-[#191A23]/20"}>
                      {step.status}
                    </Badge>
                  </div>

                  <div className="grid gap-4">
                    {step.tasks.map((task) => (
                      <Card key={task.id} className={`p-5 border-2 border-[#191A23] shadow-[2px_2px_0_#191A23] hover:shadow-[4px_4px_0_#191A23] transition-all rounded-xl ${task.completed ? 'bg-[#F3F3F3]' : 'bg-white'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {task.completed ? (
                              <CheckCircle2 className="w-6 h-6 text-[#5378EF]" />
                            ) : (
                              <Circle className="w-6 h-6 text-[#191A23]/20" />
                            )}
                            <div>
                              <p className={`font-bold text-sm ${task.completed ? 'text-[#191A23]/40 line-through' : 'text-[#191A23]'}`}>
                                {task.title}
                              </p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="flex items-center gap-1 text-[10px] text-[#191A23]/40 font-bold uppercase tracking-wider">
                                  <Clock className="w-3 h-3" /> {task.duration}
                                </span>
                                <span className="text-[10px] bg-[#191A23]/5 px-2 py-0.5 rounded text-[#191A23]/50 font-bold">{task.type}</span>
                              </div>
                            </div>
                          </div>
                          {!task.completed && (
                            <Button size="sm" variant="ghost" className="text-[#5378EF] font-bold hover:bg-[#5378EF]/10 rounded-full">
                              Start <ExternalLink className="w-3 h-3 ml-2" />
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Recommendations & Stats */}
            <div className="space-y-6">
              <Card className="p-6 bg-[#191A23] text-white border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] rounded-2xl">
                <TrendingUp className="w-8 h-8 text-[#5378EF] mb-4" />
                <h4 className="font-bold text-lg mb-2">Estimated JRI Boost</h4>
                <p className="text-white/50 text-sm mb-6 italic">Completing Phase 1 will potentially increase your Readiness Score by:</p>
                <div className="text-4xl font-black text-[#5378EF]">+12.5%</div>
              </Card>

              <Card className="p-6 bg-white border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] rounded-2xl">
                <h4 className="font-bold text-[#191A23] mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#5378EF]" /> AI Library
                </h4>
                <div className="space-y-4">
                  <div className="p-3 hover:bg-[#F3F3F3] rounded-xl cursor-pointer transition-colors border-2 border-transparent hover:border-[#191A23]">
                    <p className="text-xs font-bold text-[#191A23] mb-1">The STAR Method Handbook</p>
                    <p className="text-[10px] text-[#191A23]/40 uppercase">PDF Guide • 12 Pages</p>
                  </div>
                  <div className="p-3 hover:bg-[#F3F3F3] rounded-xl cursor-pointer transition-colors border-2 border-transparent hover:border-[#191A23]">
                    <p className="text-xs font-bold text-[#191A23] mb-1">System Design Interview Vol. 1</p>
                    <p className="text-[10px] text-[#191A23]/40 uppercase">Interactive Course</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
