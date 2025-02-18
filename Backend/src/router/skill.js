import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addSkill, getAllSkills, deleteSkill } from "../controllers/skill.js";

const router = express.Router();

router.get("/getAll", getAllSkills);
router.post("/add", isAuthenticated, addSkill);
router.delete("/delete/:id", isAuthenticated, deleteSkill); 
router.put("/update/:id", isAuthenticated, updateSkill);

export const skillRouter = router;