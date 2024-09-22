import medico from "../controllers/medico.controller.js";
import { Router } from "express";

const router = Router();

router.get("", medico.getMedicos);
router.get("/:id", medico.getMedicoById);
router.get("/mail", medico.getMedicoByMail);
router.post("", medico.createMedico);
router.put("/:id", medico.updateMedico);
router.delete("/:id", medico.deleteMedico);

export default router; 
