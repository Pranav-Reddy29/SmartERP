import { Request, Response } from "express";

import * as purchaseService from "../services/purchase.service";

import { validatePurchase } from "../validations/purchase.validation";

export const createPurchase = async (
  req: Request,
  res: Response
) => {

  try {

    const error = validatePurchase(req.body);

    if (error) {

      return res.status(400).json({
        success: false,
        message: error,
      });

    }

    const purchase =
      await purchaseService.createPurchase(
        req.body
      );

    return res.status(201).json({

      success: true,

      purchase,

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};

export const getPurchases = async (
  req: Request,
  res: Response
) => {

  try {

    const { companyId } = req.query;

    if (!companyId) {

      return res.status(400).json({

        success: false,

        message: "Company is required",

      });

    }

    const purchases =
      await purchaseService.getPurchases(
        companyId as string
      );

    return res.json({

      success: true,

      purchases,

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};

export const getPurchase = async (
  req: Request,
  res: Response
) => {

  try {

    const purchase =
      await purchaseService.getPurchaseById(
        req.params.id
      );

    if (!purchase) {

      return res.status(404).json({

        success: false,

        message: "Purchase voucher not found",

      });

    }

    return res.json({

      success: true,

      purchase,

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};

export const updatePurchase = async (
  req: Request,
  res: Response
) => {

  try {

    const error = validatePurchase(req.body);

    if (error) {

      return res.status(400).json({

        success: false,

        message: error,

      });

    }

    const purchase =
      await purchaseService.updatePurchase(
        req.params.id,
        req.body
      );

    return res.json({

      success: true,

      purchase,

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};

export const deletePurchase = async (
  req: Request,
  res: Response
) => {

  try {

    await purchaseService.deletePurchase(
      req.params.id
    );

    return res.json({

      success: true,

      message:
        "Purchase voucher deleted successfully",

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