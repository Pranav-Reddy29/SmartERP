"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createSales,
  deleteSales,
  getSale,
  getSales,
  updateSales,
} from "@/services/sales.service";

import {
  CreateSalesDTO,
  UpdateSalesDTO,
} from "@/types/sales";

export const useSales = (
  companyId: string,
  search?: string
) => {

  return useQuery({

    queryKey: [
      "sales",
      companyId,
      search,
    ],

    queryFn: () =>
      getSales(
        companyId,
        search
      ),

    enabled: !!companyId,

  });

};

export const useSale = (
  id: string
) => {

  return useQuery({

    queryKey: [
      "sale",
      id,
    ],

    queryFn: () =>
      getSale(id),

    enabled: !!id,

  });

};

export const useCreateSales = () => {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      data: CreateSalesDTO
    ) => createSales(data),

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["sales"],

      });

    },

  });

};

export const useUpdateSales = () => {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateSalesDTO;
    }) =>
      updateSales(
        id,
        data
      ),

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["sales"],

      });

    },

  });

};

export const useDeleteSales = () => {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      id: string
    ) => deleteSales(id),

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["sales"],

      });

    },

  });

};