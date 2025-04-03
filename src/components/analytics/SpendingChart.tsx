"use client";

import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/16/solid";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface MonthlyInsights {
  amount: {
    sum: Record<string, number>;
  };
}

interface SpendingChartData {
  monthly_insights?: MonthlyInsights;
}

export function SpendingChart({ data }: { data?: any }) {
  // transform backend data to Recharts format
  const chartData = Object.entries(
    data?.monthly_insights?.amount?.sum || {}
  ).map(([month, amount]) => ({
    month: month.slice(0, 7),
    income:
      (data?.monthly_insights?.amount?.sum?.[month] ?? 0) > 0
        ? data?.monthly_insights?.amount?.sum?.[month]
        : 0,
    expense:
      (data?.monthly_insights?.amount?.sum?.[month] ?? 0) < 0
        ? Math.abs(data?.monthly_insights?.amount?.sum?.[month] ?? 0)
        : 0,
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm h-96">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <ArrowUpIcon className="w-5 h-5 text-green-500" />
        <ArrowDownIcon className="w-5 h-5 text-red-500" />
        Monthly Cash Flow
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="#4ade80" name="Income" />
          <Bar dataKey="expense" fill="#f87171" name="Expense" />
        </BarChart>
      </ResponsiveContainer>
      <h1>Spending Chart</h1>
    </div>
  );
}
