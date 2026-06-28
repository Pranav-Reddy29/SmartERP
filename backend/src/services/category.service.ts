import prisma from "../config/prisma";

import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "../types/category.types";

export const createCategory = async (
  data: CreateCategoryDTO
) => {
  return prisma.category.create({
    data,
  });
};

export const getCategories = async (
  companyId: string,
  search?: string
) => {
  return prisma.category.findMany({
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

export const getCategoryById = async (
  id: string
) => {
  return prisma.category.findUnique({
    where: {
      id,
    },

    include: {
      products: true,
    },
  });
};

export const updateCategory = async (
  id: string,
  data: UpdateCategoryDTO
) => {
  return prisma.category.update({
    where: {
      id,
    },

    data,
  });
};

export const deleteCategory = async (
  id: string
) => {
  const category =
    await prisma.category.findUnique({
      where: {
        id,
      },

      include: {
        products: true,
      },
    });

  if (!category) {
    throw new Error("Category not found");
  }

  if (category.products.length > 0) {
    throw new Error(
      "Cannot delete category with products."
    );
  }

  return prisma.category.delete({
    where: {
      id,
    },
  });
};