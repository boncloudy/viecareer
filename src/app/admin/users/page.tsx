"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { adminUsers, AdminUser, UserStatus, UserPlan } from "@/lib/mock-data";
import {
  Search,
  Filter,
  Users,
  UserCheck,
  UserX,
  Clock,
  MoreVertical,
  ShieldOff,
  Eye,
  Trash2,
  ChevronDown,
} from "lucide-react";

const statusConfig: Record<UserStatus, { label: string; className: string }> = {
  Active: { label: "Active", className: "bg-teal-50 text-teal-700 ring-1 ring-teal-200" },
  Suspended: { label: "Suspended", className: "bg-rose-50 text-rose-700 ring-1 ring-rose-200" },
  Pending: { label: "Pending", className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200" },
};

const planConfig: Record<UserPlan, { label: string; className: string }> = {
  Free: { label: "Free", className: "bg-slate-100 text-slate-600" },
  Pro: { label: "Pro", className: "bg-blue-50 text-blue-700" },
  Enterprise: { label: "Enterprise", className: "bg-purple-50 text-purple-700" },
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

function ActionMenu({ user }: { user: AdminUser }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
      >
        <MoreVertical className="w-4 h-4" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-20 w-44 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
            <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
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

export default function UsersManagementPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "All">("All");
  const [planFilter, setPlanFilter] = useState<UserPlan | "All">("All");

  const stats = useMemo(() => ({
    total: adminUsers.length,
    active: adminUsers.filter((u) => u.status === "Active").length,
    suspended: adminUsers.filter((u) => u.status === "Suspended").length,
    pending: adminUsers.filter((u) => u.status === "Pending").length,
  }), []);

  const filtered = useMemo(() =>
    adminUsers.filter((u) => {
      const q = search.toLowerCase();
      const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q);
      const matchStatus = statusFilter === "All" || u.status === statusFilter;
      const matchPlan = planFilter === "All" || u.plan === planFilter;
      return matchSearch && matchStatus && matchPlan;
    }),
    [search, statusFilter, planFilter]
  );

  return (
    <div className="space-y-7">
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
                <option value="Enterprise">Enterprise</option>
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-400 text-sm">
                    No users match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
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
                    <td className="px-4 py-3.5">
                      <ActionMenu user={user} />
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
            Showing <span className="font-semibold text-slate-600">{filtered.length}</span> of <span className="font-semibold text-slate-600">{adminUsers.length}</span> users
          </p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-xs font-medium text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-40" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
              1
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
