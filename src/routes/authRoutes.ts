import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { auth } from "../middleware/authMiddleware";

const router = Router();
const authController = new AuthController();

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected routes
router.get("/me", auth, authController.getProfile);
router.post("/logout", auth, authController.logout);
router.post("/change-password", auth, authController.changePassword);

export { router as authRouter };