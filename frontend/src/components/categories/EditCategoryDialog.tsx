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
  Category,
  UpdateCategoryDTO,
} from "@/types/category";

import { useUpdateCategory } from "@/hooks/useCategory";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
}

export default function EditCategoryDialog({
  open,
  onOpenChange,
  category,
}: Props) {
  const mutation = useUpdateCategory();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<UpdateCategoryDTO>();

  useEffect(() => {
    if (!category) return;

    reset({
      name: category.name,
      description: category.description ?? "",
    });
  }, [category, reset]);

  const onSubmit = async (
    values: UpdateCategoryDTO
  ) => {
    if (!category) return;

    try {
      await mutation.mutateAsync({
        id: category.id,
        data: values,
      });

      toast.success(
        "Category updated successfully"
      );

      onOpenChange(false);
    } catch {
      toast.error(
        "Unable to update category"
      );
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-xl">

        <DialogHeader>

          <DialogTitle>

            Edit Category

          </DialogTitle>

        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* Category Name */}

          <div>

            <label className="mb-2 block text-sm font-medium">

              Category Name

            </label>

            <input
              {...register("name", {
                required: true,
              })}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Enter category name"
            />

          </div>

          {/* Description */}

          <div>

            <label className="mb-2 block text-sm font-medium">

              Description

            </label>

            <textarea
              rows={4}
              {...register("description")}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Enter description (optional)"
            />

          </div>

          <DialogFooter>

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                onOpenChange(false)
              }
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending
                ? "Updating..."
                : "Update Category"}
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>
  );
}