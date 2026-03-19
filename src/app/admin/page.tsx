"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { adminKPIs, adminRevenueData } from "@/lib/mock-data";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminOverviewPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard</h1>
                    <p className="text-slate-500 mt-1">Real-time metrics and system performance.</p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {adminKPIs.map((kpi, idx) => (
                    <Card key={idx} className="p-6 border-slate-200 shadow-sm rounded-2xl bg-white">
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">{kpi.title}</p>
                        <h3 className="text-3xl font-black text-slate-900 mb-4">{kpi.value}</h3>
                        <div className={`flex items-center gap-1.5 text-sm font-bold ${kpi.isPositive ? 'text-teal-600' : 'text-red-500'}`}>
                            {kpi.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            <span>{kpi.trend} from last month</span>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Revenue Chart Section */}
            <Card className="p-8 border-slate-200 shadow-sm rounded-[2rem] bg-white">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-teal-500" /> Revenue Analytics
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">Monthly subscription revenue tracking.</p>
                    </div>
                    <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                        <option>Last 6 Months</option>
                        <option>This Year</option>
                    </select>
                </div>

                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={adminRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
                                tickFormatter={(value: any) => `${value / 1000000}M`}
                            />
                            <Tooltip
                                cursor={{ fill: '#F1F5F9' }}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontWeight: 'bold' }}
                                formatter={(value: any) => [`${value.toLocaleString()} ₫`, 'Revenue']}
                            />
                            <Bar
                                dataKey="revenue"
                                fill="#0F172A"
                                radius={[6, 6, 0, 0]}
                                barSize={40}
                                activeBar={{ fill: '#14B8A6' }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
}