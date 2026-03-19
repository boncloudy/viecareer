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
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <Sidebar />

      <div className="flex-1 ml-[220px]">
        <TopNavbar />

        <main className="p-10 max-w-5xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex items-end justify-between border-b border-slate-200 pb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Layout className="w-4 h-4 text-teal-500" />
                <span className="text-[10px] font-black text-teal-600 uppercase tracking-[.2em]">Personalized Learning Path</span>
              </div>
              <h1 className="text-4xl font-black text-[#0F172A] tracking-tight">Growth Roadmap</h1>
              <p className="text-slate-500 mt-2">Strategically closing your gaps for <span className="font-bold text-slate-700 underline decoration-teal-200">Senior Software Engineer</span> roles.</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Overall Progress</p>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-[35%] h-full bg-teal-500"></div>
                </div>
                <span className="font-black text-[#0F172A]">35%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Roadmap Timeline */}
            <div className="lg:col-span-2 space-y-8">
              {roadmapSteps.map((step, idx) => (
                <div key={idx} className="relative pl-8 border-l-2 border-slate-200 space-y-4">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white bg-[#0F172A] shadow-sm"></div>
                  
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xl text-slate-800">{step.phase}</h3>
                    <Badge variant="outline" className={step.status === "In Progress" ? "bg-teal-50 text-teal-700 border-teal-100" : "text-slate-400"}>
                      {step.status}
                    </Badge>
                  </div>

                  <div className="grid gap-4">
                    {step.tasks.map((task) => (
                      <Card key={task.id} className={`p-5 border-none shadow-sm transition-all hover:shadow-md ${task.completed ? 'bg-slate-50/50' : 'bg-white'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {task.completed ? (
                              <CheckCircle2 className="w-6 h-6 text-teal-500" />
                            ) : (
                              <Circle className="w-6 h-6 text-slate-200" />
                            )}
                            <div>
                              <p className={`font-bold text-sm ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                {task.title}
                              </p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                  <Clock className="w-3 h-3" /> {task.duration}
                                </span>
                                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold">{task.type}</span>
                              </div>
                            </div>
                          </div>
                          {!task.completed && (
                            <Button size="sm" variant="ghost" className="text-teal-600 font-bold hover:bg-teal-50">
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
              <Card className="p-6 bg-[#0F172A] text-white border-none shadow-xl rounded-2xl">
                <TrendingUp className="w-8 h-8 text-teal-400 mb-4" />
                <h4 className="font-bold text-lg mb-2">Estimated JRI Boost</h4>
                <p className="text-slate-400 text-sm mb-6 italic">Completing Phase 1 will potentially increase your Readiness Score by:</p>
                <div className="text-4xl font-black text-teal-400">+12.5%</div>
              </Card>

              <Card className="p-6 bg-white border-none shadow-sm rounded-2xl">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-teal-500" /> AI Library
                </h4>
                <div className="space-y-4">
                  <div className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                    <p className="text-xs font-bold text-slate-900 mb-1">The STAR Method Handbook</p>
                    <p className="text-[10px] text-slate-400 uppercase">PDF Guide • 12 Pages</p>
                  </div>
                  <div className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                    <p className="text-xs font-bold text-slate-900 mb-1">System Design Interview Vol. 1</p>
                    <p className="text-[10px] text-slate-400 uppercase">Interactive Course</p>
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