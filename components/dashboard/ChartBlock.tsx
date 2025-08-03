"use client";

import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface ChartData {
  name: string;
  value?: number;
  uv?: number;
  pv?: number;
}

interface ChartBlockProps {
  title: string;
  type: "line" | "bar" | "pie";
  data: ChartData[];
  loading: boolean;
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57"];

export function ChartBlock({ title, type, data, loading = false }: ChartBlockProps) {
  if (loading) {
    return (
      <div className="bg-background p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  return (
    <div className="bg-background p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {type === "line" && (
        <LineChart width={300} height={200} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      )}
      {type === "pie" && (
        <PieChart width={300} height={200}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      )}
      {type === "bar" && (
        <BarChart width={300} height={200} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="uv" fill="#8884d8" />
          <Bar dataKey="pv" fill="#82ca9d" />
        </BarChart>
      )}
    </div>
  );
}