import { Router } from "express";

import {
  createGroup,
  deleteGroup,
  getGroup,
  getGroups,
  updateGroup,
} from "../controllers/group.controller";

import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", protect, createGroup);

router.get("/", protect, getGroups);

router.get("/:id", protect, getGroup);

router.put("/:id", protect, updateGroup);

router.delete("/:id", protect, deleteGroup);

export default router;