import { Router } from "express";
import { VisitController } from "../controllers/visitController";
import { auth } from "../middleware/authMiddleware";

const router = Router();
const visitController = new VisitController();

router.post("/", auth, visitController.create);
router.get("/", auth, visitController.findAll);
router.get("/patient/:patientId", auth, visitController.findByPatientId);
router.get("/:id", auth, visitController.findOne);
router.put("/:id", auth, visitController.update);
router.delete("/:id", auth, visitController.delete);

export { router as visitRouter };