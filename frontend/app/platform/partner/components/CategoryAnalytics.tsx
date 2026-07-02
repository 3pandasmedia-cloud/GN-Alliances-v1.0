"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Dining", value: 35 },
  { name: "Retail", value: 25 },
  { name: "Travel", value: 20 },
  { name: "Entertainment", value: 12 },
  { name: "Others", value: 8 },
];

const COLORS = [
  "#2563EB",
  "#10B981",
  "#8B5CF6",
  "#F59E0B",
  "#64748B",
];

export default function CategoryAnalytics() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

      <h3 className="text-xl font-bold mb-6">
        Revenue Categories
      </h3>

      <div className="h-[250px]">

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={55}
              outerRadius={90}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}