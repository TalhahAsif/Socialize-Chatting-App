import express from "express";
import {
  getMessages,
  sendChat,
  userForSideBar,
} from "../controller/messege.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", protectedRoute, userForSideBar);
router.get("/allmsg/:params", protectedRoute, getMessages);
router.post("/sendMessage/:id", protectedRoute, sendChat);

export default router;
