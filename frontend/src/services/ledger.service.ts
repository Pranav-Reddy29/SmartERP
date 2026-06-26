import api from "@/lib/api";

import {
  CreateLedgerDTO,
  LedgerListResponse,
  LedgerResponse,
} from "@/types/ledger";

export const getLedgers = async (
  companyId: string
): Promise<LedgerListResponse> => {
  const { data } = await api.get(
    `/ledger?companyId=${companyId}`
  );

  return data;
};

export const getLedger = async (
  id: string
): Promise<LedgerResponse> => {
  const { data } = await api.get(
    `/ledger/${id}`
  );

  return data;
};

export const createLedger = async (
  ledger: CreateLedgerDTO
): Promise<LedgerResponse> => {
  const { data } = await api.post(
    "/ledger",
    ledger
  );

  return data;
};

export const updateLedger = async (
  id: string,
  ledger: Partial<CreateLedgerDTO>
): Promise<LedgerResponse> => {
  const { data } = await api.put(
    `/ledger/${id}`,
    ledger
  );

  return data;
};

export const deleteLedger = async (
  id: string
) => {
  const { data } = await api.delete(
    `/ledger/${id}`
  );

  return data;
};

export const searchLedger = async (
  companyId: string,
  search: string
): Promise<LedgerListResponse> => {
  const { data } = await api.get(
    `/ledger/search?q=${search}&companyId=${companyId}`
  );

  return data;
};