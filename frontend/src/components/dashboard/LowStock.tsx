"use client";

import {
  AlertTriangle,
} from "lucide-react";

const items = [
  {
    id: 1,
    item: "HP Laptop",
    stock: 2,
    unit: "PCS",
  },
  {
    id: 2,
    item: "Wireless Mouse",
    stock: 5,
    unit: "PCS",
  },
  {
    id: 3,
    item: "Mechanical Keyboard",
    stock: 1,
    unit: "PCS",
  },
  {
    id: 4,
    item: "USB Hub",
    stock: 3,
    unit: "PCS",
  },
];

export default function LowStock() {
  return (
    <div className="rounded-2xl border bg-white shadow-sm">

      <div className="border-b p-6">

        <h2 className="text-xl font-semibold">
          Low Stock Alerts
        </h2>

        <p className="text-sm text-gray-500">
          Inventory requiring attention
        </p>

      </div>

      <div className="divide-y">

        {items.map((item) => (

          <div
            key={item.id}
            className="flex items-center justify-between p-5 hover:bg-red-50 transition"
          >

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-red-100 p-3">

                <AlertTriangle
                  className="text-red-600"
                  size={20}
                />

              </div>

              <div>

                <h3 className="font-medium">
                  {item.item}
                </h3>

                <p className="text-sm text-gray-500">
                  Critical Stock
                </p>

              </div>

            </div>

            <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
              {item.stock} {item.unit}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}