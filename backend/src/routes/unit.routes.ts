import { Router } from "express";

import {
  createUnit,
  deleteUnit,
  getUnit,
  getUnits,
  updateUnit,
} from "../controllers/unit.controller";

import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  protect,
  createUnit
);

router.get(
  "/",
  protect,
  getUnits
);

router.get(
  "/:id",
  protect,
  getUnit
);

router.put(
  "/:id",
  protect,
  updateUnit
);

router.delete(
  "/:id",
  protect,
  deleteUnit
);

export default router;