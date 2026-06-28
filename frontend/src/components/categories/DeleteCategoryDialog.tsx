"use client";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Category } from "@/types/category";

import { useDeleteCategory } from "@/hooks/useCategory";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
}

export default function DeleteCategoryDialog({
  open,
  onOpenChange,
  category,
}: Props) {
  const mutation = useDeleteCategory();

  const handleDelete = async () => {
    if (!category) return;

    try {
      await mutation.mutateAsync(category.id);

      toast.success(
        "Category deleted successfully"
      );

      onOpenChange(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Unable to delete category"
      );
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-md">

        <DialogHeader>

          <DialogTitle className="text-red-600">

            Delete Category

          </DialogTitle>

          <DialogDescription>

            This action cannot be undone.

          </DialogDescription>

        </DialogHeader>

        <div className="space-y-4 py-4">

          <p className="text-sm text-muted-foreground">

            Are you sure you want to delete this category?

          </p>

          <div className="rounded-lg border bg-muted/30 p-4">

            <h3 className="font-semibold">

              {category?.name}

            </h3>

            <p className="mt-2 text-sm text-muted-foreground">

              {category?.description || "No description"}

            </p>

          </div>

          <p className="text-sm text-red-500">

            If this category is assigned to products,
            deletion will fail until those products are
            moved to another category.

          </p>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            disabled={mutation.isPending}
            onClick={handleDelete}
          >
            {mutation.isPending
              ? "Deleting..."
              : "Delete Category"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}