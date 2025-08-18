import express from "express"
import { createConversation, findUsers, getConversation } from "../controller/conversation.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/createConversation", protectedRoute, createConversation);
router.get("/getConversation", protectedRoute, getConversation);
router.get("/findUsers", protectedRoute, findUsers);

export default router