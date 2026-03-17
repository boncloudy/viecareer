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
    icon: <Rocket className="w-6 h-6 text-slate-400" />,
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
    icon: <Zap className="w-6 h-6 text-teal-400" />,
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
    icon: <Star className="w-6 h-6 text-yellow-400" />,
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
    <div className="min-h-screen bg-[#0F172A] text-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Service Plans</h1>
        <p className="text-slate-400 text-lg">Invest in your career with AI-powered intelligence</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`relative p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
              plan.popular ? "border-teal-500 bg-teal-500/5 shadow-lg shadow-teal-500/10" : "border-slate-800 bg-slate-900/50"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Most Popular
              </span>
            )}
            
            <div className="mb-6">
              <div className="mb-4">{plan.icon}</div>
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className="text-slate-500 text-sm mb-6 h-10">{plan.description}</p>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-slate-400 text-[10px] mt-1 uppercase tracking-tight">{plan.period}</span>
              </div>
            </div>

            <button className={`w-full py-3 rounded-xl font-bold text-sm mb-8 transition-colors ${
              plan.popular ? "bg-teal-500 hover:bg-teal-600 text-white" : "bg-white/10 hover:bg-white/20 text-white"
            }`}>
              {plan.buttonText}
            </button>

            <ul className="space-y-4 text-sm text-slate-300">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 leading-tight">
                  <Check className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Usage-Based Section */}
      <div className="max-w-2xl mx-auto bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="p-3 bg-teal-500/10 rounded-full">
            <ShieldCheck className="w-6 h-6 text-teal-400" />
          </div>
          <div>
            <h4 className="font-bold text-lg text-white">Usage-Based</h4>
            <p className="text-slate-400 text-sm">Buy extra interview turns whenever you need</p>
          </div>
        </div>
        <div className="text-center md:text-right">
          <p className="text-2xl font-bold text-teal-400">29,000 VND</p>
          <p className="text-slate-500 text-[10px] uppercase tracking-wider">Per additional interview</p>
        </div>
      </div>
    </div>
  );
}