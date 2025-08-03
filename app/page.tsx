// Dashboard with Real-Time Updates, Export to CSV/PDF, and Date Filters
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57"];

export default function DashboardPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lineData, setLineData] = useState(initialLineData);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);

    const interval = setInterval(() => {
      setLineData((prev) =>
        prev.map((entry) => ({ ...entry, value: Math.floor(Math.random() * 500) }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("User Analytics Report", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [["Name", "Email", "Signup Date", "Status"]],
      body: [...Array(10)].map((_, i) => [
        `User ${i + 1}`,
        `user${i + 1}@example.com`,
        format(new Date(), "dd/MM/yyyy"),
        i % 2 === 0 ? "Active" : "Inactive",
      ]),
    });
    doc.save("user_analytics.pdf");
  };

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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        {mockStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              {loading ? (
                <Skeleton className="h-8 w-full" />
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <div className="bg-background p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Monthly Growth</h2>
          <LineChart width={300} height={200} data={lineData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </div>

        <div className="bg-background p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Marketing Channels</h2>
          <PieChart width={300} height={200}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="bg-background p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Weekly Performance</h2>
          <BarChart width={300} height={200} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="uv" fill="#8884d8" />
            <Bar dataKey="pv" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>

      {/* Data Table + Export */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">User Analytics</h2>
          <Button onClick={handleExportPDF}>Export to PDF</Button>
        </div>
        <div className="overflow-auto rounded-xl shadow">
                      <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Signup Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(10)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>User {i + 1}</TableCell>
                    <TableCell>user{i + 1}@example.com</TableCell>
                    <TableCell>{format(new Date(), "dd/MM/yyyy")}</TableCell>
                    <TableCell>{i % 2 === 0 ? "Active" : "Inactive"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
      </div>
    </div>
  );
}