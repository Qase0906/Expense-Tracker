import User from "../Models/User.js";
import { generateToken } from "../utils/generateTokens.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json("Email already in use");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(user._id);

    res.status(201).json({ token, user });
  } catch (error) {
    console.error("Error occured during creation user:", error);
  }
};

// login
export const login = async (req, res, next) => {
  let { email, password } = req.body;

  try {
    email = email.toLowerCase();

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Password or email is invalid" });
    }

    const token = generateToken(user._id);

    
    res.status(200).json({ token });
  } catch (error) {
    next(error)
  }
};
