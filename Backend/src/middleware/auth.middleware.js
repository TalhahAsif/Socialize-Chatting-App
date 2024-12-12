import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jsonwebtoken;

    if (!token) {
      return res.status(400).json({
        messege: "no Token Found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(400).json({
        messege: "Unauthorised Token",
      });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        messege: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("error in protected Routes==>", error.message);
    res.status(500).json({
      messege: "Internal Server Error",
    });
  }
};
