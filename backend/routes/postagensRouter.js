import { Router } from "express";
import * as posts from "../controllers/postagensController.js";

const router = Router();

router.post("/", posts.create);
// router.get("/", getAll);
// router.get("/:id", getTarefa);
// router.put("/:id", updateTarefa);
// router.patch("/:id/status", updateStatusTarefa);
// router.get("/status/:situacao", buscarTarefaPorSituacao);

export default router;
