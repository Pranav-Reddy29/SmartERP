"use client";

import { useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Sales } from "@/types/sales";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import SalesToolbar from "./SalesToolbar";
import SalesPagination from "./SalesPagination";
import { getSalesColumns } from "./SalesColumns";

interface SalesTableProps {
  data: Sales[];

  search: string;

  setSearch: (
    value: string
  ) => void;

  onCreate: () => void;

  onEdit: (
    sale: Sales
  ) => void;

  onDelete: (
    sale: Sales
  ) => void;
}

export default function SalesTable({
  data,
  search,
  setSearch,
  onCreate,
  onEdit,
  onDelete,
}: SalesTableProps) {

  const [pagination, setPagination] =
    useState({

      pageIndex: 0,

      pageSize: 10,

    });

  const columns: ColumnDef<Sales>[] =
    getSalesColumns({

      onEdit,

      onDelete,

    });

  const table =
    useReactTable({

      data,

      columns,

      state: {

        pagination,

      },

      onPaginationChange:
        setPagination,

      getCoreRowModel:
        getCoreRowModel(),

      getPaginationRowModel:
        getPaginationRowModel(),

    });

  return (

    <div className="space-y-4">

      <SalesToolbar

        search={search}

        setSearch={setSearch}

        onCreate={onCreate}

      />

      <div className="rounded-lg border">

        <Table>

          <TableHeader>

            {table
              .getHeaderGroups()
              .map(
                (
                  headerGroup
                ) => (

                  <TableRow
                    key={
                      headerGroup.id
                    }
                  >

                    {headerGroup.headers.map(
                      (
                        header
                      ) => (

                        <TableHead
                          key={
                            header.id
                          }
                        >

                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header
                                  .column
                                  .columnDef
                                  .header,
                                header.getContext()
                              )}

                        </TableHead>

                      )
                    )}

                  </TableRow>

                )
              )}

          </TableHeader>

          <TableBody>
                        {table.getRowModel().rows.length ? (

              table
                .getRowModel()
                .rows
                .map((row) => (

                  <TableRow
                    key={row.id}
                  >

                    {row
                      .getVisibleCells()
                      .map((cell) => (

                        <td
                          key={cell.id}
                          className="p-4"
                        >

                          {flexRender(
                            cell.column
                              .columnDef.cell,
                            cell.getContext()
                          )}

                        </td>

                      ))}

                  </TableRow>

                ))

            ) : (

              <TableRow>

                <td
                  colSpan={
                    columns.length
                  }
                  className="h-32 text-center text-muted-foreground"
                >

                  No sales vouchers found.

                </td>

              </TableRow>

            )}

          </TableBody>

        </Table>

      </div>

      <SalesPagination
        table={table}
      />

    </div>

  );

}