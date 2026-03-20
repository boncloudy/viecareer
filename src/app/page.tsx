"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Plus,
  Minus,
  Linkedin,
  Sparkles,
  Facebook,
  Twitter,
} from "lucide-react";

/* ================================================================== */
/*  VieCareer – AI Mock Interview & Career Prep Platform              */
/*  Design System: #5378EF · #191A23 · #F3F3F3 · #5378EF · #FFFFFF   */
/* ================================================================== */

/* ===== DATA ===== */

const NAV_LINKS = ["Platform", "Features", "Success Stories", "Pricing"];

const SERVICES = [
  {
    title: ["AI-Powered", "Mock Interviews"],
    bg: "bg-[#F3F3F3]",
    badgeBg: "bg-[#5378EF]",
    badgeText: "text-white",
    dark: false,
  },
  {
    title: ["Resume Gap", "Analysis"],
    bg: "bg-[#5378EF]",
    badgeBg: "bg-[#F3F3F3]",
    badgeText: "text-[#191A23]",
    dark: false,
  },
  {
    title: ["JRI Scoring", "& Metrics"],
    bg: "bg-[#191A23]",
    badgeBg: "bg-[#F3F3F3]",
    badgeText: "text-[#191A23]",
    dark: true,
  },
  {
    title: ["Personalized", "Action Plans"],
    bg: "bg-[#F3F3F3]",
    badgeBg: "bg-[#5378EF]",
    badgeText: "text-white",
    dark: false,
  },
  {
    title: ["Behavioral", "Question Prep"],
    bg: "bg-[#5378EF]",
    badgeBg: "bg-[#F3F3F3]",
    badgeText: "text-[#191A23]",
    dark: false,
  },
  {
    title: ["Performance", "Tracking"],
    bg: "bg-[#191A23]",
    badgeBg: "bg-[#5378EF]",
    badgeText: "text-white",
    dark: true,
  },
];

const CASE_STUDIES = [
  "Helped a software engineer land a Senior role at Google through targeted mock interviews and instant feedback loops.",
  "Improved a marketing professional's interview score by 45% in just 2 weeks using AI-driven coaching and gap analysis.",
  "Guided a career-switcher from finance to product management with a personalized learning roadmap spanning 3 months.",
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Resume Upload",
    desc: "Start by uploading your current resume. Our AI system parses your experience and identifies key strengths and potential gaps compared to standard industry expectations.",
  },
  {
    num: "02",
    title: "Target Role Setup",
    desc: "Provide the job description for your dream role. We analyze the specific job requirements, company culture, and common interview patterns to build a customized interview strategy.",
  },
  {
    num: "03",
    title: "AI Mock Interviews",
    desc: "Engage in realistic AI mock interviews that simulate real conditions. You will face behavioral, technical, and case-based questions adapted dynamically to your responses.",
  },
  {
    num: "04",
    title: "Performance Scoring",
    desc: "Every answer is evaluated in real-time. Our proprietary Job Readiness Index (JRI) scores your communication, technical depth, problem-solving, and overall confidence.",
  },
  {
    num: "05",
    title: "Personalized Action Plans",
    desc: "Based on the comprehensive analysis, you get a personalized roadmap with targeted exercises and resource recommendations designed specifically to close your skill gaps.",
  },
  {
    num: "06",
    title: "Iterate to Success",
    desc: "Track your progress over time as you complete multiple interview cycles. The system adjusts the difficulty to ensure you are continually improving toward interview readiness.",
  },
];

const TEAM = [
  { name: "Duc Lai", role: "CEO", initial: "DL" },
  { name: "An Nguyen", role: "AI Engineer Mentor", initial: "AN" },
  { name: "Anh Le", role: "Product Manager", initial: "AL" },
  { name: "Phuong Phan", role: "Full-Stack Dev", initial: "PP" },
  { name: "Han Nguyen", role: "Graphic Designer", initial: "HN" },
  { name: "Phung Nguyen", role: "UI/UX Designer", initial: "PN" },
];

const TESTIMONIALS = [
  {
    text: "VieCareer's AI mock interviews felt incredibly realistic. I walked into my actual interview at Microsoft feeling completely prepared and confident. Got the offer!",
    author: "Duc P.",
    role: "Software Engineer at Microsoft",
  },
  {
    text: "The gap analysis showed me exactly where I was weak. After two weeks of focused practice with the action plans, my mock scores jumped by 40%. Incredible tool.",
    author: "Thao N.",
    role: "Product Manager at Grab",
  },
  {
    text: "As a career switcher, I had no idea what to expect. VieCareer gave me a structured path and realistic interview scenarios. Landed my dream role in 2 months!",
    author: "Khanh L.",
    role: "UX Designer at Shopee",
  },
];

/* ===== SVG ILLUSTRATIONS ===== */

function HeroMegaphone() {
  return (
    <div className="relative w-[600px] h-[600px] -mt-20">
      <Image
        src="/landingimage.png"
        alt="Megaphone"
        fill
        className="object-contain"
      />
    </div>
  );
}

function ServiceSEO() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      <circle cx="50" cy="40" r="25" stroke="#191A23" strokeWidth="2" fill="none" />
      <line x1="68" y1="58" x2="90" y2="80" stroke="#191A23" strokeWidth="3" strokeLinecap="round" />
      <circle cx="40" cy="75" r="12" stroke="#191A23" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M85 20 L90 10 L95 20 L90 30 Z" fill="#191A23" opacity="0.5" />
    </svg>
  );
}

function ServicePPC() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      <rect x="15" y="10" width="70" height="55" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="15" y1="25" x2="85" y2="25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="22" cy="18" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="32" cy="18" r="3" fill="currentColor" opacity="0.5" />
      <rect x="25" y="32" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M80 50 L100 70" stroke="currentColor" strokeWidth="2" />
      <path d="M95 62 L100 70 L92 68" fill="currentColor" />
    </svg>
  );
}

function ServiceSocial() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      <rect x="20" y="10" width="60" height="65" rx="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="50" cy="35" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <text x="45" y="40" fill="currentColor" fontSize="14">☺</text>
      <rect x="30" y="55" width="40" height="4" rx="2" fill="currentColor" opacity="0.4" />
      <rect x="30" y="62" width="25" height="4" rx="2" fill="currentColor" opacity="0.3" />
      <text x="85" y="25" fill="currentColor" fontSize="12">♥</text>
      <text x="85" y="50" fill="currentColor" fontSize="10">★</text>
    </svg>
  );
}

function ServiceEmail() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      <rect x="15" y="20" width="70" height="50" rx="4" stroke="#191A23" strokeWidth="2" fill="none" />
      <polyline points="15,20 50,50 85,20" stroke="#191A23" strokeWidth="2" fill="none" />
      <line x1="85" y1="30" x2="105" y2="15" stroke="#191A23" strokeWidth="1.5" opacity="0.4" />
      <line x1="90" y1="55" x2="108" y2="62" stroke="#191A23" strokeWidth="1.5" opacity="0.4" />
      <circle cx="108" cy="12" r="5" fill="#191A23" opacity="0.6" />
      <circle cx="112" cy="65" r="4" fill="#191A23" opacity="0.4" />
    </svg>
  );
}

function ServiceContent() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      <rect x="30" y="5" width="55" height="40" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="20" y="20" width="55" height="40" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="10" y="35" width="55" height="40" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="18" y="45" width="30" height="3" rx="1.5" fill="currentColor" opacity="0.4" />
      <rect x="18" y="52" width="38" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
      <rect x="18" y="59" width="20" height="3" rx="1.5" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function ServiceAnalytics() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      <rect x="10" y="10" width="80" height="60" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="20" y="50" width="10" height="12" rx="1" fill="currentColor" opacity="0.6" />
      <rect x="35" y="38" width="10" height="24" rx="1" fill="currentColor" opacity="0.7" />
      <rect x="50" y="28" width="10" height="34" rx="1" fill="currentColor" opacity="0.8" />
      <rect x="65" y="20" width="10" height="42" rx="1" fill="currentColor" />
      <line x1="95" y1="30" x2="110" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="95" y1="50" x2="110" y2="55" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

const SERVICE_ILLUSTRATIONS = [ServiceSEO, ServicePPC, ServiceSocial, ServiceEmail, ServiceContent, ServiceAnalytics];

function ContactDecoration() {
  return (
    <svg viewBox="0 0 280 280" fill="none" className="w-full h-full">
      <circle cx="140" cy="140" r="110" fill="#5378EF" opacity="0.08" />
      <rect x="40" y="60" width="160" height="100" rx="18" fill="#5378EF" />
      <path d="M70 160 L55 182 L95 160 Z" fill="#5378EF" />
      <rect x="60" y="85" width="80" height="8" rx="4" fill="white" opacity="0.9" />
      <rect x="60" y="102" width="120" height="8" rx="4" fill="white" opacity="0.7" />
      <rect x="60" y="119" width="60" height="8" rx="4" fill="white" opacity="0.5" />
      <rect x="80" y="175" width="130" height="70" rx="14" fill="#191A23" />
      <path d="M195 175 L210 158 L180 175 Z" fill="#191A23" />
      <rect x="98" y="194" width="90" height="7" rx="3.5" fill="white" opacity="0.6" />
      <rect x="98" y="209" width="60" height="7" rx="3.5" fill="white" opacity="0.4" />
      <circle cx="248" cy="80" r="10" fill="#5378EF" opacity="0.3" />
      <circle cx="262" cy="100" r="6" fill="#5378EF" opacity="0.2" />
      <circle cx="30" cy="210" r="8" fill="#191A23" opacity="0.15" />
      <circle cx="18" cy="192" r="5" fill="#191A23" opacity="0.1" />
      <circle cx="172" cy="137" r="5" fill="white" opacity="0.8" />
      <circle cx="186" cy="137" r="5" fill="white" opacity="0.5" />
      <circle cx="158" cy="137" r="5" fill="white" opacity="0.3" />
      <path d="M238 44 L242 52 L250 44 L242 36 Z" fill="#5378EF" opacity="0.5" />
      <path d="M226 52 L230 44 L234 52 L230 60 Z" fill="#191A23" opacity="0.2" />
    </svg>
  );
}

function ArrowCircle({ dark }: { dark: boolean }) {
  return (
    <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${dark ? "bg-white text-[#191A23]" : "bg-[#191A23] text-white"}`}>
      <ArrowUpRight className="w-4 h-4" />
    </span>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-[#5378EF] text-[#191A23] font-semibold px-3 py-1 rounded-lg text-3xl md:text-4xl">
      {children}
    </span>
  );
}

/* ===== MAIN COMPONENT ===== */
export default function VieCareer() {
  const [openStep, setOpenStep] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formData, setFormData] = useState({
    contactType: "sayhi",
    name: "",
    email: "",
    message: "",
  });

  return (
    <div className="min-h-screen bg-white text-[#191A23]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');`}</style>

      {/* ============ 1. NAVBAR ============ */}
      <header className="sticky top-0 z-50 bg-white border-b border-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <div className="p-5 pb-8">
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="text-lg font-bold tracking-tight">VieCareer</h1>
                <p className="text-[10px] text-teal-400 uppercase tracking-widest">
                  Your Career
                </p>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#191A23]">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={link === "Pricing" ? "/pricing" : `#${link.toLowerCase().replace(/\s/g, "-")}`}
                className="hover:underline underline-offset-4 transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="border-2 border-[#191A23] px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#191A23] hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-[#5378EF] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#191A23] transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* ============ 2. HERO ============ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-16 md:pb-24">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight">
              Master the<br />interview.<br />Land your dream role.
            </h1>
            <p className="text-base text-[#191A23]/70 max-w-md leading-relaxed">
              Elevate your career readiness with AI-powered mock interviews, real-time gap analysis, and personalized learning roadmaps tailored to your target job.
            </p>
            <Link
              href="#contact"
              className="inline-flex bg-[#191A23] text-white px-8 py-4 rounded-full font-medium hover:bg-[#5378EF] transition-colors"
            >
              Contact Us
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-[300px] h-[300px] md:w-[420px] md:h-[420px]">
              <HeroMegaphone />
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. BRAND LOGOS BAR ============ */}
      <section className="border-y border-[#191A23]/10 py-8 mb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
          {["FPT", "Viettel", "Momo", "Grab", "Shopee", "Google"].map((name) => (
            <span key={name} className="text-lg md:text-xl font-bold tracking-tight text-[#191A23]">
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* ============ 4. SERVICES ============ */}
      <section id="services" className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-14">
          <SectionTag>Features</SectionTag>
          <p className="text-sm text-[#191A23]/70 max-w-xl leading-relaxed">
            Everything you need to succeed in your next interview. Stop guessing and start preparing with data-driven insights and AI simulation:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => {
            const Illustration = SERVICE_ILLUSTRATIONS[i];
            return (
              <div
                key={i}
                className={`${s.bg} ${s.dark ? "text-white" : "text-[#191A23]"} rounded-[2rem] border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] p-8 md:p-10 min-h-[160px] flex items-end justify-between relative overflow-hidden`}
              >
                <div className="space-y-6 relative z-10">
                  <h3 className="font-semibold text-xl leading-tight">
                    {s.title.map((line, idx) => (
                      <span key={idx} className="block">{line}</span>
                    ))}
                  </h3>
                  <a href="#" className={`inline-flex items-center gap-2 text-sm font-medium ${s.dark ? "text-white" : "text-[#191A23]"} hover:underline`}>
                    <ArrowCircle dark={s.dark} />
                    Learn more
                  </a>
                </div>
                <div className={`w-24 h-24 md:w-32 md:h-32 shrink-0 ${s.dark ? "text-white" : "text-[#191A23]"}`}>
                  <Illustration />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ 5. CTA BANNER ============ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24 relative">
        <div className="bg-[#F3F3F3] rounded-3xl border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] p-10 md:p-16">
          <div className="max-w-lg space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold">Ready to level up?</h3>
            <p className="text-sm text-[#191A23]/70 leading-relaxed">
              Join thousands of candidates preparing smarter today. Sign up for free and get access to your first personalized mock interview in just minutes.
            </p>
            <Link
              href="/register"
              className="inline-block bg-[#191A23] text-white font-medium px-8 py-3.5 rounded-full hover:bg-[#5378EF] transition-colors"
            >
              Start Now
            </Link>
          </div>
        </div>
        <div className="absolute -top-25 right-0 w-[520px] h-[520px] pointer-events-none z-10">
          <Image src="/image.png" alt="Decorative" fill className="object-contain" />
        </div>
      </section>

      {/* ============ 6. CASE STUDIES ============ */}
      <section id="use-cases" className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-14">
          <SectionTag>Success Stories</SectionTag>
          <p className="text-sm text-[#191A23]/70 max-w-xl leading-relaxed">
            Explore real-world examples of how VieCareer candidates used targeted feedback to secure offers at top companies.
          </p>
        </div>

        <div className="bg-[#191A23] rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-white/20">
            {CASE_STUDIES.map((cs, i) => (
              <div key={i} className="md:px-8 first:md:pl-0 last:md:pr-0 flex flex-col justify-between gap-4">
                <p className="text-white/70 text-sm leading-relaxed">{cs}</p>
                <a href="#" className="inline-flex items-center gap-2 text-[#5378EF] font-medium text-sm hover:underline">
                  Learn more <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 7. WORKING PROCESS (ACCORDION) ============ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-14">
          <SectionTag>How It Works</SectionTag>
          <p className="text-sm text-[#191A23]/70 max-w-xl leading-relaxed">
            Step-by-step guide to achieving your interview preparedness goals.
          </p>
        </div>

        <div className="space-y-4">
          {PROCESS_STEPS.map((step, i) => {
            const isOpen = openStep === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] transition-all duration-300 ${isOpen ? "bg-[#5378EF]" : "bg-[#F3F3F3]"}`}
              >
                <button
                  onClick={() => setOpenStep(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <span className={`text-3xl md:text-5xl font-bold ${isOpen ? "text-white" : "text-[#191A23]"}`}>{step.num}</span>
                    <span className={`text-lg md:text-xl font-semibold ${isOpen ? "text-white" : "text-[#191A23]"}`}>{step.title}</span>
                  </div>
                  <div className={`w-10 h-10 rounded-full border-2 border-[#191A23] flex items-center justify-center shrink-0 transition-colors ${isOpen ? "bg-[#191A23]" : "bg-white"}`}>
                    {isOpen ? <Minus className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-[#191A23]" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                    <div className="border-t border-white/30 pt-4">
                      <p className="text-sm text-white/90 leading-relaxed max-w-3xl">{step.desc}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ 8. TEAM SECTION ============ */}
      <section id="team" className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-14">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <SectionTag>Team</SectionTag>
            <p className="text-sm text-[#191A23]/70 max-w-xl leading-relaxed">
              Meet the skilled AI researchers, project coaches, and developers building the ultimate interview platform.
            </p>
          </div>
          <button className="border-2 border-[#191A23] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#191A23] hover:text-white transition-colors shrink-0">
            See all team
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((member, i) => (
            <div key={i} className="border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] rounded-2xl p-8">
              <div className="flex items-end justify-between mb-4">
                <div className="w-24 h-24 bg-[#5378EF] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {member.initial}
                </div>
                <a href="#" className="w-9 h-9 rounded-full bg-[#191A23] text-white flex items-center justify-center hover:bg-[#5378EF] transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
              <h4 className="font-bold text-lg">{member.name}</h4>
              <p className="text-sm text-[#191A23]/60">{member.role}</p>
              <div className="border-t border-[#191A23]/15 mt-4 pt-4">
                <p className="text-xs text-[#191A23]/50 leading-relaxed">
                  Passionate about leveraging creative strategies and data-driven insights to deliver exceptional results for our clients.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 9. TESTIMONIALS ============ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-14">
          <SectionTag>Testimonials</SectionTag>
          <p className="text-sm text-[#191A23]/70 max-w-xl leading-relaxed">
            Hear from successful candidates: Read our testimonials to see how VieCareer transformed their interview experiences.
          </p>
        </div>

        <div className="bg-[#191A23] rounded-3xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative border border-[#5378EF] rounded-2xl p-7 mb-8">
              <p className="text-white text-base leading-relaxed italic">
                &ldquo;{TESTIMONIALS[activeTestimonial].text}&rdquo;
              </p>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 border-b border-r border-[#5378EF] bg-[#191A23]" />
            </div>
            <p className="text-[#5378EF] font-bold">{TESTIMONIALS[activeTestimonial].author}</p>
            <p className="text-white/50 text-sm">{TESTIMONIALS[activeTestimonial].role}</p>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => setActiveTestimonial((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              ←
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${i === activeTestimonial ? "bg-[#5378EF]" : "bg-white/30"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveTestimonial((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* ============ 10. CONTACT SECTION ============ */}
      <section id="contact" className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-14">
          <SectionTag>Contact Us</SectionTag>
          <p className="text-sm text-[#191A23]/70 max-w-xl leading-relaxed">
            Connect with Us: Let&apos;s Discuss Your Career Preparation Needs or Partnership Opportunities.
          </p>
        </div>

        <div className="bg-[#F3F3F3] rounded-3xl border border-[#191A23]/10 p-8 md:p-12 flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-6">
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input
                  type="radio"
                  name="contact-type"
                  checked={formData.contactType === "sayhi"}
                  onChange={() => setFormData({ ...formData, contactType: "sayhi" })}
                  className="accent-[#191A23] w-4 h-4"
                />
                Say Hi
              </label>
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input
                  type="radio"
                  name="contact-type"
                  checked={formData.contactType === "quote"}
                  onChange={() => setFormData({ ...formData, contactType: "quote" })}
                  className="accent-[#191A23] w-4 h-4"
                />
                Get a Quote
              </label>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-2 border-[#191A23] rounded-xl px-4 py-3 text-sm bg-white focus:border-[#5378EF] focus:outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Email*"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-2 border-[#191A23] rounded-xl px-4 py-3 text-sm bg-white focus:border-[#5378EF] focus:outline-none transition-colors"
              />
              <textarea
                placeholder="Message*"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border-2 border-[#191A23] rounded-xl px-4 py-3 text-sm bg-white focus:border-[#5378EF] focus:outline-none transition-colors resize-none"
              />
            </div>

            <button className="w-full bg-[#191A23] text-white font-medium py-3.5 rounded-full hover:bg-[#5378EF] transition-colors">
              Send Message
            </button>
          </div>

          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div className="w-64 h-64">
              <ContactDecoration />
            </div>
          </div>
        </div>
      </section>

      {/* ============ 11. FOOTER ============ */}
      <footer className="bg-[#191A23] rounded-t-3xl text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
            <div className="p-5 pb-8">
              <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#0F172A]" />
              </div>
              <span className="text-lg font-bold">VieCareer</span>
            </div>
            <nav className="flex flex-wrap gap-6 text-sm text-white/70 underline underline-offset-4">
              {NAV_LINKS.map((link) => (
                <a key={link} href={link === "Pricing" ? "/pricing" : `#${link.toLowerCase().replace(/\s/g, "-")}`} className="hover:text-white transition-colors">
                  {link}
                </a>
              ))}
            </nav>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mb-10">
            <div className="space-y-2">
              <span className="inline-block bg-[#5378EF] text-[#191A23] text-xs font-bold px-2 py-1 rounded">Contact us:</span>
              <p className="text-sm text-white/70">Email: info@viecareer.com</p>
              <p className="text-sm text-white/70">Phone: 555-567-8901</p>
              <p className="text-sm text-white/70">Address: FPT Ho Chi Minh, High Tech Park</p>
            </div>

            <div className="flex-1 flex justify-end">
              <div className="bg-[#292A32] rounded-xl p-4 flex gap-3 w-full max-w-md">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 bg-transparent border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#5378EF]"
                />
                <button className="bg-[#5378EF] text-[#191A23] font-medium px-5 py-2 rounded-lg text-sm hover:brightness-110 transition-all">
                  Subscribe to news
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between gap-4 text-sm text-white/50">
            <p>© 2025 VieBrain. All Rights Reserved.</p>
            <a href="#" className="underline underline-offset-4 hover:text-white/80 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
