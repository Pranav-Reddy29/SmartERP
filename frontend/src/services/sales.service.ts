import api from "@/lib/api";

import {
  CreateSalesDTO,
  UpdateSalesDTO,
  SalesResponse,
  SalesListResponse,
} from "@/types/sales";

export const getSales = async (
  companyId: string,
  search?: string
): Promise<SalesListResponse> => {

  const response = await api.get(
    "/sales",
    {
      params: {
        companyId,
        search,
      },
    }
  );

  return response.data;

};

export const getSale = async (
  id: string
): Promise<SalesResponse> => {

  const response = await api.get(
    `/sales/${id}`
  );

  return response.data;

};

export const createSales = async (
  data: CreateSalesDTO
): Promise<SalesResponse> => {

  const response = await api.post(
    "/sales",
    data
  );

  return response.data;

};

export const updateSales = async (
  id: string,
  data: UpdateSalesDTO
): Promise<SalesResponse> => {

  const response = await api.put(
    `/sales/${id}`,
    data
  );

  return response.data;

};

export const deleteSales = async (
  id: string
): Promise<{
  success: boolean;
  message: string;
}> => {

  const response = await api.delete(
    `/sales/${id}`
  );

  return response.data;

};