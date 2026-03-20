"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { adminSessions, AdminSession, SessionStatus, SessionType } from "@/lib/mock-data";
import {
  Search,
  Video,
  CheckCircle2,
  Circle,
  CalendarClock,
  XCircle,
  ChevronDown,
  Filter,
  Clock,
  Star,
} from "lucide-react";

const statusConfig: Record<SessionStatus, { label: string; className: string; icon: React.ElementType; iconClass: string }> = {
  Completed: { label: "Completed", className: "bg-teal-50 text-teal-700 ring-1 ring-teal-200", icon: CheckCircle2, iconClass: "text-teal-500" },
  "In Progress": { label: "In Progress", className: "bg-blue-50 text-blue-700 ring-1 ring-blue-200", icon: Circle, iconClass: "text-blue-500 animate-pulse" },
  Scheduled: { label: "Scheduled", className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200", icon: CalendarClock, iconClass: "text-amber-500" },
  Cancelled: { label: "Cancelled", className: "bg-slate-100 text-slate-500 ring-1 ring-slate-200", icon: XCircle, iconClass: "text-slate-400" },
};

const typeConfig: Record<SessionType, string> = {
  Technical: "bg-indigo-50 text-indigo-700",
  Behavioral: "bg-purple-50 text-purple-700",
  Mixed: "bg-cyan-50 text-cyan-700",
  Coding: "bg-orange-50 text-orange-700",
};

function ScoreBadge({ score }: { score: number | null }) {
  if (score === null) return <span className="text-slate-300 text-sm">—</span>;
  const color = score >= 85 ? "text-teal-600 bg-teal-50" : score >= 70 ? "text-blue-600 bg-blue-50" : "text-amber-600 bg-amber-50";
  return (
    <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${color}`}>
      <Star className="w-3 h-3 fill-current" />
      {score}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, iconBg }: { icon: React.ElementType; label: string; value: number; iconBg: string }) {
  return (
    <Card className="p-5 border border-slate-200 shadow-sm rounded-2xl bg-white flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">{value}</p>
      </div>
    </Card>
  );
}

export default function InterviewSessionsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<SessionStatus | "All">("All");
  const [typeFilter, setTypeFilter] = useState<SessionType | "All">("All");

  const stats = useMemo(() => {
    const completed = adminSessions.filter((s) => s.status === "Completed");
    const avgScore = completed.length
      ? Math.round(completed.reduce((acc, s) => acc + (s.score ?? 0), 0) / completed.length)
      : 0;
    return {
      total: adminSessions.length,
      completed: completed.length,
      inProgress: adminSessions.filter((s) => s.status === "In Progress").length,
      scheduled: adminSessions.filter((s) => s.status === "Scheduled").length,
      avgScore,
    };
  }, []);

  const filtered: AdminSession[] = useMemo(() =>
    adminSessions.filter((s) => {
      const q = search.toLowerCase();
      const matchSearch = !q || s.userName.toLowerCase().includes(q) || s.position.toLowerCase().includes(q) || s.company.toLowerCase().includes(q);
      const matchStatus = statusFilter === "All" || s.status === statusFilter;
      const matchType = typeFilter === "All" || s.type === typeFilter;
      return matchSearch && matchStatus && matchType;
    }),
    [search, statusFilter, typeFilter]
  );

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Interview Sessions</h1>
        <p className="text-sm text-slate-500 mt-1">Monitor all AI-powered mock interview sessions in real time.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Video} label="Total Sessions" value={stats.total} iconBg="bg-slate-100 text-slate-600" />
        <StatCard icon={CheckCircle2} label="Completed" value={stats.completed} iconBg="bg-teal-50 text-teal-600" />
        <StatCard icon={Circle} label="In Progress" value={stats.inProgress} iconBg="bg-blue-50 text-blue-500" />
        <StatCard icon={CalendarClock} label="Scheduled" value={stats.scheduled} iconBg="bg-amber-50 text-amber-500" />
      </div>

      {/* Avg score highlight */}
      <Card className="p-5 border border-slate-200 shadow-sm rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">Avg. Completion Score</p>
          <div className="flex items-center gap-2 mt-1">
            <Star className="w-6 h-6 text-teal-400 fill-teal-400 shrink-0" />
            <p className="text-4xl font-extrabold tracking-tight leading-none">
              {stats.avgScore}<span className="text-xl font-semibold text-slate-400">/100</span>
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-400">Based on {stats.completed} sessions</p>
      </Card>

      {/* Table Card */}
      <Card className="border border-slate-200 shadow-sm rounded-3xl bg-white overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search user, position, company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 transition-colors placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as SessionStatus | "All")}
                className="appearance-none pl-3 pr-8 py-2 text-xs font-medium border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/30 cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as SessionType | "All")}
                className="appearance-none pl-3 pr-8 py-2 text-xs font-medium border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/30 cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="Technical">Technical</option>
                <option value="Behavioral">Behavioral</option>
                <option value="Mixed">Mixed</option>
                <option value="Coding">Coding</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Candidate</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Position</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Duration</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Score</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-400 text-sm">
                    No sessions match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((session) => {
                  const StatusIcon = statusConfig[session.status].icon;
                  return (
                    <tr key={session.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${session.avatarColor}`}>
                            {session.avatarInitials}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 leading-tight">{session.userName}</p>
                            <p className="text-xs text-slate-400">{session.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="font-medium text-slate-700 leading-tight">{session.position}</p>
                        <p className="text-xs text-slate-400">{session.company}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${typeConfig[session.type]}`}>
                          {session.type}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 text-xs">{session.date}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1 text-slate-500 text-xs">
                          <Clock className="w-3.5 h-3.5 text-slate-300" />
                          {session.duration}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <ScoreBadge score={session.score} />
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${statusConfig[session.status].className}`}>
                          <StatusIcon className={`w-3 h-3 ${statusConfig[session.status].iconClass}`} />
                          {session.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Showing <span className="font-semibold text-slate-600">{filtered.length}</span> of <span className="font-semibold text-slate-600">{adminSessions.length}</span> sessions
          </p>
        </div>
      </Card>
    </div>
  );
}
