import express from "express";
import { register, login ,me,updateUser,deleteUser} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me",me);
router.put("/update/:id",updateUser);
router.delete("/delete/:id",deleteUser)


export default router;
