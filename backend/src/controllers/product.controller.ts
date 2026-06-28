import { Request, Response } from "express";

import * as productService from "../services/product.service";

import { validateProduct } from "../validations/product.validation";

export const createProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const error = validateProduct(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const product =
      await productService.createProduct(
        req.body
      );

    return res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const { companyId, search } =
      req.query;

    const products =
      await productService.getProducts(
        companyId as string,
        search as string
      );

    return res.json({
      success: true,
      products,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const product =
      await productService.getProductById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      product,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const product =
      await productService.updateProduct(
        req.params.id,
        req.body
      );

    return res.json({
      success: true,
      product,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
) => {
  try {
    await productService.deleteProduct(
      req.params.id
    );

    return res.json({
      success: true,
      message: "Product deleted successfully",
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