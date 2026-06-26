"use client";

import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LedgerToolbarProps {
  search: string;
  setSearch: (value: string) => void;
  onCreate: () => void;
}

export default function LedgerToolbar({
  search,
  setSearch,
  onCreate,
}: LedgerToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <div className="relative w-full md:w-96">

        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search Ledger..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-11 w-full rounded-xl border pl-10 pr-4 outline-none focus:border-blue-600"
        />

      </div>

      <Button
        onClick={onCreate}
        className="gap-2"
      >
        <Plus size={18} />
        Create Ledger
      </Button>

    </div>
  );
}