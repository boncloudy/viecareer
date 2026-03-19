"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Sparkles } from "lucide-react";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Resume Analysis", href: "/setup" },
  { label: "Interview Prep", href: "/interview" },
  { label: "Report", href: "/analytics" },
];

export function TopNavbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">VieCareer</span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {isLoggedIn && navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  isActive ? "text-teal-600" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            // Guest state
            <div className="flex items-center gap-3">
              <Link 
                href="/login" 
                className="text-sm font-bold text-slate-600 hover:text-slate-900 px-4 py-2 transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-teal-500/10 transition-all active:scale-95"
              >
                Get Started
              </Link>
            </div>
          ) : (
            // Logged-in state
            <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-slate-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <Link href="/profile" className="group flex items-center gap-2">
                <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-sm font-bold text-orange-700 ring-2 ring-white shadow-sm group-hover:ring-orange-200 transition-all">
                  JD
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}