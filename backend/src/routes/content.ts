import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.js";
import { getContent, createContent, deleteContent } from "../controllers/content.js";

const router = Router();

router.get("/", verifyJwt, getContent);
router.post("/", verifyJwt, createContent);
router.delete("/:id", verifyJwt, deleteContent);

export default router;