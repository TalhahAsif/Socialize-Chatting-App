import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/connecBD.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);


app.listen(PORT, () => {
  connectDB();
  console.log(`This app is running on localhost ${PORT}`);
});
