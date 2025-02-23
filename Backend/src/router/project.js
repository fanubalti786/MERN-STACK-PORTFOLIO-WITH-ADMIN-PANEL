import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addProject, getAllProjects, deleteProject, updateProject } from "../controllers/project.js";

const router = express.Router();

// router.get("get/:id", isAuthenticated, getProject);
router.get("/getAll", getAllProjects);
router.post("/add", isAuthenticated, addProject);
router.delete("/delete/:id", isAuthenticated, deleteProject);
router.put("/update/:id", isAuthenticated, updateProject);

export const projectRouter = router;