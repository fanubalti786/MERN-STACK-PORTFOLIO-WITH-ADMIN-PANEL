import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getAllTimeLines, postTimeLine, deleteTimeLine } from "../controllers/timeLine.js";

const router = express.Router();

router.get("/getAll", getAllTimeLines);
router.post("/add", isAuthenticated, postTimeLine);
router.delete("/delete/:id", isAuthenticated, deleteTimeLine);


export const timeLineRouter = router;