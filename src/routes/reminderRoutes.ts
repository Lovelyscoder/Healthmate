import { Router } from "express";
import { ReminderController } from "../controllers/reminderController";
import { auth } from "../middleware/authMiddleware";

const router = Router();
const reminderController = new ReminderController();

router.post("/", auth, reminderController.create);
router.get("/", auth, reminderController.findAll);
router.get("/prescription/:prescriptionId", auth, reminderController.findByPrescriptionId);
router.put("/:id", auth, reminderController.update);
router.delete("/:id", auth, reminderController.delete);

export { router as reminderRouter };