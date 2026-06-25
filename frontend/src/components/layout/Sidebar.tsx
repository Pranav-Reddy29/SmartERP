"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Building2,
  Users,
  Boxes,
  Package,
  ShoppingCart,
  Receipt,
  BarChart3,
  Settings,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Companies",
    href: "/company",
    icon: Building2,
  },
  {
    title: "Ledgers",
    href: "/ledger",
    icon: Users,
  },
  {
    title: "Groups",
    href: "/groups",
    icon: Boxes,
  },
  {
    title: "Stock Items",
    href: "/stock",
    icon: Package,
  },
  {
    title: "Purchase",
    href: "/purchase",
    icon: ShoppingCart,
  },
  {
    title: "Sales",
    href: "/sales",
    icon: Receipt,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen bg-slate-950 text-white border-r border-slate-800 flex flex-col">
      <div className="h-20 flex items-center px-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold">SmartERP</h1>
          <p className="text-xs text-slate-400">
            Billing & Inventory
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`mb-2 flex items-center justify-between rounded-xl px-4 py-3 transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800 text-slate-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} />
                <span>{item.title}</span>
              </div>

              <ChevronRight size={16} />
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-5">
        <p className="text-sm text-slate-400">
          SmartERP v1.0
        </p>
      </div>
    </aside>
  );
}