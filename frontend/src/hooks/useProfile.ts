"use client";

import { useQuery } from "@tanstack/react-query";

import { getProfile } from "@/services/auth.service";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 5,
  });
};