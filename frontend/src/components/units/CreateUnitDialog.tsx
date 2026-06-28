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

import { CreateUnitDTO } from "@/types/unit";

import { useCreateUnit } from "@/hooks/useUnit";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyId: string;
}

export default function CreateUnitDialog({
  open,
  onOpenChange,
  companyId,
}: Props) {
  const mutation = useCreateUnit();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<CreateUnitDTO>({
    defaultValues: {
      name: "",
      shortName: "",
      companyId,
    },
  });

  useEffect(() => {
    reset({
      name: "",
      shortName: "",
      companyId,
    });
  }, [companyId, reset]);

  const onSubmit = async (
    values: CreateUnitDTO
  ) => {
    try {
      await mutation.mutateAsync(values);

      toast.success(
        "Unit created successfully"
      );

      reset({
        name: "",
        shortName: "",
        companyId,
      });

      onOpenChange(false);
    } catch {
      toast.error(
        "Unable to create unit"
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

            Create Unit

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
                ? "Creating..."
                : "Create Unit"}
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>
  );
}