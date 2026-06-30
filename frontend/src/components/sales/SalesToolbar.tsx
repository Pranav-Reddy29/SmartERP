"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Plus, Search } from "lucide-react";

interface SalesToolbarProps {
  search: string;

  setSearch: (
    value: string
  ) => void;

  onCreate: () => void;
}

export default function SalesToolbar({
  search,
  setSearch,
  onCreate,
}: SalesToolbarProps) {

  return (

    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      {/* Search */}

      <div className="relative w-full md:max-w-sm">

        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search voucher or customer..."
          className="pl-9"
        />

      </div>

      {/* Actions */}

      <div className="flex items-center gap-3">

        <span className="hidden text-sm text-muted-foreground md:block">

          Alt + Shift + S

        </span>

        <Button
          onClick={onCreate}
        >

          <Plus className="mr-2 h-4 w-4" />

          Create Sales

        </Button>

      </div>

    </div>

  );

}