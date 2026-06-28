"use client";

import { useState } from "react";

import CategoryTable from "@/components/categories/CategoryTable";
import CategoryTableSkeleton from "@/components/categories/CategoryTableSkeleton";
import CreateCategoryDialog from "@/components/categories/CreateCategoryDialog";
import EditCategoryDialog from "@/components/categories/EditCategoryDialog";
import DeleteCategoryDialog from "@/components/categories/DeleteCategoryDialog";

import { Category } from "@/types/category";

import { useCategories } from "@/hooks/useCategory";
import useKeyboardShortcuts from "@/hooks/useKeyboardShortcuts";
import useAuth from "@/hooks/useAuth";

export default function CategoriesPage() {
  /**
   * TODO:
   * Replace this with your selected company
   * from Zustand/Auth once company switching
   * is integrated.
   */
  const { company } = useAuth();

const companyId = company.id;

  const [search, setSearch] = useState("");

  const [createOpen, setCreateOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  const {
    data,
    isLoading,
    isError,
  } = useCategories(
    companyId,
    search
  );

  const categories =
    data?.categories ?? [];

  useKeyboardShortcuts({
    onCreateCategory: () =>
      setCreateOpen(true),
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <CategoryTableSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[70vh] items-center justify-center">

        <div className="text-center">

          <h2 className="text-2xl font-bold">

            Failed to load categories

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

          Categories

        </h1>

        <p className="text-gray-500">

          Manage your inventory categories.

        </p>

      </div>

      <CategoryTable
        data={categories}
        search={search}
        setSearch={setSearch}
        onCreate={() => setCreateOpen(true)}
        onEdit={(category) => {
          setSelectedCategory(category);
          setEditOpen(true);
        }}
        onDelete={(category) => {
          setSelectedCategory(category);
          setDeleteOpen(true);
        }}
      />

      <CreateCategoryDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        companyId={companyId}
      />

      <EditCategoryDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        category={selectedCategory}
      />

      <DeleteCategoryDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        category={selectedCategory}
      />

    </div>
  );
}