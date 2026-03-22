"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    if (email.includes("admin")) {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-lg font-bold tracking-tight">VieCareer</h1>
              <p className="text-[10px] text-[#5378EF] uppercase tracking-widest">
                Your Career
              </p>
            </div>
          </Link>
        </div>
        <h2 className="mt-8 text-center text-3xl font-bold text-[#191A23] tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-[#191A23]/60">
          Or{" "}
          <Link href="/register" className="font-semibold text-[#5378EF] hover:underline underline-offset-4 transition-colors">
            create a new account for free
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] rounded-[2rem] sm:px-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#191A23] mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#191A23]/40" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="block w-full pl-10 pr-3 py-3 border-2 border-[#191A23] rounded-xl bg-[#F3F3F3] placeholder-[#191A23]/40 focus:outline-none focus:border-[#5378EF] sm:text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#191A23] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#191A23]/40" />
                </div>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-3 border-2 border-[#191A23] rounded-xl bg-[#F3F3F3] placeholder-[#191A23]/40 focus:outline-none focus:border-[#5378EF] sm:text-sm transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-[#5378EF] border-[#191A23] rounded"
                />
                <label className="ml-2 block text-sm text-[#191A23]/70">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-semibold text-[#5378EF] hover:underline underline-offset-4">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-full font-semibold text-sm text-white bg-[#191A23] hover:bg-[#5378EF] transition-colors active:scale-[0.98]"
              >
                Sign In <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#191A23]/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#191A23]/50 font-medium">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full flex justify-center items-center py-3 px-4 border-2 border-[#191A23] rounded-full bg-white text-sm font-semibold text-[#191A23] hover:bg-[#F3F3F3] transition-all">
                <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                Google Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
