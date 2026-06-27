import api from "@/lib/api";

import {
  CreateGroupDTO,
  UpdateGroupDTO,
} from "@/types/group";

export const getGroups = async (
  companyId: string,
  search = ""
) => {
  const response = await api.get("/groups", {
    params: {
      companyId,
      search,
    },
  });

  return response.data;
};

export const createGroup = async (
  data: CreateGroupDTO
) => {
  const response = await api.post(
    "/groups",
    data
  );

  return response.data;
};

export const updateGroup = async (
  id: string,
  data: UpdateGroupDTO
) => {
  const response = await api.put(
    `/groups/${id}`,
    data
  );

  return response.data;
};

export const deleteGroup = async (
  id: string
) => {
  const response = await api.delete(
    `/groups/${id}`
  );

  return response.data;
};