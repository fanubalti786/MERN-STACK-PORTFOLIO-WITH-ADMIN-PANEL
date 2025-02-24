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
router.put("/update/me", isAuthenticated, updateProfile);
router.put("/update/password", isAuthenticated, updatePassword);
router.get("/me/portfolio", getUserForPortfolio);
router.post("/forget/password", isAuthenticated ,forgetPassword);
router.put("/password/reset/:token", isAuthenticated, resetPassword );

export const userRouter = router;
