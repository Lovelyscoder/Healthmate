import { Router } from "express";
import { DoctorController } from "../controllers/doctorController";
import { auth } from "../middleware/authMiddleware";

const router = Router();
const doctorController = new DoctorController();

router.post("/", auth, doctorController.create);
router.get("/", auth, doctorController.findAll);
router.get("/:id", auth, doctorController.findOne);
router.put("/:id", auth, doctorController.update);
router.delete("/:id", auth, doctorController.delete);

export { router as doctorRouter };