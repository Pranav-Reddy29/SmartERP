import prisma from "../config/prisma";
import {
  CreateGroupDTO,
  UpdateGroupDTO,
} from "../types/group.types";

export const createGroup = async (
  data: CreateGroupDTO
) => {
  return prisma.ledgerGroup.create({
    data,
  });
};

export const getGroups = async (
  companyId: string,
  search?: string
) => {
  return prisma.ledgerGroup.findMany({
    where: {
      companyId,
      ...(search
        ? {
            name: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {}),
    },
    include: {
      parent: true,
      children: true,
      ledgers: true,
    },
    orderBy: {
      name: "asc",
    },
  });
};

export const getGroupById = async (
  id: string
) => {
  return prisma.ledgerGroup.findUnique({
    where: { id },
    include: {
      parent: true,
      children: true,
      ledgers: true,
    },
  });
};

export const updateGroup = async (
  id: string,
  data: UpdateGroupDTO
) => {
  return prisma.ledgerGroup.update({
    where: { id },
    data,
  });
};

export const deleteGroup = async (
  id: string
) => {
  return prisma.ledgerGroup.delete({
    where: { id },
  });
};