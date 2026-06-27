import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import * as groupService from "@/services/group.service";

export const useGroups = (
  companyId: string,
  search = ""
) =>
  useQuery({
    queryKey: [
      "groups",
      companyId,
      search,
    ],
    queryFn: () =>
      groupService.getGroups(
        companyId,
        search
      ),
  });

export const useCreateGroup = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      groupService.createGroup,

    onSuccess: () => {
      toast.success(
        "Group created successfully"
      );

      queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to create group"
      );
    },
  });
};

export const useUpdateGroup = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: any;
    }) =>
      groupService.updateGroup(
        id,
        data
      ),

    onSuccess: () => {
      toast.success(
        "Group updated successfully"
      );

      queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to update group"
      );
    },
  });
};

export const useDeleteGroup = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      groupService.deleteGroup,

    onSuccess: () => {
      toast.success(
        "Group deleted successfully"
      );

      queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to delete group"
      );
    },
  });
};