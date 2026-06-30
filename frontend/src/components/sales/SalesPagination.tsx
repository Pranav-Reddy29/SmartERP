"use client";

import { Table } from "@tanstack/react-table";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface SalesPaginationProps<TData> {
  table: Table<TData>;
}

export default function SalesPagination<TData>({
  table,
}: SalesPaginationProps<TData>) {

  return (

    <div className="flex items-center justify-between px-2 py-4">

      {/* Page Info */}

      <div className="text-sm text-muted-foreground">

        Page{" "}

        <strong>

          {table.getState().pagination.pageIndex + 1}

        </strong>

        {" "}of{" "}

        <strong>

          {table.getPageCount() || 1}

        </strong>

      </div>

      {/* Navigation */}

      <div className="flex items-center space-x-2">

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            table.setPageIndex(0)
          }
          disabled={
            !table.getCanPreviousPage()
          }
        >

          <ChevronsLeft className="h-4 w-4" />

        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            table.previousPage()
          }
          disabled={
            !table.getCanPreviousPage()
          }
        >

          <ChevronLeft className="h-4 w-4" />

        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            table.nextPage()
          }
          disabled={
            !table.getCanNextPage()
          }
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
          disabled={
            !table.getCanNextPage()
          }
        >

          <ChevronsRight className="h-4 w-4" />

        </Button>

      </div>

    </div>

  );

}