import { Router } from "express";
import { UserController } from "../controllers/userController";
import { auth } from "../middleware/authMiddleware";

const router = Router();
const userController = new UserController();

router.post("/", userController.create);
router.get("/", auth, userController.findAll);
router.get("/:id", auth, userController.findOne);
router.put("/:id", auth, userController.update);
router.delete("/:id", auth, userController.delete);

export { router as userRouter };