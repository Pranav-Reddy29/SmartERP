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
  CreateGroupDTO,
  LedgerGroup,
} from "@/types/group";

import {
  useCreateGroup,
  useGroups,
} from "@/hooks/useGroup";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyId: string;
}

export default function CreateGroupDialog({
  open,
  onOpenChange,
  companyId,
}: Props) {
  const mutation = useCreateGroup();

  const { data } = useGroups(companyId);

  const groups: LedgerGroup[] =
    data?.groups ?? [];

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<CreateGroupDTO>({
    defaultValues: {
      name: "",
      nature: "Assets",
      description: "",
      companyId,
      parentId: "",
    },
  });

  useEffect(() => {
    reset({
      name: "",
      nature: "Assets",
      description: "",
      companyId,
      parentId: "",
    });
  }, [companyId, reset]);

  const onSubmit = async (
    values: CreateGroupDTO
  ) => {
    try {
      await mutation.mutateAsync({
        ...values,
        parentId:
          values.parentId || undefined,
      });

      toast.success(
        "Group created successfully"
      );

      reset();

      onOpenChange(false);
    } catch {
      toast.error(
        "Unable to create group"
      );
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-2xl">

        <DialogHeader>

          <DialogTitle>

            Create Group

          </DialogTitle>

        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div className="grid grid-cols-2 gap-5">

            {/* Group Name */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Group Name
              </label>

              <input
                {...register("name", {
                  required: true,
                })}
                className="w-full rounded-lg border px-3 py-2"
              />

            </div>

            {/* Nature */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Nature
              </label>

              <select
                {...register("nature")}
                className="w-full rounded-lg border px-3 py-2"
              >
                <option>Assets</option>
                <option>Liabilities</option>
                <option>Income</option>
                <option>Expenses</option>
                <option>Capital</option>
              </select>

            </div>

            {/* Parent Group */}

            <div className="col-span-2">

              <label className="mb-2 block text-sm font-medium">
                Parent Group
              </label>

              <select
                {...register("parentId")}
                className="w-full rounded-lg border px-3 py-2"
              >

                <option value="">
                  None
                </option>

                {groups.map((group) => (

                  <option
                    key={group.id}
                    value={group.id}
                  >
                    {group.name}
                  </option>

                ))}

              </select>

            </div>

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
                : "Create Group"}
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>
    </Dialog>
  );
}