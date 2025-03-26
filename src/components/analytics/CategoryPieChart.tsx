"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
const COLORS = ["#4f46e5", "#818cf8", "#a5b4fc", "#c7d2fe", "#e0e7ff"];

export function CategoryPieChart({ data }: { data?: any }) {
  // Transform backend data to Recharts format
  const pieData = Object.entries(data?.amouunt?.sum || {}).map(
    ([name, value]) => ({ name, value: Math.abs(Number(value)) })
  );
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm h-96">
      <h2 className="text-xl font-semibold mb-4">Spending Categories</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey={"value"}
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={60}
            paddingAngle={5}
          >
            {pieData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
