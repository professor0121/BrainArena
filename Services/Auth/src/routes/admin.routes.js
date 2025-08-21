import express from "express";
import { register, login ,me} from "../controller/admin.controller.js";
import {adminAuthMiddleware} from "../middleware/adminAuth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me",adminAuthMiddleware,me);

export default router;
