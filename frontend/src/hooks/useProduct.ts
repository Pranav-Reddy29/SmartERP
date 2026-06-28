"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "@/services/product.service";

import {
  CreateProductDTO,
  UpdateProductDTO,
} from "@/types/product";

export const useProducts = (
  companyId: string,
  search?: string
) => {

  return useQuery({

    queryKey: [
      "products",
      companyId,
      search,
    ],

    queryFn: () =>
      getProducts(
        companyId,
        search
      ),

    enabled: !!companyId,

  });

};

export const useProduct = (
  id: string
) => {

  return useQuery({

    queryKey: [
      "product",
      id,
    ],

    queryFn: () =>
      getProduct(id),

    enabled: !!id,

  });

};

export const useCreateProduct = () => {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      data: CreateProductDTO
    ) =>
      createProduct(data),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

    },

  });

};

export const useUpdateProduct = () => {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateProductDTO;
    }) =>
      updateProduct(
        id,
        data
      ),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

    },

  });

};

export const useDeleteProduct = () => {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      id: string
    ) =>
      deleteProduct(id),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

    },

  });

};