"use client";

import {
  ShoppingCart,
  Receipt,
  Package,
  UserPlus,
} from "lucide-react";

const activities = [
  {
    title: "New Sales Invoice Created",
    description: "Invoice #1005",
    icon: Receipt,
    color: "bg-green-500",
    time: "5 min ago",
  },
  {
    title: "Purchase Voucher Added",
    description: "Purchase #501",
    icon: ShoppingCart,
    color: "bg-orange-500",
    time: "20 min ago",
  },
  {
    title: "Stock Updated",
    description: "HP Laptop (+5)",
    icon: Package,
    color: "bg-blue-600",
    time: "1 hour ago",
  },
  {
    title: "New Customer Added",
    description: "ABC Technologies",
    icon: UserPlus,
    color: "bg-purple-600",
    time: "3 hours ago",
  },
];

export default function ActivityTimeline() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold">
        Activity Timeline
      </h2>

      <p className="mb-8 text-sm text-gray-500">
        Latest activities in SmartERP
      </p>

      <div className="space-y-6">

        {activities.map((activity, index) => {

          const Icon = activity.icon;

          return (

            <div
              key={index}
              className="flex gap-4"
            >

              <div
                className={`${activity.color} flex h-12 w-12 items-center justify-center rounded-xl text-white`}
              >

                <Icon size={22} />

              </div>

              <div className="flex-1">

                <h3 className="font-semibold">
                  {activity.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {activity.description}
                </p>

              </div>

              <span className="text-xs text-gray-400">
                {activity.time}
              </span>

            </div>

          );

        })}

      </div>

    </div>
  );
}