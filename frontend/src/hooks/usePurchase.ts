"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createPurchase,
  deletePurchase,
  getPurchase,
  getPurchases,
  updatePurchase,
} from "@/services/purchase.service";

import {
  CreatePurchaseDTO,
  UpdatePurchaseDTO,
} from "@/types/purchase";

export const usePurchases = (
  companyId: string
) => {

  return useQuery({

    queryKey: [
      "purchases",
      companyId,
    ],

    queryFn: () =>
      getPurchases(companyId),

    enabled: !!companyId,

  });

};

export const usePurchase = (
  id: string
) => {

  return useQuery({

    queryKey: [
      "purchase",
      id,
    ],

    queryFn: () =>
      getPurchase(id),

    enabled: !!id,

  });

};

export const useCreatePurchase = () => {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      purchase: CreatePurchaseDTO
    ) =>
      createPurchase(purchase),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["purchases"],
      });

    },

  });

};

export const useUpdatePurchase = () => {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdatePurchaseDTO;
    }) =>
      updatePurchase(
        id,
        data
      ),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["purchases"],
      });

    },

  });

};

export const useDeletePurchase = () => {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      id: string
    ) =>
      deletePurchase(id),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["purchases"],
      });

    },

  });

};