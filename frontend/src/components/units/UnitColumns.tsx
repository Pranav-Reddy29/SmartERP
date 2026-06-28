"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Unit } from "@/types/unit";

import UnitRowActions from "./UnitRowActions";

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    onView?: (unit: Unit) => void;

    onEdit: (unit: Unit) => void;

    onDelete: (unit: Unit) => void;
  }
}

export const unitColumns: ColumnDef<Unit>[] = [
  {
    accessorKey: "name",

    header: "Unit Name",

    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.name}
      </span>
    ),
  },

  {
    accessorKey: "shortName",

    header: "Short Name",

    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.shortName}
      </span>
    ),
  },

  {
    accessorKey: "createdAt",

    header: "Created",

    cell: ({ row }) => (
      <span>
        {new Date(
          row.original.createdAt
        ).toLocaleDateString()}
      </span>
    ),
  },

  {
    id: "actions",

    header: "",

    enableSorting: false,

    cell: ({ row, table }) => (
      <UnitRowActions
        unit={row.original}
        onView={table.options.meta?.onView}
        onEdit={table.options.meta!.onEdit}
        onDelete={table.options.meta!.onDelete}
      />
    ),
  },
];