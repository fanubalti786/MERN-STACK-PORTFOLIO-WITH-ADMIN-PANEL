import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addApplication, getAllApplications, deleteApplication } from "../controllers/application.js";

const router = express.Router();

router.get("/getAll", getAllApplications);
router.post("/add", isAuthenticated, addApplication);
router.delete("/delete/:id", isAuthenticated, deleteApplication);

export const applicationRouter = router;