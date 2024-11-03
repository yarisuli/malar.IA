import paciente from "../controllers/paciente.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.get("/medico/:idMedico", verifyToken, paciente.getPacientes);
router.get("/:id", verifyToken, paciente.getPaciente);
router.post("", verifyToken, paciente.createPaciente);
router.put("/:id", verifyToken, paciente.updatePaciente);
router.delete("/:id", verifyToken, paciente.deletePaciente); 

export default router; 