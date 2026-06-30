import { Router } from "express";

import {
  createSales,
  getSales,
  getSale,
  updateSales,
  deleteSales,
} from "../controllers/sales.controller";

const router = Router();

/**
 * Create Sales Voucher
 */
router.post(
  "/",
  createSales
);

/**
 * Get All Sales Vouchers
 */
router.get(
  "/",
  getSales
);

/**
 * Get Single Sales Voucher
 */
router.get(
  "/:id",
  getSale
);

/**
 * Update Sales Voucher
 */
router.put(
  "/:id",
  updateSales
);

/**
 * Delete Sales Voucher
 */
router.delete(
  "/:id",
  deleteSales
);

export default router;