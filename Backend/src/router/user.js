import express from "express";
import {
  getUser,
  getUserForPortfolio,
  loginUser,
  logoutUser,
  registerUser,
  updatePassword,
  updateProfile,
  forgetPassword,
  resetPassword
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuthenticated, logoutUser);
router.get("/me", isAuthenticated, getUser);
router.post("/update/me", isAuthenticated, updateProfile);
router.post("/update/password", isAuthenticated, updatePassword);
router.get("/me/portfolio", getUserForPortfolio);
router.post("/forget/password", forgetPassword);
router.put("/password/reset/:token", resetPassword );

export const userRouter = router;
