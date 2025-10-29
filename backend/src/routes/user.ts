import { Router } from "express";
import { register, login, logout, getCurrentUser } from "../controllers/user.js";
import { verifyJwt } from "../middlewares/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", verifyJwt, logout);
router.get("/profile", verifyJwt, getCurrentUser);

export default router;