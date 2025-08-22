import { Router } from "express";
import { PrescriptionController } from "../controllers/prescriptionController";
import { auth } from "../middleware/authMiddleware";

const router = Router();
const prescriptionController = new PrescriptionController();

router.post("/", auth, prescriptionController.create);
router.get("/", auth, prescriptionController.findAll);
router.get("/visit/:visitId", auth, prescriptionController.findByVisitId);
router.get("/:id", auth, prescriptionController.findOne);
router.put("/:id", auth, prescriptionController.update);
router.delete("/:id", auth, prescriptionController.delete);

export { router as prescriptionRouter };