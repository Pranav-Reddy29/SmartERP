import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
  search,
} from "../controllers/ledger.controller";

import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.use(protect);

router.post("/", create);

router.get("/", getAll);

router.get("/search", search);

router.get("/:id", getOne);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;