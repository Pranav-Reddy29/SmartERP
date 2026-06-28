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
  Unit,
  UpdateUnitDTO,
} from "@/types/unit";

import { useUpdateUnit } from "@/hooks/useUnit";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unit: Unit | null;
}

export default function EditUnitDialog({
  open,
  onOpenChange,
  unit,
}: Props) {
  const mutation = useUpdateUnit();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<UpdateUnitDTO>();

  useEffect(() => {
    if (!unit) return;

    reset({
      name: unit.name,
      shortName: unit.shortName,
    });
  }, [unit, reset]);

  const onSubmit = async (
    values: UpdateUnitDTO
  ) => {
    if (!unit) return;

    try {
      await mutation.mutateAsync({
        id: unit.id,
        data: values,
      });

      toast.success(
        "Unit updated successfully"
      );

      onOpenChange(false);
    } catch {
      toast.error(
        "Unable to update unit"
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

            Edit Unit

          </DialogTitle>

        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* Unit Name */}

          <div>

            <label className="mb-2 block text-sm font-medium">

              Unit Name

            </label>

            <input
              {...register("name", {
                required: true,
              })}
              placeholder="Enter unit name"
              className="w-full rounded-lg border px-3 py-2"
            />

          </div>

          {/* Short Name */}

          <div>

            <label className="mb-2 block text-sm font-medium">

              Short Name

            </label>

            <input
              {...register("shortName", {
                required: true,
              })}
              placeholder="Eg. Kg, L, Box"
              className="w-full rounded-lg border px-3 py-2"
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
                : "Update Unit"}
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>
  );
}