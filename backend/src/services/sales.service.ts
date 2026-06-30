import prisma from "../config/prisma";

import {
  CreateSalesDTO,
  UpdateSalesDTO,
} from "../types/sales.types";

export const createSales = async (
  data: CreateSalesDTO
) => {
  return prisma.salesVoucher.create({
    data: {
      voucherNumber: data.voucherNumber,
      voucherDate: data.voucherDate,
      customerId: data.customerId,
      companyId: data.companyId,
      subTotal: data.subTotal,
      discount: data.discount ?? 0,
      gstTotal: data.gstTotal ?? 0,
      grandTotal: data.grandTotal,
      notes: data.notes,

      items: {
        create: data.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          rate: item.rate,
          discount: item.discount ?? 0,
          gstRate: item.gstRate ?? 0,
          gstAmount: item.gstAmount ?? 0,
          amount: item.amount,
        })),
      },
    },

    include: {
      customer: true,
      company: true,

      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const getSales = async (
  companyId: string,
  search?: string
) => {
  return prisma.salesVoucher.findMany({
    where: {
      companyId,

      ...(search
        ? {
            voucherNumber: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {}),
    },

    include: {
      customer: true,

      items: {
        include: {
          product: true,
        },
      },
    },

    orderBy: {
      voucherDate: "desc",
    },
  });
};

export const getSalesById = async (
  id: string
) => {
  return prisma.salesVoucher.findUnique({
    where: {
      id,
    },

    include: {
      customer: true,
      company: true,

      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const updateSales = async (
  id: string,
  data: UpdateSalesDTO
) => {
  return prisma.$transaction(async (tx) => {

    await tx.salesVoucherItem.deleteMany({
      where: {
        salesVoucherId: id,
      },
    });

    return tx.salesVoucher.update({
      where: {
        id,
      },

      data: {
        voucherNumber: data.voucherNumber,
        voucherDate: data.voucherDate,
        customerId: data.customerId,
        subTotal: data.subTotal,
        discount: data.discount,
        gstTotal: data.gstTotal,
        grandTotal: data.grandTotal,
        notes: data.notes,

        items: {
          create:
            data.items?.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              rate: item.rate,
              discount: item.discount ?? 0,
              gstRate: item.gstRate ?? 0,
              gstAmount: item.gstAmount ?? 0,
              amount: item.amount,
            })) ?? [],
        },
      },

      include: {
        customer: true,
        company: true,

        items: {
          include: {
            product: true,
          },
        },
      },
    });

  });
};

export const deleteSales = async (
  id: string
) => {

  const sales =
    await prisma.salesVoucher.findUnique({
      where: {
        id,
      },
    });

  if (!sales) {
    throw new Error("Sales voucher not found");
  }

  return prisma.salesVoucher.delete({
    where: {
      id,
    },
  });

};