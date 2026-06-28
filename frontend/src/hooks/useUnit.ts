"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createUnit,
  deleteUnit,
  getUnit,
  getUnits,
  updateUnit,
} from "@/services/unit.service";

import {
  CreateUnitDTO,
  UpdateUnitDTO,
} from "@/types/unit";

export const useUnits = (
  companyId: string,
  search?: string
) => {

  return useQuery({

    queryKey: [
      "units",
      companyId,
      search,
    ],

    queryFn: () =>
      getUnits(
        companyId,
        search
      ),

    enabled: !!companyId,

  });

};

export const useUnit = (
  id: string
) => {

  return useQuery({

    queryKey: [
      "unit",
      id,
    ],

    queryFn: () =>
      getUnit(id),

    enabled: !!id,

  });

};

export const useCreateUnit = () => {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      data: CreateUnitDTO
    ) => createUnit(data),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["units"],
      });

    },

  });

};

export const useUpdateUnit = () => {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateUnitDTO;
    }) =>
      updateUnit(
        id,
        data
      ),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["units"],
      });

    },

  });

};

export const useDeleteUnit = () => {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      id: string
    ) => deleteUnit(id),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["units"],
      });

    },

  });

};