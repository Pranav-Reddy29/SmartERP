import api from "@/lib/api";

import {
  UnitListResponse,
  UnitResponse,
  CreateUnitDTO,
  UpdateUnitDTO,
} from "@/types/unit";

export const getUnits = async (
  companyId: string,
  search?: string
) => {

  const response = await api.get<UnitListResponse>(
    "/units",
    {
      params: {
        companyId,
        search,
      },
    }
  );

  return response.data;

};

export const getUnit = async (
  id: string
) => {

  const response = await api.get<UnitResponse>(
    `/units/${id}`
  );

  return response.data;

};

export const createUnit = async (
  data: CreateUnitDTO
) => {

  const response = await api.post<UnitResponse>(
    "/units",
    data
  );

  return response.data;

};

export const updateUnit = async (
  id: string,
  data: UpdateUnitDTO
) => {

  const response = await api.put<UnitResponse>(
    `/units/${id}`,
    data
  );

  return response.data;

};

export const deleteUnit = async (
  id: string
) => {

  const response = await api.delete(
    `/units/${id}`
  );

  return response.data;

};