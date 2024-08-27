import medico from "../controllers/medico.js";
import { Router } from "express";

const router = Router();

router.get("", medico.getMedicos);
router.get("/:id", medico.getMedico);
router.post("", medico.createMedico);
router.put("/:id", medico.updateMedico);
router.delete("/:id", medico.deleteMedico);

export default router; 
