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

import { Unit } from "@/types/unit";

import { unitColumns } from "./UnitColumns";

import UnitToolbar from "./UnitToolbar";

import UnitPagination from "./UnitPagination";

interface Props {
  data: Unit[];

  search: string;

  setSearch: (value: string) => void;

  onCreate: () => void;

  onView?: (unit: Unit) => void;

  onEdit: (unit: Unit) => void;

  onDelete: (unit: Unit) => void;
}

export default function UnitTable({
  data,
  search,
  setSearch,
  onCreate,
  onView,
  onEdit,
  onDelete,
}: Props) {

  const [sorting, setSorting] =
    useState<SortingState>([]);

  const globalFilter = search;

  const setGlobalFilter = setSearch;

  const table = useReactTable({

    data,

    columns: unitColumns,

    state: {

      sorting,

      globalFilter,

    },

    meta: {

      onView,

      onEdit,

      onDelete,

    },

    onSortingChange:
      setSorting,

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

        <UnitToolbar

          search={search}

          setSearch={setSearch}

          onCreate={onCreate}

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
                colSpan={unitColumns.length}
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
                        d="M5 12h14M12 5v14"
                      />

                    </svg>

                  </div>

                  <div>

                    <h3 className="text-lg font-semibold">

                      No Units Found

                    </h3>

                    <p className="mt-1 text-sm text-gray-500">

                      Create your first unit to get started.

                    </p>

                  </div>

                </div>

              </td>

            </tr>

          )}

          </tbody>

        </table>

      </div>

      <UnitPagination table={table} />

    </div>

  );

}