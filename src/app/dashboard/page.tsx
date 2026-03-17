"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { CircularScore } from "@/components/circular-score";
import { RadarChartComponent } from "@/components/radar-chart";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  jdiScore,
  dashboardRadarData,
  activeGoal,
  upcomingMilestones,
  recommendedResources,
} from "@/lib/mock-data";
import {
  Bell,
  TrendingUp,
  CalendarDays,
  AlertTriangle,
  Lightbulb,
  Settings2,
  ChevronRight,
  MoreVertical,
  MonitorPlay,
  Code2,
  BookOpen,
  Users,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="ml-[220px]">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="text-sm text-gray-500">
            <span className="text-gray-400">Pages</span>
            <span className="mx-2 text-gray-300">/</span>
            <span className="font-medium text-gray-700">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center text-xs font-semibold text-orange-800">
              JD
            </div>
          </div>
        </header>

        <main className="p-6 max-w-6xl">
          {/* JDI Score Card */}
          <Card className="p-8 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  VIE-JDI: Job Readiness Index
                </h1>
                <p className="text-gray-600 mb-1">
                  Your current readiness is{" "}
                  <span className="font-bold text-gray-900">{jdiScore}/100</span>. Target
                  goal:{" "}
                  <span className="font-semibold">Intern Frontend Developer</span>.
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-orange-600">
                    Focus area: Needs improvement in system design
                  </span>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-6">
                    Update Strategy
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 px-6"
                    onClick={() => router.push("/analytics")}
                  >
                    View Full Report
                  </Button>
                </div>
              </div>
              <CircularScore
                score={jdiScore}
                label="SCORE"
                size={150}
                strokeWidth={10}
                color="#0F172A"
              />
            </div>
          </Card>

          {/* Middle Section: Stats + Radar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            {/* Left Stats */}
            <div className="lg:col-span-2 space-y-4">
              {/* Enterprise Demand */}
              <Card className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
                      Enterprise Demand
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">HIGH</p>
                    <p className="text-sm text-teal-600 mt-1">
                      15 Partner Companies
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-teal-600" />
                  </div>
                </div>
              </Card>

              {/* Goal Deadline */}
              <Card className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
                      Goal Deadline
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      20 Days Left
                    </p>
                    <p className="text-sm text-orange-500 mt-1">
                      Target: Aug 15, 2024
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                    <CalendarDays className="w-5 h-5 text-orange-500" />
                  </div>
                </div>
              </Card>

              {/* Insight Card */}
              <div className="bg-[#0F172A] rounded-xl p-5 text-white relative overflow-hidden">
                <Settings2 className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5" />
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-4 h-4 text-yellow-400" />
                  <h3 className="text-sm font-bold">INSIGHT: Top Skill Gaps</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5 font-bold text-sm">!</span>
                    <div>
                      <p className="font-semibold text-sm">
                        Weakness: RESTful APIs
                      </p>
                      <p className="text-xs text-slate-400">
                        Requires focus on HTTP methods & Status codes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Settings2 className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">
                        Needs structure: STAR Method
                      </p>
                      <p className="text-xs text-slate-400">
                        Behavioral questions lack specific metrics
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Radar Chart */}
            <Card className="lg:col-span-3 p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-gray-900">
                  Readiness Gap Analysis
                </h2>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-[#0F172A] rounded-full" />
                    Current
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-gray-300 rounded-full" />
                    Target
                  </span>
                </div>
              </div>
              <RadarChartComponent
                data={dashboardRadarData}
                showLegend={false}
                height={320}
              />
            </Card>
          </div>

          {/* Active Goals & Milestones */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Active Goals */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Active Goals
              </h2>
              <Card className="p-0 overflow-hidden">
                <div className="flex">
                  <div className="w-36 h-40 bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center">
                    <MonitorPlay className="w-12 h-12 text-white/60" />
                  </div>
                  <div className="p-5 flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className="bg-teal-500 text-white text-xs">
                        {activeGoal.matchPercent}% MATCH
                      </Badge>
                      <button>
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">
                      {activeGoal.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {activeGoal.company}
                    </p>
                    <div className="flex gap-6 mt-3 text-xs">
                      <div>
                        <span className="text-gray-400 uppercase tracking-wider font-semibold">
                          Stipend
                        </span>
                        <p className="font-medium text-gray-700 mt-0.5">
                          {activeGoal.stipend}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400 uppercase tracking-wider font-semibold">
                          Duration
                        </span>
                        <p className="font-medium text-gray-700 mt-0.5">
                          {activeGoal.duration}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full text-xs border-gray-200"
                    >
                      Continue Application
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Upcoming Milestones */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Upcoming Milestones
              </h2>
              <div className="space-y-3">
                {upcomingMilestones.map((milestone, i) => (
                  <Card key={i} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0F172A] rounded-lg flex items-center justify-center">
                          <MonitorPlay className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {milestone.title}
                          </p>
                          <p className="text-xs text-gray-500">{milestone.time}</p>
                        </div>
                      </div>
                      {milestone.hasJoinButton ? (
                        <Button
                          size="sm"
                          className="bg-teal-500 hover:bg-teal-600 text-white text-xs h-8"
                          onClick={() => router.push("/interview")}
                        >
                          Join
                        </Button>
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Resources */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                Recommended Resources
              </h2>
              <button className="text-sm text-teal-600 font-semibold hover:text-teal-700">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedResources.map((resource, i) => {
                const icons = [Code2, Users, BookOpen];
                const IconComponent = icons[i % icons.length];
                const bgColors = ["bg-teal-50", "bg-orange-50", "bg-purple-50"];
                const iconColors = [
                  "text-teal-600",
                  "text-orange-600",
                  "text-purple-600",
                ];
                const actionColors = [
                  "text-teal-600",
                  "text-orange-600",
                  "text-purple-600",
                ];
                return (
                  <Card key={i} className="p-5">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 ${bgColors[i]} rounded-xl flex items-center justify-center shrink-0`}
                      >
                        <IconComponent className={`w-6 h-6 ${iconColors[i]}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {resource.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {resource.description}
                        </p>
                        <button
                          className={`text-xs font-bold ${actionColors[i]} mt-3 hover:underline`}
                        >
                          {resource.action}
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
