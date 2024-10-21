import diagnostico from "../controllers/diagnostico.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.get("/medico/:idMedico", diagnostico.getMedicoDiagnosticos);
router.get("/:id", diagnostico.getDiagnostico);
router.post("/:idPaciente", verifyToken, diagnostico.createDiagnostico);
router.put("/:id", verifyToken, diagnostico.updateDiagnostico);
router.delete("/:id", verifyToken, diagnostico.deleteDiagnostico);

export default router;