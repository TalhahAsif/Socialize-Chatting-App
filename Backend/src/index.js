import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/connecBD.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`This app is running on localhost ${PORT}`);
});
