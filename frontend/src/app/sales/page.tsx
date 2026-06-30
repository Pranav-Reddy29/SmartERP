"use client";

import { useState } from "react";

import { Sales } from "@/types/sales";

import { useSales } from "@/hooks/useSales";

import SalesTable from "@/components/sales/SalesTable";
import SalesTableSkeleton from "@/components/sales/SalesTableSkeleton";

import CreateSalesDialog from "@/components/sales/CreateSalesDialog";
import EditSalesDialog from "@/components/sales/EditSalesDialog";
import DeleteSalesDialog from "@/components/sales/DeleteSalesDialog";

import useKeyboardShortcuts from "@/hooks/useKeyboardShortcuts";
import useAuth from "@/hooks/useAuth";

export default function SalesPage() {

  /**
   * Replace this with your
   * selected company later.
   */

  const { company } = useAuth();

  const companyId = company?.id ?? "";

  const [search, setSearch] =
    useState("");

  const [createOpen, setCreateOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedSale, setSelectedSale] =
    useState<Sales | null>(null);

  const {
    data,
    isLoading,
    isError,
  } = useSales(companyId);

  const sales =
    data?.sales ?? [];

  /**
   * Client-side search
   */

  const filteredSales =
    sales.filter((sale) => {

      const searchValue =
        search.toLowerCase();

      return (

        sale.voucherNumber
          .toLowerCase()
          .includes(searchValue)

        ||

        sale.customer.ledgerName
          .toLowerCase()
          .includes(searchValue)

      );

    });

  /**
   * Keyboard Shortcut
   *
   * If your hook doesn't support
   * onCreateSales yet,
   * simply remove this block.
   */

  useKeyboardShortcuts({

    onCreateSales: () =>
      setCreateOpen(true),

  });

  if (isLoading) {

    return (

      <div className="p-6">

        <SalesTableSkeleton />

      </div>

    );

  }

  if (isError) {

    return (

      <div className="flex h-[70vh] items-center justify-center">

        <div className="text-center">

          <h2 className="text-2xl font-bold">

            Failed to load sales vouchers

          </h2>

          <p className="mt-2 text-gray-500">

            Please try again later.

          </p>

        </div>

      </div>

    );

  }

  return (

    <div className="space-y-6 p-6">

      <div>

        <h1 className="text-3xl font-bold">

          Sales Vouchers

        </h1>

        <p className="text-gray-500">

          Manage all sales vouchers.

        </p>

      </div>

      <SalesTable

        data={filteredSales}

        search={search}

        setSearch={setSearch}

        onCreate={() =>
          setCreateOpen(true)
        }

        onEdit={(sale) => {

          setSelectedSale(
            sale
          );

          setEditOpen(true);

        }}

        onDelete={(sale) => {

          setSelectedSale(
            sale
          );

          setDeleteOpen(true);

        }}

      />

      <CreateSalesDialog

        open={createOpen}

        onOpenChange={setCreateOpen}

        companyId={companyId}

      />

      <EditSalesDialog

        open={editOpen}

        onOpenChange={setEditOpen}

        sales={selectedSale}

        companyId={companyId}

      />

      <DeleteSalesDialog

        open={deleteOpen}

        onOpenChange={setDeleteOpen}

        sales={selectedSale}

      />

    </div>

  );

}