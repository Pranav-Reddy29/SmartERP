import api from "@/lib/api";

import {
  CategoryListResponse,
  CategoryResponse,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "@/types/category";

export const getCategories = async (
  companyId: string,
  search?: string
) => {

  const response = await api.get<CategoryListResponse>(
    "/categories",
    {
      params: {
        companyId,
        search,
      },
    }
  );

  return response.data;

};

export const getCategory = async (
  id: string
) => {

  const response = await api.get<CategoryResponse>(
    `/categories/${id}`
  );

  return response.data;

};

export const createCategory = async (
  data: CreateCategoryDTO
) => {

  const response = await api.post<CategoryResponse>(
    "/categories",
    data
  );

  return response.data;

};

export const updateCategory = async (
  id: string,
  data: UpdateCategoryDTO
) => {

  const response = await api.put<CategoryResponse>(
    `/categories/${id}`,
    data
  );

  return response.data;

};

export const deleteCategory = async (
  id: string
) => {

  const response = await api.delete(
    `/categories/${id}`
  );

  return response.data;

};