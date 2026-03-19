"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { adminKPIs, adminRevenueData } from "@/lib/mock-data";
import { TrendingUp, TrendingDown, DollarSign, Users, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Overview</h1>
      </div>

      {/* KPI Cards - rounded-2xl để khớp Section 2 của User */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminKPIs.map((kpi, idx) => (
          <Card key={idx} className="p-6 border border-slate-200 shadow-sm rounded-2xl bg-white">
            <div className="flex justify-between items-start mb-4">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{kpi.title}</p>
              <div className="p-2 bg-slate-50 rounded-lg">
                {idx === 0 ? <Users className="w-4 h-4 text-teal-600" /> : <DollarSign className="w-4 h-4 text-slate-400" />}
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">{kpi.value}</h3>
            <div className={`flex items-center gap-1.5 text-xs font-semibold ${kpi.isPositive ? 'text-teal-600' : 'text-red-500'}`}>
              {kpi.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{kpi.trend} vs last month</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Revenue Chart Section - rounded-3xl để khớp Section 1 của User */}
      <Card className="p-8 border border-slate-200 shadow-sm rounded-3xl bg-white">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-teal-600" />
          <h3 className="font-semibold text-slate-800 text-lg">Revenue Stream</h3>
        </div>
        
        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={adminRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }} 
                tickFormatter={(val: string) => val.toUpperCase()}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }}
                tickFormatter={(value: any) => `${value / 1000000}M`} 
              />
              <Tooltip 
                cursor={{ fill: '#F8FAFC' }}
                contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', fontWeight: '600' }}
                formatter={(value: any) => [`${value.toLocaleString()} ₫`, 'Revenue']}
              />
              <Bar 
                dataKey="revenue" 
                radius={[6, 6, 0, 0]} 
                barSize={40}
              >
                {adminRevenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === adminRevenueData.length - 1 ? '#0F172A' : '#14B8A6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}