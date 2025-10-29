import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.js";
import { toggleShareLink, getSharedLink } from "../controllers/link.js";

const router = Router();

router.post("/share", verifyJwt, toggleShareLink);
router.get("/:hash", getSharedLink);

export default router;
