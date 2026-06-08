"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", revenue: 120000 },
  { month: "Feb", revenue: 180000 },
  { month: "Mar", revenue: 220000 },
  { month: "Apr", revenue: 280000 },
  { month: "May", revenue: 350000 },
  { month: "Jun", revenue: 420000 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm h-[420px]">

      <h3 className="text-xl font-bold mb-6">
        Revenue Trend
      </h3>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563EB"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}