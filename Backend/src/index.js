import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messegesRoutes from "./routes/messege.routes.js";
import { connectDB } from "./lib/connecBD.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messeges", messegesRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`This app is running on localhost ${PORT}`);
});
