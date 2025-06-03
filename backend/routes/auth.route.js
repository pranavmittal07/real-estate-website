import express from "express";
import signup from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth.signin", signin);

export default router;