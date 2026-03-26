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
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                        <BrainCircuit className="w-6 h-6 text-white" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-black text-slate-900 tracking-tight">
                    Create account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link href="/login" className="font-bold text-teal-600 hover:text-teal-500 transition-colors">
                        Sign in here
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-sm border border-slate-200 sm:rounded-[2rem] sm:px-10">
                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-teal-500 focus:outline-none sm:text-sm transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Email address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-teal-500 focus:outline-none sm:text-sm transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="At least 8 characters"
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-teal-500 focus:outline-none sm:text-sm transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input type="checkbox" className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label className="text-slate-500">
                                    I agree to the{" "}
                                    <a href="#" className="font-bold text-slate-700 hover:underline">Terms</a>
                                    {" "}and{" "}
                                    <a href="#" className="font-bold text-slate-700 hover:underline">Privacy Policy</a>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-teal-500 hover:bg-teal-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-teal-500/20 transition-all active:scale-[0.98]"
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