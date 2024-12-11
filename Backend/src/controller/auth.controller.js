import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname || !email || !password) {
      return res.status(500).json({
        error: true,
        messege: "please fill all fields",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        messege: "password must be 6 or more characters long ",
      });
    }

    const preUser = await User.findOne({ email });
    if (preUser) {
      return res.status(400).json({
        error: true,
        messege: "This user is already exist",
      });
    }

    const saltRound = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, saltRound);

    const newUser = new User({
      fullname,
      email,
      password: hashpassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        password: newUser.password,
        profileImg: newUser.profileImg,
      });
    } else {
      return res.stutus(400).json({
        messege: "Invalid Credencials",
      });
    }
  } catch (error) {
    console.log("error in signing==>", error.messege);
    return res.status(500).json({
      messege: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        messege: "invalid Credentials",
      });
    }

    const isPasswordcorrect = bcrypt.compare(password, user.password);

    if (isPasswordcorrect) {
      generateToken(user._id, res);
      return res.status(200).json({
        user,
        messege: "User login succesfully",
      });
    } else {
      return res.status(400).json({
        messege: "invalid Credentials",
      });
    }
  } catch (error) {
    console.log("error in login==>", error.messege);
    return res.status(500).json({
      messege: "Internal server error",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", { maxAge: 0 });
    res.status(200).json({
      messege: "User Logged Out Successfully",
    });
  } catch (error) {
    console.log("error in loggin out==>", error.messege);

    res.status(500).json({
      messege: "Internal server Error",
    });
  }
};

export { signup, login, logout };
