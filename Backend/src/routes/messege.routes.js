import express from "express";
import {
  getMessages,
  sendChat,
} from "../controller/messege.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
import upload from "../lib/multer.js";

const router = express.Router();

router.post("/sendMessage/:conversationId", protectedRoute, upload.fields([
  { name: "images", maxCount: 10 },
  { name: "documents", maxCount: 10 },
]), sendChat);
router.get("/getMessage/:conversationId", protectedRoute, getMessages);

export default router;
