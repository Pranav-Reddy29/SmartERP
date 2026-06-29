"use client";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Purchase } from "@/types/purchase";

import { useDeletePurchase } from "@/hooks/usePurchase";

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  purchase: Purchase | null;
}

export default function DeletePurchaseDialog({
  open,
  onOpenChange,
  purchase,
}: Props) {

  const mutation = useDeletePurchase();

  const handleDelete = async () => {

    if (!purchase) return;

    try {

      await mutation.mutateAsync(
        purchase.id
      );

      toast.success(
        "Purchase voucher deleted successfully"
      );

      onOpenChange(false);

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to delete purchase voucher"
      );

    }

  };

  return (

    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >

      <DialogContent className="max-w-md">

        <DialogHeader>

          <DialogTitle>

            Delete Purchase Voucher

          </DialogTitle>

          <DialogDescription>

            This action cannot be undone.

          </DialogDescription>

        </DialogHeader>

        {purchase && (

          <div className="space-y-4 rounded-lg border bg-slate-50 p-4">

            <div className="flex justify-between">

              <span className="font-medium">

                Voucher No

              </span>

              <span>

                {purchase.voucherNumber}

              </span>

            </div>

            <div className="flex justify-between">

              <span className="font-medium">

                Supplier

              </span>

              <span>

                {purchase.supplier.ledgerName}

              </span>

            </div>

            <div className="flex justify-between">

              <span className="font-medium">

                Items

              </span>

              <span>

                {purchase.items.length}

              </span>

            </div>

            <div className="flex justify-between">

              <span className="font-medium">

                Grand Total

              </span>

              <span className="font-semibold">

                ₹
                {purchase.grandTotal.toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}

              </span>

            </div>

          </div>

        )}

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
            variant="destructive"
            onClick={handleDelete}
            disabled={mutation.isPending}
          >

            {mutation.isPending
              ? "Deleting..."
              : "Delete Purchase"}

          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>

  );

}