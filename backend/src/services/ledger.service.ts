import prisma from "../config/prisma";
import { CreateLedgerDTO } from "../types/ledger.types";

export const createLedger = async (
  data: CreateLedgerDTO
) => {
  return prisma.ledger.create({
    data: {
      ledgerName: data.ledgerName,
      ledgerType: data.ledgerType,
      openingBalance: data.openingBalance,
      balanceType: data.balanceType,
      gstNumber: data.gstNumber,
      phone: data.phone,
      email: data.email,
      address: data.address,
      state: data.state,
      companyId: data.companyId,
      groupId: data.groupId,
    },
    include: {
      group: true,
      company: true,
    },
  });
};

export const getLedgers = async (
  companyId: string
) => {
  return prisma.ledger.findMany({
    where: {
      companyId,
    },
    include: {
      group: true,
    },
    orderBy: {
      ledgerName: "asc",
    },
  });
};

export const getLedgerById = async (
  id: string
) => {
  return prisma.ledger.findUnique({
    where: {
      id,
    },
    include: {
      group: true,
      company: true,
    },
  });
};

export const updateLedger = async (
  id: string,
  body: Partial<CreateLedgerDTO>
) => {
  return prisma.ledger.update({
    where: {
      id,
    },
    data: body,
  });
};

export const deleteLedger = async (
  id: string
) => {
  return prisma.ledger.delete({
    where: {
      id,
    },
  });
};

export const searchLedger = async (
  companyId: string,
  search: string
) => {
  return prisma.ledger.findMany({
    where: {
      companyId,
      ledgerName: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      group: true,
    },
  });
};