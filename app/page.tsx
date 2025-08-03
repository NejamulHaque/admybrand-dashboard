// ADmyBRAND Insights Dashboard – Modular with Date Filters & Skeletons
"use client";

import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { ClientOnly } from "@/components/common/ClientOnly";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartBlock } from "@/components/dashboard/ChartBlock";
import { DataTable } from "@/components/dashboard/DataTable";
import { DatePicker } from "@/components/ui/date-picker";
import { format, isAfter, isBefore, parse } from "date-fns";

const initialLineData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 200 },
  { name: "Apr", value: 278 },
  { name: "May", value: 189 },
];

const pieData = [
  { name: "Facebook", value: 400 },
  { name: "Google", value: 300 },
  { name: "Instagram", value: 300 },
  { name: "Others", value: 200 },
];

const barData = [
  { name: "Week 1", uv: 400, pv: 240 },
  { name: "Week 2", uv: 300, pv: 139 },
  { name: "Week 3", uv: 200, pv: 980 },
];

export default function DashboardPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lineData, setLineData] = useState(initialLineData);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);

    setCsvData([...Array(10)].map((_, i) => {
      const signupDate = new Date(2025, 7, i + 1);
      return {
        Name: `User ${i + 1}`,
        Email: `user${i + 1}@example.com`,
        "Signup Date": format(signupDate, "yyyy-MM-dd"),
        Status: i % 2 === 0 ? "Active" : "Inactive",
      };
    }));

    const interval = setInterval(() => {
      setLineData((prev) =>
        prev.map((entry) => ({ ...entry, value: Math.floor(Math.random() * 500) }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredData = csvData.filter((item) => {
    if (!startDate || !endDate) return true;
    const itemDate = parse(item["Signup Date"], "yyyy-MM-dd", new Date());
    return isAfter(itemDate, startDate) && isBefore(itemDate, endDate);
  });

  const mockStats = [
    { label: "Revenue", value: "₹120K" },
    { label: "Users", value: "4.5K" },
    { label: "Conversions", value: "980" },
    { label: "Growth", value: "+12.4%" },
  ];

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"}>
      <div className="p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">ADmyBRAND Insights</h1>
        <div className="flex items-center gap-2">
          <span>🌙</span>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          <span>☀️</span>
        </div>
      </div>

      <ClientOnly>
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
          {mockStats.map((stat, index) => (
            <StatCard key={index} label={stat.label} value={stat.value} loading={loading} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <ChartBlock title="Monthly Growth" type="line" data={lineData} loading={loading} />
          <ChartBlock title="Marketing Channels" type="pie" data={pieData} loading={loading} />
          <ChartBlock title="Weekly Performance" type="bar" data={barData} loading={loading} />
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center px-6 py-4">
          <DatePicker date={startDate} setDate={setStartDate} placeholder="Start Date" />
          <DatePicker date={endDate} setDate={setEndDate} placeholder="End Date" />
        </div>

        {/* Data Table */}
        <DataTable data={filteredData} loading={loading} />
      </ClientOnly>
    </div>
  );
}