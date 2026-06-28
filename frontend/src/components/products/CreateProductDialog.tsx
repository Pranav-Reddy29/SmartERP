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

import { CreateProductDTO } from "@/types/product";

import { useCreateProduct } from "@/hooks/useProduct";
import { useCategories } from "@/hooks/useCategory";
import { useUnits } from "@/hooks/useUnit";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyId: string;
}

export default function CreateProductDialog({
  open,
  onOpenChange,
  companyId,
}: Props) {

  const mutation = useCreateProduct();

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
  } = useForm<CreateProductDTO>({
    defaultValues: {
      name: "",
      sku: "",
      hsnCode: "",
      gstRate: 18,
      openingStock: 0,
      purchasePrice: 0,
      sellingPrice: 0,
      minimumStock: 0,
      categoryId: "",
      unitId: "",
      companyId,
    },
  });

  useEffect(() => {

    reset({
      name: "",
      sku: "",
      hsnCode: "",
      gstRate: 18,
      openingStock: 0,
      purchasePrice: 0,
      sellingPrice: 0,
      minimumStock: 0,
      categoryId: "",
      unitId: "",
      companyId,
    });

  }, [companyId, reset]);

  const onSubmit = async (
    values: CreateProductDTO
  ) => {

    try {

      await mutation.mutateAsync(values);

      toast.success(
        "Product created successfully"
      );

      reset();

      onOpenChange(false);

    } catch {

      toast.error(
        "Unable to create product"
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

            Create Product

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
                placeholder="Enter product name"
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
                placeholder="SKU"
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
                placeholder="HSN Code"
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
                placeholder="0.00"
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
                placeholder="0.00"
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
                placeholder="0"
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
                placeholder="0"
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
                ? "Creating..."
                : "Create Product"}
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>

  );

}