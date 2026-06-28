"use client";

import { useState } from "react";

import ProductTable from "@/components/products/ProductTable";
import ProductTableSkeleton from "@/components/products/ProductTableSkeleton";

import CreateProductDialog from "@/components/products/CreateProductDialog";
import EditProductDialog from "@/components/products/EditProductDialog";
import DeleteProductDialog from "@/components/products/DeleteProductDialog";

import { Product } from "@/types/product";

import { useProducts } from "@/hooks/useProduct";

import useKeyboardShortcuts from "@/hooks/useKeyboardShortcuts";
import useAuth from "@/hooks/useAuth";

export default function ProductsPage() {

  /**
   * Replace with logged-in user's
   * selected company later.
   */

  const { company } = useAuth();

const companyId = company.id;

  const [search, setSearch] = useState("");

  const [createOpen, setCreateOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const {
    data,
    isLoading,
    isError,
  } = useProducts(
    companyId,
    search
  );

  const products =
    data?.products ?? [];

  useKeyboardShortcuts({

    onCreateProduct: () =>
      setCreateOpen(true),

  });

  if (isLoading) {

    return (

      <div className="p-6">

        <ProductTableSkeleton />

      </div>

    );

  }

  if (isError) {

    return (

      <div className="flex h-[70vh] items-center justify-center">

        <div className="text-center">

          <h2 className="text-2xl font-bold">

            Failed to load products

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

          Products

        </h1>

        <p className="text-gray-500">

          Manage your inventory products.

        </p>

      </div>

      <ProductTable

        data={products}

        search={search}

        setSearch={setSearch}

        onCreate={() =>
          setCreateOpen(true)
        }

        onEdit={(product) => {

          setSelectedProduct(product);

          setEditOpen(true);

        }}

        onDelete={(product) => {

          setSelectedProduct(product);

          setDeleteOpen(true);

        }}

      />

      <CreateProductDialog

        open={createOpen}

        onOpenChange={setCreateOpen}

        companyId={companyId}

      />

      <EditProductDialog

        open={editOpen}

        onOpenChange={setEditOpen}

        product={selectedProduct}

      />

      <DeleteProductDialog

        open={deleteOpen}

        onOpenChange={setDeleteOpen}

        product={selectedProduct}

      />

    </div>

  );

}