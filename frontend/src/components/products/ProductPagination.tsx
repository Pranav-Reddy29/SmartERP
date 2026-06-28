"use client";

import { Table } from "@tanstack/react-table";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Product } from "@/types/product";

interface Props {
  table: Table<Product>;
}

export default function ProductPagination({
  table,
}: Props) {
  return (
    <div className="flex flex-col gap-4 border-t px-6 py-4 lg:flex-row lg:items-center lg:justify-between">

      {/* Page Info */}

      <div className="text-sm text-muted-foreground">

        Showing{" "}

        <span className="font-medium">
          {table.getFilteredRowModel().rows.length === 0
            ? 0
            : table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
              1}
        </span>

        {" "}to{" "}

        <span className="font-medium">
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}
        </span>

        {" "}of{" "}

        <span className="font-medium">
          {table.getFilteredRowModel().rows.length}
        </span>

        {" "}products

      </div>

      {/* Controls */}

      <div className="flex items-center gap-2">

        <Button
          variant="outline"
          size="icon"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <span className="px-3 text-sm font-medium">

          Page{" "}

          {table.getState().pagination.pageIndex + 1}

          {" "}of{" "}

          {table.getPageCount()}

        </span>

        <Button
          variant="outline"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="h-4 w-4" />
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
          <ChevronsRight className="h-4 w-4" />
        </Button>

      </div>

    </div>
  );
}