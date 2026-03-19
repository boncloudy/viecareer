"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, PlayCircle, Target, BarChart3, Bot, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans relative">
      {/* Announcement Bar */}
      <div className="relative z-50 bg-gradient-to-r from-teal-500/20 via-teal-500/40 to-teal-500/20 border-b border-teal-500/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto py-2.5 px-6 md:px-12 flex items-center justify-between text-[13px]">
          <div className="flex items-center gap-3">
            <span className="bg-teal-500 text-[#020617] text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">New</span>
            <p className="font-bold text-white tracking-tight">
              VieCareer v1.0 is officially live! <span className="hidden sm:inline text-teal-300 ml-1">— Get started for free today.</span>
            </p>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>
      
      {/* --- Background Effects --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* --- Navbar --- */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto md:px-12">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-teal-400" />
          <span className="text-xl font-bold text-white tracking-tight">VieCareer</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors hidden md:block">
            Sign In
          </Link>
          <Link href="/register" className="bg-teal-500 hover:bg-teal-400 text-[#020617] text-sm font-bold px-5 py-2.5 rounded-full transition-transform active:scale-95">
            Get Started
          </Link>
        </div>
      </nav>

      <main className="relative z-10 px-6 max-w-7xl mx-auto md:px-12 pt-16 pb-24">
        {/* --- Hero Section --- */}
        <div className="text-center max-w-4xl mx-auto space-y-8 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-teal-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            VieCareer 1.0 is Live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
            Master the Interview. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
              Land Your Dream Role.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Elevate your career readiness with AI-powered mock interviews, real-time gap analysis, and personalized learning roadmaps.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/register" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-[#020617] font-bold text-base px-8 py-4 rounded-xl transition-all hover:shadow-[0_0_30px_-5px_rgba(20,184,166,0.4)] active:scale-95">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#demo" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-800 text-white font-semibold text-base px-8 py-4 rounded-xl border border-slate-700/50 transition-all backdrop-blur-sm active:scale-95">
              <PlayCircle className="w-5 h-5" /> View Demo
            </Link>
          </div>
        </div>

        {/* --- Social Proof (Logos) --- */}
        <div className="text-center border-y border-slate-800/50 py-10 mb-24 bg-slate-900/20 backdrop-blur-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Trusted by candidates landing offers at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Giả lập Logo bằng Text cho chuẩn UI sạch */}
            <span className="text-xl font-black font-serif">Microsoft</span>
            <span className="text-xl font-black tracking-tighter">Google</span>
            <span className="text-xl font-bold tracking-widest uppercase">Amazon</span>
            <span className="text-xl font-black italic">Shopee</span>
            <span className="text-xl font-bold text-blue-400">VNG</span>
          </div>
        </div>

        {/* --- Features Bento Grid --- */}
        <div className="space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything you need to succeed</h2>
            <p className="text-slate-400">Stop guessing. Start preparing with data-driven insights and AI simulation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Main Bento Card */}
            <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-[#0F172A] p-8 md:p-12 rounded-[2rem] border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full group-hover:bg-teal-500/20 transition-colors" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center border border-teal-500/20 mb-6">
                  <Bot className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">AI-Powered Mock Interviews</h3>
                <p className="text-slate-400 max-w-md leading-relaxed">
                  Experience realistic interview scenarios tailored to specific job descriptions. Our AI adapts to your answers in real-time, pushing your limits just like a real tech lead.
                </p>
              </div>
            </div>

            {/* Small Bento Card 1 */}
            <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-slate-800 hover:border-teal-500/30 transition-colors">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20 mb-5">
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">JDI Scoring</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Get instantly evaluated with our proprietary Job Readiness Index across 5 dimensions.
              </p>
            </div>

            {/* Small Bento Card 2 */}
            <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-slate-800 hover:border-teal-500/30 transition-colors">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center border border-purple-500/20 mb-5">
                <Target className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Action Plans</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Turn feedback into growth. Receive step-by-step roadmaps to close your specific skill gaps.
              </p>
            </div>

            {/* Wide Bottom Bento Card */}
            <div className="md:col-span-2 bg-slate-900/50 p-8 rounded-[2rem] border border-slate-800 hover:border-slate-700 transition-colors flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Ready to level up?</h3>
                <p className="text-sm text-slate-400">Join thousands of candidates preparing smarter today.</p>
              </div>
              <Link href="/register" className="w-full md:w-auto bg-white text-[#020617] hover:bg-slate-200 font-bold px-6 py-3 rounded-xl transition-colors text-center">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}