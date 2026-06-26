"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";
import CompanySwitcher from "@/components/dashboard/CompanySwitcher";

import LedgerTable from "@/components/ledger/LedgerTable";
import LedgerTableSkeleton from "@/components/ledger/LedgerTableSkeleton";

import CreateLedgerDialog from "@/components/ledger/CreateLedgerDialog";
import EditLedgerDialog from "@/components/ledger/EditLedgerDialog";
import DeleteLedgerDialog from "@/components/ledger/DeleteLedgerDialog";

import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

import { Ledger } from "@/types/ledger";

import { useLedgers } from "@/hooks/useLedger";
import useKeyboardShortcuts from "@/hooks/useKeyboardShortcuts";

import { useAuthStore } from "@/store/auth.store";

export default function LedgerPage() {

  /**
   * TODO:
   * Replace this with the selected company
   * from Company Switcher on Day 7.
   */
  const companyId = "YOUR_COMPANY_ID";

  const router = useRouter();

  const logout = useAuthStore(
    (state) => state.logout
  );

  const {
    data,
    isLoading,
  } = useLedgers(companyId);

  const [createOpen, setCreateOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedLedger, setSelectedLedger] =
    useState<Ledger | null>(null);

  useKeyboardShortcuts({

    onCreateLedger: () =>
      setCreateOpen(true),

    onEditLedger: () => {

      if (selectedLedger) {

        setEditOpen(true);

      }

    },

    onHome: () => {

      router.push("/dashboard");

    },

    onLogout: () => {

      logout();

      router.push("/login");

    },

  });

  if (isLoading) {

    return (

      <DashboardLayout>

        <LedgerTableSkeleton />

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* Header */}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h1 className="text-4xl font-bold">

              Ledger Management

            </h1>

            <p className="mt-2 text-muted-foreground">

              Create, update and manage all business ledgers.

            </p>

          </div>

          <CompanySwitcher />

        </div>

        {/* Top Actions */}

        <div className="flex justify-end">

          <Button
            onClick={() =>
              setCreateOpen(true)
            }
          >

            <Plus className="mr-2 h-4 w-4" />

            Create Ledger

          </Button>

        </div>

        {/* Ledger Table */}

        <LedgerTable

          data={data?.ledgers ?? []}

          onView={(ledger) => {

            console.log(ledger);

          }}

          onEdit={(ledger) => {

            setSelectedLedger(ledger);

            setEditOpen(true);

          }}

          onDelete={(ledger) => {

            setSelectedLedger(ledger);

            setDeleteOpen(true);

          }}

        />

      </div>

      {/* Create Dialog */}

      <CreateLedgerDialog

        open={createOpen}

        onOpenChange={setCreateOpen}

        companyId={companyId}

      />

      {/* Edit Dialog */}

      <EditLedgerDialog

        open={editOpen}

        onOpenChange={setEditOpen}

        ledger={selectedLedger}

      />

      {/* Delete Dialog */}

      <DeleteLedgerDialog

        open={deleteOpen}

        onOpenChange={setDeleteOpen}

        ledger={selectedLedger}

      />

    </DashboardLayout>

  );

}