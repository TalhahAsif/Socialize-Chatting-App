import express from "express";
import {
  getMessages,
  sendChat,
  userForSideBar,
} from "../controller/messege.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", protectedRoute, userForSideBar);
router.post("/sendMessage/:id", protectedRoute, sendChat);
router.get("/allmsg/:params", protectedRoute, getMessages);

export default router;
