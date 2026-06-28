"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "@/services/category.service";

import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "@/types/category";

export const useCategories = (
  companyId: string,
  search?: string
) => {

  return useQuery({

    queryKey: [
      "categories",
      companyId,
      search,
    ],

    queryFn: () =>
      getCategories(
        companyId,
        search
      ),

    enabled: !!companyId,

  });

};

export const useCategory = (
  id: string
) => {

  return useQuery({

    queryKey: [
      "category",
      id,
    ],

    queryFn: () =>
      getCategory(id),

    enabled: !!id,

  });

};

export const useCreateCategory = () => {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      data: CreateCategoryDTO
    ) => createCategory(data),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

    },

  });

};

export const useUpdateCategory = () => {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateCategoryDTO;
    }) =>
      updateCategory(
        id,
        data
      ),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

    },

  });

};

export const useDeleteCategory = () => {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      id: string
    ) => deleteCategory(id),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

    },

  });

};