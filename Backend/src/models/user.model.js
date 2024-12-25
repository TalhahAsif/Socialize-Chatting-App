import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    Bio: {
      type: String,
      default: "Hi I'm Using Socialize",
    },
    profileImg: {
      type: String,
      default: "https://res.cloudinary.com/dhylynexh/image/upload/v1735133619/mzzxerbhycfp3ennyypk.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
