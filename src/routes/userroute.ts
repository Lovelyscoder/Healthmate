import express from "express";
import { getUsers, createUser } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/isAuthenticated";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);

export default router;
