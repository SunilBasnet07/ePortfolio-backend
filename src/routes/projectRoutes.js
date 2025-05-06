import express from "express";
import {auth} from "../middleware/auth.js"
import { createProject, deleteProject, getProjectById, getProjectByUser, updateProject } from "../controllers/projectControllers.js";

const router = express.Router();

router.post('/',auth,createProject);
router.put('/:id',auth,updateProject);
router.delete('/:id',auth,deleteProject);
router.get('/:id',getProjectById);
router.get('/',auth,getProjectByUser);


export default router;