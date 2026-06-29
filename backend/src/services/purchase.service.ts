import prisma from "../config/prisma";

import {
  CreatePurchaseDTO,
  UpdatePurchaseDTO,
} from "../types/purchase.types";

export const createPurchase = async (
  data: CreatePurchaseDTO
) => {

  return prisma.$transaction(async (tx) => {

    const purchase =
      await tx.purchaseVoucher.create({

        data: {

          voucherNumber:
            data.voucherNumber,

          voucherDate:
            data.voucherDate,

          supplierId:
            data.supplierId,

          companyId:
            data.companyId,

          subTotal:
            data.subTotal,

          discount:
            data.discount ?? 0,

          gstTotal:
            data.gstTotal ?? 0,

          grandTotal:
            data.grandTotal,

          notes:
            data.notes,

          items: {

            create:
              data.items.map((item) => ({

                productId:
                  item.productId,

                quantity:
                  item.quantity,

                rate:
                  item.rate,

                discount:
                  item.discount ?? 0,

                gstRate:
                  item.gstRate ?? 0,

                gstAmount:
                  item.gstAmount ?? 0,

                amount:
                  item.amount,

              })),

          },

        },

        include: {

          supplier: true,

          company: true,

          items: {

            include: {

              product: true,

            },

          },

        },

      });

    return purchase;

  });

};

export const getPurchases = async (
  companyId: string
) => {

  return prisma.purchaseVoucher.findMany({

    where: {

      companyId,

    },

    include: {

      supplier: true,

      company: true,

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

export const getPurchaseById = async (
  id: string
) => {

  return prisma.purchaseVoucher.findUnique({

    where: {

      id,

    },

    include: {

      supplier: true,

      company: true,

      items: {

        include: {

          product: true,

        },

      },

    },

  });

};

export const updatePurchase = async (
  id: string,
  data: UpdatePurchaseDTO
) => {

  return prisma.$transaction(async (tx) => {

    await tx.purchaseVoucherItem.deleteMany({

      where: {

        purchaseId: id,

      },

    });

    return tx.purchaseVoucher.update({

      where: {

        id,

      },

      data: {

        voucherNumber:
          data.voucherNumber,

        voucherDate:
          data.voucherDate,

        supplierId:
          data.supplierId,

        subTotal:
          data.subTotal,

        discount:
          data.discount,

        gstTotal:
          data.gstTotal,

        grandTotal:
          data.grandTotal,

        notes:
          data.notes,

        items: {

          create:
            data.items?.map((item) => ({

              productId:
                item.productId,

              quantity:
                item.quantity,

              rate:
                item.rate,

              discount:
                item.discount ?? 0,

              gstRate:
                item.gstRate ?? 0,

              gstAmount:
                item.gstAmount ?? 0,

              amount:
                item.amount,

            })) ?? [],

        },

      },

      include: {

        supplier: true,

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

export const deletePurchase = async (
  id: string
) => {

  const purchase =
    await prisma.purchaseVoucher.findUnique({

      where: {

        id,

      },

    });

  if (!purchase) {

    throw new Error(
      "Purchase voucher not found"
    );

  }

  return prisma.purchaseVoucher.delete({

    where: {

      id,

    },

  });

};