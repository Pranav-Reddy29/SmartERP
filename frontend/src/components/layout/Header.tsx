"use client";

import {
  Bell,
  Search,
  Moon,
} from "lucide-react";

import { useProfile } from "@/hooks/useProfile";

export default function Header() {
  const { data, isLoading } = useProfile();

  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-3.5 text-gray-400"
        />

        <input
          placeholder="Search..."
          className="h-11 w-96 rounded-xl border pl-11 pr-5 outline-none focus:border-blue-500"
        />

      </div>

      <div className="flex items-center gap-6">

        <button className="rounded-xl p-2 hover:bg-gray-100">

          <Moon size={20} />

        </button>

        <button className="rounded-xl p-2 hover:bg-gray-100">

          <Bell size={20} />

        </button>

        <div className="text-right">

          <h3 className="font-semibold">

            {isLoading
              ? "Loading..."
              : data?.user?.name ??
                "Administrator"}

          </h3>

          <p className="text-sm text-gray-500">

            {isLoading
              ? ""
              : data?.user?.email ??
                "admin@smarterp.com"}

          </p>

        </div>

        <img
          src={`https://ui-avatars.com/api/?name=${
            data?.user?.name ?? "Admin"
          }&background=2563eb&color=fff`}
          alt="Avatar"
          className="h-11 w-11 rounded-full"
        />

      </div>

    </header>
  );
}