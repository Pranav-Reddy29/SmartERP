"use client";

import { Search, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  search: string;

  setSearch: (value: string) => void;

  onCreate: () => void;
}

export default function ProductToolbar({
  search,
  setSearch,
  onCreate,
}: Props) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      {/* Search */}

      <div className="relative w-full lg:max-w-sm">

        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

      </div>

      {/* Create Button */}

      <Button
        onClick={onCreate}
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />

        Create Product

      </Button>

    </div>
  );
}