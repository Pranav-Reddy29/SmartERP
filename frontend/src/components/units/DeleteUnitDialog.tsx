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

import { Unit } from "@/types/unit";

import { useDeleteUnit } from "@/hooks/useUnit";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unit: Unit | null;
}

export default function DeleteUnitDialog({
  open,
  onOpenChange,
  unit,
}: Props) {
  const mutation = useDeleteUnit();

  const handleDelete = async () => {
    if (!unit) return;

    try {
      await mutation.mutateAsync(unit.id);

      toast.success(
        "Unit deleted successfully"
      );

      onOpenChange(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Unable to delete unit"
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

            Delete Unit

          </DialogTitle>

          <DialogDescription>

            This action cannot be undone.

          </DialogDescription>

        </DialogHeader>

        <div className="space-y-4 py-4">

          <p className="text-sm text-muted-foreground">

            Are you sure you want to delete this unit?

          </p>

          <div className="rounded-lg border bg-muted/30 p-4">

            <h3 className="font-semibold">

              {unit?.name}

            </h3>

            <p className="mt-2 text-sm text-muted-foreground">

              Short Name:{" "}

              <span className="font-medium">

                {unit?.shortName}

              </span>

            </p>

          </div>

          <p className="text-sm text-red-500">

            If this unit is being used by one or more
            products, deletion will fail until those
            products are updated or removed.

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
              : "Delete Unit"}
          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>
  );
}