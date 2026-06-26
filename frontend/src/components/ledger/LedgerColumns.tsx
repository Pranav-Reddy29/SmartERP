"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Ledger } from "@/types/ledger";

import LedgerRowActions from "./LedgerRowActions";

export const ledgerColumns: ColumnDef<Ledger>[] = [

  {
    accessorKey: "ledgerName",

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc"
          )
        }
      >
        Ledger Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  {
    accessorKey: "ledgerType",

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc"
          )
        }
      >
        Type
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  {
    accessorKey: "group",

    header: "Group",

    cell: ({ row }) => (
      row.original.group?.name ?? "-"
    ),
  },

  {
    accessorKey: "openingBalance",

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc"
          )
        }
      >
        Opening Balance
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),

    cell: ({ row }) => (
      <span className="font-medium">
        ₹{" "}
        {row.original.openingBalance.toLocaleString(
          "en-IN"
        )}
      </span>
    ),
  },

  {
    accessorKey: "balanceType",

    header: "Balance",

    cell: ({ row }) => (

      <Badge
        variant={
          row.original.balanceType === "Debit"
            ? "default"
            : "secondary"
        }
      >
        {row.original.balanceType}

      </Badge>

    ),
  },

  {
    accessorKey: "phone",

    header: "Phone",

    cell: ({ row }) => (
      row.original.phone || "-"
    ),
  },

  {
    accessorKey: "isActive",

    header: "Status",

    cell: ({ row }) => (

      <Badge
        variant={
          row.original.isActive
            ? "default"
            : "destructive"
        }
      >
        {row.original.isActive
          ? "Active"
          : "Inactive"}

      </Badge>

    ),
  },

  {
    id: "actions",

    header: "",

    enableSorting: false,

    cell: ({ row, table }) => (

      <LedgerRowActions

        ledger={row.original}

        onView={(ledger) => {
          table.options.meta?.onView?.(ledger);
        }}

        onEdit={(ledger) => {
          table.options.meta?.onEdit?.(ledger);
        }}

        onDelete={(ledger) => {
          table.options.meta?.onDelete?.(ledger);
        }}

      />

    ),
  },

];