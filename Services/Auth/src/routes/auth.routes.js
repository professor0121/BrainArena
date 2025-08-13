import express from "express";
import { register, login ,me} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me",me)

export default router;
