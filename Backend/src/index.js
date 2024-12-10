import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`This app is running on localhost ${PORT}`);
});
