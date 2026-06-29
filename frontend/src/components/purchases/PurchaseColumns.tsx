"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Purchase } from "@/types/purchase";

import PurchaseRowActions from "./PurchaseRowActions";

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    onView?: (purchase: Purchase) => void;

    onEdit: (purchase: Purchase) => void;

    onDelete: (purchase: Purchase) => void;
  }
}

export const purchaseColumns: ColumnDef<Purchase>[] = [
  {
    accessorKey: "voucherNumber",

    header: "Voucher No",

    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.voucherNumber}
      </span>
    ),
  },

  {
    accessorKey: "voucherDate",

    header: "Date",

    cell: ({ row }) => (
      <span>
        {new Date(
          row.original.voucherDate
        ).toLocaleDateString()}
      </span>
    ),
  },

  {
    accessorKey: "supplier",

    header: "Supplier",

    cell: ({ row }) => (
      <span>
        {row.original.supplier?.ledgerName}
      </span>
    ),
  },

  {
    accessorKey: "items",

    header: "Items",

    cell: ({ row }) => (
      <span>
        {row.original.items.length}
      </span>
    ),
  },

  {
    accessorKey: "grandTotal",

    header: "Grand Total",

    cell: ({ row }) => (
      <span className="font-medium">
        ₹
        {row.original.grandTotal.toLocaleString(
          "en-IN",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )}
      </span>
    ),
  },

  {
    id: "actions",

    header: "",

    enableSorting: false,

    cell: ({ row, table }) => (
      <PurchaseRowActions
        purchase={row.original}
        onView={table.options.meta?.onView}
        onEdit={table.options.meta!.onEdit}
        onDelete={table.options.meta!.onDelete}
      />
    ),
  },
];