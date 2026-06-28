"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  Product,
  UpdateProductDTO,
} from "@/types/product";

import { useUpdateProduct } from "@/hooks/useProduct";
import { useCategories } from "@/hooks/useCategory";
import { useUnits } from "@/hooks/useUnit";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export default function EditProductDialog({
  open,
  onOpenChange,
  product,
}: Props) {

  const mutation = useUpdateProduct();

  const companyId = product?.companyId ?? "";

  const { data: categoriesResponse } =
    useCategories(companyId);

  const { data: unitsResponse } =
    useUnits(companyId);

  const categories =
    categoriesResponse?.categories ?? [];

  const units =
    unitsResponse?.units ?? [];

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<UpdateProductDTO>();

  useEffect(() => {

    if (!product) return;

    reset({

      name: product.name,

      sku: product.sku ?? "",

      hsnCode: product.hsnCode ?? "",

      gstRate: product.gstRate,

      purchasePrice:
        product.purchasePrice,

      sellingPrice:
        product.sellingPrice,

      openingStock:
        product.openingStock,

      minimumStock:
        product.minimumStock,

      categoryId:
        product.categoryId,

      unitId:
        product.unitId,

    });

  }, [product, reset]);

  const onSubmit = async (
    values: UpdateProductDTO
  ) => {

    if (!product) return;

    try {

      await mutation.mutateAsync({

        id: product.id,

        data: values,

      });

      toast.success(
        "Product updated successfully"
      );

      onOpenChange(false);

    } catch {

      toast.error(
        "Unable to update product"
      );

    }

  };

  return (

    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >

      <DialogContent className="max-w-4xl">

        <DialogHeader>

          <DialogTitle>

            Edit Product

          </DialogTitle>

        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div className="grid grid-cols-2 gap-5">

            {/* Product Name */}

            <div>

              <label className="mb-2 block text-sm font-medium">

                Product Name

              </label>

              <input
                {...register("name", {
                  required: true,
                })}
                className="w-full rounded-lg border px-3 py-2"
              />

            </div>

            {/* SKU */}

            <div>

              <label className="mb-2 block text-sm font-medium">

                SKU

              </label>

              <input
                {...register("sku")}
                className="w-full rounded-lg border px-3 py-2"
              />

            </div>

            {/* HSN Code */}

            <div>

              <label className="mb-2 block text-sm font-medium">

                HSN Code

              </label>

              <input
                {...register("hsnCode")}
                className="w-full rounded-lg border px-3 py-2"
              />

            </div>

            {/* Category */}

            <div>

              <label className="mb-2 block text-sm font-medium">

                Category

              </label>

              <select
                {...register("categoryId", {
                  required: true,
                })}
                className="w-full rounded-lg border px-3 py-2"
              >

                <option value="">

                  Select Category

                </option>

                {categories.map((category) => (

                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>

                ))}

              </select>

            </div>

            {/* Unit */}

            <div>

              <label className="mb-2 block text-sm font-medium">

                Unit

              </label>

              <select
                {...register("unitId", {
                  required: true,
                })}
                className="w-full rounded-lg border px-3 py-2"
              >

                <option value="">

                  Select Unit

                </option>

                {units.map((unit) => (

                  <option
                    key={unit.id}
                    value={unit.id}
                  >
                    {unit.name}
                  </option>

                ))}

              </select>

            </div>

            {/* GST */}

            <div>

              <label className="mb-2 block text-sm font-medium">

                GST %

              </label>

              <input
                type="number"
                {...register("gstRate", {
                  valueAsNumber: true,
                })}
                className="w-full rounded-lg border px-3 py-2"
              />

            </div>
                        {/* Purchase Price */}

            <div>

              <label className="mb-2 block text-sm font-medium">

                Purchase Price

              </label>

              <input
                type="number"
                step="0.01"
                {...register("purchasePrice", {
                  valueAsNumber: true,
                })}
                className="w-full rounded-lg border px-3 py-2"
              />

            </div>

            {/* Selling Price */}

            <div>

              <label className="mb-2 block text-sm font-medium">

                Selling Price

              </label>

              <input
                type="number"
                step="0.01"
                {...register("sellingPrice", {
                  valueAsNumber: true,
                })}
                className="w-full rounded-lg border px-3 py-2"
              />

            </div>

            {/* Opening Stock */}

            <div>

              <label className="mb-2 block text-sm font-medium">

                Opening Stock

              </label>

              <input
                type="number"
                step="0.01"
                {...register("openingStock", {
                  valueAsNumber: true,
                })}
                className="w-full rounded-lg border px-3 py-2"
              />

            </div>

            {/* Minimum Stock */}

            <div>

              <label className="mb-2 block text-sm font-medium">

                Minimum Stock

              </label>

              <input
                type="number"
                step="0.01"
                {...register("minimumStock", {
                  valueAsNumber: true,
                })}
                className="w-full rounded-lg border px-3 py-2"
              />

            </div>

          </div>

          <DialogFooter>

            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending
                ? "Updating..."
                : "Update Product"}
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>

  );

}