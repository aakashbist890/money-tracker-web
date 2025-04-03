"use client";
import { SpendingChart } from "@/components/analytics/SpendingChart";
import { CategoryPicker } from "@/components/transactions/CategoryPicker";
import { useState } from "react";

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const spendingData = [
    { month: "January", amount: 500 },
    { month: "February", amount: 700 },
    { month: "March", amount: 600 },
    { month: "April", amount: 800 },
    { month: "May", amount: 900 },
  ];
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grig-cols-3 gap-4">
        <div className="md:col-span-2">
          <SpendingChart data={spendingData} />
        </div>
        <div className="space-y-4">
          <CategoryPicker onSelect={selectedCategory} />
          <p>Selected: {selectedCategory}</p>
        </div>
      </div>
    </div>
  );
}
