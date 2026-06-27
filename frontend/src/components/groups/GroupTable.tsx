"use client";

import { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { LedgerGroup } from "@/types/group";

import { groupColumns } from "./GroupColumns";

import GroupToolbar from "./GroupToolbar";

import GroupPagination from "./GroupPagination";

interface Props {
  data: LedgerGroup[];

  onView?: (group: LedgerGroup) => void;

  onEdit: (group: LedgerGroup) => void;

  onDelete: (group: LedgerGroup) => void;
}

export default function GroupTable({
  data,
  onView,
  onEdit,
  onDelete,
}: Props) {

  const [sorting, setSorting] =
    useState<SortingState>([]);

  const [globalFilter, setGlobalFilter] =
    useState("");

  const table = useReactTable({

    data,

    columns: groupColumns,

    state: {

      sorting,

      globalFilter,

    },

    meta: {

      onView,

      onEdit,

      onDelete,

    },

    onSortingChange: setSorting,

    onGlobalFilterChange:
      setGlobalFilter,

    getCoreRowModel:
      getCoreRowModel(),

    getSortedRowModel:
      getSortedRowModel(),

    getFilteredRowModel:
      getFilteredRowModel(),

    getPaginationRowModel:
      getPaginationRowModel(),

    initialState: {

      pagination: {

        pageSize: 10,

      },

    },

  });

  return (

    <div className="rounded-2xl border bg-white shadow-sm">

      <div className="p-6">

        <GroupToolbar

          search={globalFilter}

          setSearch={setGlobalFilter}

          onCreate={() => {

            console.log("Create Group");

          }}

        />

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="border-y bg-slate-100">

            {table
              .getHeaderGroups()
              .map((headerGroup) => (

                <tr key={headerGroup.id}>

                  {headerGroup.headers.map(
                    (header) => (

                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer select-none px-5 py-4 text-left font-semibold hover:bg-slate-200"
                      >

                        <div className="flex items-center gap-2">

                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}

                          {header.column.getIsSorted() ===
                            "asc" && (
                            <span>↑</span>
                          )}

                          {header.column.getIsSorted() ===
                            "desc" && (
                            <span>↓</span>
                          )}

                        </div>

                      </th>

                    )
                  )}

                </tr>

              ))}

          </thead>

          <tbody>
                      {table.getRowModel().rows.map((row) => (

            <tr
              key={row.id}
              className="border-b transition hover:bg-slate-50"
            >

              {row.getVisibleCells().map((cell) => (

                <td
                  key={cell.id}
                  className="px-5 py-4"
                >

                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}

                </td>

              ))}

            </tr>

          ))}

          {table.getRowModel().rows.length === 0 && (

            <tr>

              <td
                colSpan={groupColumns.length}
                className="py-16 text-center"
              >

                <div className="flex flex-col items-center justify-center gap-3">

                  <div className="rounded-full bg-slate-100 p-4">

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 17v-6h13M9 5v6h13M5 7h.01M5 17h.01"
                      />

                    </svg>

                  </div>

                  <div>

                    <h3 className="text-lg font-semibold">

                      No Groups Found

                    </h3>

                    <p className="mt-1 text-sm text-gray-500">

                      Create your first ledger group to get started.

                    </p>

                  </div>

                </div>

              </td>

            </tr>

          )}

          </tbody>

        </table>

      </div>

      <GroupPagination table={table} />

    </div>

  );

}