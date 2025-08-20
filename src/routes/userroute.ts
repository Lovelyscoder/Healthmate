import express from "express";
import { getUsers, createUser, getUserById, upDateUser, deleteUser } from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";

const router = express.Router();

router.get("/",isAuthenticated,getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", upDateUser);
router.delete("/", deleteUser);

export default router;
