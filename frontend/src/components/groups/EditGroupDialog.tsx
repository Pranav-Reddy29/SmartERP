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
  LedgerGroup,
  UpdateGroupDTO,
} from "@/types/group";

import {
  useGroups,
  useUpdateGroup,
} from "@/hooks/useGroup";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group: LedgerGroup | null;
}

export default function EditGroupDialog({
  open,
  onOpenChange,
  group,
}: Props) {
  const mutation = useUpdateGroup();

  const { data } = useGroups(
    group?.companyId ?? ""
  );

  const groups: LedgerGroup[] = data?.groups ?? [];

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<UpdateGroupDTO>();

  useEffect(() => {
    if (group) {
      reset({
        name: group.name,
        nature: group.nature,
        description: group.description ?? "",
        parentId: group.parentId ?? "",
      });
    }
  }, [group, reset]);

  const onSubmit = async (
    values: UpdateGroupDTO
  ) => {
    if (!group) return;

    try {
      await mutation.mutateAsync({
        id: group.id,
        data: {
          ...values,
          parentId: values.parentId || undefined,
        },
      });

      toast.success(
        "Group updated successfully"
      );

      onOpenChange(false);
    } catch {
      toast.error(
        "Unable to update group"
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

            Edit Group

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

                {groups
                  .filter(
                    (g) => g.id !== group?.id
                  )
                  .map((g) => (
                    <option
                      key={g.id}
                      value={g.id}
                    >
                      {g.name}
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
                ? "Updating..."
                : "Update Group"}
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>
    </Dialog>
  );
}