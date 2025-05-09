import express from "express";
import { createUsers, getAllUsers, getUserById, uploadProfileImage } from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";
import roleBaseAuth from "../middleware/roleBaseAuth.js";

const router=express.Router();

router.post("/",createUsers);
router.get("/",auth,roleBaseAuth("ADMIN"),getAllUsers);
router.get("/:id",getUserById);
router.put("/profile/upload",auth,uploadProfileImage);



export default router;