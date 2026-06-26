"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

interface LedgerPaginationProps<TData> {
  table: Table<TData>;
}

export default function LedgerPagination<TData>({
  table,
}: LedgerPaginationProps<TData>) {
  return (
    <div className="flex flex-col gap-4 border-t bg-white px-6 py-4 md:flex-row md:items-center md:justify-between">

      <div className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-semibold">
          {table.getRowModel().rows.length}
        </span>{" "}
        of{" "}
        <span className="font-semibold">
          {table.getFilteredRowModel().rows.length}
        </span>{" "}
        entries
      </div>

      <div className="flex items-center gap-2">

        <Button
          variant="outline"
          size="icon"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft size={16} />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft size={16} />
        </Button>

        <div className="rounded-lg border px-4 py-2 text-sm font-medium">

          Page{" "}
          <span className="font-bold">
            {table.getState().pagination.pageIndex + 1}
          </span>{" "}
          of{" "}
          <span className="font-bold">
            {table.getPageCount()}
          </span>

        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight size={16} />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            table.setPageIndex(
              table.getPageCount() - 1
            )
          }
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight size={16} />
        </Button>

      </div>

      <div className="flex items-center gap-3">

        <span className="text-sm text-gray-500">
          Rows per page
        </span>

        <select
          title="Select rows per page"
          value={table.getState().pagination.pageSize}
          onChange={(e) =>
            table.setPageSize(
              Number(e.target.value)
            )
          }
          className="rounded-lg border px-3 py-2"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>

      </div>

    </div>
  );
}