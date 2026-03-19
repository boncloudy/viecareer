"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Video, Activity, LogOut, ShieldAlert, Sparkles } from "lucide-react";

const adminNav = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Users Management", href: "/admin/users", icon: Users },
  { label: "Interview Sessions", href: "/admin/sessions", icon: Video },
  { label: "Activity Logs", href: "/admin/activity", icon: Activity },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex font-sans relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Admin Sidebar */}
      <aside className="hidden md:flex flex-col w-[260px] bg-[#0F172A] border-r border-slate-800/60 h-screen sticky top-0 z-50 relative">
        <div className="p-6 border-b border-slate-800/60">
          <div className="flex items-center gap-2 text-teal-400 mb-1">
            <ShieldAlert className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Administrator</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-500" />
            <h1 className="text-xl font-black text-white tracking-tight">VieCareer Control</h1>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 pt-6">
          {adminNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group ${
                  isActive
                    ? "bg-teal-500 text-[#020617] shadow-lg shadow-teal-500/10 active:scale-95"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-[#020617]' : 'text-slate-500 group-hover:text-teal-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800/60">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-semibold text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <header className="h-16 bg-[#0F172A]/80 backdrop-blur-xl border-b border-slate-800/60 flex items-center justify-between px-8 sticky top-0 z-40">
          <h2 className="font-bold text-white tracking-tight">System Overview</h2>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-800/60">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white leading-none">Super Admin</p>
              <p className="text-[10px] text-teal-600 font-bold uppercase tracking-wider mt-1">Verified SA Access</p>
            </div>
            <div className="w-10 h-10 bg-[#1E293B] rounded-xl flex items-center justify-center border border-slate-700/50 shadow-lg">
              <span className="text-teal-400 font-black text-xs">SA</span>
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