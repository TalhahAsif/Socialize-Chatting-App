import express from "express";
import {
  login,
  logout,
  signup,
  updateAcc,
} from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/updateAccount", protectedRoute, updateAcc);

export default router;
