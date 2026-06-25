"use client";

import {
  TrendingUp,
  IndianRupee,
} from "lucide-react";

const monthlySales = [
  { month: "Jan", value: 45 },
  { month: "Feb", value: 60 },
  { month: "Mar", value: 52 },
  { month: "Apr", value: 80 },
  { month: "May", value: 95 },
  { month: "Jun", value: 72 },
];

export default function SalesAnalytics() {
  const maxValue = Math.max(...monthlySales.map((m) => m.value));

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold">
            Sales Analytics
          </h2>

          <p className="text-sm text-gray-500">
            Last 6 Months Performance
          </p>

        </div>

        <div className="rounded-xl bg-green-100 p-3">

          <TrendingUp className="text-green-600" />

        </div>

      </div>

      <div className="mt-8 flex h-64 items-end justify-between gap-3">

        {monthlySales.map((item) => (

          <div
            key={item.month}
            className="flex flex-1 flex-col items-center"
          >

            <div
              className="w-full rounded-t-xl bg-blue-600 transition-all duration-500 hover:bg-blue-700"
              style={{
                height: `${(item.value / maxValue) * 180}px`,
              }}
            />

            <span className="mt-3 text-sm font-medium">
              {item.month}
            </span>

          </div>

        ))}

      </div>

      <div className="mt-6 flex items-center gap-3 rounded-xl bg-green-50 p-4">

        <IndianRupee className="text-green-600" />

        <div>

          <h4 className="font-semibold">
            ₹8,45,620
          </h4>

          <p className="text-sm text-gray-500">
            Total Sales This Year
          </p>

        </div>

      </div>

    </div>
  );
}