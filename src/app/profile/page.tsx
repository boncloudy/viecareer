"use client";

import React from "react";
import { TopNavbar } from "@/components/top-navbar";
import { MOCK_USER } from "@/lib/mock-data";
import { 
  User, Mail, MapPin, Calendar, 
  ExternalLink, Github, Linkedin, 
  Award, FileText, Activity 
} from "lucide-react";

export default function ProfilePage() {
  const user = MOCK_USER;

  return (
    <div className="min-h-screen bg-slate-50 text-[#191A23]">
      <TopNavbar />
      
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm text-center">
              <div className="w-32 h-32 bg-[#5378EF]/10 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                <User className="w-16 h-16 text-[#5378EF]" />
              </div>
              <h2 className="text-xl font-black text-slate-900">{user.fullName}</h2>
              <p className="text-sm text-[#5378EF] font-bold mb-4">{user.role}</p>
              
              <div className="space-y-3 text-left border-t border-slate-100 pt-4">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail className="w-4 h-4 text-[#5378EF]" /> {user.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-[#5378EF]" /> {user.location}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Calendar className="w-4 h-4 text-[#5378EF]" /> Joined {user.joinedDate}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-[#5378EF]" /> Social Profiles
              </h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center justify-between text-sm text-slate-600 hover:text-[#5378EF] transition-colors">
                  <span className="flex items-center gap-2"><Github className="w-4 h-4" /> GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a href="#" className="flex items-center justify-between text-sm text-slate-600 hover:text-[#5378EF] transition-colors">
                  <span className="flex items-center gap-2"><Linkedin className="w-4 h-4" /> LinkedIn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Interviews", value: user.stats.interviewsDone, icon: Activity, color: "text-[#5378EF]" },
                { label: "Resume Score", value: user.stats.resumeScore, icon: FileText, color: "text-[#5378EF]" },
                { label: "Rank", value: user.stats.rank, icon: Award, color: "text-orange-500" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <item.icon className={`w-5 h-5 ${item.color} mb-2`} />
                  <p className="text-2xl font-black text-slate-900">{item.value}</p>
                  <p className="text-xs text-slate-500 font-medium">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <h3 className="text-lg font-black mb-4">About Me</h3>
              <p className="text-slate-600 leading-relaxed">{user.bio}</p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <h3 className="text-lg font-black mb-4">Core Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-[#5378EF] hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}