import { Request, Response } from "express";

import {
  createLedger,
  deleteLedger,
  getLedgerById,
  getLedgers,
  searchLedger,
  updateLedger,
} from "../services/ledger.service";

import { validateLedger } from "../validations/ledger.validation";

export const create = async (
  req: Request,
  res: Response
) => {
  try {
    const error = validateLedger(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const ledger = await createLedger(req.body);

    return res.status(201).json({
      success: true,
      ledger,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getAll = async (
  req: Request,
  res: Response
) => {
  try {
    const companyId = req.query.companyId as string;

    const ledgers = await getLedgers(companyId);

    return res.json({
      success: true,
      ledgers,
    });
  } catch {
    return res.status(500).json({
      success: false,
    });
  }
};

export const getOne = async (
  req: Request,
  res: Response
) => {
  try {
    const ledger = await getLedgerById(
      req.params.id
    );

    return res.json({
      success: true,
      ledger,
    });
  } catch {
    return res.status(500).json({
      success: false,
    });
  }
};

export const update = async (
  req: Request,
  res: Response
) => {
  try {
    const ledger = await updateLedger(
      req.params.id,
      req.body
    );

    return res.json({
      success: true,
      ledger,
    });
  } catch {
    return res.status(500).json({
      success: false,
    });
  }
};

export const remove = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteLedger(req.params.id);

    return res.json({
      success: true,
      message: "Ledger Deleted",
    });
  } catch {
    return res.status(500).json({
      success: false,
    });
  }
};

export const search = async (
  req: Request,
  res: Response
) => {
  try {
    const companyId = req.query.companyId as string;

    const q = req.query.q as string;

    const ledgers = await searchLedger(
      companyId,
      q
    );

    return res.json({
      success: true,
      ledgers,
    });
  } catch {
    return res.status(500).json({
      success: false,
    });
  }
};