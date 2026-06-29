"use client";

import { useState } from "react";

import { Purchase } from "@/types/purchase";

import { usePurchases } from "@/hooks/usePurchase";

import PurchaseTable from "@/components/purchases/PurchaseTable";
import PurchaseTableSkeleton from "@/components/purchases/PurchaseTableSkeleton";

import CreatePurchaseDialog from "@/components/purchases/CreatePurchaseDialog";
import EditPurchaseDialog from "@/components/purchases/EditPurchaseDialog";
import DeletePurchaseDialog from "@/components/purchases/DeletePurchaseDialog";

import useKeyboardShortcuts from "@/hooks/useKeyboardShortcuts";
import useAuth from "@/hooks/useAuth";

export default function PurchasesPage() {

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

  const [selectedPurchase, setSelectedPurchase] =
    useState<Purchase | null>(null);

  const {
    data,
    isLoading,
    isError,
  } = usePurchases(companyId);

  const purchases =
    data?.purchases ?? [];

  /**
   * Client-side search
   */

  const filteredPurchases =
    purchases.filter((purchase) => {

      const searchValue =
        search.toLowerCase();

      return (

        purchase.voucherNumber
          .toLowerCase()
          .includes(searchValue)

        ||

        purchase.supplier.ledgerName
          .toLowerCase()
          .includes(searchValue)

      );

    });

  useKeyboardShortcuts({

    onCreatePurchase: () =>
      setCreateOpen(true),

  });

  if (isLoading) {

    return (

      <div className="p-6">

        <PurchaseTableSkeleton />

      </div>

    );

  }

  if (isError) {

    return (

      <div className="flex h-[70vh] items-center justify-center">

        <div className="text-center">

          <h2 className="text-2xl font-bold">

            Failed to load purchases

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

          Purchase Vouchers

        </h1>

        <p className="text-gray-500">

          Manage all purchase vouchers.

        </p>

      </div>

      <PurchaseTable

        data={filteredPurchases}

        search={search}

        setSearch={setSearch}

        onCreate={() =>
          setCreateOpen(true)
        }

        onEdit={(purchase) => {

          setSelectedPurchase(
            purchase
          );

          setEditOpen(true);

        }}

        onDelete={(purchase) => {

          setSelectedPurchase(
            purchase
          );

          setDeleteOpen(true);

        }}

      />

      <CreatePurchaseDialog

        open={createOpen}

        onOpenChange={setCreateOpen}

        companyId={companyId}

      />

      <EditPurchaseDialog

        open={editOpen}

        onOpenChange={setEditOpen}

        purchase={selectedPurchase}

        companyId={companyId}

      />

      <DeletePurchaseDialog

        open={deleteOpen}

        onOpenChange={setDeleteOpen}

        purchase={selectedPurchase}

      />

    </div>

  );

}