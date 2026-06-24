import { Router } from "express";

import {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany
} from "../controllers/company.controller";

import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", protect, createCompany);

router.get("/", protect, getCompanies);

router.get("/:id", protect, getCompany);

router.put("/:id", protect, updateCompany);

router.delete("/:id", protect, deleteCompany);

export default router;