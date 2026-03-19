"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Video, Activity, Settings, LogOut, ShieldAlert } from "lucide-react";

const adminNav = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Users Management", href: "/admin/users", icon: Users },
  { label: "Interview Sessions", href: "/admin/sessions", icon: Video },
  { label: "Activity Logs", href: "/admin/activity", icon: Activity },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Admin Sidebar */}
      <aside className="hidden md:flex flex-col w-[260px] bg-white border-r border-slate-200 h-screen sticky top-0 z-50">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-red-600 mb-1">
            <ShieldAlert className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Administrator</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">VieCareer Control</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {adminNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <h2 className="font-bold text-slate-800">System Overview</h2>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">Super Admin</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">System Access</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              <span className="text-red-700 font-black text-xs">SA</span>
            </div>
          </div>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}