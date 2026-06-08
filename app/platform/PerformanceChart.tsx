"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { name: "May 1", revenue: 1200, orders: 1800 },
  { name: "May 6", revenue: 1500, orders: 2200 },
  { name: "May 11", revenue: 2100, orders: 2400 },
  { name: "May 16", revenue: 2600, orders: 2800 },
  { name: "May 21", revenue: 2300, orders: 3000 },
  { name: "May 26", revenue: 3400, orders: 2500 },
  { name: "May 31", revenue: 3100, orders: 2900 },
];

export default function PerformanceChart() {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        p-4
        md:p-6
        border
        border-gray-100
        shadow-sm
        h-[320px]
        md:h-[420px]
      "
    >

      {/* Header */}

      <div className="mb-4 md:mb-6">

        <h3 className="text-lg md:text-xl font-bold">
          Performance Overview
        </h3>

        <p className="text-gray-500 text-sm mt-1">
          Campaign performance across the month
        </p>

      </div>

      {/* Legend */}

      <div className="flex gap-6 mb-4 text-sm">

        <div className="flex items-center gap-2">

          <div className="w-3 h-3 rounded-full bg-blue-600" />

          <span>Revenue</span>

        </div>

        <div className="flex items-center gap-2">

          <div className="w-3 h-3 rounded-full bg-green-500" />

          <span>Orders</span>

        </div>

      </div>

      {/* Chart */}

      <ResponsiveContainer width="100%" height="75%">

        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: -20,
            bottom: 5,
          }}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            tick={{ fontSize: 12 }}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={3}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="orders"
            stroke="#10b981"
            strokeWidth={3}
            dot={false}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}