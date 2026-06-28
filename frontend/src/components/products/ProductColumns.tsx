"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Product } from "@/types/product";

import ProductRowActions from "./ProductRowActions";

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    onView?: (product: Product) => void;

    onEdit: (product: Product) => void;

    onDelete: (product: Product) => void;
  }
}

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",

    header: "Product",

    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.name}
      </span>
    ),
  },

  {
    accessorKey: "sku",

    header: "SKU",

    cell: ({ row }) => (
      <span>
        {row.original.sku}
      </span>
    ),
  },

  {
    accessorKey: "category",

    header: "Category",

    cell: ({ row }) => (
      <span>
        {row.original.category?.name}
      </span>
    ),
  },

  {
    accessorKey: "unit",

    header: "Unit",

    cell: ({ row }) => (
      <span>
        {row.original.unit?.shortName}
      </span>
    ),
  },

  {
    accessorKey: "sellingPrice",

    header: "Selling Price",

    cell: ({ row }) => (
      <span className="font-medium">
        ₹
        {row.original.sellingPrice.toLocaleString()}
      </span>
    ),
  },

  {
    accessorKey: "openingStock",

    header: "Stock",

    cell: ({ row }) => (
      <span>
        {row.original.openingStock}
      </span>
    ),
  },

  {
    accessorKey: "gstRate",

    header: "GST",

    cell: ({ row }) => (
      <span>
        {row.original.gstRate}%
      </span>
    ),
  },

  {
    id: "actions",

    header: "",

    enableSorting: false,

    cell: ({ row, table }) => (
      <ProductRowActions
        product={row.original}
        onView={table.options.meta?.onView}
        onEdit={table.options.meta!.onEdit}
        onDelete={table.options.meta!.onDelete}
      />
    ),
  },
];