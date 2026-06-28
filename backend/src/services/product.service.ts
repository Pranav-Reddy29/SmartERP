import prisma from "../config/prisma";

import {
  CreateProductDTO,
  UpdateProductDTO,
} from "../types/product.types";

export const createProduct = async (
  data: CreateProductDTO
) => {
  return prisma.product.create({
    data,
    include: {
      category: true,
      unit: true,
      company: true,
    },
  });
};

export const getProducts = async (
  companyId: string,
  search?: string
) => {
  return prisma.product.findMany({
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
      category: true,
      unit: true,
      company: true,
    },

    orderBy: {
      name: "asc",
    },
  });
};

export const getProductById = async (
  id: string
) => {
  return prisma.product.findUnique({
    where: {
      id,
    },

    include: {
      category: true,
      unit: true,
      company: true,
    },
  });
};

export const updateProduct = async (
  id: string,
  data: UpdateProductDTO
) => {
  return prisma.product.update({
    where: {
      id,
    },

    data,

    include: {
      category: true,
      unit: true,
      company: true,
    },
  });
};

export const deleteProduct = async (
  id: string
) => {
  const product =
    await prisma.product.findUnique({
      where: {
        id,
      },
    });

  if (!product) {
    throw new Error("Product not found");
  }

  return prisma.product.delete({
    where: {
      id,
    },
  });
};