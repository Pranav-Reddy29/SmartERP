"use client";

import {
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "Sale",
    party: "ABC Traders",
    amount: "₹15,450",
    date: "Today",
    status: "Received",
  },
  {
    id: 2,
    type: "Purchase",
    party: "XYZ Suppliers",
    amount: "₹8,200",
    date: "Today",
    status: "Paid",
  },
  {
    id: 3,
    type: "Sale",
    party: "Sai Enterprises",
    amount: "₹21,350",
    date: "Yesterday",
    status: "Pending",
  },
  {
    id: 4,
    type: "Purchase",
    party: "Reddy Distributors",
    amount: "₹12,100",
    date: "Yesterday",
    status: "Paid",
  },
];

export default function RecentTransactions() {
  return (
    <div className="rounded-2xl border bg-white shadow-sm">

      <div className="flex items-center justify-between border-b p-6">

        <div>

          <h2 className="text-xl font-semibold">
            Recent Transactions
          </h2>

          <p className="text-sm text-gray-500">
            Latest sales & purchase vouchers
          </p>

        </div>

      </div>

      <div className="divide-y">

        {transactions.map((transaction) => (

          <div
            key={transaction.id}
            className="flex items-center justify-between p-5 hover:bg-slate-50 transition"
          >

            <div className="flex items-center gap-4">

              <div
                className={`rounded-xl p-3 ${
                  transaction.type === "Sale"
                    ? "bg-green-100"
                    : "bg-orange-100"
                }`}
              >

                {transaction.type === "Sale" ? (
                  <ArrowUpRight className="text-green-600" />
                ) : (
                  <ArrowDownLeft className="text-orange-600" />
                )}

              </div>

              <div>

                <h3 className="font-medium">
                  {transaction.party}
                </h3>

                <p className="text-sm text-gray-500">
                  {transaction.type}
                </p>

              </div>

            </div>

            <div className="text-right">

              <h3 className="font-semibold">
                {transaction.amount}
              </h3>

              <p className="text-sm text-gray-500">
                {transaction.date}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}