import medico from "../controllers/medico.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.get("", medico.getMedicos);
router.get("/:id", verifyToken, medico.getMedicoById);
router.get("/mail", verifyToken, medico.getMedicoByMail);
router.post("/", verifyToken, medico.createMedico);
router.put("/:id", verifyToken, medico.updateMedico);
router.delete("/:id", verifyToken, medico.deleteMedico);

export default router; 
