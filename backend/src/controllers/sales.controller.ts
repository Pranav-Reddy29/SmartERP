import { Request, Response } from "express";

import * as salesService from "../services/sales.service";

import { validateSales } from "../validations/sales.validation";

export const createSales = async (
  req: Request,
  res: Response
) => {
  try {
    const error = validateSales(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const sales =
      await salesService.createSales(
        req.body
      );

    return res.status(201).json({
      success: true,
      sales,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getSales = async (
  req: Request,
  res: Response
) => {
  try {
    const { companyId, search } =
      req.query;

    const sales =
      await salesService.getSales(
        companyId as string,
        search as string
      );

    return res.json({
      success: true,
      sales,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getSale = async (
  req: Request,
  res: Response
) => {
  try {
    const sale =
      await salesService.getSalesById(
        req.params.id
      );

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: "Sales voucher not found",
      });
    }

    return res.json({
      success: true,
      sale,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateSales = async (
  req: Request,
  res: Response
) => {
  try {
    const sales =
      await salesService.updateSales(
        req.params.id,
        req.body
      );

    return res.json({
      success: true,
      sales,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteSales = async (
  req: Request,
  res: Response
) => {
  try {
    await salesService.deleteSales(
      req.params.id
    );

    return res.json({
      success: true,
      message:
        "Sales voucher deleted successfully",
    });
  } catch (err: any) {
    console.error(err);

    return res.status(400).json({
      success: false,
      message:
        err.message || "Server Error",
    });
  }
};