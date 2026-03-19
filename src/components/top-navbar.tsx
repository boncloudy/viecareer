"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Sparkles, ShieldCheck } from "lucide-react";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Resume Analysis", href: "/setup" },
  { label: "Interview Prep", href: "/interview" },
  { label: "Report", href: "/analytics" },
];

export function TopNavbar() {
  const [role, setRole] = useState<'guest' | 'user' | 'admin'>('guest');

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

        {/* Right Side */}
        <div className="flex items-center gap-4">
          
          {/* TRẠNG THÁI: CHƯA ĐĂNG NHẬP (GUEST) */}
          {role === 'guest' && (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-bold text-slate-600 px-4 py-2">
                Login
              </Link>
              <Link href="/register" className="bg-teal-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl">
                Get Started
              </Link>
            </div>
          )}

          {/* TRẠNG THÁI: USER THƯỜNG */}
          {role === 'user' && (
            <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-slate-600"><Bell className="w-5 h-5" /></button>
              <Link href="/dashboard" className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-700">Hi, Yoichi</span>
                <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-sm font-bold text-orange-700 shadow-sm">
                  YI
                </div>
              </Link>
            </div>
          )}

          {/* TRẠNG THÁI: ADMIN (HỆ THỐNG) */}
          {role === 'admin' && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100">
                <ShieldCheck className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Admin Panel</span>
              </div>
              <Link href="/admin" className="flex items-center gap-2">
                <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md border-2 border-slate-700">
                  AD
                </div>
              </Link>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}