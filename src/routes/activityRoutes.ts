import { Router } from "express";
import { ActivityController } from "../controllers/activityController";
import { auth } from "../middleware/authMiddleware";

const router = Router();
const activityController = new ActivityController();

router.post("/", auth, activityController.create);
router.get("/", auth, activityController.findAll);
router.get("/:id", auth, activityController.findOne);
router.put("/:id", auth, activityController.update);
router.delete("/:id", auth, activityController.delete);

export { router as activityRouter };