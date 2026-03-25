"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { adminActivityLogs, adminActivityStats, ActivityLog, LogType } from "@/lib/mock-data";
import {
  Search,
  Activity,
  LogIn,
  Video,
  CreditCard,
  UserCog,
  Server,
  Filter,
  ChevronDown,
} from "lucide-react";

const typeConfig: Record<LogType, { label: string; className: string; icon: React.ElementType; dot: string }> = {
  Auth: { label: "Auth", className: "bg-blue-50 text-blue-700 ring-1 ring-blue-200", icon: LogIn, dot: "bg-blue-400" },
  Session: { label: "Session", className: "bg-teal-50 text-teal-700 ring-1 ring-teal-200", icon: Video, dot: "bg-teal-400" },
  Payment: { label: "Payment", className: "bg-purple-50 text-purple-700 ring-1 ring-purple-200", icon: CreditCard, dot: "bg-purple-400" },
  Account: { label: "Account", className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200", icon: UserCog, dot: "bg-amber-400" },
  System: { label: "System", className: "bg-slate-100 text-slate-600 ring-1 ring-slate-200", icon: Server, dot: "bg-slate-400" },
};

function LogTypeTag({ type }: { type: LogType }) {
  const cfg = typeConfig[type];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${cfg.className}`}>
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

function TimelineRow({ log, isLast }: { log: ActivityLog; isLast: boolean }) {
  const dot = typeConfig[log.type].dot;
  return (
    <div className="flex gap-4 group">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <div className={`w-2.5 h-2.5 rounded-full ring-2 ring-white ${dot} flex-shrink-0 mt-0.5`} />
        {!isLast && <div className="w-px flex-1 bg-slate-100 mt-1" />}
      </div>

      {/* Content */}
      <div className={`flex-1 pb-5 ${isLast ? "" : ""}`}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="flex items-start gap-3 min-w-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 ${log.avatarColor}`}>
              {log.avatarInitials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 leading-tight">
                {log.userName !== "System" ? (
                  <><span>{log.userName}</span> <span className="font-normal text-slate-500">·</span> <span className="font-medium text-slate-700">{log.action}</span></>
                ) : (
                  <span className="text-slate-700">{log.action}</span>
                )}
              </p>
              <p className="text-xs text-slate-400 mt-0.5 truncate">{log.detail}</p>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <LogTypeTag type={log.type} />
                <span className="text-[11px] text-slate-400 font-mono">IP: {log.ip}</span>
                <span className="text-[11px] text-slate-400">· ID: {log.id}</span>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 whitespace-nowrap flex-shrink-0 sm:text-right font-mono">
            {log.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}

const LOG_PAGE_SIZE = 10;

export default function ActivityLogsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<LogType | "All">("All");
  const [currentPage, setCurrentPage] = useState(1);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    adminActivityLogs.forEach((l) => { counts[l.type] = (counts[l.type] ?? 0) + 1; });
    return counts;
  }, []);

  const filtered = useMemo(() =>
    adminActivityLogs.filter((l) => {
      const q = search.toLowerCase();
      const matchSearch = !q || l.userName.toLowerCase().includes(q) || l.action.toLowerCase().includes(q) || l.detail.toLowerCase().includes(q);
      const matchType = typeFilter === "All" || l.type === typeFilter;
      return matchSearch && matchType;
    }),
    [search, typeFilter]
  );

  const totalPages = Math.ceil(filtered.length / LOG_PAGE_SIZE);
  const paged = filtered.slice((currentPage - 1) * LOG_PAGE_SIZE, currentPage * LOG_PAGE_SIZE);

  useMemo(() => { setCurrentPage(1); }, [search, typeFilter]);

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Activity Logs</h1>
        <p className="text-sm text-slate-500 mt-1">Full audit trail of all system and user events.</p>
      </div>

      {/* Type summary pills */}
      <div className="flex flex-wrap gap-3">
        {(Object.keys(typeConfig) as LogType[]).map((type) => {
          const cfg = typeConfig[type];
          const Icon = cfg.icon;
          return (
            <button
              key={type}
              onClick={() => setTypeFilter(typeFilter === type ? "All" : type)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                typeFilter === type
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              {type}
              <span className={`ml-0.5 text-xs font-bold ${typeFilter === type ? "text-slate-300" : "text-slate-400"}`}>
                {typeCounts[type] ?? 0}
              </span>
            </button>
          );
        })}
        {typeFilter !== "All" && (
          <button
            onClick={() => setTypeFilter("All")}
            className="px-4 py-2 rounded-xl border border-dashed border-slate-300 text-sm text-slate-400 hover:border-slate-400 transition-colors"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Log card */}
      <Card className="border border-slate-200 shadow-sm rounded-3xl bg-white overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-semibold text-slate-700">Event Stream</span>
            <span className="ml-1 px-2 py-0.5 bg-slate-100 text-slate-500 text-xs font-semibold rounded-full">{adminActivityStats.today} today</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 transition-colors placeholder:text-slate-400 w-52"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as LogType | "All")}
                className="appearance-none pl-8 pr-8 py-2 text-xs font-medium border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/30 cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="Auth">Auth</option>
                <option value="Session">Session</option>
                <option value="Payment">Payment</option>
                <option value="Account">Account</option>
                <option value="System">System</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="p-6">
          {paged.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">No log entries match your search.</div>
          ) : (
            <div>
              {paged.map((log, idx) => (
                <TimelineRow key={log.id} log={log} isLast={idx === paged.length - 1} />
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between rounded-b-3xl">
          <p className="text-xs text-slate-400">
            Showing <span className="font-semibold text-slate-600">{(currentPage - 1) * LOG_PAGE_SIZE + 1}–{Math.min(currentPage * LOG_PAGE_SIZE, filtered.length)}</span> of <span className="font-semibold text-slate-600">{filtered.length}</span> events · {adminActivityStats.total.toLocaleString()} total system events
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-40"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    page === currentPage
                      ? "text-white bg-slate-800 hover:bg-slate-700"
                      : "text-slate-500 bg-white border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-40"
              >
                Next
              </button>
            </div>
            <button className="text-xs text-teal-600 font-semibold hover:underline ml-2">Export CSV</button>
          </div>
        </div>
      </Card>
    </div>
  );
}
