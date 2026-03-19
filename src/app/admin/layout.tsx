"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Video, 
  Activity, 
  Sparkles, 
  ShieldAlert, 
  Bell, 
  LogOut 
} from "lucide-react";

const adminNavItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Users Management", href: "/admin/users", icon: Users },
  { label: "Interview Sessions", href: "/admin/sessions", icon: Video },
  { label: "Activity Logs", href: "/admin/activity", icon: Activity },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-[220px] bg-[#0F172A] text-white flex flex-col z-50">
        {/* Logo */}
        <div className="p-5 pb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#0F172A]" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">VieCareer</h1>
              <p className="text-[10px] text-teal-400 uppercase tracking-widest">
                System Control
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* System Status Card */}
        <div className="p-4">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-[10px] text-teal-400 uppercase tracking-wider font-semibold mb-1 flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              System Status
            </p>
            <p className="text-sm font-semibold mb-1 text-slate-200">
              All services online
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-3 w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-rose-500 hover:text-white text-slate-300 text-xs font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <LogOut className="w-3 h-3" />
              SIGN OUT
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-[220px] flex flex-col min-w-0">
        
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-teal-600" />
            <span className="font-semibold text-slate-800">Admin Workspace</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center text-xs font-medium text-white shadow-sm border border-slate-700">
              SA
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}