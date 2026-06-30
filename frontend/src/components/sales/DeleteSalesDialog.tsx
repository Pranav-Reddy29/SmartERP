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

import { Sales } from "@/types/sales";

import { useDeleteSales } from "@/hooks/useSales";

interface Props {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  sales: Sales | null;
}

export default function DeleteSalesDialog({
  open,
  onOpenChange,
  sales,
}: Props) {

  const mutation =
    useDeleteSales();

  const handleDelete =
    async () => {

      if (!sales)
        return;

      try {

        await mutation.mutateAsync(
          sales.id
        );

        toast.success(
          "Sales voucher deleted successfully"
        );

        onOpenChange(false);

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to delete sales voucher"
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

          <DialogTitle>

            Delete Sales Voucher

          </DialogTitle>

          <DialogDescription>

            This action cannot be undone.

          </DialogDescription>

        </DialogHeader>

        {sales && (

          <div className="space-y-4 rounded-lg border p-4">

            <div className="flex justify-between">

              <span className="font-medium">

                Voucher

              </span>

              <span>

                {sales.voucherNumber}

              </span>

            </div>

            <div className="flex justify-between">

              <span className="font-medium">

                Customer

              </span>

              <span>

                {sales.customer.ledgerName}

              </span>

            </div>

            <div className="flex justify-between">

              <span className="font-medium">

                Date

              </span>

              <span>

                {new Date(
                  sales.voucherDate
                ).toLocaleDateString("en-IN")}

              </span>

            </div>

            <div className="flex justify-between">

              <span className="font-medium">

                Total Amount

              </span>

              <span className="font-semibold">

                ₹
                {sales.grandTotal.toLocaleString(
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
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={
              mutation.isPending
            }
          >

            {mutation.isPending
              ? "Deleting..."
              : "Delete"}

          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>

  );

}