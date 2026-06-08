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
  { name: "Travel", value: 18 },
  { name: "Entertainment", value: 12 },
  { name: "Others", value: 10 },
];

const COLORS = [
  "#2563EB",
  "#10B981",
  "#8B5CF6",
  "#F59E0B",
  "#64748B",
];

export default function CategoryChart() {
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
        h-auto
      "
    >
      {/* Header */}

      <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
        Revenue by Category
      </h3>

      {/* Chart */}

      <div className="h-[140px] md:h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={60}
              paddingAngle={3}
              dataKey="value"
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

      {/* Legend */}

      <div className="space-y-3 mt-4">

        {data.map((item, index) => (
          <div
            key={item.name}
            className="
              flex
              items-center
              justify-between
              text-sm
            "
          >
            <div className="flex items-center gap-3">

              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{
                  backgroundColor: COLORS[index],
                }}
              />

              <span className="text-gray-700">
                {item.name}
              </span>

            </div>

            <span className="font-semibold text-gray-900">
              {item.value}%
            </span>

          </div>
        ))}

      </div>
    </div>
  );
}