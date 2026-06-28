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

import { CreateCategoryDTO } from "@/types/category";

import { useCreateCategory } from "@/hooks/useCategory";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyId: string;
}

export default function CreateCategoryDialog({
  open,
  onOpenChange,
  companyId,
}: Props) {

  const mutation = useCreateCategory();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<CreateCategoryDTO>({
    defaultValues: {
      name: "",
      description: "",
      companyId,
    },
  });

  useEffect(() => {

    reset({
      name: "",
      description: "",
      companyId,
    });

  }, [companyId, reset]);

  const onSubmit = async (
    values: CreateCategoryDTO
  ) => {

    try {

      await mutation.mutateAsync(values);

      toast.success(
        "Category created successfully"
      );

      reset();

      onOpenChange(false);

    } catch {

      toast.error(
        "Unable to create category"
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

            Create Category

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
                ? "Creating..."
                : "Create Category"}
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>

  );

}