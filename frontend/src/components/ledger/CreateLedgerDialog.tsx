"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { CreateLedgerDTO } from "@/types/ledger";

import { useCreateLedger } from "@/hooks/useLedger";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyId: string;
}

export default function CreateLedgerDialog({
  open,
  onOpenChange,
  companyId,
}: Props) {

  const mutation = useCreateLedger();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<CreateLedgerDTO>({
    defaultValues: {
      ledgerName: "",
      ledgerType: "Customer",
      openingBalance: 0,
      balanceType: "Debit",
      gstNumber: "",
      phone: "",
      email: "",
      address: "",
      state: "",
      groupId: "",
      companyId,
    },
  });

  useEffect(() => {
    reset((prev) => ({
      ...prev,
      companyId,
    }));
  }, [companyId, reset]);

  const onSubmit = async (
    data: CreateLedgerDTO
  ) => {
    try {

      await mutation.mutateAsync(data);

      toast.success("Ledger created successfully");

      reset();

      onOpenChange(false);

    } catch (error) {
      toast.error("Failed to create ledger");
      console.error(error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >

      <DialogContent className="max-w-3xl">

        <DialogHeader>

          <DialogTitle>

            Create Ledger

          </DialogTitle>

        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div className="grid grid-cols-2 gap-5">

            <div>

              <label className="mb-2 block text-sm font-medium">

                Ledger Name

              </label>

              <input
                {...register("ledgerName", {
                  required: true,
                })}
                className="w-full rounded-lg border px-3 py-2"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">

                Ledger Type

              </label>

              <select
                {...register("ledgerType")}
                className="w-full rounded-lg border px-3 py-2"
              >

                <option>Customer</option>
                <option>Supplier</option>
                <option>Cash</option>
                <option>Bank</option>
                <option>Expense</option>
                <option>Income</option>
                <option>Stock</option>

              </select>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">

                Opening Balance

              </label>

              <input
                type="number"
                {...register("openingBalance", {
                  valueAsNumber: true,
                })}
                className="w-full rounded-lg border px-3 py-2"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">

                Balance Type

              </label>

              <select
                {...register("balanceType")}
                className="w-full rounded-lg border px-3 py-2"
              >

                <option>Debit</option>
                <option>Credit</option>

              </select>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">

                GST Number

              </label>

              <input
                {...register("gstNumber")}
                className="w-full rounded-lg border px-3 py-2"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">

                Phone

              </label>

              <input
                {...register("phone")}
                className="w-full rounded-lg border px-3 py-2"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">

                Email

              </label>

              <input
                type="email"
                {...register("email")}
                className="w-full rounded-lg border px-3 py-2"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">

                State

              </label>

              <input
                {...register("state")}
                className="w-full rounded-lg border px-3 py-2"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Address

            </label>

            <textarea
              rows={4}
              {...register("address")}
              className="w-full rounded-lg border px-3 py-2"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Ledger Group ID

            </label>

            <input
              {...register("groupId", {
                required: true,
              })}
              placeholder="Group UUID"
              className="w-full rounded-lg border px-3 py-2"
            />

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
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending
                ? "Creating..."
                : "Create Ledger"}
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>
  );
}