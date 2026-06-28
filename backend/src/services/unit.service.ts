import prisma from "../config/prisma";

import {
  CreateUnitDTO,
  UpdateUnitDTO,
} from "../types/unit.types";

export const createUnit = async (
  data: CreateUnitDTO
) => {
  return prisma.unit.create({
    data,
  });
};

export const getUnits = async (
  companyId: string,
  search?: string
) => {
  return prisma.unit.findMany({
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
      products: true,
    },

    orderBy: {
      name: "asc",
    },
  });
};

export const getUnitById = async (
  id: string
) => {
  return prisma.unit.findUnique({
    where: {
      id,
    },

    include: {
      products: true,
    },
  });
};

export const updateUnit = async (
  id: string,
  data: UpdateUnitDTO
) => {
  return prisma.unit.update({
    where: {
      id,
    },

    data,
  });
};

export const deleteUnit = async (
  id: string
) => {
  const unit =
    await prisma.unit.findUnique({
      where: {
        id,
      },

      include: {
        products: true,
      },
    });

  if (!unit) {
    throw new Error("Unit not found");
  }

  if (unit.products.length > 0) {
    throw new Error(
      "Cannot delete unit because it is used by products."
    );
  }

  return prisma.unit.delete({
    where: {
      id,
    },
  });
};