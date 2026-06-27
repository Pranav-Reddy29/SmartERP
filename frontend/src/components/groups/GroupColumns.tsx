"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { LedgerGroup } from "@/types/group";

import GroupRowActions from "./GroupRowActions";

export const groupColumns: ColumnDef<LedgerGroup>[] = [
  {
    accessorKey: "name",

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc"
          )
        }
      >
        Group Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  {
    accessorKey: "nature",

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc"
          )
        }
      >
        Nature
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),

    cell: ({ row }) => (
      <Badge variant="secondary">
        {row.original.nature}
      </Badge>
    ),
  },

  {
    accessorKey: "parent",

    header: "Parent Group",

    cell: ({ row }) =>
      row.original.parent?.name ?? "-",
  },

  {
    accessorKey: "description",

    header: "Description",

    cell: ({ row }) =>
      row.original.description || "-",
  },

  {
    accessorKey: "children",

    header: "Sub Groups",

    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.children?.length ?? 0}
      </span>
    ),
  },

  {
    accessorKey: "createdAt",

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc"
          )
        }
      >
        Created
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),

    cell: ({ row }) =>
      new Date(
        row.original.createdAt
      ).toLocaleDateString(),
  },

  {
    id: "actions",

    header: "",

    enableSorting: false,

    cell: ({ row, table }) => (
      <GroupRowActions
        group={row.original}
        onView={(group) =>
          table.options.meta?.onView?.(group)
        }
        onEdit={(group) =>
          table.options.meta?.onEdit?.(group)
        }
        onDelete={(group) =>
          table.options.meta?.onDelete?.(group)
        }
      />
    ),
  },
];