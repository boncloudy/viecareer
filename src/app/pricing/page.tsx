"use client";

import React from "react";
import { Check, Zap, Star, ShieldCheck, Rocket } from "lucide-react";

const plans = [
  {
    name: "Freemium",
    price: "0",
    period: "VND/month",
    description: "Explore the platform",
    buttonText: "Get Started",
    icon: <Rocket className="w-6 h-6 text-[#191A23]/60" />,
    bg: "bg-[#F3F3F3]",
    dark: false,
    features: [
      "Limited monthly Mock Interviews",
      "Ad-supported experience",
      "Basic CV Analysis",
      "Access to VieCareer Community",
    ],
  },
  {
    name: "Standard",
    price: "100,000",
    period: "VND/month",
    description: "Ideal for Intern/Fresher levels",
    popular: true,
    buttonText: "Upgrade Now",
    icon: <Zap className="w-6 h-6 text-white" />,
    bg: "bg-[#5378EF]",
    dark: true,
    features: [
      "Increased Mock Interview limit",
      "Ad-free experience",
      "Detailed AI Feedback",
      "Basic Learning Roadmap support",
    ],
  },
  {
    name: "Premium",
    price: "299,000",
    period: "VND/month",
    description: "Designed for Middle/Senior levels",
    buttonText: "Go Premium",
    icon: <Star className="w-6 h-6 text-[#191A23]/60" />,
    bg: "bg-[#191A23]",
    dark: true,
    features: [
      "Unlimited Mock Interviews",
      "Company-specific simulations",
      "Deep-dive technical skill analysis",
      "Priority 24/7 Support",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white text-[#191A23] py-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto text-center mb-14">
        <span className="inline-block bg-[#5378EF] text-[#191A23] font-semibold px-3 py-1 rounded-lg text-3xl md:text-4xl mb-4">
          Pricing
        </span>
        <p className="text-[#191A23]/60 text-lg mt-4">Invest in your career with AI-powered intelligence</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative ${plan.bg} ${plan.dark ? "text-white" : "text-[#191A23]"} rounded-[2rem] border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] p-8 transition-all duration-300 hover:-translate-y-1`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#191A23] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Most Popular
              </span>
            )}

            <div className="mb-6">
              <div className="mb-4">{plan.icon}</div>
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className={`text-sm mb-6 h-10 ${plan.dark ? "text-white/60" : "text-[#191A23]/60"}`}>{plan.description}</p>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className={`text-[10px] mt-1 uppercase tracking-tight ${plan.dark ? "text-white/50" : "text-[#191A23]/50"}`}>{plan.period}</span>
              </div>
            </div>

            <button className={`w-full py-3 rounded-full font-semibold text-sm mb-8 transition-colors border-2 ${
              plan.dark
                ? "bg-white text-[#191A23] border-white hover:bg-[#F3F3F3]"
                : "bg-[#191A23] text-white border-[#191A23] hover:bg-[#5378EF] hover:border-[#5378EF]"
            }`}>
              {plan.buttonText}
            </button>

            <ul className={`space-y-4 text-sm ${plan.dark ? "text-white/80" : "text-[#191A23]/80"}`}>
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 leading-tight">
                  <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.dark ? "text-white" : "text-[#5378EF]"}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Usage-Based Section */}
      <div className="max-w-2xl mx-auto bg-[#F3F3F3] border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="p-3 bg-[#5378EF]/10 rounded-full">
            <ShieldCheck className="w-6 h-6 text-[#5378EF]" />
          </div>
          <div>
            <h4 className="font-bold text-lg text-[#191A23]">Usage-Based</h4>
            <p className="text-[#191A23]/60 text-sm">Buy extra interview turns whenever you need</p>
          </div>
        </div>
        <div className="text-center md:text-right">
          <p className="text-2xl font-bold text-[#5378EF]">29,000 VND</p>
          <p className="text-[#191A23]/40 text-[10px] uppercase tracking-wider">Per additional interview</p>
        </div>
      </div>
    </div>
  );
}
