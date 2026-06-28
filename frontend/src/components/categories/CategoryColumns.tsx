"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Category } from "@/types/category";

import CategoryRowActions from "./CategoryRowActions";

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    onView?: (category: Category) => void;
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
  }
}

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",

    header: "Category Name",

    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.name}
      </span>
    ),
  },

  {
    accessorKey: "description",

    header: "Description",

    cell: ({ row }) => (
      <span className="text-gray-600">
        {row.original.description || "-"}
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

      <CategoryRowActions

        category={row.original}

        onView={table.options.meta?.onView}

        onEdit={table.options.meta!.onEdit}

        onDelete={table.options.meta!.onDelete}

      />

    ),
  },
];