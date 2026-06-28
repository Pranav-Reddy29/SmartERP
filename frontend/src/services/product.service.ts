import api from "@/lib/api";

import {
  ProductListResponse,
  ProductResponse,
  CreateProductDTO,
  UpdateProductDTO,
} from "@/types/product";

export const getProducts = async (
  companyId: string,
  search?: string
) => {

  const response = await api.get<ProductListResponse>(
    "/products",
    {
      params: {
        companyId,
        search,
      },
    }
  );

  return response.data;
};

export const getProduct = async (
  id: string
) => {

  const response = await api.get<ProductResponse>(
    `/products/${id}`
  );

  return response.data;
};

export const createProduct = async (
  data: CreateProductDTO
) => {

  const response = await api.post<ProductResponse>(
    "/products",
    data
  );

  return response.data;
};

export const updateProduct = async (
  id: string,
  data: UpdateProductDTO
) => {

  const response = await api.put<ProductResponse>(
    `/products/${id}`,
    data
  );

  return response.data;
};

export const deleteProduct = async (
  id: string
) => {

  const response = await api.delete(
    `/products/${id}`
  );

  return response.data;
};