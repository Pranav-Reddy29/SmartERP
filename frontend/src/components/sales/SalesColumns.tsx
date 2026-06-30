"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Sales } from "@/types/sales";

import SalesRowActions from "./SalesRowActions";

interface SalesColumnsProps {
  onEdit: (sale: Sales) => void;

  onDelete: (sale: Sales) => void;
}

export const getSalesColumns = ({
  onEdit,
  onDelete,
}: SalesColumnsProps): ColumnDef<Sales>[] => [
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

    cell: ({ row }) =>
      new Date(
        row.original.voucherDate
      ).toLocaleDateString("en-IN"),
  },

  {
    accessorKey: "customer",

    header: "Customer",

    cell: ({ row }) =>
      row.original.customer
        .ledgerName,
  },

  {
    accessorKey: "items",

    header: "Items",

    cell: ({ row }) =>
      row.original.items.length,
  },

  {
    accessorKey: "grandTotal",

    header: "Grand Total",

    cell: ({ row }) => (
      <span className="font-semibold">
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

    cell: ({ row }) => (

      <SalesRowActions
        sale={row.original}
        onEdit={onEdit}
        onDelete={onDelete}
      />

    ),
  },
];