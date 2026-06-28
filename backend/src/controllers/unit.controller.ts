import { Request, Response } from "express";

import * as unitService from "../services/unit.service";

import { validateUnit } from "../validations/unit.validation";

export const createUnit = async (
  req: Request,
  res: Response
) => {
  try {
    const error = validateUnit(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const unit =
      await unitService.createUnit(req.body);

    return res.status(201).json({
      success: true,
      unit,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getUnits = async (
  req: Request,
  res: Response
) => {
  try {
    const { companyId, search } =
      req.query;

    const units =
      await unitService.getUnits(
        companyId as string,
        search as string
      );

    return res.json({
      success: true,
      units,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getUnit = async (
  req: Request,
  res: Response
) => {
  try {
    const unit =
      await unitService.getUnitById(
        req.params.id
      );

    if (!unit) {
      return res.status(404).json({
        success: false,
        message: "Unit not found",
      });
    }

    return res.json({
      success: true,
      unit,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateUnit = async (
  req: Request,
  res: Response
) => {
  try {
    const unit =
      await unitService.updateUnit(
        req.params.id,
        req.body
      );

    return res.json({
      success: true,
      unit,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteUnit = async (
  req: Request,
  res: Response
) => {
  try {
    await unitService.deleteUnit(
      req.params.id
    );

    return res.json({
      success: true,
      message: "Unit deleted successfully",
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