import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";

import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  protect,
  createProduct
);

router.get(
  "/",
  protect,
  getProducts
);

router.get(
  "/:id",
  protect,
  getProduct
);

router.put(
  "/:id",
  protect,
  updateProduct
);

router.delete(
  "/:id",
  protect,
  deleteProduct
);

export default router;