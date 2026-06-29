import { Router } from "express";

import {
  createPurchase,
  getPurchases,
  getPurchase,
  updatePurchase,
  deletePurchase,
} from "../controllers/purchase.controller";

const router = Router();

/**
 * Purchase Voucher Routes
 */

// Create Purchase
router.post("/", createPurchase);

// Get All Purchases
router.get("/", getPurchases);

// Get Purchase By ID
router.get("/:id", getPurchase);

// Update Purchase
router.put("/:id", updatePurchase);

// Delete Purchase
router.delete("/:id", deletePurchase);

export default router;