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

import { LedgerGroup } from "@/types/group";

import { useDeleteGroup } from "@/hooks/useGroup";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group: LedgerGroup | null;
}

export default function DeleteGroupDialog({
  open,
  onOpenChange,
  group,
}: Props) {
  const mutation = useDeleteGroup();

  const handleDelete = async () => {
    if (!group) return;

    try {
      await mutation.mutateAsync(group.id);

      toast.success("Group deleted successfully");

      onOpenChange(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Unable to delete group"
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
            Delete Group
          </DialogTitle>

          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>

        </DialogHeader>

        <div className="space-y-3 py-4">

          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this
            ledger group?
          </p>

          <div className="rounded-lg border bg-muted/30 p-4">

            <p className="font-semibold">
              {group?.name}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Nature: {group?.nature}
            </p>

            {group?.parent && (
              <p className="mt-1 text-sm text-muted-foreground">
                Parent: {group.parent.name}
              </p>
            )}

          </div>

          <p className="text-sm text-red-500">
            If this group is linked to ledgers,
            deletion may fail until those ledgers
            are moved or removed.
          </p>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? "Deleting..."
              : "Delete Group"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}