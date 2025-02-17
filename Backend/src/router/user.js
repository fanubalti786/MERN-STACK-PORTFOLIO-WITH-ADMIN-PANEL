import express from "express";
import { getUser, loginUser, logoutUser, registerUser, updateProfile } from "../controllers/user.js";
import { errorMiddleware } from "../middlewares/error.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser, errorMiddleware);
router.post("/login", loginUser, errorMiddleware);
router.post("/logout", isAuthenticated, logoutUser, errorMiddleware);
router.post("/me", isAuthenticated, getUser, errorMiddleware);
router.post("/update/me", isAuthenticated, updateProfile, errorMiddleware);




export const userRouter = router;