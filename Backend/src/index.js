import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/connecBD.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import authRoutes from "./routes/auth.route.js";
import messegesRoutes from "./routes/messege.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import { setupSocket } from "./lib/connect-socket.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();
export const server = http.createServer(app)

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messeges", messegesRoutes);
app.use("/api/conversation", conversationRoutes);

setupSocket(server);

server.listen(PORT, () => {
  connectDB();
  console.log(`This app is running on localhost ${PORT}`);
});
