import { Router } from "express";
import { MedicineController } from "../controllers/medicineController";
import { auth } from "../middleware/authMiddleware";

const router = Router();
const medicineController = new MedicineController();

router.post("/", auth, medicineController.create);
router.get("/", auth, medicineController.findAll);
router.get("/:id", auth, medicineController.findOne);
router.put("/:id", auth, medicineController.update);
router.delete("/:id", auth, medicineController.delete);

export { router as medicineRouter };