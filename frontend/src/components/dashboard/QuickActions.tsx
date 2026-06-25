"use client";

import {
  UserPlus,
  PackagePlus,
  ShoppingCart,
  Receipt,
  FileBarChart,
  Building2,
} from "lucide-react";

const actions = [
  {
    title: "New Customer",
    icon: UserPlus,
    color: "bg-blue-600",
  },
  {
    title: "New Supplier",
    icon: Building2,
    color: "bg-purple-600",
  },
  {
    title: "New Stock Item",
    icon: PackagePlus,
    color: "bg-emerald-600",
  },
  {
    title: "Purchase Voucher",
    icon: ShoppingCart,
    color: "bg-orange-500",
  },
  {
    title: "Sales Voucher",
    icon: Receipt,
    color: "bg-green-600",
  },
  {
    title: "View Reports",
    icon: FileBarChart,
    color: "bg-slate-800",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3">

        {actions.map((action) => {

          const Icon = action.icon;

          return (

            <button
              key={action.title}
              className="rounded-2xl border p-5 transition-all hover:-translate-y-1 hover:shadow-lg"
            >

              <div
                className={`${action.color} mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-white`}
              >

                <Icon size={28} />

              </div>

              <p className="mt-4 font-medium">
                {action.title}
              </p>

            </button>

          );

        })}

      </div>

    </div>
  );
}