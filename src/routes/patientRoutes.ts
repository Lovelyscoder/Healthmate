import { Router } from "express";
import { PatientController } from "../controllers/patientController";
import { auth } from "../middleware/authMiddleware";

const router = Router();
const patientController = new PatientController();

router.post("/", auth, patientController.create);
router.get("/", auth, patientController.findAll);
router.get("/:id", auth, patientController.findOne);
router.put("/:id", auth, patientController.update);
router.delete("/:id", auth, patientController.delete);

export { router as patientRouter };