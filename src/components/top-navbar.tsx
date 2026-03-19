"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Sparkles, LogOut } from "lucide-react";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Resume Analysis", href: "/setup" },
  { label: "Interview Prep", href: "/interview" },
  { label: "Report", href: "/analytics" },
];

interface TopNavbarProps {
  extraLinks?: { label: string; href: string }[];
}

export function TopNavbar({ extraLinks = [] }: TopNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const allLinks = [...navLinks, ...extraLinks];

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">VieCareer</span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {allLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`
                  text-sm font-medium transition-colors
                  ${isActive
                    ? "text-gray-900 underline underline-offset-[20px] decoration-2"
                    : "text-gray-500 hover:text-gray-900"
                  }
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <Bell className="w-5 h-5" />
          </button>

          <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center text-xs font-medium text-white shadow-sm">
            JD
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Log out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
