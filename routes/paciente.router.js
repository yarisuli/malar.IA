import paciente from "../controllers/paciente.js";
import { Router } from "express";

const router = Router();

router.get("/:idMedico", paciente.getPacientes);
router.get("/:id", paciente.getPaciente);
router.post("", paciente.createPaciente);
router.put("/:id", paciente.updatePaciente);
router.delete("/:id", paciente.deletePaciente); 

export default router; 