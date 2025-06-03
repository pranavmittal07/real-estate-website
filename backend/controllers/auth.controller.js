import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

// 🟩 SIGNUP Controller
export const signup = async function (req, res, next) {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(errorHandler(400, "User already exists"));

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

// 🟩 SIGNIN Controller
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(errorHandler(500, error.message)); 
  }
};
