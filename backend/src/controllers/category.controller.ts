import { Request, Response } from "express";

import * as categoryService from "../services/category.service";

import { validateCategory } from "../validations/category.validation";

export const createCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const error = validateCategory(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const category =
      await categoryService.createCategory(
        req.body
      );

    return res.status(201).json({
      success: true,
      category,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getCategories = async (
  req: Request,
  res: Response
) => {
  try {
    const { companyId, search } =
      req.query;

    const categories =
      await categoryService.getCategories(
        companyId as string,
        search as string
      );

    return res.json({
      success: true,
      categories,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const category =
      await categoryService.getCategoryById(
        req.params.id
      );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.json({
      success: true,
      category,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const category =
      await categoryService.updateCategory(
        req.params.id,
        req.body
      );

    return res.json({
      success: true,
      category,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
) => {
  try {
    await categoryService.deleteCategory(
      req.params.id
    );

    return res.json({
      success: true,
      message:
        "Category deleted successfully",
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