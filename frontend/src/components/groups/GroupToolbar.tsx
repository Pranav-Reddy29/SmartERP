"use client";

import { Search, Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface GroupToolbarProps {
  search: string;
  setSearch: (value: string) => void;
  onCreate: () => void;
}

export default function GroupToolbar({
  search,
  setSearch,
  onCreate,
}: GroupToolbarProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      {/* Search */}

      <div className="relative w-full md:max-w-sm">

        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search groups..."
          className="pl-10"
        />

      </div>

      {/* Create Button */}

      <Button
        onClick={onCreate}
        className="gap-2"
      >
        <Plus size={18} />

        Create Group
      </Button>

    </div>
  );
}