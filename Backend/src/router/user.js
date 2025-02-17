import express from "express";
import { getUser, getUserForPortfolio, loginUser, logoutUser, registerUser, updatePassword, updateProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logoutUser);
router.post("/me", isAuthenticated, getUser);
router.post("/update/me", isAuthenticated, updateProfile);
router.post("/update/password", isAuthenticated, updatePassword);
router.post("/me/portfolio", getUserForPortfolio);






export const userRouter = router;