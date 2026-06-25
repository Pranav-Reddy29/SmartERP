"use client";

import { useQuery } from "@tanstack/react-query";

import { getCompanies } from "@/services/company.service";

export const useCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
    staleTime: 1000 * 60 * 5,
  });
};