import diagnostico from "../controllers/diagnostico.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.get("/medico", verifyToken, diagnostico.getMedicoDiagnosticos);
router.get("/:id", verifyToken, diagnostico.getDiagnostico);
router.post("/:idPaciente", verifyToken, diagnostico.createDiagnostico);
router.put("/:id", verifyToken, diagnostico.updatePacienteDiagnostico);
router.delete("/:id", verifyToken, diagnostico.deleteDiagnostico);
router.get("/agarrar", verifyToken, diagnostico.getIdDiagnostico);

export default router;