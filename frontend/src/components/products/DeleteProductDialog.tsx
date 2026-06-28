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

import { Product } from "@/types/product";

import { useDeleteProduct } from "@/hooks/useProduct";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export default function DeleteProductDialog({
  open,
  onOpenChange,
  product,
}: Props) {

  const mutation = useDeleteProduct();

  const handleDelete = async () => {

    if (!product) return;

    try {

      await mutation.mutateAsync(product.id);

      toast.success(
        "Product deleted successfully"
      );

      onOpenChange(false);

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ??
          "Unable to delete product"
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

            Delete Product

          </DialogTitle>

          <DialogDescription>

            This action cannot be undone.

          </DialogDescription>

        </DialogHeader>

        <div className="space-y-5 py-4">

          <p className="text-sm text-muted-foreground">

            Are you sure you want to delete this product?

          </p>

          <div className="rounded-lg border bg-muted/30 p-4">

            <div className="space-y-2">

              <div>

                <span className="text-xs text-muted-foreground">

                  Product

                </span>

                <p className="font-semibold">

                  {product?.name}

                </p>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <span className="text-xs text-muted-foreground">

                    SKU

                  </span>

                  <p>

                    {product?.sku || "-"}

                  </p>

                </div>

                <div>

                  <span className="text-xs text-muted-foreground">

                    Category

                  </span>

                  <p>

                    {product?.category?.name}

                  </p>

                </div>

                <div>

                  <span className="text-xs text-muted-foreground">

                    Unit

                  </span>

                  <p>

                    {product?.unit?.shortName}

                  </p>

                </div>

                <div>

                  <span className="text-xs text-muted-foreground">

                    Selling Price

                  </span>

                  <p>

                    ₹
                    {product?.sellingPrice.toLocaleString()}

                  </p>

                </div>

                <div>

                  <span className="text-xs text-muted-foreground">

                    Opening Stock

                  </span>

                  <p>

                    {product?.openingStock}

                  </p>

                </div>

                <div>

                  <span className="text-xs text-muted-foreground">

                    GST

                  </span>

                  <p>

                    {product?.gstRate}%

                  </p>

                </div>

              </div>

            </div>

          </div>

          <div className="rounded-lg border border-red-200 bg-red-50 p-3">

            <p className="text-sm text-red-700">

              Deleting this product will permanently remove it
              from your inventory. This action cannot be undone.

            </p>

          </div>

        </div>

        <DialogFooter>

          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={mutation.isPending}
            onClick={handleDelete}
          >
            {mutation.isPending
              ? "Deleting..."
              : "Delete Product"}
          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>

  );

}