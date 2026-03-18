"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter  } from "next/navigation";

import {
  LayoutDashboard,
  MessageSquare,
  LineChart,
  User,
  Sparkles,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Interviews", href: "/setup", icon: MessageSquare },
  { label: "Action Plan", href: "/action-plan", icon: LineChart },
  { label: "Profile", href: "#", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-[#0F172A] text-white flex flex-col z-50">
      {/* Logo */}
      <div className="p-5 pb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">VieCareer</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">
              Job Readiness
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
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

      {/* Pro Plan Card */}
      <div className="p-4">
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <p className="text-[10px] text-teal-400 uppercase tracking-wider font-semibold mb-1">
          Pro Plan
        </p>
        <p className="text-sm font-semibold mb-1">
          Upgrade for AI Mock Interviews
        </p>
        <button 
          onClick={() => router.push("/pricing")}
          className="mt-3 w-full bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          UPGRADE NOW
        </button>
      </div>
    </div>
    </aside>
  );
}