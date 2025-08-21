import express from "express";
import { register, login ,me,updateUser,deleteUser} from "../controller/auth.controller.js";
import {userAuthMiddleware} from "../middleware/userAuth.middleware.js"

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me",userAuthMiddleware,me);
router.put("/update",userAuthMiddleware,updateUser);
router.delete("/delete",userAuthMiddleware,deleteUser)


export default router;
    