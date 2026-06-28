"use client";

import { useState } from "react";

import UnitTable from "@/components/units/UnitTable";
import UnitTableSkeleton from "@/components/units/UnitTableSkeleton";
import CreateUnitDialog from "@/components/units/CreateUnitDialog";
import EditUnitDialog from "@/components/units/EditUnitDialog";
import DeleteUnitDialog from "@/components/units/DeleteUnitDialog";

import { Unit } from "@/types/unit";

import { useUnits } from "@/hooks/useUnit";
import useKeyboardShortcuts from "@/hooks/useKeyboardShortcuts";
import useAuth from "@/hooks/useAuth";

export default function UnitsPage() {
  /**
   * TODO:
   * Replace with your selected company
   * from Zustand/Auth when implemented.
   */
  const { company } = useAuth();

const companyId = company.id;

  const [search, setSearch] = useState("");

  const [createOpen, setCreateOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedUnit, setSelectedUnit] =
    useState<Unit | null>(null);

  const {
    data,
    isLoading,
    isError,
  } = useUnits(companyId, search);

  const units = data?.units ?? [];

  useKeyboardShortcuts({
    onCreateUnit: () => setCreateOpen(true),
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <UnitTableSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[70vh] items-center justify-center">

        <div className="text-center">

          <h2 className="text-2xl font-bold">

            Failed to load units

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

          Units

        </h1>

        <p className="text-gray-500">

          Manage your inventory units.

        </p>

      </div>

      <UnitTable
        data={units}
        search={search}
        setSearch={setSearch}
        onCreate={() => setCreateOpen(true)}
        onEdit={(unit) => {
          setSelectedUnit(unit);
          setEditOpen(true);
        }}
        onDelete={(unit) => {
          setSelectedUnit(unit);
          setDeleteOpen(true);
        }}
      />

      <CreateUnitDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        companyId={companyId}
      />

      <EditUnitDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        unit={selectedUnit}
      />

      <DeleteUnitDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        unit={selectedUnit}
      />

    </div>
  );
}