"use client";

import React, { useState } from "react";
import { TopNavbar } from "@/components/top-navbar";
import {
  MOCK_USER,
  profileSkillProgress,
  profileLearningGoal,
  profileRecentActivity,
  skillRecommendations,
  type SkillProgress,
  type RoadmapStep,
  type ProfileActivityItem,
} from "@/lib/mock-data";
import {
  User, Mail, MapPin, Calendar,
  ExternalLink, Github, Linkedin,
  Award, FileText, Activity,
  Target, CheckCircle2,
  Circle, BookOpen,
  Trophy, Zap,
  ArrowUpRight, CreditCard,
  BarChart2, Star,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

type Section = "profile" | "goal" | "usage";

const NAV_ITEMS: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "profile", label: "Profile",      icon: User },
  { id: "goal",    label: "Your Goal",    icon: Target },
  { id: "usage",   label: "Usage & Plan", icon: CreditCard },
];

// ─── Shared UI ───────────────────────────────────────────────────────────────

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("bg-white rounded-2xl border border-slate-200 shadow-sm", className)}>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-black text-slate-900 mb-4">{children}</h3>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROFILE
// ═══════════════════════════════════════════════════════════════════════════════

function ProfileContent() {
  const user = MOCK_USER;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
      <div className="space-y-5">
        <Card className="p-6 text-center">
          <div className="w-24 h-24 bg-[#5378EF]/10 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-md">
            <User className="w-12 h-12 text-[#5378EF]" />
          </div>
          <h2 className="text-lg font-black text-slate-900">{user.fullName}</h2>
          <p className="text-sm text-[#5378EF] font-bold mb-4">{user.role}</p>
          <div className="space-y-2.5 text-left border-t border-slate-100 pt-4">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Mail className="w-4 h-4 text-[#5378EF] shrink-0" /> {user.email}
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <MapPin className="w-4 h-4 text-[#5378EF] shrink-0" /> {user.location}
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Calendar className="w-4 h-4 text-[#5378EF] shrink-0" /> Joined {user.joinedDate}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-slate-800">
            <ExternalLink className="w-4 h-4 text-[#5378EF]" /> Social Profiles
          </h3>
          <div className="space-y-3">
            {[
              { icon: Github,   label: "GitHub",   href: user.socials.github },
              { icon: Linkedin, label: "LinkedIn", href: user.socials.linkedin },
            ].map(({ icon: Icon, label, href }) => (
              <a key={label} href={`https://${href}`} target="_blank" rel="noreferrer"
                className="flex items-center justify-between text-sm text-slate-600 hover:text-[#5378EF] transition-colors group">
                <span className="flex items-center gap-2"><Icon className="w-4 h-4" /> {label}</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </Card>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Interviews",   value: user.stats.interviewsDone, icon: Activity, color: "text-[#5378EF]", bg: "bg-[#5378EF]/8" },
            { label: "Resume Score", value: user.stats.resumeScore,    icon: FileText,  color: "text-violet-500", bg: "bg-violet-50" },
            { label: "Rank",         value: user.stats.rank,           icon: Award,     color: "text-amber-500",  bg: "bg-amber-50" },
          ].map((item, idx) => (
            <Card key={idx} className="p-4">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3", item.bg)}>
                <item.icon className={cn("w-4 h-4", item.color)} />
              </div>
              <p className="text-2xl font-black text-slate-900">{item.value}</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{item.label}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <SectionTitle>About Me</SectionTitle>
          <p className="text-slate-600 leading-relaxed text-sm">{user.bio}</p>
        </Card>

        <Card className="p-6">
          <SectionTitle>Core Skills</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <span key={skill}
                className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-[#5378EF] hover:text-white transition-all cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// GOAL
// ═══════════════════════════════════════════════════════════════════════════════

const stageColors: Record<SkillProgress["stage"], string> = {
  Beginner:     "text-amber-600 bg-amber-50 border-amber-200",
  Intermediate: "text-blue-600 bg-blue-50 border-blue-200",
  Advanced:     "text-emerald-600 bg-emerald-50 border-emerald-200",
};
const stageBarColors: Record<SkillProgress["stage"], string> = {
  Beginner: "bg-amber-400", Intermediate: "bg-[#5378EF]", Advanced: "bg-emerald-500",
};
const stepCfg: Record<RoadmapStep["status"], { icon: React.ElementType; iconClass: string; textClass: string; lineClass: string }> = {
  completed:    { icon: CheckCircle2, iconClass: "text-emerald-500", textClass: "text-slate-400 line-through decoration-slate-300", lineClass: "bg-emerald-200" },
  "in-progress":{ icon: Zap,          iconClass: "text-[#5378EF]",   textClass: "text-slate-900 font-semibold",                     lineClass: "bg-[#5378EF]/30" },
  planned:      { icon: Circle,       iconClass: "text-slate-300",   textClass: "text-slate-400",                                   lineClass: "bg-slate-200" },
};
const priorityBadge: Record<string, string> = {
  Critical: "bg-red-50 text-red-600 border border-red-200",
  Moderate: "bg-amber-50 text-amber-600 border border-amber-200",
  Ongoing:  "bg-slate-100 text-slate-600 border border-slate-200",
};

function GoalContent() {
  const goal = profileLearningGoal;
  const skills = profileSkillProgress;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-5">
        <Card className="p-6">
          <SectionTitle>Target Role</SectionTitle>
          <div className="bg-gradient-to-br from-[#5378EF]/8 to-[#5378EF]/4 border border-[#5378EF]/20 rounded-xl p-4 mb-4">
            <p className="text-[10px] font-black text-[#5378EF] uppercase tracking-widest mb-1.5">Goal</p>
            <p className="text-xl font-black text-slate-900 mb-3">{goal.targetRole}</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-white/60 rounded-full overflow-hidden border border-[#5378EF]/20">
                <div className="h-full bg-[#5378EF] rounded-full" style={{ width: `${goal.matchPercent}%` }} />
              </div>
              <span className="text-sm font-black text-[#5378EF] shrink-0">{goal.matchPercent}% ready</span>
            </div>
          </div>
          <p className="text-xs text-slate-500">Keep completing your roadmap to close the remaining {100 - goal.matchPercent}% gap.</p>
        </Card>

        <Card className="p-6">
          <SectionTitle>Learning Roadmap</SectionTitle>
          {goal.roadmap.map((step, idx) => {
            const cfg = stepCfg[step.status];
            const isLast = idx === goal.roadmap.length - 1;
            return (
              <div key={step.title} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <cfg.icon className={cn("w-5 h-5 shrink-0 mt-0.5", cfg.iconClass)} />
                  {!isLast && <div className={cn("w-0.5 flex-1 my-1.5 min-h-[18px] rounded-full", cfg.lineClass)} />}
                </div>
                <div className="pb-4 flex-1 flex items-center justify-between gap-2">
                  <p className={cn("text-sm leading-tight", cfg.textClass)}>{step.title}</p>
                  {step.status === "in-progress" && (
                    <span className="text-[10px] font-black text-[#5378EF] bg-[#5378EF]/10 px-2 py-0.5 rounded-full shrink-0">Active</span>
                  )}
                  {step.status === "planned" && <Lock className="w-3 h-3 text-slate-300 shrink-0" />}
                </div>
              </div>
            );
          })}
        </Card>
      </div>

      <div className="space-y-5">
        <Card className="p-6">
          <SectionTitle>Skill Progress</SectionTitle>
          <div className="space-y-5">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-800">{skill.name}</span>
                    {skill.trend === "up" && <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", stageColors[skill.stage])}>
                      {skill.stage}
                    </span>
                    <span className="text-xs font-black text-slate-700 w-8 text-right">{skill.progress}%</span>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", stageBarColors[skill.stage])} style={{ width: `${skill.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <SectionTitle>Skill Gaps to Address</SectionTitle>
          <div className="space-y-3">
            {skillRecommendations.map((rec) => (
              <div key={rec.skillGap} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-bold text-slate-900 truncate">{rec.skillGap}</p>
                    <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0", priorityBadge[rec.priority])}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-snug">{rec.description}</p>
                </div>
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg shrink-0">
                  {rec.jdiBoost}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// USAGE & PLAN
// ═══════════════════════════════════════════════════════════════════════════════

const PLAN_DATA = { current: "Pro" as const, billing: "Monthly", nextRenewal: "April 23, 2026" };

const WEEKLY_USAGE = [
  { day: "Mon", count: 2 }, { day: "Tue", count: 4 }, { day: "Wed", count: 1 },
  { day: "Thu", count: 3 }, { day: "Fri", count: 5 }, { day: "Sat", count: 0 }, { day: "Sun", count: 2 },
];

const weeklyInterviewsUsed = WEEKLY_USAGE.reduce((sum, d) => sum + d.count, 0);

const USAGE_LIMITS = [
  { label: "Interviews this week", used: weeklyInterviewsUsed, total: 35, icon: Activity,  color: "text-[#5378EF]",  bar: "bg-[#5378EF]" },
  { label: "Resume analyses",      used: 4,                    total: 10, icon: FileText,  color: "text-violet-500", bar: "bg-violet-400" },
  { label: "AI feedback reports",  used: 9,                    total: 20, icon: BarChart2, color: "text-teal-500",   bar: "bg-teal-400" },
];

const PLAN_TIERS = [
  { name: "Free",  price: "0₫",       features: ["5 interviews / week", "2 resume analyses", "Basic feedback", "Community support"] },
  { name: "Pro",   price: "299,000₫", features: ["35 interviews / week", "10 resume analyses", "AI detailed reports", "Priority support", "Goal tracking"] },
  { name: "Team",  price: "799,000₫", features: ["Unlimited interviews", "Unlimited analyses", "Team analytics", "Dedicated support", "Custom roadmaps"] },
];

function activityIcon(type: ProfileActivityItem["type"]) {
  return { session: { icon: Activity, color: "text-[#5378EF]", bg: "bg-[#5378EF]/10" },
           resource: { icon: BookOpen, color: "text-purple-500", bg: "bg-purple-50" },
           milestone: { icon: Trophy, color: "text-amber-500", bg: "bg-amber-50" } }[type];
}

function UsageContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current plan */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Current Plan</p>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#5378EF] fill-[#5378EF]" />
                <span className="text-2xl font-black text-slate-900">{PLAN_DATA.current}</span>
              </div>
            </div>
            <span className="text-xs font-bold bg-[#5378EF]/10 text-[#5378EF] px-3 py-1.5 rounded-full">{PLAN_DATA.billing}</span>
          </div>
          <div className="space-y-2 text-sm text-slate-600 border-t border-slate-100 pt-4">
            <div className="flex justify-between"><span>Next renewal</span><span className="font-bold text-slate-800">{PLAN_DATA.nextRenewal}</span></div>
            <div className="flex justify-between"><span>Amount</span><span className="font-bold text-slate-800">299,000₫</span></div>
          </div>
          <button className="mt-4 w-full text-sm font-bold text-slate-400 hover:text-red-500 transition-colors text-left">
            Cancel subscription
          </button>
        </Card>

        {/* Weekly bar chart */}
        <Card className="p-6">
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Interviews This Week</p>
          <div className="flex gap-1.5 h-24">
            {WEEKLY_USAGE.map((d, idx) => {
              // JS getDay(): 0=Sun,1=Mon..6=Sat → convert to Mon=0..Sun=6
              const jsDay = new Date().getDay();
              const todayIndex = jsDay === 0 ? 6 : jsDay - 1;
              const isToday = idx === todayIndex;
              const isFuture = idx > todayIndex;
              const barHeight = isFuture ? 0 : Math.max((d.count / 5) * 100, d.count === 0 ? 0 : 8);
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 h-full">
                  <div className={cn(
                    "w-full flex-1 rounded-md overflow-hidden flex items-end",
                    isFuture ? "bg-slate-50 border border-dashed border-slate-200" : "bg-slate-100"
                  )}>
                    <div
                      className={cn("w-full rounded-md transition-all", isToday ? "bg-[#5378EF]" : "bg-[#5378EF]/35")}
                      style={{ height: `${barHeight}%` }}
                    />
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold",
                    isToday ? "text-[#5378EF]" : isFuture ? "text-slate-300" : "text-slate-400"
                  )}>
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-right text-xs text-slate-400"><span className="font-black text-slate-700">{weeklyInterviewsUsed}</span> of 35 used</p>
        </Card>
      </div>

      {/* Usage limits */}
      <Card className="p-6">
        <SectionTitle>Usage Limits</SectionTitle>
        <div className="space-y-5">
          {USAGE_LIMITS.map((item) => {
            const pct = Math.round((item.used / item.total) * 100);
            return (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <item.icon className={cn("w-4 h-4", item.color)} />
                    <span className="text-sm font-bold text-slate-800">{item.label}</span>
                  </div>
                  <span className="text-xs font-black text-slate-600">{item.used} / {item.total}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", item.bar)} style={{ width: `${pct}%` }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{item.total - item.used} remaining</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Plan tiers */}
      <div>
        <h3 className="text-base font-black text-slate-900 mb-4">Compare Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLAN_TIERS.map((tier) => {
            const isCurrent = tier.name === PLAN_DATA.current;
            return (
              <div key={tier.name} className={cn("rounded-2xl border p-5 relative", isCurrent
                ? "bg-[#5378EF] text-white border-[#5378EF] shadow-lg shadow-[#5378EF]/20"
                : "bg-white text-slate-800 border-slate-200 shadow-sm")}>
                {isCurrent && (
                  <span className="absolute top-3 right-3 text-[10px] font-black bg-white/20 text-white px-2 py-0.5 rounded-full">Current</span>
                )}
                <p className={cn("text-xs font-black uppercase tracking-widest mb-1", isCurrent ? "text-white/70" : "text-slate-500")}>{tier.name}</p>
                <p className={cn("text-2xl font-black mb-1", isCurrent ? "text-white" : "text-slate-900")}>
                  {tier.price}<span className={cn("text-xs font-medium ml-1", isCurrent ? "text-white/60" : "text-slate-400")}>/mo</span>
                </p>
                <div className={cn("border-t my-4", isCurrent ? "border-white/20" : "border-slate-100")} />
                <ul className="space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className={cn("w-3.5 h-3.5 shrink-0", isCurrent ? "text-white/80" : "text-emerald-500")} />
                      <span className={isCurrent ? "text-white/90" : "text-slate-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                {!isCurrent && (
                  <button className={cn("mt-4 w-full text-xs font-bold py-2 rounded-xl border transition-all",
                    tier.name === "Team"
                      ? "bg-slate-900 text-white border-slate-900 hover:bg-slate-700"
                      : "bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-300")}>
                    {tier.name === "Free" ? "Downgrade" : "Upgrade →"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent activity */}
      <Card className="p-6">
        <SectionTitle>Recent Activity</SectionTitle>
        <div className="space-y-3">
          {profileRecentActivity.map((item, idx) => {
            const cfg = activityIcon(item.type);
            return (
              <div key={idx} className="flex items-start gap-3">
                <div className={cn("w-8 h-8 rounded-xl shrink-0 flex items-center justify-center", cfg.bg)}>
                  <cfg.icon className={cn("w-4 h-4", cfg.color)} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-800">{item.action}</p>
                  <p className="text-xs text-slate-500">{item.detail}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════════

const SECTION_HEADER: Record<Section, { title: string; subtitle: string }> = {
  profile: { title: "My Profile",   subtitle: "Your personal information and skills" },
  goal:    { title: "Your Goal",    subtitle: "Roadmap, progress & skills to master" },
  usage:   { title: "Usage & Plan", subtitle: "Interview quota and subscription details" },
};

export default function ProfilePage() {
  const [active, setActive] = useState<Section>("profile");
  const { title, subtitle } = SECTION_HEADER[active];

  return (
    <div className="min-h-screen bg-slate-50 text-[#191A23]">
      <TopNavbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex gap-8">

          {/* ── Left nav ─────────────────────────────────────────────── */}
          <nav className="w-48 shrink-0 pt-28">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-1.5 inline-flex flex-col w-full">
              <ul className="space-y-0.5">
                {NAV_ITEMS.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActive(item.id)}
                        className={cn(
                          "w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm font-semibold transition-all text-left",
                          isActive
                            ? "bg-[#191A23] text-white"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                        )}
                      >
                        <item.icon className="w-3.5 h-3.5 shrink-0" />
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* ── Content ──────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <h1 className="text-xl font-black text-slate-900">{title}</h1>
              <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
            </div>

            {active === "profile" && <ProfileContent />}
            {active === "goal"    && <GoalContent />}
            {active === "usage"   && <UsageContent />}
          </div>

        </div>
      </div>
    </div>
  );
}
