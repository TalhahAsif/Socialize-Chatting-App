import express from "express"
import { createConversation, findUsers } from "../controller/conversation.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/createConversation", protectedRoute, createConversation);
router.get("/findUsers", protectedRoute, findUsers);

export default router