"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createLedger,
  deleteLedger,
  getLedgers,
  updateLedger,
} from "@/services/ledger.service";

import { CreateLedgerDTO } from "@/types/ledger";

export const useLedgers = (
  companyId: string
) => {
  return useQuery({
    queryKey: ["ledgers", companyId],
    queryFn: () => getLedgers(companyId),
    enabled: !!companyId,
  });
};

export const useCreateLedger = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ledger: CreateLedgerDTO) =>
      createLedger(ledger),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ledgers"],
      });
    },
  });
};

export const useUpdateLedger = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      ledger,
    }: {
      id: string;
      ledger: Partial<CreateLedgerDTO>;
    }) =>
      updateLedger(id, ledger),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ledgers"],
      });
    },
  });
};

export const useDeleteLedger = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      deleteLedger(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ledgers"],
      });
    },
  });
};