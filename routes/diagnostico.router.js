import diagnostico from "../controllers/diagnostico.js";
import { Router } from "express";

const router = Router();

router.get("/:idMedico", diagnostico.getDiagnosticos);
router.get("/:id", diagnostico.getDiagnostico);
router.post("", diagnostico.createDiagnostico);
router.put("/:id", diagnostico.updateDiagnostico);
router.delete("/:id", diagnostico.deleteDiagnostico);

export default router;