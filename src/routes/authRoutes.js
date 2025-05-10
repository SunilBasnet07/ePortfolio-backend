import express from "express";
import { forgotPassword, login, register, resetPassword } from "../controllers/authcontrollers.js";

const router = express.Router();

router.post("/login",login);
router.post("/register",register);
router.post("/forgot-password",forgotPassword);
router.put("/reset-password/:id",resetPassword);
export default router;
