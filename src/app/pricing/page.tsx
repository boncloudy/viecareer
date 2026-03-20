"use client";

import React from "react";
import { Check, Zap, Star, ShieldCheck, Users, Rocket } from "lucide-react";

const plans = [
  {
    name: "Freemium",
    price: "0",
    period: "VND / month",
    description: "Explore the platform",
    buttonText: "Get Started",
    icon: <Rocket className="w-6 h-6 text-white/40" />,
    bg: "bg-[#1E293B]",
    dark: true,
    highlight: false,
    muted: true,
    features: [
      "3 × Resume Analysis",
      "2 × AI Interview",
      "2 × AI Code Feedback",
      "10 mins Time Limit",
      "Ad-supported experience",
    ],
  },
  {
    name: "Standard",
    price: "99,000",
    period: "VND / month",
    description: "Ideal for Intern / Fresher levels",
    buttonText: "Upgrade Now",
    icon: <Zap className="w-6 h-6 text-white/70" />,
    bg: "bg-[#1E293B]",
    dark: true,
    highlight: false,
    features: [
      "15 × Resume Analysis",
      "10 × AI Interview",
      "10 × AI Code Feedback",
      "25 mins Time Limit",
    ],
  },
  {
    name: "Premium",
    badge: "Best Value",
    price: "299,000",
    period: "VND / month",
    description: "Designed for Middle / Senior levels",
    buttonText: "Go Premium",
    icon: <Star className="w-6 h-6 text-white" />,
    bg: "bg-[#5378EF]",
    dark: true,
    highlight: true,
    features: [
      "30 × Resume Analysis",
      "20 × AI Interview",
      "15 × AI Code Feedback",
      "45 mins Time Limit",
      "Priority Support & Early Access",
    ],
  },
  {
    name: "Team Plan",
    price: "1,199,000",
    period: "VND / month",
    description: "Ideal for groups of 5",
    buttonText: "Contact Us",
    icon: <Users className="w-6 h-6 text-white/70" />,
    bg: "bg-[#1E293B]",
    dark: true,
    highlight: false,
    features: [
      "5 members included",
      "Each member gets Premium benefits",
      "30 × Resume Analysis / member",
      "20 × AI Interview / member",
      "15 × AI Code Feedback / member",
      "45 mins Time Limit",
      "Priority Support & Early Access",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white py-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto text-center mb-14">
        <span className="inline-block bg-[#5378EF] text-white font-semibold px-4 py-1.5 rounded-lg text-3xl md:text-4xl mb-4">
          Pricing
        </span>
        <p className="text-white/50 text-lg mt-4">
          Invest in your career with AI-powered intelligence
        </p>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12 items-center">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative ${plan.bg} rounded-[2rem] border-2 p-8 transition-all duration-300 ${
              plan.highlight
                ? "border-[#5378EF] shadow-[0_0_32px_rgba(83,120,239,0.45)] md:scale-105 z-10"
                : "border-white/10 shadow-[4px_4px_0_rgba(255,255,255,0.06)] hover:-translate-y-1"
            } ${plan.muted ? "opacity-60 saturate-50" : ""}`}
          >
            {plan.badge && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-[#5378EF] text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap shadow-md">
                {plan.badge}
              </span>
            )}

            <div className="mb-6">
              <div className="mb-4">{plan.icon}</div>
              <h3 className="text-xl font-bold mb-1 text-white">{plan.name}</h3>
              <p className="text-sm mb-6 h-10 text-white/50">{plan.description}</p>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-[10px] mt-1 uppercase tracking-tight text-white/40">
                  {plan.period}
                </span>
              </div>
            </div>

            <button
              className={`w-full py-3 rounded-full font-semibold text-sm mb-8 transition-colors border-2 ${
                plan.highlight
                  ? "bg-white text-[#5378EF] border-white hover:bg-blue-50"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              }`}
            >
              {plan.buttonText}
            </button>

            <ul className="space-y-4 text-sm text-white/75">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 leading-tight">
                  <Check
                    className={`w-4 h-4 mt-0.5 shrink-0 ${
                      plan.highlight ? "text-white" : "text-[#5378EF]"
                    }`}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Usage-Based Section */}
      <div className="max-w-2xl mx-auto bg-[#1E293B] border-2 border-white/10 shadow-[4px_4px_0_rgba(255,255,255,0.04)] rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#5378EF]/15 rounded-full">
              <ShieldCheck className="w-6 h-6 text-[#5378EF]" />
            </div>
            <div>
              <h4 className="font-bold text-lg text-white">Usage-Based</h4>
              <p className="text-white/50 text-sm">Pay per attempt, no subscription needed</p>
            </div>
          </div>
          <div className="text-left md:text-right shrink-0">
            <p className="text-2xl font-bold text-[#5378EF]">29,000 VND</p>
            <p className="text-white/40 text-[10px] uppercase tracking-wider">Per attempt</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            "Resume Analysis",
            "AI Interview",
            "AI Code Feedback",
            "15 mins Time Limit",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 text-sm text-white/70"
            >
              <Check className="w-3.5 h-3.5 text-[#5378EF] shrink-0" />
              <span className="leading-tight">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
