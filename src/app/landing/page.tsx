"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, PlayCircle, Target, BarChart3, Bot, Sparkles } from "lucide-react";
import { TopNavbar } from "@/components/top-navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans relative">

      {/* Announcement Bar*/}
      <div className="relative z-[60] bg-teal-50 border-b border-teal-100 backdrop-blur-md">
        <div className="max-w-7xl mx-auto py-2.5 px-6 md:px-12 flex items-center justify-between text-[13px]">
          <div className="flex items-center gap-3">
            <span className="bg-teal-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">New</span>
            <p className="font-bold text-slate-800 tracking-tight">
              VieCareer v1.0 is officially live! <span className="hidden sm:inline text-teal-600 ml-1">— Get started for free today.</span>
            </p>
          </div>
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>

      {/* TopNavbar */}
      <TopNavbar extraLinks={[{ label: "Pricing", href: "/pricing" }]} />

      {/* --- Background Effects --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-teal-100/50 blur-[120px] rounded-full pointer-events-none opacity-60" />

      <main className="relative z-10 px-6 max-w-7xl mx-auto md:px-12 pt-20 pb-24">
        {/* --- Hero Section --- */}
        <div className="text-center max-w-4xl mx-auto space-y-8 mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            VieCareer 1.0 is Live
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Master the Interview. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              Land Your Dream Role.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Elevate your career readiness with AI-powered mock interviews, real-time gap analysis, and personalized learning roadmaps.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/register" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-teal-500/20 transition-all active:scale-95">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#demo" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base px-8 py-4 rounded-xl border border-slate-200 transition-all active:scale-95">
              <PlayCircle className="w-5 h-5" /> View Demo
            </Link>
          </div>
        </div>

        {/* --- Social Proof --- */}
        <div className="text-center border-y border-slate-200 py-12 mb-24 bg-white/50 backdrop-blur-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by candidates landing offers at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-2xl font-black font-serif text-slate-800">Microsoft</span>
            <span className="text-2xl font-black tracking-tighter text-slate-800">Google</span>
            <span className="text-2xl font-bold tracking-widest uppercase text-slate-800">Amazon</span>
            <span className="text-2xl font-black italic text-slate-800">Shopee</span>
            <span className="text-2xl font-bold text-blue-600">VNG</span>
          </div>
        </div>

        {/* --- Features Bento Grid --- */}
        <div className="space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Everything you need to succeed</h2>
            <p className="text-slate-500">Stop guessing. Start preparing with data-driven insights and AI simulation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Main Bento Card */}
            <div className="md:col-span-2 bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 blur-[80px] rounded-full group-hover:bg-teal-100 transition-colors" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center border border-teal-100 mb-6">
                  <Bot className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">AI-Powered Mock Interviews</h3>
                <p className="text-slate-600 max-w-md leading-relaxed">
                  Experience realistic interview scenarios tailored to specific job descriptions. Our AI adapts to your answers in real-time.
                </p>
              </div>
            </div>

            {/* Small Bento Cards */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:border-teal-300 transition-all">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100 mb-5">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">JDI Scoring</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Get instantly evaluated with our proprietary Job Readiness Index across 5 dimensions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:border-purple-300 transition-all">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center border border-purple-100 mb-5">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Action Plans</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Turn feedback into growth. Receive step-by-step roadmaps to close your skill gaps.
              </p>
            </div>

            {/* Wide Bottom Bento Card */}
            <div className="md:col-span-2 bg-slate-900 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Ready to level up?</h3>
                <p className="text-sm text-slate-300">Join thousands of candidates preparing smarter today.</p>
              </div>
              <Link href="/register" className="w-full md:w-auto bg-teal-500 text-white hover:bg-teal-400 font-bold px-6 py-3 rounded-xl transition-colors text-center shadow-lg shadow-teal-500/20">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
