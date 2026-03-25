"use client";

import React from "react";
import Link from "next/link";
import { BrainCircuit, User, Mail, Lock, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push("/dashboard");
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
                    Create account
                </h2>
                <p className="mt-2 text-center text-sm text-[#191A23]/60">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-[#5378EF] hover:underline underline-offset-4 transition-colors">
                        Sign in here
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] rounded-[2rem] sm:px-10">
                    <form onSubmit={handleRegister} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-[#191A23] mb-1.5">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-[#191A23]/40" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="block w-full pl-10 pr-3 py-3 border-2 border-[#191A23] rounded-xl bg-[#F3F3F3] placeholder-[#191A23]/40 focus:outline-none focus:border-[#5378EF] sm:text-sm transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#191A23] mb-1.5">Email address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-[#191A23]/40" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="block w-full pl-10 pr-3 py-3 border-2 border-[#191A23] rounded-xl bg-[#F3F3F3] placeholder-[#191A23]/40 focus:outline-none focus:border-[#5378EF] sm:text-sm transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#191A23] mb-1.5">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-[#191A23]/40" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="At least 8 characters"
                                    className="block w-full pl-10 pr-3 py-3 border-2 border-[#191A23] rounded-xl bg-[#F3F3F3] placeholder-[#191A23]/40 focus:outline-none focus:border-[#5378EF] sm:text-sm transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input type="checkbox" className="h-4 w-4 accent-[#5378EF] border-[#191A23] rounded" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label className="text-[#191A23]/60">
                                    I agree to the{" "}
                                    <a href="#" className="font-semibold text-[#191A23] hover:underline underline-offset-4">Terms</a>
                                    {" "}and{" "}
                                    <a href="#" className="font-semibold text-[#191A23] hover:underline underline-offset-4">Privacy Policy</a>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-[#191A23] hover:bg-[#5378EF] text-white text-sm font-semibold rounded-full transition-colors active:scale-[0.98]"
                        >
                            <ShieldCheck className="w-5 h-5" />
                            Create Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
