"use client";

import React, { useState, useMemo, useRef } from "react";
import { Card } from "@/components/ui/card";
import { adminUsers, adminUserStats, AdminUser, UserStatus, UserPlan } from "@/lib/mock-data";
import {
  Search, Filter, Users, UserCheck, UserX, Clock,
  MoreVertical, ShieldOff, Eye, Trash2, ChevronDown,
  X, Mail, GraduationCap, Calendar, Zap, Bell, Briefcase
} from "lucide-react";

const statusConfig: Record<UserStatus, { label: string; className: string }> = {
  Active: { label: "Active", className: "bg-teal-50 text-teal-700 ring-1 ring-teal-200" },
  Suspended: { label: "Suspended", className: "bg-rose-50 text-rose-700 ring-1 ring-rose-200" },
  Pending: { label: "Pending", className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200" },
};

const planConfig: Record<UserPlan, { label: string; className: string }> = {
  Free: { label: "Free", className: "bg-slate-100 text-slate-600" },
  Pro: { label: "Pro", className: "bg-blue-50 text-blue-700" },
  Team: { label: "Team", className: "bg-purple-50 text-purple-700" },
};

function StatCard({ icon: Icon, label, value, sub, color }: { icon: React.ElementType; label: string; value: string | number; sub?: string; color: string }) {
  return (
    <Card className="p-5 border border-slate-200 shadow-sm rounded-2xl bg-white flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </Card>
  );
}

function ActionMenu({ user, onViewProfile }: { user: AdminUser; onViewProfile: () => void }) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setDropUp(spaceBelow < 160);
    }
    setOpen((o) => !o);
  };

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={handleToggle}
        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
      >
        <MoreVertical className="w-4 h-4" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-[40]" onClick={() => setOpen(false)} />
          <div
            className={`fixed z-[50] w-44 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden`}
            style={{
              ...(btnRef.current
                ? (() => {
                    const rect = btnRef.current.getBoundingClientRect();
                    return dropUp
                      ? { bottom: window.innerHeight - rect.top + 4, right: window.innerWidth - rect.right }
                      : { top: rect.bottom + 4, right: window.innerWidth - rect.right };
                  })()
                : {}),
            }}
          >
            <button
              onClick={() => {
                onViewProfile();
                setOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Eye className="w-4 h-4 text-slate-400" /> View Profile
            </button>
            <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
              <ShieldOff className="w-4 h-4 text-amber-400" />
              {user.status === "Suspended" ? "Reactivate" : "Suspend"}
            </button>
            <div className="border-t border-slate-100" />
            <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors">
              <Trash2 className="w-4 h-4" /> Delete User
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function UserDetailsDrawer({ user, onClose }: { user: AdminUser; onClose: () => void }) {
  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[100] border-l border-slate-200 animate-in slide-in-from-right duration-300 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex items-center justify-between z-10">
        <h2 className="text-xl font-bold text-slate-900">User Profile</h2>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <X className="w-5 h-5 text-slate-500" />
        </button>
      </div>

      <div className="p-8 space-y-8">
        {/* Header Profile */}
        <div className="flex flex-col items-center text-center">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4 ${user.avatarColor}`}>
            {user.avatarInitials}
          </div>
          <h3 className="text-2xl font-black text-slate-900">{user.name}</h3>
          <p className="text-[#5378EF] font-bold text-sm tracking-wide uppercase">{user.plan} Account</p>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Personal Details</h4>
          <div className="grid grid-cols-1 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-slate-400" /> <span className="text-slate-600">{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <GraduationCap className="w-4 h-4 text-slate-400" /> <span className="text-slate-600">{user.university}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-slate-400" /> <span className="text-slate-600">Born in {user.birthYear}</span>
            </div>
          </div>
        </div>

        {/* Usage & Limits */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Usage & Limits</h4>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-500 font-medium">Interviews Quota</span>
                <span className="text-slate-900 font-bold">{user.quotaUsed}/{user.quotaTotal} used</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#5378EF] rounded-full transition-all duration-500"
                  style={{ width: `${(user.quotaUsed / user.quotaTotal) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-500"><Zap className="w-4 h-4" /> Rate Limit</span>
              <span className="font-bold text-slate-700">{user.rateLimit}</span>
            </div>
          </div>
        </div>

        {/* Career Focus */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Career Profile</h4>
          <div className="space-y-3">
            <div className="p-4 border border-slate-100 rounded-xl bg-slate-50">
              <p className="text-xs text-slate-400 mb-1">Target Role</p>
              <p className="font-bold text-slate-800">{user.targetProfile}</p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {user.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-[#5378EF]/10 text-[#5378EF] text-xs font-bold rounded-lg border border-[#5378EF]/20">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Applied Jobs */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Briefcase className="w-3 h-3" /> Recent Applications
          </h4>
          <div className="space-y-3">
            {user.appliedJobs.map((job, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl">
                <div>
                  <p className="text-sm font-bold text-slate-800">{job.title}</p>
                  <p className="text-[11px] text-slate-500">{job.company}</p>
                </div>
                <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-black rounded-md">{job.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-slate-500">
            <Bell className="w-4 h-4" />
            <p className="text-xs">Notifications: <span className="font-bold text-slate-700">{user.notifications.join(", ")}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

const PAGE_SIZE = 10;

function parseLastActive(value: string): number {
  if (value === "Just now") return 0;
  const match = value.match(/^(\d+)\s+(min|hour|day|week|month)s?\s+ago$/);
  if (!match) return Infinity;
  const n = parseInt(match[1], 10);
  const unit = match[2];
  if (unit === "min") return n;
  if (unit === "hour") return n * 60;
  if (unit === "day") return n * 1440;
  if (unit === "week") return n * 10080;
  if (unit === "month") return n * 43200;
  return Infinity;
}

export default function UsersManagementPage() {
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "All">("All");
  const [planFilter, setPlanFilter] = useState<UserPlan | "All">("All");
  const [currentPage, setCurrentPage] = useState(1);

  const stats = adminUserStats;

  const filtered = useMemo(() =>
    adminUsers
      .filter((u) => {
        const q = search.toLowerCase();
        const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q);
        const matchStatus = statusFilter === "All" || u.status === statusFilter;
        const matchPlan = planFilter === "All" || u.plan === planFilter;
        return matchSearch && matchStatus && matchPlan;
      })
      .sort((a, b) => parseLastActive(a.lastActive) - parseLastActive(b.lastActive)),
    [search, statusFilter, planFilter]
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Reset to page 1 when filters change
  useMemo(() => { setCurrentPage(1); }, [search, statusFilter, planFilter]);

  return (
    <div className="space-y-7 relative">
      {selectedUser && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90]" onClick={() => setSelectedUser(null)} />
      )}

      {/* Show Drawer*/}
      {selectedUser && (
        <UserDetailsDrawer user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Users Management</h1>
        <p className="text-sm text-slate-500 mt-1">Manage all registered accounts and their permissions.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Users" value={stats.total} color="bg-slate-100 text-slate-600" />
        <StatCard icon={UserCheck} label="Active" value={stats.active} sub={`${Math.round(stats.active / stats.total * 100)}% of total`} color="bg-teal-50 text-teal-600" />
        <StatCard icon={UserX} label="Suspended" value={stats.suspended} color="bg-rose-50 text-rose-500" />
        <StatCard icon={Clock} label="Pending" value={stats.pending} sub="Awaiting verification" color="bg-amber-50 text-amber-500" />
      </div>

      {/* Table Card */}
      <Card className="border border-slate-200 shadow-sm rounded-3xl bg-white overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, ID..."
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
                onChange={(e) => setStatusFilter(e.target.value as UserStatus | "All")}
                className="appearance-none pl-3 pr-8 py-2 text-xs font-medium border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/30 cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
                <option value="Pending">Pending</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value as UserPlan | "All")}
                className="appearance-none pl-3 pr-8 py-2 text-xs font-medium border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/30 cursor-pointer"
              >
                <option value="All">All Plans</option>
                <option value="Free">Free</option>
                <option value="Pro">Pro</option>
                <option value="Team">Team</option>
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
                <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">User</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Plan</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sessions</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Joined</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Last Active</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-400 text-sm">
                    No users match your filters.
                  </td>
                </tr>
              ) : (
                paged.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${user.avatarColor}`}>
                          {user.avatarInitials}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 leading-tight">{user.name}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${planConfig[user.plan].className}`}>
                        {planConfig[user.plan].label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${statusConfig[user.status].className}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.status === "Active" ? "bg-teal-500" : user.status === "Suspended" ? "bg-rose-500" : "bg-amber-500"}`} />
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 font-medium tabular-nums">{user.totalSessions}</td>
                    <td className="px-4 py-3.5 text-slate-500 text-xs">{user.joinDate}</td>
                    <td className="px-4 py-3.5 text-slate-500 text-xs">{user.lastActive}</td>
                    <td className="px-4 py-3.5 text-right">
                      <ActionMenu
                        user={user}
                        onViewProfile={() => setSelectedUser(user)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Showing <span className="font-semibold text-slate-600">{(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)}</span> of <span className="font-semibold text-slate-600">{filtered.length}</span> users
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-xs font-medium text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-40"
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
                    : "text-slate-500 bg-slate-100 hover:bg-slate-200"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-xs font-medium text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
