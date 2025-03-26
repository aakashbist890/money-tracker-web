"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

type Category = {
  id: number;
  name: string;
  color: string;
};

export function CategoryPicker({
  selectedCategory,
  onSelect,
}: {
  selectedCategory?: number;
  onSelect: (categoryId: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("/api/categories");
      return res.data;
    },
  });
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex itema-center gap-2 w-full p-2 border rounded-lg"
      >
        {selectedCategory ? (
          <>
            <div
              className="w-4 h-4 rounded-full"
              style={{
                backgroundColor: categories?.find(
                  (c: Category) => c.id === selectedCategory
                )?.color,
              }}
            />
            {categories?.find((c: Category) => c.id === selectedCategory)?.name}
          </>
        ) : (
          "Select Category"
        )}
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
          {categories?.map((category: Category) => {
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  onSelect(category.id);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 w-full p-2 hover:bg-gray-100"
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                {category.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
