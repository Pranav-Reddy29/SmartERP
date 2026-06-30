"use client";

import { useEffect, useMemo } from "react";

import {
  useForm,
  useFieldArray,
} from "react-hook-form";

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
  Sales,
  CreateSalesDTO,
} from "@/types/sales";

import { useUpdateSales } from "@/hooks/useSales";
import { useLedgers } from "@/hooks/useLedger";
import { useProducts } from "@/hooks/useProduct";

interface Props {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  sales: Sales | null;

  companyId: string;
}

export default function EditSalesDialog({
  open,
  onOpenChange,
  sales,
  companyId,
}: Props) {

  const mutation =
    useUpdateSales();

  const {
    data: ledgerResponse,
  } = useLedgers(companyId);

  const {
    data: productResponse,
  } = useProducts(companyId);

  const customers = useMemo(() => {

    return (
      ledgerResponse?.ledgers?.filter(
        (ledger) =>
          ledger.ledgerType ===
          "Customer"
      ) ?? []
    );

  }, [ledgerResponse]);

  const products =
    productResponse?.products ??
    [];

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
  } = useForm<CreateSalesDTO>({

    defaultValues: {

      voucherNumber: "",

      voucherDate:
        new Date()
          .toISOString()
          .split("T")[0],

      customerId: "",

      companyId,

      subTotal: 0,

      discount: 0,

      gstTotal: 0,

      grandTotal: 0,

      notes: "",

      items: [],

    },

  });

  const {
    fields,
    append,
    remove,
  } = useFieldArray({

    control,

    name: "items",

  });

  useEffect(() => {

    if (!sales)
      return;

    reset({

      voucherNumber:
        sales.voucherNumber,

      voucherDate:
        sales.voucherDate
          .split("T")[0],

      customerId:
        sales.customerId,

      companyId:
        sales.companyId,

      subTotal:
        sales.subTotal,

      discount:
        sales.discount,

      gstTotal:
        sales.gstTotal,

      grandTotal:
        sales.grandTotal,

      notes:
        sales.notes ?? "",

      items:
        sales.items.map(
          (item) => ({

            productId:
              item.productId,

            quantity:
              item.quantity,

            rate:
              item.rate,

            discount:
              item.discount,

            gstRate:
              item.gstRate,

            gstAmount:
              item.gstAmount,

            amount:
              item.amount,

          })
        ),

    });

  }, [sales, reset]);

  const watchedItems =
    watch("items");

  const watchedDiscount =
    watch("discount");

  const onSubmit =
    async (
      values: CreateSalesDTO
    ) => {

      if (!sales)
        return;

      try {

        await mutation.mutateAsync({

          id: sales.id,

          data: values,

        });

        toast.success(
          "Sales voucher updated successfully"
        );

        onOpenChange(false);

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to update sales voucher"
        );

      }

    };

  return (

    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >

      <DialogContent className="w-[95vw] max-w-6xl max-h-[90vh] overflow-y-auto">

        <DialogHeader>

          <DialogTitle>

            Edit Sales Voucher

          </DialogTitle>

        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          <div className="grid grid-cols-3 gap-5">

            {/* Voucher Number */}

            <div>

              <label className="mb-2 block text-sm font-medium">

                Voucher Number

              </label>

              <input
                {...register("voucherNumber", {
                  required: true,
                })}
                className="w-full rounded-lg border px-3 py-2"
                placeholder="SAL-0001"
              />

            </div>

            {/* Voucher Date */}

            <div>

              <label className="mb-2 block text-sm font-medium">

                Voucher Date

              </label>

              <input
                type="date"
                {...register("voucherDate", {
                  required: true,
                })}
                className="w-full rounded-lg border px-3 py-2"
              />

            </div>

            {/* Customer */}

            <div>

              <label className="mb-2 block text-sm font-medium">

                Customer

              </label>

              <select
                {...register("customerId", {
                  required: true,
                })}
                className="w-full rounded-lg border px-3 py-2"
              >

                <option value="">

                  Select Customer

                </option>

                {customers.map((customer) => (

                  <option
                    key={customer.id}
                    value={customer.id}
                  >

                    {customer.ledgerName}

                  </option>

                ))}

              </select>

            </div>

          </div>

          {/* Sales Items */}

          <div className="rounded-xl border">

            <div className="grid grid-cols-8 gap-3 border-b bg-slate-100 p-4 font-semibold">

              <div>Product</div>

              <div>Qty</div>

              <div>Rate</div>

              <div>Discount</div>

              <div>GST %</div>

              <div>GST Amt</div>

              <div>Amount</div>

              <div></div>

            </div>
                        {fields.map((field, index) => (

              <div
                key={field.id}
                className="grid grid-cols-8 gap-3 border-b p-4"
              >

                {/* Product */}

                <select
                  {...register(
                    `items.${index}.productId`
                  )}
                  className="rounded-lg border px-3 py-2"
                  onChange={(e) => {

                    const product =
                      products.find(
                        (p) =>
                          p.id ===
                          e.target.value
                      );

                    setValue(
                      `items.${index}.productId`,
                      e.target.value
                    );

                    if (product) {

                      setValue(
                        `items.${index}.rate`,
                        product.sellingPrice
                      );

                      setValue(
                        `items.${index}.gstRate`,
                        product.gstRate
                      );

                    }

                  }}
                >

                  <option value="">

                    Select Product

                  </option>

                  {products.map((product) => (

                    <option
                      key={product.id}
                      value={product.id}
                    >

                      {product.name}

                    </option>

                  ))}

                </select>

                {/* Quantity */}

                <input
                  type="number"
                  step="0.01"
                  {...register(
                    `items.${index}.quantity`,
                    {
                      valueAsNumber: true,
                    }
                  )}
                  className="rounded-lg border px-3 py-2"
                />

                {/* Selling Price */}

                <input
                  type="number"
                  step="0.01"
                  {...register(
                    `items.${index}.rate`,
                    {
                      valueAsNumber: true,
                    }
                  )}
                  className="rounded-lg border px-3 py-2"
                />

                {/* Discount */}

                <input
                  type="number"
                  step="0.01"
                  {...register(
                    `items.${index}.discount`,
                    {
                      valueAsNumber: true,
                    }
                  )}
                  className="rounded-lg border px-3 py-2"
                />

                {/* GST Rate */}

                <input
                  type="number"
                  step="0.01"
                  {...register(
                    `items.${index}.gstRate`,
                    {
                      valueAsNumber: true,
                    }
                  )}
                  className="rounded-lg border px-3 py-2"
                />

                {/* GST Amount */}

                <input
                  type="number"
                  step="0.01"
                  readOnly
                  {...register(
                    `items.${index}.gstAmount`,
                    {
                      valueAsNumber: true,
                    }
                  )}
                  className="rounded-lg border bg-slate-50 px-3 py-2"
                />

                {/* Amount */}

                <input
                  type="number"
                  step="0.01"
                  readOnly
                  {...register(
                    `items.${index}.amount`,
                    {
                      valueAsNumber: true,
                    }
                  )}
                  className="rounded-lg border bg-slate-50 px-3 py-2"
                />

                {/* Remove */}

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() =>
                    remove(index)
                  }
                  disabled={
                    fields.length === 1
                  }
                >

                  Remove

                </Button>

              </div>

            ))}

            <div className="flex justify-end p-4">

              <Button
                type="button"
                variant="outline"
                onClick={() =>

                  append({

                    productId: "",

                    quantity: 1,

                    rate: 0,

                    discount: 0,

                    gstRate: 0,

                    gstAmount: 0,

                    amount: 0,

                  })

                }
              >

                + Add Product

              </Button>

            </div>

          </div>
                    {/* Totals */}

          {(() => {

            const subTotal = watchedItems.reduce(
              (total, item, index) => {

                const quantity =
                  Number(item.quantity) || 0;

                const rate =
                  Number(item.rate) || 0;

                const discount =
                  Number(item.discount) || 0;

                const gstRate =
                  Number(item.gstRate) || 0;

                const amount =
                  quantity * rate - discount;

                const gstAmount =
                  (amount * gstRate) / 100;

                setValue(
                  `items.${index}.amount`,
                  Number(amount.toFixed(2))
                );

                setValue(
                  `items.${index}.gstAmount`,
                  Number(gstAmount.toFixed(2))
                );

                return total + amount;

              },
              0
            );

            const gstTotal =
              watchedItems.reduce(
                (total, item) =>
                  total +
                  (Number(item.gstAmount) || 0),
                0
              );

            const discount =
              Number(watchedDiscount) || 0;

            const grandTotal =
              subTotal +
              gstTotal -
              discount;

            setValue(
              "subTotal",
              Number(subTotal.toFixed(2))
            );

            setValue(
              "gstTotal",
              Number(gstTotal.toFixed(2))
            );

            setValue(
              "grandTotal",
              Number(grandTotal.toFixed(2))
            );

            return (

              <div className="grid grid-cols-2 gap-8">

                {/* Notes */}

                <div>

                  <label className="mb-2 block text-sm font-medium">

                    Notes

                  </label>

                  <textarea
                    rows={5}
                    {...register("notes")}
                    className="w-full rounded-lg border px-3 py-2"
                    placeholder="Sales notes..."
                  />

                </div>

                {/* Sales Summary */}

                <div className="rounded-xl border bg-slate-50 p-5">

                  <div className="space-y-3">

                    <div className="flex justify-between">

                      <span>

                        Sub Total

                      </span>

                      <span>

                        ₹
                        {subTotal.toFixed(2)}

                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span>

                        Discount

                      </span>

                      <span>

                        ₹
                        {discount.toFixed(2)}

                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span>

                        GST Total

                      </span>

                      <span>

                        ₹
                        {gstTotal.toFixed(2)}

                      </span>

                    </div>

                    <hr />

                    <div className="flex justify-between text-lg font-bold">

                      <span>

                        Grand Total

                      </span>

                      <span>

                        ₹
                        {grandTotal.toFixed(2)}

                      </span>

                    </div>

                  </div>

                </div>

              </div>

            );

          })()}

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
                : "Update Sales"}

            </Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>

  );

}