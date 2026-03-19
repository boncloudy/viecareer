"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { adminKPIs, adminRevenueData } from "@/lib/mock-data";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminOverviewPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">System Dashboard</h1>
                    <p className="text-slate-400 mt-1.5 leading-relaxed max-w-xl">Real-time metrics, system performance, and revenue analytics for Super Admin control.</p>
                </div>
                <button className="flex items-center gap-2 bg-[#1E293B] hover:bg-slate-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl border border-slate-700/50 transition-colors">
                    <Activity className="w-4 h-4 text-teal-400" /> System Logs
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {adminKPIs.map((kpi, idx) => (
                    <Card key={idx} className="p-6 bg-[#0F172A] border-none shadow-[0_8px_30px_rgb(0,0,0,0.07)] rounded-[1.5rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                            <DollarSign className="w-16 h-16 text-teal-600" />
                        </div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 relative z-10">{kpi.title}</p>
                        <h3 className="text-3xl font-black text-white tracking-tight mb-4 relative z-10">{kpi.value}</h3>
                        <div className={`flex items-center gap-1.5 text-xs font-bold relative z-10 ${kpi.isPositive ? 'text-teal-400' : 'text-rose-500'}`}>
                            {kpi.isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                            <span>{kpi.trend} from last month</span>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Revenue Chart Section */}
            <Card className="p-8 bg-[#0F172A] border-none shadow-[0_8px_30px_rgb(0,0,0,0.07)] rounded-[2rem]">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/60">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center border border-teal-500/20">
                            <DollarSign className="w-6 h-6 text-teal-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white tracking-tight">Revenue Analytics</h3>
                            <p className="text-sm text-slate-400 mt-1">Monthly subscription revenue tracking.</p>
                        </div>
                    </div>
                    <select className="bg-[#1E293B] border border-slate-700/50 text-white text-sm font-bold rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                        <option>Last 6 Months</option>
                        <option>This Year</option>
                    </select>
                </div>

                <div className="h-[360px] w-full relative">
                    <div className="absolute inset-x-20 inset-y-10 bg-teal-500/5 blur-[80px] rounded-full pointer-events-none" />

                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={adminRevenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 700 }}
                                tickFormatter={(value: string) => value.toUpperCase()}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 700 }}
                                tickFormatter={(value: any) => `${value / 1000000}M ₫`}
                                dx={-10}
                            />
                            <Tooltip
                                cursor={{ fill: '#1E293B', opacity: 0.5 }}
                                contentStyle={{ borderRadius: '16px', border: '1px solid #334155', background: '#0F172A', boxShadow: '0 8px 30px rgba(0,0,0,0.3)', fontWeight: 'bold', padding: '12px' }}
                                itemStyle={{ color: '#E2E8F0' }}
                                labelStyle={{ color: '#94A3B8', marginBottom: '4px' }}
                                formatter={(value: any) => [`${value.toLocaleString()} ₫`, 'Revenue']}
                            />
                            <Bar
                                dataKey="revenue"
                                fill="#14B8A6"
                                radius={[8, 8, 0, 0]}
                                barSize={44}
                                activeBar={{ fill: '#5EEAD4' }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
}