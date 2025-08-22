import { Router } from "express";
import { DiseaseController } from "../controllers/diseaseController";
import { auth } from "../middleware/authMiddleware";

const router = Router();
const diseaseController = new DiseaseController();

router.post("/", auth, diseaseController.create);
router.get("/", auth, diseaseController.findAll);
router.get("/:id", auth, diseaseController.findOne);
router.put("/:id", auth, diseaseController.update);
router.delete("/:id", auth, diseaseController.delete);

export { router as diseaseRouter };