import User from "../models/user.model";

const signup = (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname && !email && !password) {
      res.status(500).json({
        messege: "please fill all fields",
      });
    }

  } catch (error) {}
};

export { signup };
