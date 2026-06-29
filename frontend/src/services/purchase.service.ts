import api from "@/lib/api";

import {
  CreatePurchaseDTO,
  UpdatePurchaseDTO,
  PurchaseResponse,
  PurchaseListResponse,
} from "@/types/purchase";

export const getPurchases = async (
  companyId: string
): Promise<PurchaseListResponse> => {

  const { data } = await api.get(
    "/purchase",
    {
      params: {
        companyId,
      },
    }
  );

  return data;

};

export const getPurchase = async (
  id: string
): Promise<PurchaseResponse> => {

  const { data } = await api.get(
    `/purchase/${id}`
  );

  return data;

};

export const createPurchase = async (
  purchase: CreatePurchaseDTO
): Promise<PurchaseResponse> => {

  const { data } = await api.post(
    "/purchase",
    purchase
  );

  return data;

};

export const updatePurchase = async (
  id: string,
  purchase: UpdatePurchaseDTO
): Promise<PurchaseResponse> => {

  const { data } = await api.put(
    `/purchase/${id}`,
    purchase
  );

  return data;

};

export const deletePurchase = async (
  id: string
) => {

  const { data } = await api.delete(
    `/purchase/${id}`
  );

  return data;

};